import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Ficheiro",
    plural: "Media (Biblioteca de Ficheiros)",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "filename",
    description:
      "Biblioteca central de imagens e ficheiros. Tudo o que carrega aqui fica disponível para usar em Portefólio (capa), Blog (capa), Testemunhos (avatar). Pode também carregar directamente a partir desses formulários — fica aqui automaticamente.",
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
      { name: "wide", width: 1920, height: undefined, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
      localized: true,
    },
    {
      name: "caption",
      type: "text",
      localized: true,
    },
  ],
}
