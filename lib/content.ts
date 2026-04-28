import "server-only"
import { cache } from "react"
import { getPayloadClient } from "./payload"
import type {
  Service as PayloadService,
  Portfolio as PayloadPortfolio,
  Testimonial as PayloadTestimonial,
  Post as PayloadPost,
} from "@/src/payload-types"
import type { BlogPost, PortfolioItem, ServiceItem, Testimonial } from "./format"

// Re-export shared types and formatters for ergonomic server-side imports.
export type { BlogPost, PortfolioItem, ServiceItem, Testimonial, PricingTier } from "./format"
export { formatPrice, formatPriceRange } from "./format"

// ---------- Mappers ----------

const arr = <T = string>(items: { value: string }[] | null | undefined): T[] =>
  (items ?? []).map((i) => i.value as unknown as T)

function mapService(s: PayloadService): ServiceItem {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    shortDescription: s.shortDescription,
    icon: s.icon,
    startingPrice: s.startingPrice ?? 0,
    href: `/servicos/${s.slug}`,
    description: s.description,
    deliverables: arr(s.deliverables),
    technologies: arr(s.technologies),
    pricing: (s.pricing ?? []).map((tier) => ({
      name: tier.name,
      description: tier.description ?? "",
      features: arr(tier.features),
      priceRange: { min: tier.priceMin ?? 0, max: tier.priceMax ?? 0 },
      highlight: tier.highlight ?? false,
    })),
    priceTable: (s.priceTable ?? []).map((row) => ({
      item: row.item,
      min: row.min ?? 0,
      max: row.max ?? 0,
    })),
    faq: (s.faq ?? []).map((row) => ({ question: row.question, answer: row.answer })),
  }
}

const portfolioCategoryLabel: Record<NonNullable<PayloadPortfolio["category"]>, PortfolioItem["category"]> = {
  website: "Website",
  "app-mobile": "App Mobile",
  "app-desktop": "App Desktop",
  sistema: "Sistema",
  "infra-cloud": "Infra & Cloud",
}

function mapPortfolio(p: PayloadPortfolio): PortfolioItem {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: portfolioCategoryLabel[p.category] ?? "Website",
    tags: arr(p.tags),
    image: uploadUrl(p.image),
    confidential: p.confidential ?? false,
    url: p.url ?? undefined,
  }
}

// Resolves a Payload upload field (either an ID, a doc, or null) to a string URL.
const uploadUrl = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === "string" || typeof value === "number") return null
  if (typeof value !== "object") return null
  const obj = value as { url?: string | null }
  return obj.url ?? null
}

function mapTestimonial(t: PayloadTestimonial): Testimonial {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    content: t.content,
    avatar: uploadUrl(t.avatar),
  }
}

function mapPost(p: PayloadPost): BlogPost {
  // Prefer uploaded coverImage; fall back to legacy imagePath text field.
  const cover = uploadUrl(p.coverImage) ?? p.imagePath ?? ""
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    date: p.publishedAt,
    author: p.author ?? "Equipa Kriativa",
    tags: arr(p.tags),
    image: cover,
    readTime: p.readTime ?? "",
  }
}

// ---------- Fetch helpers (cached per request via React cache) ----------

type SupportedLocale = "pt" | "en" | "fr"

export const getServices = cache(
  async (locale: SupportedLocale = "pt"): Promise<ServiceItem[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "services",
      sort: "order",
      limit: 50,
      depth: 0,
      locale,
      fallbackLocale: "pt",
    })
    return res.docs.map(mapService)
  }
)

export const getServiceBySlug = cache(
  async (slug: string, locale: SupportedLocale = "pt"): Promise<ServiceItem | null> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      locale,
      fallbackLocale: "pt",
    })
    const doc = res.docs[0]
    return doc ? mapService(doc) : null
  }
)

export const getPortfolioItems = cache(
  async (locale: SupportedLocale = "pt"): Promise<PortfolioItem[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "portfolio",
      sort: "order",
      limit: 100,
      depth: 1,
      locale,
      fallbackLocale: "pt",
    })
    return res.docs.map(mapPortfolio)
  }
)

export const getTestimonials = cache(
  async (locale: SupportedLocale = "pt"): Promise<Testimonial[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 50,
      depth: 1,
      locale,
      fallbackLocale: "pt",
    })
    return res.docs.map(mapTestimonial)
  }
)

export const getPosts = cache(
  async (locale: SupportedLocale = "pt"): Promise<BlogPost[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
      locale,
      fallbackLocale: "pt",
    })
    return res.docs.map(mapPost)
  }
)

export const getPostBySlug = cache(
  async (slug: string, locale: SupportedLocale = "pt"): Promise<BlogPost | null> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale,
      fallbackLocale: "pt",
    })
    const doc = res.docs[0]
    return doc ? mapPost(doc) : null
  }
)
