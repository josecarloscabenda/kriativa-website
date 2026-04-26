import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"

interface CTASectionProps {
  title?: string
  description?: string
}

export async function CTASection({ title, description }: CTASectionProps = {}) {
  const t = await getTranslations("CTA")
  const tCommon = await getTranslations("Common")
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src="/simbolo_white.svg"
            alt=""
            width={48}
            height={48}
            className="mx-auto h-10 w-10"
          />
          <p className="mt-6 font-display text-xs uppercase tracking-[0.32em] text-brand-grey-40">
            {tCommon("tagline")}
          </p>
          <h2 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
            {title ?? t("title")}
          </h2>
          <p className="mt-4 text-lg text-brand-grey-20">
            {description ?? t("description")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-brand-grey-10 text-base px-8"
            >
              <Link href="/encomendar">
                {tCommon("ctaQuote")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-base px-8 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {tCommon("ctaWhatsApp")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
