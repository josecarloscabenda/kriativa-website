import type { CollectionConfig } from "payload"

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  labels: {
    singular: "Projecto",
    plural: "Portefólio",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "confidential", "order", "updatedAt"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "website",
      options: [
        { label: "Website", value: "website" },
        { label: "App Mobile", value: "app-mobile" },
        { label: "App Desktop", value: "app-desktop" },
        { label: "Sistema (CRM/ERP)", value: "sistema" },
        { label: "Infra & Cloud", value: "infra-cloud" },
      ],
    },
    {
      name: "tags",
      type: "array",
      labels: { singular: "Tag", plural: "Tags" },
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description: "Imagem de capa do projecto (opcional).",
      },
    },
    {
      name: "url",
      type: "text",
      required: false,
      admin: {
        description: "Link público do projecto (opcional).",
      },
    },
    {
      name: "confidential",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Se marcado, o nome do cliente fica oculto no site.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
}
