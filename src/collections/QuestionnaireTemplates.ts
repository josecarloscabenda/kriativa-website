import type { CollectionConfig } from "payload"

export const QuestionnaireTemplates: CollectionConfig = {
  slug: "questionnaire-templates",
  labels: {
    singular: "Modelo de Questionário",
    plural: "Modelos de Questionários",
  },
  admin: {
    group: "Questionários",
    useAsTitle: "title",
    defaultColumns: ["title", "active", "updatedAt"],
    description:
      "Modelos reutilizáveis. Para cada cliente cria-se um Convite que gera link público.",
  },
  access: {
    read: () => true, // public read so submit endpoint can resolve template
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Identificador interno (não público)." },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Apenas modelos activos podem gerar Convites." },
    },
    {
      name: "introMessage",
      type: "textarea",
      localized: true,
      admin: { description: "Mensagem mostrada ao cliente no topo do formulário." },
    },
    {
      name: "thankYouMessage",
      type: "textarea",
      localized: true,
      admin: { description: "Mensagem mostrada ao cliente após submissão." },
    },
    {
      name: "questions",
      type: "array",
      labels: { singular: "Pergunta", plural: "Perguntas" },
      minRows: 1,
      fields: [
        {
          name: "key",
          type: "text",
          required: true,
          admin: {
            description:
              "Identificador único da pergunta (ex. 'budget', 'timeline'). Sem espaços.",
          },
        },
        { name: "label", type: "text", required: true, localized: true },
        { name: "helpText", type: "textarea", localized: true },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "shortText",
          options: [
            { label: "Texto curto", value: "shortText" },
            { label: "Texto longo", value: "longText" },
            { label: "Email", value: "email" },
            { label: "Telefone", value: "phone" },
            { label: "Número", value: "number" },
            { label: "Data", value: "date" },
            { label: "Sim / Não", value: "yesNo" },
            { label: "Escolha única", value: "singleChoice" },
            { label: "Escolha múltipla", value: "multipleChoice" },
            { label: "Escala 1-5", value: "scale" },
          ],
        },
        {
          name: "required",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "options",
          type: "array",
          labels: { singular: "Opção", plural: "Opções" },
          admin: {
            description:
              "Apenas para Escolha Única / Escolha Múltipla. Ignorar para outros tipos.",
          },
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "value", type: "text", required: true },
          ],
        },
      ],
    },
  ],
}
