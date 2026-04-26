"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher")
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const change = (next: string) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale })
    })
  }

  return (
    <label className="relative inline-flex items-center" aria-label={t("label")}>
      <Languages className="pointer-events-none absolute left-2 h-4 w-4 text-brand-grey-60" />
      <select
        value={locale}
        onChange={(e) => change(e.target.value)}
        disabled={isPending}
        className="appearance-none rounded-md border border-brand-grey-10 bg-white py-1.5 pl-7 pr-2 text-xs font-medium uppercase tracking-wider text-brand-grey-90 transition-colors hover:border-black focus:outline-none focus:ring-1 focus:ring-black"
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  )
}
