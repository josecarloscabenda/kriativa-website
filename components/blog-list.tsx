"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Search, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { BlogPost } from "@/lib/format"

interface BlogListProps {
  posts: BlogPost[]
}

const localeMap: Record<string, string> = {
  pt: "pt-PT",
  en: "en-US",
  fr: "fr-FR",
}

export function BlogList({ posts }: BlogListProps) {
  const t = useTranslations("BlogPage")
  const locale = useLocale()
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts]
  )

  const filtered = posts.filter((post) => {
    const matchesSearch =
      search === "" || post.title.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !activeTag || post.tags.includes(activeTag)
    return matchesSearch && matchesTag
  })

  return (
    <div>
      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-grey-40" />
          <Input
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(null)}
            className={activeTag === null ? "bg-black hover:bg-brand-grey-90" : ""}
          >
            {t("all")}
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={activeTag === tag ? "bg-black hover:bg-brand-grey-90" : ""}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-brand-grey-60">{t("empty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Card
              key={post.slug}
              className="group flex flex-col overflow-hidden border-brand-grey-10 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-linear-to-br from-brand-grey-10 to-brand-grey-05">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-4xl font-bold text-brand-grey-40">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="flex flex-1 flex-col pt-4">
                <div className="flex items-center gap-2 text-xs text-brand-grey-60">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(localeMap[locale] ?? "pt-PT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.readTime && (
                    <>
                      <span>&middot;</span>
                      <span>{t("minRead", { minutes: post.readTime })}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-display text-base tracking-tight text-black transition-colors group-hover:text-brand-grey-60">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-brand-grey-60">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-4 -ml-2 w-fit text-black hover:bg-brand-grey-05"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {t("readArticle")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
