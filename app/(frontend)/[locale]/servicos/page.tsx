import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

export const dynamic = "force-dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CTASection } from "@/components/cta-section"
import { Link } from "@/i18n/navigation"
import { getServices, formatPrice } from "@/lib/content"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ServicesPage" })
  return {
    title: `${t("title")} | Kriativa`,
    description: t("subhead"),
  }
}

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("ServicesPage")
  const tCommon = await getTranslations("Common")
  const services = await getServices(locale)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand-grey-10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("kicker")}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-grey-60">
              {t("subhead")}
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-brand-grey-05 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group flex flex-col border-brand-grey-10 bg-white transition-colors hover:border-black"
              >
                <CardContent className="flex flex-1 flex-col p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center">
                    <Image
                      src={service.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16"
                    />
                  </div>
                  <h2 className="font-display text-xl tracking-tight text-black">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-grey-60">
                    {service.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.deliverables.slice(0, 4).map((d) => (
                      <Badge
                        key={d}
                        variant="secondary"
                        className="bg-brand-grey-05 text-xs text-black"
                      >
                        {d}
                      </Badge>
                    ))}
                    {service.deliverables.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        {t("deliverablesMore", { count: service.deliverables.length - 4 })}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-brand-grey-10 pt-5">
                    {service.startingPrice > 0 ? (
                      <span className="text-xs text-brand-grey-60">
                        {tCommon("priceFrom")}{" "}
                        <span className="font-medium text-black">
                          {formatPrice(service.startingPrice)}
                        </span>
                        *
                      </span>
                    ) : (
                      <span className="text-xs text-brand-grey-60">
                        {tCommon("priceOnRequest")}
                      </span>
                    )}
                    <Button
                      asChild
                      variant="ghost"
                      className="text-black hover:bg-brand-grey-05"
                    >
                      <Link href={`/servicos/${service.slug}`}>
                        {tCommon("ctaSeeDetails")}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-brand-grey-40">
            {tCommon("priceDisclaimer")}
          </p>
        </div>
      </section>

      <CTASection />
    </>
  )
}
