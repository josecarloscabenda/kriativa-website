export const siteConfig = {
  name: "Kriativa",
  tagline: "Conectando Mundos",
  description:
    "Empresa angolana de desenvolvimento de software e infra-estrutura tecnológica. Soluções de padrão internacional, executadas com sensibilidade local.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kriativa.ao",
  ogImage: "/og-image.png",
  locale: "pt-PT",
  currency: "Kz",
  location: "Luanda, Angola",

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "geral@kriativa.ao",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+244900000000",
    phone: process.env.NEXT_PUBLIC_PHONE || "+244900000000",
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/kriativa",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "https://facebook.com/kriativa",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "https://linkedin.com/company/kriativa",
    twitter: process.env.NEXT_PUBLIC_TWITTER || "https://twitter.com/kriativa",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || "https://youtube.com/@kriativa",
  },

  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },

  api: {
    emailProvider: process.env.EMAIL_PROVIDER || "nodemailer",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: process.env.SMTP_PORT || "587",
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    webhookUrl: process.env.WEBHOOK_URL || "",
  },

  priceDisclaimer:
    "Valores estimados; sujeito a briefing e validação. Estimativas baseadas em mercado; valor final depende de briefing.",
} as const

export type SiteConfig = typeof siteConfig
