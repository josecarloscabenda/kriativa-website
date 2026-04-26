import type { CollectionConfig } from "payload"
import crypto from "crypto"

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
      ({ doc, req }) => {
        // Surface the public URL in logs after creation for convenience.
        if (req.context?.fromBeforeValidate) return
        const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        req.payload.logger.info(
          `[invite] ${doc.clientName ?? "(no name)"} → ${base}/q/${doc.token}`
        )
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
