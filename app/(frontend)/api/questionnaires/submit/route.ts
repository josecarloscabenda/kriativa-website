import { NextResponse, after } from "next/server"
import { getPayloadClient } from "@/lib/payload"

interface SubmitBody {
  token: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  answers: Array<{
    questionKey: string
    questionLabel: string
    questionType: string
    value: unknown
  }>
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const formatAnswerValue = (raw: string | null | undefined): string => {
  if (!raw) return "(em branco)"
  const trimmed = raw.trim()
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed.join(", ")
      return JSON.stringify(parsed)
    } catch {
      return trimmed
    }
  }
  return trimmed
}

export async function POST(req: Request) {
  let body: SubmitBody
  try {
    body = (await req.json()) as SubmitBody
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const { token, answers, clientName, clientEmail, clientPhone } = body
  if (!token || !Array.isArray(answers)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  const payload = await getPayloadClient()

  const invites = await payload.find({
    collection: "questionnaire-invites",
    where: { token: { equals: token } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  const invite = invites.docs[0]

  if (!invite) {
    return NextResponse.json({ error: "invalid_token" }, { status: 404 })
  }
  if (invite.status === "submitted") {
    return NextResponse.json({ error: "already_submitted" }, { status: 409 })
  }
  if (invite.expiresAt && new Date(invite.expiresAt).getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 410 })
  }

  const templateId =
    typeof invite.template === "object" && invite.template !== null
      ? invite.template.id
      : invite.template

  const submittedAt = new Date().toISOString()

  const normalisedAnswers = answers.map((a) => ({
    questionKey: a.questionKey,
    questionLabel: a.questionLabel,
    questionType: a.questionType,
    value:
      typeof a.value === "string"
        ? a.value
        : JSON.stringify(a.value ?? null),
  }))

  const response = await payload.create({
    collection: "questionnaire-responses",
    overrideAccess: true,
    data: {
      invite: invite.id,
      template: templateId,
      clientName: clientName ?? invite.clientName ?? null,
      clientEmail: clientEmail ?? invite.clientEmail ?? null,
      clientPhone: clientPhone ?? null,
      submittedAt,
      answers: normalisedAnswers,
    },
  })

  await payload.update({
    collection: "questionnaire-invites",
    id: invite.id,
    overrideAccess: true,
    data: {
      status: "submitted",
      submittedAt,
    },
  })

  payload.logger.info(
    `[questionnaire] new submission for invite=${invite.id} client=${
      clientName ?? "(anon)"
    }`
  )

  // Defer the notification email until after the HTTP response is sent.
  // SMTP at mail.kriativa.ao can be slow; awaiting it inline would risk
  // hitting the Vercel function timeout and stalling the client.
  after(async () => {
    const notifyTo = process.env.PAYLOAD_EMAIL_NOTIFY
    if (!notifyTo) {
      payload.logger.info(
        "[questionnaire] PAYLOAD_EMAIL_NOTIFY not set — skipping notification email."
      )
      return
    }

    try {
      const template = await payload.findByID({
        collection: "questionnaire-templates",
        id: templateId,
        locale: "pt",
        depth: 0,
        overrideAccess: true,
      })
      const templateTitle = template?.title ?? "(modelo desconhecido)"

      const displayName = clientName ?? invite.clientName ?? "(sem nome)"
      const displayEmail = clientEmail ?? invite.clientEmail ?? "(sem email)"
      const displayPhone = clientPhone ?? ""

      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
      const adminUrl = `${baseUrl}/admin/collections/questionnaire-responses/${response.id}`

      const answersHtml = normalisedAnswers
        .map(
          (a) => `
            <tr>
              <td style="padding:10px 14px;border-bottom:1px solid #eee;font-weight:600;color:#000;width:42%;vertical-align:top;">
                ${escapeHtml(a.questionLabel ?? "")}
              </td>
              <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#333;white-space:pre-wrap;">
                ${escapeHtml(formatAnswerValue(a.value))}
              </td>
            </tr>`
        )
        .join("")

      const html = `
<!DOCTYPE html>
<html lang="pt">
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#fff;border:1px solid #e8e8e8;">
        <tr><td style="padding:32px 32px 16px 32px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#666;">Nova resposta</p>
          <h1 style="margin:0;font-size:22px;color:#000;">${escapeHtml(templateTitle)}</h1>
        </td></tr>
        <tr><td style="padding:8px 32px 24px 32px;">
          <p style="margin:0;font-size:14px;color:#333;line-height:1.5;">
            <strong style="color:#000;">${escapeHtml(displayName)}</strong>${
              displayEmail !== "(sem email)"
                ? ` &middot; <a href="mailto:${escapeHtml(displayEmail)}" style="color:#000;">${escapeHtml(displayEmail)}</a>`
                : ""
            }${displayPhone ? ` &middot; ${escapeHtml(displayPhone)}` : ""}
          </p>
        </td></tr>
        <tr><td style="padding:0 32px 24px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #eee;font-size:13px;">
            ${answersHtml}
          </table>
        </td></tr>
        <tr><td style="padding:8px 32px 32px 32px;">
          <a href="${adminUrl}" style="display:inline-block;padding:10px 18px;background:#000;color:#fff;text-decoration:none;font-size:13px;font-weight:600;">Ver no admin</a>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#fafafa;font-size:11px;color:#999;text-align:center;">
          Kriativa &middot; Conectando Mundos
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

      const text = [
        `Nova resposta de questionário — ${templateTitle}`,
        `Cliente: ${displayName} <${displayEmail}>${displayPhone ? ` ${displayPhone}` : ""}`,
        "",
        ...normalisedAnswers.map(
          (a) => `${a.questionLabel ?? ""}\n  ${formatAnswerValue(a.value)}`
        ),
        "",
        `Ver no admin: ${adminUrl}`,
      ].join("\n")

      await payload.sendEmail({
        to: notifyTo,
        subject: `[Kriativa] Nova resposta: ${templateTitle} (${displayName})`,
        html,
        text,
        replyTo: displayEmail !== "(sem email)" ? displayEmail : undefined,
      })

      payload.logger.info(
        `[questionnaire] notification sent to ${notifyTo} for response ${response.id}`
      )
    } catch (err) {
      payload.logger.error(
        { err },
        "[questionnaire] failed to send notification email"
      )
    }
  })

  return NextResponse.json({ success: true })
}
