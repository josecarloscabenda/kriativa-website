import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingTable, PriceRangeTable } from "@/components/pricing-table"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTASection } from "@/components/cta-section"
import { Link } from "@/i18n/navigation"
import { getServiceBySlug } from "@/lib/content"
import { siteConfig } from "@/site.config"
import type { Locale } from "@/i18n/routing"

export const dynamic = "force-dynamic"

// No generateStaticParams: page is force-dynamic, so paths are resolved on
// demand. Avoids hitting Supabase during the Vercel build.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const service = await getServiceBySlug(slug, locale)
  if (!service) return {}
  return {
    title: `${service.title} | Kriativa`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Kriativa`,
      description: service.shortDescription,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const service = await getServiceBySlug(slug, locale)
  if (!service) notFound()

  const t = await getTranslations("ServiceDetail")
  const tCommon = await getTranslations("Common")
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand-grey-10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/servicos"
              className="mb-6 inline-flex items-center text-sm text-brand-grey-60 hover:text-black"
            >
              &larr; {t("back")}
            </Link>
            <div className="flex items-start gap-6">
              <Image
                src={service.icon}
                alt=""
                width={72}
                height={72}
                className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
              />
              <div>
                <h1 className="font-display text-4xl tracking-tight text-black sm:text-5xl">
                  {service.title}
                </h1>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-brand-grey-60">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-black text-white hover:bg-brand-grey-90">
                <Link href="/encomendar">{tCommon("ctaQuote")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-black text-black hover:bg-brand-grey-05"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {tCommon("ctaWhatsApp")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("deliverablesKicker")}
            </p>
            <h2 className="mt-4 font-display text-2xl tracking-tight text-black sm:text-3xl">
              {t("deliverablesTitle")}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span className="text-sm text-black">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-brand-grey-05 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("stackKicker")}
            </p>
            <h2 className="mt-4 font-display text-2xl tracking-tight text-black sm:text-3xl">
              {t("stackTitle")}
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-brand-grey-20 bg-white px-3 py-1 text-sm text-black"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      {service.pricing.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
                {t("pricingKicker")}
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
                {t("pricingTitle")}
              </h2>
              <p className="mt-4 text-brand-grey-60">{t("pricingSubhead")}</p>
            </div>
            <div className="mt-12">
              <PricingTable tiers={service.pricing} />
            </div>
            <p className="mt-6 text-center text-xs text-brand-grey-40">
              {tCommon("priceDisclaimer")}
            </p>
          </div>
        </section>
      )}

      {/* Price Range Table */}
      <section className="bg-brand-grey-05 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("priceTableKicker")}
            </p>
            <h2 className="mt-4 mb-8 font-display text-2xl tracking-tight text-black sm:text-3xl">
              {t("priceTableTitle")}
            </h2>
            <PriceRangeTable items={service.priceTable} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("faqKicker")}
            </p>
            <h2 className="mt-4 mb-10 font-display text-2xl tracking-tight text-black sm:text-3xl">
              {t("faqTitle")}
            </h2>
            <FAQAccordion items={service.faq} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
