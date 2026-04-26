import { ArrowRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

export const dynamic = "force-dynamic"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { ServiceCards } from "@/components/service-cards"
import { ValueProposition } from "@/components/value-proposition"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Link } from "@/i18n/navigation"
import { getPortfolioItems } from "@/lib/content"
import type { Locale } from "@/i18n/routing"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("PortfolioSection")
  const portfolio = await getPortfolioItems(locale)

  return (
    <>
      <HeroSection />
      <ServiceCards />
      <ValueProposition />

      {/* Portfolio section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("kicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
              {t("homeTitle")}
            </h2>
            <p className="mt-4 text-lg text-brand-grey-60">{t("homeSubhead")}</p>
          </div>
          <div className="mt-12">
            <PortfolioGrid items={portfolio} limit={6} />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-brand-grey-05">
              <Link href="/portfolio">
                {t("ctaSeeAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />

      <CTASection />
    </>
  )
}
