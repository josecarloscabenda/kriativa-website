"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ContactForm() {
  const t = useTranslations("ContactForm")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.nameRequired")),
        email: z.string().email(t("errors.emailInvalid")),
        whatsapp: z.string().optional(),
        subject: z.string().min(2, t("errors.subjectRequired")),
        message: z.string().min(10, t("errors.messageMin")),
      }),
    [t]
  )

  type ContactFormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch {
      // Handle error
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-brand-grey-10">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
            <Check className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-lg tracking-tight text-black">
            {t("sentTitle")}
          </h3>
          <p className="mt-2 text-sm text-brand-grey-60">{t("sentDescription")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-brand-grey-10">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-name">{t("name")} *</Label>
              <Input
                id="contact-name"
                placeholder={t("namePlaceholder")}
                {...register("name")}
                className="mt-1"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contact-email">{t("email")} *</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder={t("emailPlaceholder")}
                {...register("email")}
                className="mt-1"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="contact-whatsapp">{t("whatsapp")}</Label>
              <Input
                id="contact-whatsapp"
                placeholder={t("whatsappPlaceholder")}
                {...register("whatsapp")}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact-subject">{t("subject")} *</Label>
              <Input
                id="contact-subject"
                placeholder={t("subjectPlaceholder")}
                {...register("subject")}
                className="mt-1"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="contact-message">{t("message")} *</Label>
            <Textarea
              id="contact-message"
              placeholder={t("messagePlaceholder")}
              rows={5}
              {...register("message")}
              className="mt-1"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-black text-white hover:bg-brand-grey-90"
          >
            {submitting ? t("sending") : t("send")}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
