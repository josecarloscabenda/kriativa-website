// Pure formatters and shared types — safe to import from client components.
// Server-only fetchers live in lib/content.ts.

export interface PricingTier {
  name: string
  description: string
  features: string[]
  priceRange: { min: number; max: number }
  highlight?: boolean
}

export interface ServiceItem {
  id: string | number
  slug: string
  title: string
  shortDescription: string
  icon: string
  startingPrice: number
  href: string
  description: string
  deliverables: string[]
  technologies: string[]
  pricing: PricingTier[]
  priceTable: { item: string; min: number; max: number }[]
  faq: { question: string; answer: string }[]
}

export interface PortfolioItem {
  id: string | number
  title: string
  description: string
  category: "Website" | "App Mobile" | "App Desktop" | "Sistema" | "Infra & Cloud"
  tags: string[]
  image: string | null
  confidential?: boolean
  url?: string
}

export interface Testimonial {
  id: string | number
  name: string
  role: string
  company: string
  content: string
}

export interface BlogPost {
  id: string | number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
  image: string
  readTime: string
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-AO").format(value) + " Kz"
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`
}
