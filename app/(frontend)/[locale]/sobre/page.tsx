import type { Metadata } from "next"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { CTASection } from "@/components/cta-section"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AboutPage" })
  return {
    title: `${t("title")} | Kriativa`,
    description: t("subhead"),
  }
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("AboutPage")

  const valores = [
    { label: t("valueExcellenceLabel"), description: t("valueExcellenceDescription") },
    { label: t("valueInnovationLabel"), description: t("valueInnovationDescription") },
    {
      label: t("valueCollaborationLabel"),
      description: t("valueCollaborationDescription"),
    },
    { label: t("valueCustomerLabel"), description: t("valueCustomerDescription") },
    {
      label: t("valueResponsibilityLabel"),
      description: t("valueResponsibilityDescription"),
    },
    { label: t("valueLearningLabel"), description: t("valueLearningDescription") },
  ]

  const principios = [
    { label: t("voiceDirectLabel"), description: t("voiceDirectDescription") },
    { label: t("voiceAccessibleLabel"), description: t("voiceAccessibleDescription") },
    { label: t("voiceWarmLabel"), description: t("voiceWarmDescription") },
    { label: t("voiceHonestLabel"), description: t("voiceHonestDescription") },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-grey-10 bg-white py-24 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-[0.05]"
        >
          <svg
            viewBox="0 0 200 200"
            className="aspect-square h-[140%] translate-x-0 translate-y-12"
            preserveAspectRatio="xMidYMid meet"
          >
            {Array.from({ length: 14 }, (_, i) => 7.07 * (i + 1)).map((r) => (
              <circle
                key={r}
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Image
              src="/simbolo_original.svg"
              alt=""
              width={56}
              height={56}
              className="mx-auto h-12 w-12"
            />
            <p className="mt-6 font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("kicker")}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-grey-60">
              {t("subhead")}
            </p>
          </div>
        </div>
      </section>

      {/* Conceito */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("conceptKicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
              {t("conceptTitle")}
            </h2>
            <div className="mt-8 space-y-5 text-brand-grey-90 leading-relaxed">
              <p>{t("conceptP1")}</p>
              <p>{t("conceptP2")}</p>
              <p>{t("conceptP3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão & Visão */}
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-40">
                {t("missionKicker")}
              </p>
              <h2 className="mt-4 font-display text-2xl tracking-tight sm:text-3xl">
                {t("missionTitle")}
              </h2>
              <p className="mt-6 leading-relaxed text-brand-grey-20">
                {t("missionText")}
              </p>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-40">
                {t("visionKicker")}
              </p>
              <h2 className="mt-4 font-display text-2xl tracking-tight sm:text-3xl">
                {t("visionTitle")}
              </h2>
              <p className="mt-6 leading-relaxed text-brand-grey-20">
                {t("visionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("valuesKicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-lg bg-brand-grey-10 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 bg-white p-8 transition-colors hover:bg-brand-grey-05"
              >
                <h3 className="font-display text-lg tracking-tight text-black">
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-brand-grey-60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tom de voz */}
      <section className="bg-brand-grey-05 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("voiceKicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-black sm:text-4xl">
              {t("voiceTitle")}
            </h2>
            <p className="mt-6 text-lg italic leading-relaxed text-brand-grey-60">
              &ldquo;{t("voiceQuote")}&rdquo;
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {principios.map((p) => (
                <div key={p.label}>
                  <dt className="font-display text-sm uppercase tracking-[0.16em] text-black">
                    {p.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-brand-grey-60">
                    {p.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection title={t("ctaTitle")} description={t("ctaDescription")} />
    </>
  )
}
