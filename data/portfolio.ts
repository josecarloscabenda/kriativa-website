export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: "Website" | "App Mobile" | "App Desktop"
  tags: string[]
  image: string
  confidential?: boolean
  url?: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Portal de Notícias LuandaPress",
    description:
      "Website de notícias moderno com CMS personalizado, SEO avançado e sistema de subscrição de newsletter.",
    category: "Website",
    tags: ["Next.js", "CMS", "SEO", "Notícias"],
    image: "/placeholder-portfolio-1.svg",
  },
  {
    id: "2",
    title: "App de Entregas RápidoAO",
    description:
      "Aplicação mobile de entregas ao domicílio com tracking em tempo real, pagamentos integrados e painel de gestão.",
    category: "App Mobile",
    tags: ["Flutter", "Firebase", "Mapas", "Pagamentos"],
    image: "/placeholder-portfolio-2.svg",
  },
  {
    id: "3",
    title: "E-commerce ModaBela",
    description:
      "Loja online completa com catálogo de produtos, carrinho de compras, integração Multicaixa e gestão de stock.",
    category: "Website",
    tags: ["React", "Node.js", "E-commerce", "Pagamentos"],
    image: "/placeholder-portfolio-3.svg",
  },
  {
    id: "4",
    title: "Sistema de Gestão ERP",
    description:
      "Aplicação desktop para gestão empresarial com módulos de faturação, stock, RH e relatórios.",
    category: "App Desktop",
    tags: ["Electron", "PostgreSQL", "ERP", "Relatórios"],
    image: "/placeholder-portfolio-4.svg",
  },
  {
    id: "5",
    title: "Projeto Confidencial — Sector Bancário",
    description: "Projeto confidencial — detalhes sob NDA.",
    category: "App Mobile",
    tags: ["Fintech", "Segurança"],
    image: "/placeholder-portfolio-5.svg",
    confidential: true,
  },
  {
    id: "6",
    title: "Website Institucional AngolaTech",
    description:
      "Site institucional premium com animações, blog integrado e sistema de recrutamento online.",
    category: "Website",
    tags: ["Next.js", "Animações", "Blog", "Institucional"],
    image: "/placeholder-portfolio-6.svg",
  },
]

export const portfolioCategories = ["Todos", "Website", "App Mobile", "App Desktop"] as const
export type PortfolioCategory = (typeof portfolioCategories)[number]