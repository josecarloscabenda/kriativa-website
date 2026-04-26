"use client"

import { CheckCircle2, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export function QuestionnaireSubmitted() {
  const t = useTranslations("Questionnaire")
  return (
    <div className="rounded-lg border border-brand-grey-10 bg-white p-10 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-black" />
      <h1 className="mt-4 font-display text-2xl tracking-tight text-black">
        {t("alreadySubmittedTitle")}
      </h1>
      <p className="mt-3 text-sm text-brand-grey-60">{t("alreadySubmittedBody")}</p>
    </div>
  )
}

export function QuestionnaireExpired() {
  const t = useTranslations("Questionnaire")
  return (
    <div className="rounded-lg border border-brand-grey-10 bg-white p-10 text-center">
      <Clock className="mx-auto h-12 w-12 text-brand-grey-40" />
      <h1 className="mt-4 font-display text-2xl tracking-tight text-black">
        {t("expiredTitle")}
      </h1>
      <p className="mt-3 text-sm text-brand-grey-60">{t("expiredBody")}</p>
    </div>
  )
}
