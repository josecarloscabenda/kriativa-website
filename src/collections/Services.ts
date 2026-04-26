import type { CollectionConfig } from "payload"

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Serviço",
    plural: "Serviços",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "startingPrice", "updatedAt"],
    description:
      "As três linhas de oferta — Desenvolvimento, Infra & Cloud, Comércio. O slug controla a URL pública (/servicos/<slug>).",
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL slug (ex. desenvolvimento, infra-cloud, comercio).",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Ordem de apresentação (menor = primeiro).",
      },
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description:
          "Caminho do ícone SVG (ex. /servicos/Desenvolvimento de Software.svg).",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description: "Resumo curto usado nos cartões da homepage e listagem.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description: "Texto longo da página de detalhe do serviço.",
      },
    },
    {
      name: "startingPrice",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Preço inicial em Kz (0 = 'Sob consulta').",
      },
    },
    {
      name: "deliverables",
      type: "array",
      localized: true,
      labels: {
        singular: "Item",
        plural: "Entregáveis",
      },
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "technologies",
      type: "array",
      labels: {
        singular: "Tecnologia",
        plural: "Tecnologias",
      },
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "pricing",
      type: "array",
      labels: {
        singular: "Pacote",
        plural: "Pacotes",
      },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "text", localized: true },
        {
          name: "features",
          type: "array",
          localized: true,
          fields: [{ name: "value", type: "text", required: true }],
        },
        { name: "priceMin", type: "number" },
        { name: "priceMax", type: "number" },
        {
          name: "highlight",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Destaque visual (badge 'recomendado')." },
        },
      ],
    },
    {
      name: "priceTable",
      type: "array",
      labels: {
        singular: "Linha",
        plural: "Tabela de preços",
      },
      fields: [
        { name: "item", type: "text", required: true, localized: true },
        { name: "min", type: "number" },
        { name: "max", type: "number" },
      ],
    },
    {
      name: "faq",
      type: "array",
      labels: {
        singular: "Pergunta",
        plural: "Perguntas frequentes",
      },
      fields: [
        { name: "question", type: "text", required: true, localized: true },
        { name: "answer", type: "textarea", required: true, localized: true },
      ],
    },
  ],
}
