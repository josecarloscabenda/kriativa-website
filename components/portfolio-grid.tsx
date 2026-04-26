"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/lib/format"

const filterCategories = [
  "all",
  "Website",
  "App Mobile",
  "App Desktop",
  "Sistema",
  "Infra & Cloud",
] as const

interface PortfolioGridProps {
  items: PortfolioItem[]
  limit?: number
}

export function PortfolioGrid({ items, limit }: PortfolioGridProps) {
  const t = useTranslations("PortfolioSection")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const labelFor = (cat: string) => {
    switch (cat) {
      case "all":
        return t("filterAll")
      case "Website":
        return t("categoryWebsite")
      case "App Mobile":
        return t("categoryAppMobile")
      case "App Desktop":
        return t("categoryAppDesktop")
      case "Sistema":
        return t("categorySistema")
      case "Infra & Cloud":
        return t("categoryInfraCloud")
      default:
        return cat
    }
  }

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory)

  const visible = limit ? filtered.slice(0, limit) : filtered

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filterCategories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={
              activeCategory === cat ? "bg-black hover:bg-brand-grey-90" : ""
            }
          >
            {labelFor(cat)}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden border-brand-grey-10 transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video bg-linear-to-br from-brand-grey-10 to-brand-grey-05">
              {item.confidential ? (
                <div className="flex h-full items-center justify-center">
                  <Lock className="h-12 w-12 text-brand-grey-40" />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center font-display text-4xl font-bold text-brand-grey-40">
                  {item.title.charAt(0)}
                </div>
              )}
            </div>
            <CardContent className="pt-4">
              <Badge variant="secondary" className="mb-2 text-xs">
                {labelFor(item.category)}
              </Badge>
              <h3 className="font-display text-base tracking-tight text-black">
                {item.confidential ? t("confidentialTitle") : item.title}
              </h3>
              <p className="mt-1 text-sm text-brand-grey-60">
                {item.confidential ? t("confidentialDescription") : item.description}
              </p>
              {!item.confidential && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
