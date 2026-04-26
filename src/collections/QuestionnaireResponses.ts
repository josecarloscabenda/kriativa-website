import type { CollectionConfig } from "payload"

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

export const QuestionnaireResponses: CollectionConfig = {
  slug: "questionnaire-responses",
  labels: {
    singular: "Resposta",
    plural: "Respostas de Questionários",
  },
  admin: {
    group: "Questionários",
    useAsTitle: "clientName",
    defaultColumns: [
      "clientName",
      "clientEmail",
      "template",
      "submittedAt",
    ],
    description: "Submissões dos clientes via link público.",
  },
  access: {
    // Submissions are created by the API endpoint with overrideAccess.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return doc
        const notifyTo = process.env.PAYLOAD_EMAIL_NOTIFY
        if (!notifyTo) {
          req.payload.logger.info(
            "[questionnaire] PAYLOAD_EMAIL_NOTIFY not set — skipping notification email."
          )
          return doc
        }

        try {
          // Fetch template title for the subject line.
          const templateId =
            typeof doc.template === "object" && doc.template !== null
              ? doc.template.id
              : doc.template
          const template = await req.payload.findByID({
            collection: "questionnaire-templates",
            id: templateId,
            locale: "pt",
            depth: 0,
            overrideAccess: true,
          })
          const templateTitle = template?.title ?? "(modelo desconhecido)"

          const clientName = doc.clientName ?? "(sem nome)"
          const clientEmail = doc.clientEmail ?? "(sem email)"
          const clientPhone = doc.clientPhone ?? ""

          const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
          const adminUrl = `${baseUrl}/admin/collections/questionnaire-responses/${doc.id}`

          const answersHtml = (doc.answers ?? [])
            .map(
              (a: {
                questionLabel?: string | null
                value?: string | null
              }) => `
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
            <strong style="color:#000;">${escapeHtml(clientName)}</strong>${
              clientEmail !== "(sem email)"
                ? ` &middot; <a href="mailto:${escapeHtml(clientEmail)}" style="color:#000;">${escapeHtml(clientEmail)}</a>`
                : ""
            }${clientPhone ? ` &middot; ${escapeHtml(clientPhone)}` : ""}
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
            `Cliente: ${clientName} <${clientEmail}>${clientPhone ? ` ${clientPhone}` : ""}`,
            "",
            ...(doc.answers ?? []).map(
              (a: { questionLabel?: string | null; value?: string | null }) =>
                `${a.questionLabel ?? ""}\n  ${formatAnswerValue(a.value)}`
            ),
            "",
            `Ver no admin: ${adminUrl}`,
          ].join("\n")

          await req.payload.sendEmail({
            to: notifyTo,
            subject: `[Kriativa] Nova resposta: ${templateTitle} (${clientName})`,
            html,
            text,
            replyTo: clientEmail !== "(sem email)" ? clientEmail : undefined,
          })

          req.payload.logger.info(
            `[questionnaire] notification sent to ${notifyTo} for response ${doc.id}`
          )
        } catch (err) {
          req.payload.logger.error(
            { err },
            "[questionnaire] failed to send notification email"
          )
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: "invite",
      type: "relationship",
      relationTo: "questionnaire-invites",
      required: true,
      unique: true,
    },
    {
      name: "template",
      type: "relationship",
      relationTo: "questionnaire-templates",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "clientName",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "clientEmail",
      type: "email",
      admin: { readOnly: true },
    },
    {
      name: "clientPhone",
      type: "text",
      admin: { readOnly: true },
    },
    {
      name: "answers",
      type: "array",
      admin: { readOnly: true },
      fields: [
        { name: "questionKey", type: "text" },
        { name: "questionLabel", type: "text" },
        { name: "questionType", type: "text" },
        { name: "value", type: "textarea" },
      ],
    },
    {
      name: "submittedAt",
      type: "date",
      admin: { readOnly: true },
    },
  ],
  timestamps: true,
}
