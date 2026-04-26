import { getPayload } from "payload"
import config from "@payload-config"
import { servicesEn } from "./translations/services.en.ts"
import { servicesFr } from "./translations/services.fr.ts"
import { portfolioEn } from "./translations/portfolio.en.ts"
import { portfolioFr } from "./translations/portfolio.fr.ts"
import { testimonialsEn } from "./translations/testimonials.en.ts"
import { testimonialsFr } from "./translations/testimonials.fr.ts"
import { postsEn } from "./translations/posts.en.ts"
import { postsFr } from "./translations/posts.fr.ts"
import type {
  PortfolioTranslation,
  PostTranslation,
  ServiceTranslation,
  TestimonialTranslation,
} from "./translations/types.ts"

type Locale = "en" | "fr"

const servicesByLocale: Record<Locale, Record<string, ServiceTranslation>> = {
  en: servicesEn,
  fr: servicesFr,
}
const portfolioByLocale: Record<Locale, Record<string, PortfolioTranslation>> = {
  en: portfolioEn,
  fr: portfolioFr,
}
const testimonialsByLocale: Record<
  Locale,
  Record<string, TestimonialTranslation>
> = {
  en: testimonialsEn,
  fr: testimonialsFr,
}
const postsByLocale: Record<Locale, Record<string, PostTranslation>> = {
  en: postsEn,
  fr: postsFr,
}

async function run() {
  const payload = await getPayload({ config })

  for (const locale of ["en", "fr"] as const) {
    payload.logger.info(`---- Translating to ${locale.toUpperCase()} ----`)

    // -------- Services --------
    const services = await payload.find({
      collection: "services",
      limit: 50,
      locale: "pt",
      depth: 0,
    })
    for (const svc of services.docs) {
      const t = servicesByLocale[locale][svc.slug]
      if (!t) {
        payload.logger.warn(`No ${locale} translation for service '${svc.slug}'.`)
        continue
      }
      await payload.update({
        collection: "services",
        id: svc.id,
        locale,
        data: {
          title: t.title,
          shortDescription: t.shortDescription,
          description: t.description,
          deliverables: svc.deliverables?.map((row, i) => ({
            value: t.deliverables[i] ?? row.value,
          })),
          pricing: svc.pricing?.map((tier, i) => {
            const tt = t.pricing[i]
            return {
              name: tier.name,
              description: tt?.description ?? tier.description ?? "",
              features: tier.features?.map((feat, j) => ({
                value: tt?.features[j] ?? feat.value,
              })),
              priceMin: tier.priceMin,
              priceMax: tier.priceMax,
              highlight: tier.highlight,
            }
          }),
          priceTable: svc.priceTable?.map((row, i) => ({
            item: t.priceTable[i] ?? row.item,
            min: row.min,
            max: row.max,
          })),
          faq: svc.faq?.map((row, i) => ({
            question: t.faq[i]?.question ?? row.question,
            answer: t.faq[i]?.answer ?? row.answer,
          })),
        },
      })
      payload.logger.info(`  Service '${svc.slug}' → ${locale}`)
    }

    // -------- Portfolio --------
    const portfolio = await payload.find({
      collection: "portfolio",
      limit: 100,
      locale: "pt",
      depth: 0,
    })
    for (const item of portfolio.docs) {
      const t = portfolioByLocale[locale][item.title]
      if (!t) {
        payload.logger.warn(
          `No ${locale} translation for portfolio '${item.title}'.`
        )
        continue
      }
      await payload.update({
        collection: "portfolio",
        id: item.id,
        locale,
        data: {
          title: t.title,
          description: t.description,
        },
      })
      payload.logger.info(`  Portfolio '${item.title}' → ${locale}`)
    }

    // -------- Testimonials --------
    const testimonials = await payload.find({
      collection: "testimonials",
      limit: 50,
      locale: "pt",
      depth: 0,
    })
    for (const item of testimonials.docs) {
      const t = testimonialsByLocale[locale][item.name]
      if (!t) {
        payload.logger.warn(
          `No ${locale} translation for testimonial '${item.name}'.`
        )
        continue
      }
      await payload.update({
        collection: "testimonials",
        id: item.id,
        locale,
        data: {
          role: t.role,
          content: t.content,
        },
      })
      payload.logger.info(`  Testimonial '${item.name}' → ${locale}`)
    }

    // -------- Posts --------
    const posts = await payload.find({
      collection: "posts",
      limit: 100,
      locale: "pt",
      depth: 0,
    })
    for (const post of posts.docs) {
      const t = postsByLocale[locale][post.slug]
      if (!t) {
        payload.logger.warn(`No ${locale} translation for post '${post.slug}'.`)
        continue
      }
      await payload.update({
        collection: "posts",
        id: post.id,
        locale,
        data: {
          title: t.title,
          excerpt: t.excerpt,
          content: t.content,
        },
      })
      payload.logger.info(`  Post '${post.slug}' → ${locale}`)
    }
  }

  payload.logger.info("Translation complete.")
  process.exit(0)
}

run().catch((err) => {
  console.error("Translate failed:", err)
  if (err?.data?.errors) {
    console.error("Validation errors:", JSON.stringify(err.data.errors, null, 2))
  }
  process.exit(1)
})
