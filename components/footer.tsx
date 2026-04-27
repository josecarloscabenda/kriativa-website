import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Mail, Phone, MapPin } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"

export async function Footer() {
  const t = await getTranslations("Footer")

  const footerLinks = {
    servicos: [
      { label: t("linkServiceDevelopment"), href: "/servicos/desenvolvimento" as const },
      { label: t("linkServiceInfra"), href: "/servicos/infra-cloud" as const },
      { label: t("linkServiceCommerce"), href: "/servicos/comercio" as const },
    ],
    empresa: [
      { label: t("linkAbout"), href: "/sobre" as const },
      { label: t("linkPortfolio"), href: "/portfolio" as const },
      { label: t("linkBlog"), href: "/blog" as const },
      { label: t("linkContact"), href: "/contacto" as const },
    ],
  }

  return (
    <footer className="border-t border-black bg-black text-brand-grey-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            {/*
              🎨 FOOTER LOGO SIZE — change h-8 below to resize the wordmark.
              Tailwind heights: h-6 (24px) · h-7 (28px) · h-8 (32px) · h-10 (40px)
            */}
            <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
              <Image
                src="/lettering_white.svg"
                alt={siteConfig.name}
                width={180}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-40">
              {t("tagline")}
            </p>
            <p className="text-sm leading-relaxed text-brand-grey-20">{t("summary")}</p>
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-brand-grey-60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-grey-20 transition-colors hover:border-white hover:text-white"
                  aria-label={name}
                >
                  {name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-grey-20 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              {t("companyTitle")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-grey-20 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-brand-grey-20">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-brand-grey-20">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-brand-grey-20">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-grey-90 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-brand-grey-60">
              &copy; {t("rights", { year: new Date().getFullYear(), brand: siteConfig.name })}
            </p>
            <p className="text-xs text-brand-grey-60">{siteConfig.priceDisclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
