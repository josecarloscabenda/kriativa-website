import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { StepperForm } from "@/components/stepper-form"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "OrderPage" })
  return {
    title: `${t("title")} | Kriativa`,
    description: t("subhead"),
  }
}

export default async function EncomendarPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("OrderPage")

  return (
    <>
      <section className="border-b border-brand-grey-10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-brand-grey-60">
              {t("kicker")}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-brand-grey-60">{t("subhead")}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-grey-05 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepperForm />
        </div>
      </section>
    </>
  )
}
