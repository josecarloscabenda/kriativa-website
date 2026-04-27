import type { CollectionConfig } from "payload"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testemunho",
    plural: "Testemunhos",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "role", "order", "updatedAt"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "avatar",
      label: "Foto / Avatar",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description:
          "Foto da pessoa (opcional). Se não houver, mostra-se um círculo com a inicial.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
}
