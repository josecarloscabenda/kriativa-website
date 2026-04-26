// Shape of one translated service. Arrays are index-aligned with the PT seed,
// so do not reorder without also reordering the source data.
export interface ServiceTranslation {
  title: string
  shortDescription: string
  description: string
  deliverables: string[]
  pricing: { description: string; features: string[] }[]
  priceTable: string[]
  faq: { question: string; answer: string }[]
}

export interface PortfolioTranslation {
  title: string
  description: string
}

export interface TestimonialTranslation {
  role: string
  content: string
}

export interface PostTranslation {
  title: string
  excerpt: string
  content: string
}
