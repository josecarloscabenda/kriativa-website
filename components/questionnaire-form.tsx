"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export interface QuestionOption {
  label: string
  value: string
}

export interface Question {
  key: string
  label: string
  helpText: string | null
  type: string
  required: boolean
  options: QuestionOption[]
}

export interface TemplateForForm {
  title: string
  introMessage: string | null
  thankYouMessage: string | null
  questions: Question[]
}

interface QuestionnaireFormProps {
  token: string
  template: TemplateForForm
  prefilledClient: { name: string; email: string }
}

type AnswerValue = string | string[] | number | null

export function QuestionnaireForm({
  token,
  template,
  prefilledClient,
}: QuestionnaireFormProps) {
  const t = useTranslations("Questionnaire")

  const [clientName, setClientName] = useState(prefilledClient.name)
  const [clientEmail, setClientEmail] = useState(prefilledClient.email)
  const [clientPhone, setClientPhone] = useState("")

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const setAnswer = (key: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    for (const q of template.questions) {
      if (!q.required) continue
      const v = answers[q.key]
      if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) {
        next[q.key] = t("errors.required")
      }
    }
    if (!clientName.trim()) next.__clientName = t("errors.required")
    if (!clientEmail.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(clientEmail)) {
      next.__clientEmail = t("errors.emailInvalid")
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!validate()) return

    setSubmitting(true)
    try {
      const payload = {
        token,
        clientName,
        clientEmail,
        clientPhone,
        answers: template.questions.map((q) => ({
          questionKey: q.key,
          questionLabel: q.label,
          questionType: q.type,
          value: answers[q.key] ?? null,
        })),
      }
      const res = await fetch("/api/questionnaires/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        const code = body?.error ?? "submit_failed"
        setSubmitError(t(`errors.${code}` as never))
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError(t("errors.submit_failed"))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-brand-grey-10 bg-white p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-black" />
        <h1 className="mt-4 font-display text-2xl tracking-tight text-black">
          {t("thanksTitle")}
        </h1>
        <p className="mt-3 text-sm text-brand-grey-60">
          {template.thankYouMessage ?? t("thanksBody")}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="rounded-lg border border-brand-grey-10 bg-white p-8">
        <h1 className="font-display text-2xl tracking-tight text-black sm:text-3xl">
          {template.title}
        </h1>
        {template.introMessage && (
          <p className="mt-3 text-sm leading-relaxed text-brand-grey-60 whitespace-pre-line">
            {template.introMessage}
          </p>
        )}
      </div>

      {/* Client identification */}
      <fieldset className="space-y-4 rounded-lg border border-brand-grey-10 bg-white p-8">
        <legend className="font-display text-sm uppercase tracking-[0.16em] text-brand-grey-60">
          {t("yourDetails")}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="q-client-name">
              {t("clientName")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="q-client-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-1"
            />
            {errors.__clientName && (
              <p className="mt-1 text-xs text-red-500">{errors.__clientName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="q-client-email">
              {t("clientEmail")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="q-client-email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="mt-1"
            />
            {errors.__clientEmail && (
              <p className="mt-1 text-xs text-red-500">{errors.__clientEmail}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="q-client-phone">{t("clientPhone")}</Label>
          <Input
            id="q-client-phone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="+244 9XX XXX XXX"
            className="mt-1"
          />
        </div>
      </fieldset>

      {/* Dynamic questions */}
      <div className="space-y-6 rounded-lg border border-brand-grey-10 bg-white p-8">
        {template.questions.map((q) => (
          <QuestionField
            key={q.key}
            question={q}
            value={answers[q.key]}
            onChange={(v) => setAnswer(q.key, v)}
            error={errors[q.key]}
          />
        ))}
      </div>

      {submitError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-white hover:bg-brand-grey-90"
        size="lg"
      >
        {submitting ? t("submitting") : t("submit")}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

interface QuestionFieldProps {
  question: Question
  value: AnswerValue | undefined
  onChange: (v: AnswerValue) => void
  error?: string
}

function QuestionField({ question, value, onChange, error }: QuestionFieldProps) {
  const t = useTranslations("Questionnaire")
  const id = `q-${question.key}`
  const labelEl = (
    <Label htmlFor={id} className="block">
      {question.label}{" "}
      {question.required && <span className="text-red-500">*</span>}
    </Label>
  )
  const helpEl = question.helpText && (
    <p className="mt-1 text-xs text-brand-grey-60">{question.helpText}</p>
  )
  const errorEl = error && <p className="mt-1 text-xs text-red-500">{error}</p>

  switch (question.type) {
    case "longText":
      return (
        <div>
          {labelEl}
          {helpEl}
          <Textarea
            id={id}
            rows={4}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2"
          />
          {errorEl}
        </div>
      )

    case "shortText":
    case "email":
    case "phone":
      return (
        <div>
          {labelEl}
          {helpEl}
          <Input
            id={id}
            type={question.type === "email" ? "email" : question.type === "phone" ? "tel" : "text"}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2"
          />
          {errorEl}
        </div>
      )

    case "number":
      return (
        <div>
          {labelEl}
          {helpEl}
          <Input
            id={id}
            type="number"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2"
          />
          {errorEl}
        </div>
      )

    case "date":
      return (
        <div>
          {labelEl}
          {helpEl}
          <Input
            id={id}
            type="date"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2"
          />
          {errorEl}
        </div>
      )

    case "yesNo":
      return (
        <div>
          {labelEl}
          {helpEl}
          <div className="mt-2 flex gap-3">
            {["yes", "no"].map((v) => (
              <label
                key={v}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border-2 p-3 text-sm font-medium transition-colors ${
                  value === v
                    ? "border-black bg-black text-white"
                    : "border-brand-grey-10 bg-white text-black hover:border-brand-grey-40"
                }`}
              >
                <input
                  type="radio"
                  name={id}
                  value={v}
                  checked={value === v}
                  onChange={() => onChange(v)}
                  className="sr-only"
                />
                {v === "yes" ? t("yes") : t("no")}
              </label>
            ))}
          </div>
          {errorEl}
        </div>
      )

    case "scale": {
      const current = typeof value === "number" ? value : value ? Number(value) : 0
      return (
        <div>
          {labelEl}
          {helpEl}
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                className={`h-12 w-12 rounded-md border-2 text-sm font-medium transition-colors ${
                  current === n
                    ? "border-black bg-black text-white"
                    : "border-brand-grey-10 bg-white text-black hover:border-brand-grey-40"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          {errorEl}
        </div>
      )
    }

    case "singleChoice":
      return (
        <div>
          {labelEl}
          {helpEl}
          <div className="mt-2 space-y-2">
            {question.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-md border-2 p-3 text-sm transition-colors ${
                  value === opt.value
                    ? "border-black bg-brand-grey-05"
                    : "border-brand-grey-10 bg-white hover:border-brand-grey-40"
                }`}
              >
                <input
                  type="radio"
                  name={id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  className="sr-only"
                />
                <span className="text-black">{opt.label}</span>
              </label>
            ))}
          </div>
          {errorEl}
        </div>
      )

    case "multipleChoice": {
      const arr = Array.isArray(value) ? value : []
      const toggle = (v: string) => {
        if (arr.includes(v)) onChange(arr.filter((x) => x !== v))
        else onChange([...arr, v])
      }
      return (
        <div>
          {labelEl}
          {helpEl}
          <div className="mt-2 space-y-2">
            {question.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-md border-2 p-3 text-sm transition-colors ${
                  arr.includes(opt.value)
                    ? "border-black bg-brand-grey-05"
                    : "border-brand-grey-10 bg-white hover:border-brand-grey-40"
                }`}
              >
                <Checkbox
                  checked={arr.includes(opt.value)}
                  onCheckedChange={() => toggle(opt.value)}
                />
                <span className="text-black">{opt.label}</span>
              </label>
            ))}
          </div>
          {errorEl}
        </div>
      )
    }

    default:
      return null
  }
}
