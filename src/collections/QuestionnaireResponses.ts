import type { CollectionConfig } from "payload"

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
    // Notification email is sent from that endpoint via after() — keeping it
    // out of an afterChange hook prevents SMTP latency from blocking the
    // HTTP response and timing out the serverless function.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
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
