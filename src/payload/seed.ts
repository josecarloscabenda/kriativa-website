import { getPayload } from "payload"
import config from "@payload-config"
import { services as servicesData } from "../../data/services.ts"
import { portfolioItems } from "../../data/portfolio.ts"
import { testimonials as testimonialsData } from "../../data/testimonials.ts"
import { blogPosts } from "../../data/blog.ts"

/**
 * Idempotent seed: skips entries whose slug/identifier already exists.
 * Run with: npx payload run src/payload/seed.ts
 */
async function run() {
  const payload = await getPayload({ config })

  // ---- Services ----
  for (let i = 0; i < servicesData.length; i++) {
    const s = servicesData[i]
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`Service '${s.slug}' already exists — skipping.`)
      continue
    }

    await payload.create({
      collection: "services",
      data: {
        slug: s.slug,
        order: i,
        title: s.title,
        shortDescription: s.shortDescription,
        description: s.description,
        icon: s.icon,
        startingPrice: s.startingPrice,
        deliverables: s.deliverables.map((value) => ({ value })),
        technologies: s.technologies.map((value) => ({ value })),
        pricing: s.pricing.map((tier) => ({
          name: tier.name,
          description: tier.description,
          features: tier.features.map((value) => ({ value })),
          priceMin: tier.priceRange.min,
          priceMax: tier.priceRange.max,
          highlight: tier.highlight ?? false,
        })),
        priceTable: s.priceTable.map((row) => ({
          item: row.item,
          min: row.min,
          max: row.max,
        })),
        faq: s.faq.map((row) => ({
          question: row.question,
          answer: row.answer,
        })),
      },
    })
    payload.logger.info(`Service '${s.slug}' created.`)
  }

  // ---- Portfolio ----
  for (let i = 0; i < portfolioItems.length; i++) {
    const p = portfolioItems[i]
    const existing = await payload.find({
      collection: "portfolio",
      where: { title: { equals: p.title } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`Portfolio '${p.title}' already exists — skipping.`)
      continue
    }

    const categoryMap: Record<string, "website" | "app-mobile" | "app-desktop"> = {
      Website: "website",
      "App Mobile": "app-mobile",
      "App Desktop": "app-desktop",
    }

    await payload.create({
      collection: "portfolio",
      data: {
        title: p.title,
        description: p.description,
        category: categoryMap[p.category] ?? "website",
        tags: p.tags.map((value) => ({ value })),
        url: p.url,
        confidential: p.confidential ?? false,
        order: i,
      },
    })
    payload.logger.info(`Portfolio '${p.title}' created.`)
  }

  // ---- Testimonials ----
  for (let i = 0; i < testimonialsData.length; i++) {
    const t = testimonialsData[i]
    const existing = await payload.find({
      collection: "testimonials",
      where: { name: { equals: t.name } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`Testimonial '${t.name}' already exists — skipping.`)
      continue
    }

    await payload.create({
      collection: "testimonials",
      data: {
        name: t.name,
        role: t.role,
        company: t.company,
        content: t.content,
        order: i,
      },
    })
    payload.logger.info(`Testimonial '${t.name}' created.`)
  }

  // ---- Posts ----
  for (const p of blogPosts) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      payload.logger.info(`Post '${p.slug}' already exists — skipping.`)
      continue
    }

    await payload.create({
      collection: "posts",
      data: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        imagePath: p.image,
        tags: p.tags.map((value) => ({ value })),
        author: p.author,
        readTime: p.readTime,
        publishedAt: new Date(p.date).toISOString(),
      },
    })
    payload.logger.info(`Post '${p.slug}' created.`)
  }

  payload.logger.info("Seed complete.")
  process.exit(0)
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
