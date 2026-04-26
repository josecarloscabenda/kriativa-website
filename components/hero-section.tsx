import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { ArrowRight, MessageCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"

export async function HeroSection() {
  const t = await getTranslations("Hero")
  const tCommon = await getTranslations("Common")
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <section className="relative overflow-hidden border-b border-brand-grey-10 bg-white">
      {/* Concentric circles pattern — brand visual signature, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-[0.06]"
      >
        <svg
          viewBox="0 0 200 200"
          className="aspect-square h-[140%] translate-x-0 translate-y-8"
          preserveAspectRatio="xMidYMid meet"
        >
          {Array.from({ length: 14 }, (_, i) => 7.07 * (i + 1)).map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Image
            src="/logo_original.svg"
            alt={`${siteConfig.name} — ${tCommon("tagline")}`}
            width={720}
            height={405}
            className="mx-auto h-auto w-full max-w-md sm:max-w-lg lg:max-w-2xl"
            priority
          />

          <h1 className="mt-12 font-display text-3xl tracking-tight text-black sm:text-4xl lg:text-5xl">
            {t("headlineLead")}{" "}
            <span className="text-brand-grey-60">{t("headlineTail")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-grey-60 sm:text-xl">
            {t("subhead")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-brand-grey-90 text-base px-8">
              <Link href="/encomendar">
                <Briefcase className="mr-2 h-5 w-5" />
                {tCommon("ctaQuote")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 border-black text-black hover:bg-brand-grey-05">
              <Link href="/servicos">
                {t("ctaPortfolio")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-base px-8 text-black hover:bg-brand-grey-05">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("ctaTalk")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
