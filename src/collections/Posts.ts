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
      label: "Imagem de capa",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description:
          "Imagem destacada do artigo (cartão na listagem do blog e topo do post). Carregue um ficheiro novo ou escolha um existente da Media library.",
      },
    },
    {
      name: "imagePath",
      label: "Caminho de imagem (legacy)",
      type: "text",
      required: false,
      admin: {
        description:
          "Apenas usado se 'Imagem de capa' não estiver definido. Caminho relativo a /public (ex. /placeholder-blog-1.svg).",
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
