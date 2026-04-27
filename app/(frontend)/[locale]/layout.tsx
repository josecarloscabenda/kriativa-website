import type { Metadata } from "next"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import "../globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/site.config"
import { routing } from "@/i18n/routing"

const gugi = localFont({
  src: "../../../public/fontes/Gugi-Regular.ttf",
  // Path note: from app/(frontend)/[locale]/layout.tsx, three levels up to project root.
  variable: "--font-gugi",
  display: "swap",
  weight: "400",
})

const textMeOne = localFont({
  src: "../../../public/fontes/TextMeOne-Regular.ttf",
  variable: "--font-text-me-one",
  display: "swap",
  weight: "400",
})

const ogLocaleMap: Record<string, string> = {
  pt: "pt_PT",
  en: "en_US",
  fr: "fr_FR",
}

const htmlLangMap: Record<string, string> = {
  pt: "pt-PT",
  en: "en",
  fr: "fr",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      default: "Kriativa — Conectando Mundos | Software, Infra & Cloud em Luanda",
      template: "%s | Kriativa",
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] ?? "pt_PT",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: "Kriativa — Conectando Mundos",
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: "Kriativa — Conectando Mundos",
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={htmlLangMap[locale] ?? locale}>
      <head>
        {siteConfig.analytics.plausibleDomain && (
          <script
            defer
            data-domain={siteConfig.analytics.plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        {siteConfig.analytics.gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${gugi.variable} ${textMeOne.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
