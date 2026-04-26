import { MetadataRoute } from "next"
import { getServices, getPosts } from "@/lib/content"
import { routing } from "@/i18n/routing"

export const dynamic = "force-dynamic"

const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/servicos", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/encomendar", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.7, changeFrequency: "monthly" as const },
]

const localePrefix = (locale: string) =>
  locale === routing.defaultLocale ? "" : `/${locale}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kriativa.ao"

  const [services, posts] = await Promise.all([getServices(), getPosts()])

  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    const prefix = localePrefix(locale)
    for (const item of staticPaths) {
      entries.push({
        url: `${baseUrl}${prefix}${item.path || "/"}`,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      })
    }
    for (const s of services) {
      entries.push({
        url: `${baseUrl}${prefix}/servicos/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    }
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  return entries
}
