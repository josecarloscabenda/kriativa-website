import { getTranslations } from "next-intl/server"

export async function ValueProposition() {
  const t = await getTranslations("ValueProposition")

  const points = [
    { number: "01", title: t("p1Title"), description: t("p1Description") },
    { number: "02", title: t("p2Title"), description: t("p2Description") },
    { number: "03", title: t("p3Title"), description: t("p3Description") },
    { number: "04", title: t("p4Title"), description: t("p4Description") },
  ]

  return (
    <section className="bg-white py-24">
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

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg bg-brand-grey-10 sm:grid-cols-2">
          {points.map((point) => (
            <div
              key={point.number}
              className="flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-brand-grey-05"
            >
              <span className="font-display text-sm tracking-[0.2em] text-brand-grey-40">
                {point.number}
              </span>
              <h3 className="font-display text-xl tracking-tight text-black">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-grey-60">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
