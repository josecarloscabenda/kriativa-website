import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { getServices } from "@/lib/content"
import type { Locale } from "@/i18n/routing"

export async function ServiceCards() {
  const t = await getTranslations("ServiceCards")
  const tCommon = await getTranslations("Common")
  const locale = (await getLocale()) as Locale
  const services = await getServices(locale)

  return (
    <section className="bg-brand-grey-05 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
            {t("title")}
          </h2>
          <p
            className="mt-4 text-lg text-brand-grey-60 [&_em]:not-italic"
            dangerouslySetInnerHTML={{ __html: t.raw("subhead") as string }}
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
                <h3 className="font-display text-xl tracking-tight text-black">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-grey-60">
                  {service.shortDescription}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2 border-t border-brand-grey-10 pt-5">
                  {service.deliverables.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-6 w-full justify-between text-black hover:bg-brand-grey-05"
                >
                  <Link href={`/servicos/${service.slug}`}>
                    {tCommon("ctaSeeDetails")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
