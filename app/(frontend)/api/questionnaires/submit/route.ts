import { NextResponse } from "next/server"
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

  // Persist response (admin-only readable).
  await payload.create({
    collection: "questionnaire-responses",
    overrideAccess: true,
    data: {
      invite: invite.id,
      template: templateId,
      clientName: clientName ?? invite.clientName ?? null,
      clientEmail: clientEmail ?? invite.clientEmail ?? null,
      clientPhone: clientPhone ?? null,
      submittedAt,
      answers: answers.map((a) => ({
        questionKey: a.questionKey,
        questionLabel: a.questionLabel,
        questionType: a.questionType,
        value:
          typeof a.value === "string"
            ? a.value
            : JSON.stringify(a.value ?? null),
      })),
    },
  })

  // Mark invite as submitted.
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

  return NextResponse.json({ success: true })
}
