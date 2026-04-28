import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getTestimonials } from "@/lib/content"
import type { Locale } from "@/i18n/routing"

export async function Testimonials() {
  const t = await getTranslations("Testimonials")
  const locale = (await getLocale()) as Locale
  const testimonials = await getTestimonials(locale)

  return (
    <section className="bg-brand-grey-05 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-brand-grey-60">{t("subhead")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-brand-grey-10 bg-white">
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-brand-grey-20" />
                <p className="text-sm leading-relaxed text-brand-grey-90">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-brand-grey-10 pt-4">
                  {testimonial.avatar ? (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-black">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-display text-sm font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-black">{testimonial.name}</p>
                    <p className="text-xs text-brand-grey-60">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-brand-grey-40">{t("demoNote")}</p>
      </div>
    </section>
  )
}
