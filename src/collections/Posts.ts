import type { CollectionConfig } from "payload"

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artigo",
    plural: "Blog",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "updatedAt"],
  },
  defaultSort: "-publishedAt",
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description: "Conteúdo do artigo em Markdown (renderizado com MDX).",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "imagePath",
      type: "text",
      required: false,
      admin: {
        description:
          "Caminho legacy para imagem em /public (usado quando coverImage não está definido).",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Equipa Kriativa",
    },
    {
      name: "readTime",
      type: "text",
      admin: {
        description: "Tempo de leitura estimado (ex. '5 min').",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
  ],
}
