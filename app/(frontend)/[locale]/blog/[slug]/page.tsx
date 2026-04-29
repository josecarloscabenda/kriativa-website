import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Clock, Calendar } from "lucide-react"
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { getPostBySlug } from "@/lib/content"
import { siteConfig } from "@/site.config"
import type { Locale } from "@/i18n/routing"

export const dynamic = "force-dynamic"

const localeMap: Record<string, string> = {
  pt: "pt-PT",
  en: "en-US",
  fr: "fr-FR",
}

// No generateStaticParams: page is force-dynamic, so paths are resolved on
// demand. Avoids hitting Supabase during the Vercel build (which was tripping
// the Session pooler's max client limit).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) return {}
  return {
    title: `${post.title} | Blog Kriativa`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()

  const t = await getTranslations("BlogPost")
  const tCommon = await getTranslations("Common")
  const currentLocale = await getLocale()
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}`

  return (
    <article className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="mx-auto max-w-3xl lg:mx-0">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-sm text-brand-grey-60 hover:text-black"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t("back")}
            </Link>

            <header>
              <div className="flex flex-wrap items-center gap-3 text-sm text-brand-grey-60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString(
                    localeMap[currentLocale] ?? "pt-PT",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {t("minRead", { minutes: post.readTime })}
                  </span>
                )}
              </div>
              <h1 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
                {post.title}
              </h1>

              {post.image && (
                <div className="relative mt-8 aspect-video overflow-hidden rounded-lg border border-brand-grey-10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-sm text-brand-grey-60">
                {t("byAuthor", { author: post.author })}
              </p>
            </header>

            {/* Article content (markdown light renderer) */}
            <div className="prose prose-gray mt-8 max-w-none prose-headings:font-display prose-h2:text-2xl prose-h3:text-xl prose-a:text-black prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-blockquote:border-l-black prose-blockquote:bg-brand-grey-05 prose-blockquote:py-1 prose-blockquote:pr-4">
              {post.content.split("\n").map((line, i) => {
                const trimmed = line.trim()
                if (!trimmed) return null

                if (trimmed.startsWith("## ")) return <h2 key={i}>{trimmed.slice(3)}</h2>
                if (trimmed.startsWith("### ")) return <h3 key={i}>{trimmed.slice(4)}</h3>
                if (trimmed.startsWith("#### "))
                  return (
                    <h4 key={i} className="text-lg font-semibold">
                      {trimmed.slice(5)}
                    </h4>
                  )
                if (trimmed.startsWith("> "))
                  return (
                    <blockquote key={i}>
                      <p>{trimmed.slice(2).replace(/\*\*/g, "")}</p>
                    </blockquote>
                  )
                if (trimmed.startsWith("- "))
                  return <li key={i}>{trimmed.slice(2).replace(/\*\*/g, "")}</li>
                if (/^\d+\./.test(trimmed))
                  return (
                    <li key={i}>
                      {trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                    </li>
                  )
                if (trimmed.startsWith("|")) return null

                return <p key={i}>{trimmed.replace(/\*\*/g, "")}</p>
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <Card className="border-brand-grey-10">
                <CardContent className="pt-6">
                  <h3 className="font-display text-sm tracking-tight text-black">
                    {t("sidebarHelpTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-brand-grey-60">
                    {t("sidebarHelpDescription")}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild size="sm" className="bg-black text-white hover:bg-brand-grey-90">
                      <Link href="/encomendar">{tCommon("ctaQuote")}</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {tCommon("ctaWhatsAppShort")}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-grey-10">
                <CardContent className="pt-6">
                  <h3 className="font-display text-sm tracking-tight text-black">
                    {t("sidebarTags")}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
