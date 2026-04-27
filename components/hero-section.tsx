import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { ArrowRight, MessageCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"
import { CosmicBackground } from "@/components/cosmic-background"

/**
 * 🎨 HERO SIZES — adjust these to resize the logo on the homepage.
 * SYMBOL_SIZE controls the round dot (px). LETTERING_MAX_WIDTH controls
 * the KRIATIVA wordmark below it (Tailwind classes).
 */
const SYMBOL_SIZE_CLASS = "h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
const LETTERING_MAX_WIDTH_CLASS = "max-w-xs sm:max-w-sm lg:max-w-md"

export async function HeroSection() {
  const t = await getTranslations("Hero")
  const tCommon = await getTranslations("Common")
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <section className="relative overflow-hidden border-b border-brand-grey-10 bg-white">
      {/* Animated cosmic background — concentric rings + scattered dots */}
      <CosmicBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo lockup — symbol (interactive) + lettering + tagline */}
          <a
            href="#hero-anchor"
            className="group relative mx-auto flex w-fit flex-col items-center"
            aria-label={`${siteConfig.name} — ${tCommon("tagline")}`}
            id="hero-anchor"
          >
            {/* Backdrop circle that appears on hover so the white symbol stays visible */}
            <span
              aria-hidden
              className={`absolute top-0 ${SYMBOL_SIZE_CLASS} rounded-full bg-black scale-0 group-hover:scale-110 transition-transform duration-500 ease-out`}
            />

            {/* The animated dot (mask-based so we can flip background-color on hover) */}
            <span
              aria-hidden
              className={`relative ${SYMBOL_SIZE_CLASS} bg-black group-hover:bg-white transition-[background-color,transform] duration-500 ease-out group-hover:rotate-180`}
              style={{
                WebkitMaskImage: "url(/simbolo_original.svg)",
                maskImage: "url(/simbolo_original.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />

            {/* KRIATIVA wordmark + tagline (static SVG that already includes both) */}
            <Image
              src="/lettering_original.svg"
              alt={siteConfig.name}
              width={720}
              height={203}
              priority
              className={`mt-6 sm:mt-8 h-auto w-full ${LETTERING_MAX_WIDTH_CLASS}`}
            />
          </a>

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
