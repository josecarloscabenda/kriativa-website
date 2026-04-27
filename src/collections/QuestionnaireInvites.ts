import type { CollectionConfig } from "payload"
import crypto from "crypto"

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const INVITE_EMAIL_I18N = {
  pt: {
    subject: "Kriativa — Convite para preencher questionário",
    hello: "Olá",
    intro:
      "Enviamos-lhe este link para preencher um breve questionário ({template}). Demora cerca de 10 minutos e ajuda-nos a preparar a melhor proposta para si.",
    cta: "Abrir questionário",
    fallbackLabel: "Ou copie este link para o seu navegador:",
    expiryLabel: "Este link expira em",
    signoff: "Obrigado,\nEquipa Kriativa",
    locale: "pt-PT",
  },
  en: {
    subject: "Kriativa — Invitation to fill out a questionnaire",
    hello: "Hello",
    intro:
      "We are sending you this link to fill out a short questionnaire ({template}). It takes about 10 minutes and helps us prepare the best proposal for you.",
    cta: "Open questionnaire",
    fallbackLabel: "Or paste this link into your browser:",
    expiryLabel: "This link expires on",
    signoff: "Thank you,\nThe Kriativa team",
    locale: "en-US",
  },
  fr: {
    subject: "Kriativa — Invitation à remplir un questionnaire",
    hello: "Bonjour",
    intro:
      "Nous vous envoyons ce lien pour remplir un court questionnaire ({template}). Cela prend environ 10 minutes et nous aide à préparer la meilleure proposition pour vous.",
    cta: "Ouvrir le questionnaire",
    fallbackLabel: "Ou copiez ce lien dans votre navigateur :",
    expiryLabel: "Ce lien expire le",
    signoff: "Merci,\nL'équipe Kriativa",
    locale: "fr-FR",
  },
} as const

export const QuestionnaireInvites: CollectionConfig = {
  slug: "questionnaire-invites",
  labels: {
    singular: "Convite",
    plural: "Convites de Questionário",
  },
  admin: {
    group: "Questionários",
    useAsTitle: "clientName",
    defaultColumns: [
      "clientName",
      "clientEmail",
      "template",
      "status",
      "expiresAt",
      "createdAt",
    ],
    description:
      "Cada Convite gera um link único anónimo a enviar ao cliente. O link expira na data definida ou após submissão.",
  },
  access: {
    read: () => true, // public read for /q/[token] page (server validates)
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data && !data.token) {
          // 24 hex chars = 12 bytes — short, URL-safe, hard to brute force.
          data.token = crypto.randomBytes(12).toString("hex")
        }
        if (operation === "create" && data && !data.status) {
          data.status = "pending"
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        const url = `${base}/q/${doc.token}`

        // Always log so the URL is easy to grab from server logs.
        req.payload.logger.info(
          `[invite] ${doc.clientName ?? "(no name)"} → ${url}`
        )

        // Only auto-email on initial create, with a clientEmail set, and only
        // if SMTP is configured. Edits do not re-send.
        if (operation !== "create") return doc
        if (!doc.clientEmail) {
          req.payload.logger.info(
            "[invite] no clientEmail set — skipping invite email."
          )
          return doc
        }
        if (
          !process.env.SMTP_HOST ||
          !process.env.SMTP_USER ||
          !process.env.SMTP_PASS
        ) {
          req.payload.logger.warn(
            "[invite] SMTP env vars missing — skipping invite email."
          )
          return doc
        }

        try {
          const localeKey = (doc.locale ?? "pt") as keyof typeof INVITE_EMAIL_I18N
          const i18n = INVITE_EMAIL_I18N[localeKey] ?? INVITE_EMAIL_I18N.pt

          const templateId =
            typeof doc.template === "object" && doc.template !== null
              ? doc.template.id
              : doc.template
          const template = await req.payload.findByID({
            collection: "questionnaire-templates",
            id: templateId,
            locale: localeKey,
            fallbackLocale: "pt",
            depth: 0,
            overrideAccess: true,
          })
          const templateTitle = template?.title ?? ""

          const greetingName = doc.clientName?.trim()
          const greeting = greetingName
            ? `${i18n.hello} ${greetingName}`
            : i18n.hello

          const expiryHtml = doc.expiresAt
            ? `<p style="margin:24px 0 0 0;font-size:13px;color:#666;">
                ${escapeHtml(i18n.expiryLabel)}
                <strong style="color:#000;">${new Date(doc.expiresAt).toLocaleDateString(i18n.locale, { year: "numeric", month: "long", day: "numeric" })}</strong>.
              </p>`
            : ""
          const expiryText = doc.expiresAt
            ? `\n\n${i18n.expiryLabel} ${new Date(doc.expiresAt).toLocaleDateString(i18n.locale, { year: "numeric", month: "long", day: "numeric" })}.`
            : ""

          const html = `
<!DOCTYPE html>
<html lang="${localeKey}">
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#fff;border:1px solid #e8e8e8;">
        <tr><td style="padding:40px 32px 16px 32px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#666;">Kriativa</p>
          <h1 style="margin:0;font-size:22px;color:#000;">${escapeHtml(templateTitle)}</h1>
        </td></tr>
        <tr><td style="padding:8px 32px 16px 32px;">
          <p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.5;">
            ${escapeHtml(greeting)},
          </p>
          <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">
            ${escapeHtml(i18n.intro.replace("{template}", templateTitle))}
          </p>
        </td></tr>
        <tr><td style="padding:24px 32px;">
          <a href="${url}" style="display:inline-block;padding:14px 28px;background:#000;color:#fff;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.02em;">
            ${escapeHtml(i18n.cta)} →
          </a>
        </td></tr>
        <tr><td style="padding:0 32px 24px 32px;">
          <p style="margin:0;font-size:12px;color:#666;">${escapeHtml(i18n.fallbackLabel)}</p>
          <p style="margin:6px 0 0 0;font-family:monospace;font-size:12px;color:#000;word-break:break-all;">${url}</p>
          ${expiryHtml}
        </td></tr>
        <tr><td style="padding:0 32px 32px 32px;">
          <p style="margin:24px 0 0 0;font-size:14px;color:#333;line-height:1.5;white-space:pre-line;">${escapeHtml(i18n.signoff)}</p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#fafafa;font-size:11px;color:#999;text-align:center;">
          Kriativa &middot; Conectando Mundos &middot; geral@kriativa.ao
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

          const text = [
            `${greeting},`,
            "",
            i18n.intro.replace("{template}", templateTitle),
            "",
            `${i18n.cta}: ${url}`,
            expiryText,
            "",
            i18n.signoff,
          ].join("\n")

          await req.payload.sendEmail({
            to: doc.clientEmail,
            subject: `${i18n.subject}${templateTitle ? ` — ${templateTitle}` : ""}`,
            html,
            text,
            replyTo: process.env.PAYLOAD_EMAIL_FROM_ADDRESS,
          })

          req.payload.logger.info(
            `[invite] email sent to ${doc.clientEmail} (${localeKey})`
          )
        } catch (err) {
          req.payload.logger.error(
            { err },
            "[invite] failed to send invite email"
          )
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: "template",
      type: "relationship",
      relationTo: "questionnaire-templates",
      required: true,
    },
    {
      name: "locale",
      type: "select",
      required: true,
      defaultValue: "pt",
      options: [
        { label: "Português", value: "pt" },
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
      ],
      admin: { description: "Idioma em que o questionário será apresentado ao cliente." },
    },
    {
      name: "clientName",
      type: "text",
      admin: { description: "Nome do cliente (referência interna; não exposto)." },
    },
    {
      name: "clientEmail",
      type: "email",
      admin: { description: "Email para enviar o link (referência interna)." },
    },
    {
      name: "clientCompany",
      type: "text",
      admin: { description: "Empresa do cliente (referência interna)." },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Notas internas (não visíveis ao cliente)." },
    },
    {
      name: "expiresAt",
      type: "date",
      admin: {
        description: "Opcional. Após esta data o link deixa de funcionar.",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "token",
      type: "text",
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Gerado automaticamente. Não editar.",
      },
    },
    {
      name: "publicUrl",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: "@/components/payload/PublicInviteUrl",
        },
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      options: [
        { label: "Pendente", value: "pending" },
        { label: "Submetido", value: "submitted" },
        { label: "Expirado", value: "expired" },
      ],
    },
    {
      name: "submittedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
  ],
  timestamps: true,
}
