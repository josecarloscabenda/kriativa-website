import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["pt", "en", "fr"],
  defaultLocale: "pt",
  // Default-locale URLs stay unprefixed: "/" instead of "/pt"
  localePrefix: "as-needed",
})

export type Locale = (typeof routing.locales)[number]
