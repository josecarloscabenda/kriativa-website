import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getPayloadClient } from "@/lib/payload"
import { siteConfig } from "@/site.config"
import { QuestionnaireForm } from "@/components/questionnaire-form"
import { QuestionnaireExpired } from "@/components/questionnaire-status"
import { QuestionnaireSubmitted } from "@/components/questionnaire-status"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Questionário | Kriativa",
  robots: { index: false, follow: false },
}

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const payload = await getPayloadClient()
  const invites = await payload.find({
    collection: "questionnaire-invites",
    where: { token: { equals: token } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const invite = invites.docs[0]

  if (!invite) notFound()

  const locale = hasLocale(routing.locales, invite.locale)
    ? invite.locale
    : routing.defaultLocale
  setRequestLocale(locale)

  const messages = (await import(`@/messages/${locale}.json`)).default

  // Already submitted?
  if (invite.status === "submitted") {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QuestionnaireShell>
          <QuestionnaireSubmitted />
        </QuestionnaireShell>
      </NextIntlClientProvider>
    )
  }

  // Expired?
  if (invite.expiresAt && new Date(invite.expiresAt).getTime() < Date.now()) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QuestionnaireShell>
          <QuestionnaireExpired />
        </QuestionnaireShell>
      </NextIntlClientProvider>
    )
  }

  // Load template in the invite's locale.
  const templateId =
    typeof invite.template === "object" && invite.template !== null
      ? invite.template.id
      : invite.template
  const template = await payload.findByID({
    collection: "questionnaire-templates",
    id: templateId,
    locale,
    fallbackLocale: "pt",
    depth: 0,
    overrideAccess: true,
  })

  if (!template?.active) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QuestionnaireShell>
          <QuestionnaireExpired />
        </QuestionnaireShell>
      </NextIntlClientProvider>
    )
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QuestionnaireShell>
        <QuestionnaireForm
          token={token}
          template={{
            title: template.title,
            introMessage: template.introMessage ?? null,
            thankYouMessage: template.thankYouMessage ?? null,
            questions: (template.questions ?? []).map((q) => ({
              key: q.key,
              label: q.label,
              helpText: q.helpText ?? null,
              type: q.type,
              required: q.required ?? false,
              options: (q.options ?? []).map((o) => ({
                label: o.label,
                value: o.value,
              })),
            })),
          }}
          prefilledClient={{
            name: invite.clientName ?? "",
            email: invite.clientEmail ?? "",
          }}
        />
      </QuestionnaireShell>
    </NextIntlClientProvider>
  )
}

function QuestionnaireShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-grey-05">
      <header className="border-b border-brand-grey-10 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-5 sm:px-6">
          <Image
            src="/simbolo_original.svg"
            alt=""
            width={32}
            height={32}
            className="h-7 w-7"
          />
          <Image
            src="/lettering_original.svg"
            alt={siteConfig.name}
            width={140}
            height={28}
            className="h-5 w-auto"
          />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </main>
      <footer className="border-t border-brand-grey-10 bg-white py-6 text-center text-xs text-brand-grey-60">
        &copy; {new Date().getFullYear()} {siteConfig.name} — {siteConfig.tagline}
      </footer>
    </div>
  )
}
