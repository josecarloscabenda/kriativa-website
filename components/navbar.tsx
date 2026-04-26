"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/site.config"

export function Navbar() {
  const t = useTranslations("Nav")
  const tCommon = useTranslations("Common")
  const [open, setOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  const navigation = [
    { key: "home", href: "/" as const },
    { key: "services", href: "/servicos" as const },
    { key: "portfolio", href: "/portfolio" as const },
    { key: "blog", href: "/blog" as const },
    { key: "about", href: "/sobre" as const },
    { key: "contact", href: "/contacto" as const },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-grey-10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} — ${siteConfig.tagline}`}>
          <Image
            src="/simbolo_original.svg"
            alt=""
            width={36}
            height={36}
            className="h-8 w-8"
            priority
          />
          <Image
            src="/lettering_original.svg"
            alt={siteConfig.name}
            width={160}
            height={36}
            className="hidden h-6 w-auto sm:block"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-grey-90 transition-colors hover:bg-brand-grey-05 hover:text-black"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm">
            <Link href="/encomendar">{tCommon("ctaQuote")}</Link>
          </Button>
          <Button asChild size="sm" className="bg-black text-white hover:bg-brand-grey-90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {tCommon("ctaWhatsAppShort")}
            </a>
          </Button>
        </div>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">{t("menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
            <div className="flex flex-col gap-4 pt-8">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-brand-grey-90 transition-colors hover:bg-brand-grey-05 hover:text-black"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-brand-grey-10 pt-4">
                <LanguageSwitcher />
                <Button asChild variant="outline">
                  <Link href="/encomendar" onClick={() => setOpen(false)}>
                    {tCommon("ctaQuote")}
                  </Link>
                </Button>
                <Button asChild className="bg-black text-white hover:bg-brand-grey-90">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {tCommon("ctaWhatsApp")}
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
