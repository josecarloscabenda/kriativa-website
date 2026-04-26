import type { Metadata } from "next"
import Image from "next/image"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/site.config"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ContactPage" })
  return {
    title: `${t("title")} | Kriativa`,
    description: t("subhead"),
  }
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("ContactPage")
  const tCommon = await getTranslations("Common")
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <>
      <section className="border-b border-brand-grey-10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Image
              src="/simbolo_original.svg"
              alt=""
              width={48}
              height={48}
              className="mx-auto h-10 w-10"
            />
            <p className="mt-6 font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("kicker")}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-brand-grey-60">{t("subhead")}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* Contact form */}
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
                {t("formKicker")}
              </p>
              <h2 className="mt-3 mb-8 font-display text-2xl tracking-tight text-black sm:text-3xl">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-6">
              <Card className="border-brand-grey-10">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg tracking-tight text-black">
                    {t("infoTitle")}
                  </h3>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                      <div>
                        <p className="text-sm font-medium text-black">{t("infoEmail")}</p>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-sm text-brand-grey-60 hover:text-black"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                      <div>
                        <p className="text-sm font-medium text-black">{t("infoPhone")}</p>
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="text-sm text-brand-grey-60 hover:text-black"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-black" />
                      <div>
                        <p className="text-sm font-medium text-black">
                          {t("infoLocation")}
                        </p>
                        <p className="text-sm text-brand-grey-60">
                          {siteConfig.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-black bg-black text-white">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg tracking-tight">
                    {t("quickTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-brand-grey-20">
                    {t("quickDescription")}
                  </p>
                  <Button
                    asChild
                    className="mt-5 w-full bg-white text-black hover:bg-brand-grey-10"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {tCommon("ctaWhatsApp")}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-brand-grey-10">
                <CardContent className="pt-6">
                  <h3 className="font-display text-lg tracking-tight text-black">
                    {t("socialTitle")}
                  </h3>
                  <div className="mt-4 flex flex-col gap-1">
                    {Object.entries(siteConfig.social).map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-brand-grey-60 transition-colors hover:bg-brand-grey-05 hover:text-black"
                      >
                        <span className="font-medium capitalize">{name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
