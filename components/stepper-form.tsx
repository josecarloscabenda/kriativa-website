"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Send, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  calculateEstimate,
  projectTypeLabels,
  complexityLabels,
  urgencyLabels,
  projectFeatures,
  type ProjectType,
  type Complexity,
  type Urgency,
} from "@/lib/estimator"
import { formatPriceRange } from "@/lib/format"

const schema = z.object({
  projectType: z.enum([
    "website",
    "ecommerce",
    "app-mobile",
    "sistema",
    "infra-cloud",
    "comercio",
  ]),
  objective: z.string().min(1, "Indique o objectivo do projecto"),
  objectiveDetails: z.string().optional(),
  features: z.array(z.string()).min(1, "Selecione pelo menos uma funcionalidade"),
  complexity: z.enum(["basico", "medio", "avancado"]),
  urgency: z.enum(["normal", "urgente"]),
  deadline: z.string().min(1, "Selecione um prazo"),
  references: z.string().optional(),
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  contactPreference: z.enum(["whatsapp", "email"]),
  whatsapp: z.string().optional(),
  paymentPreference: z.string().optional(),
  briefingFile: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const objectives = [
  "Criar presença online",
  "Vender produtos / serviços online",
  "Automatizar processos internos",
  "Profissionalizar a operação (CRM / ERP)",
  "Modernizar a infra-estrutura",
  "Migrar para a cloud",
  "Adquirir equipamento",
  "Outro",
]

const deadlines = [
  "2-3 semanas",
  "1 mês",
  "2 meses",
  "3+ meses",
  "Sem pressa",
  "Urgente (< 2 semanas)",
]

const paymentOptions = [
  "Transferência bancária",
  "Referência Multicaixa",
  "Multicaixa Express",
  "A combinar",
]

const STEPS = [
  "Tipo de Projeto",
  "Objectivo",
  "Funcionalidades",
  "Prazo e Detalhes",
  "Contacto",
  "Resumo",
]

export function StepperForm() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "website",
      objective: "",
      objectiveDetails: "",
      features: [],
      complexity: "basico",
      urgency: "normal",
      deadline: "",
      references: "",
      name: "",
      email: "",
      contactPreference: "whatsapp",
      whatsapp: "",
      paymentPreference: "",
      briefingFile: "",
    },
  })

  const projectType = form.watch("projectType")
  const complexity = form.watch("complexity")
  const urgency = form.watch("urgency")
  const selectedFeatures = form.watch("features")
  const estimate = calculateEstimate(
    projectType as ProjectType,
    complexity as Complexity,
    urgency as Urgency
  )

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!projectType
      case 1:
        return !!form.watch("objective")
      case 2:
        return selectedFeatures.length > 0
      case 3:
        return !!form.watch("deadline")
      case 4:
        return !!form.watch("name") && !!form.watch("email")
      default:
        return true
    }
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          estimateMin: estimate.min,
          estimateMax: estimate.max,
          submittedAt: new Date().toISOString(),
        }),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch {
      // Handle error silently for now
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-2xl border-brand-grey-10">
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-display text-2xl tracking-tight text-black sm:text-3xl">
            Pedido recebido.
          </h3>
          <p className="mt-4 text-brand-grey-60">
            Vamos analisar o briefing e responder em menos de 24 horas úteis com proposta
            clara e prazo realista.
          </p>
          <p className="mt-2 text-sm text-brand-grey-40">
            Estimativa indicativa: {formatPriceRange(estimate.min, estimate.max)}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  i <= step
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-full ${
                    i < step ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm font-medium text-gray-700">
          {STEPS[step]}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 0: Project Type */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Que tipo de projecto precisa?</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Object.entries(projectTypeLabels) as [ProjectType, string][]).map(
                    ([value, label]) => (
                      <label
                        key={value}
                        className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-colors ${
                          projectType === value
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-200"
                        }`}
                      >
                        <input
                          type="radio"
                          value={value}
                          {...form.register("projectType")}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Objective */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Qual é o objectivo do projecto?</h3>
                <div className="grid gap-2">
                  {objectives.map((obj) => (
                    <label
                      key={obj}
                      className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-colors ${
                        form.watch("objective") === obj
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value={obj}
                        {...form.register("objective")}
                        className="sr-only"
                      />
                      <span className="text-sm">{obj}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <Label htmlFor="objectiveDetails">Detalhes adicionais (opcional)</Label>
                  <Textarea
                    id="objectiveDetails"
                    placeholder="Descreva mais sobre o que pretende..."
                    {...form.register("objectiveDetails")}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Que funcionalidades deseja?
                </h3>
                <p className="text-sm text-gray-500">Selecione todas as que se aplicam.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {projectFeatures[projectType as ProjectType]?.map((feature) => (
                    <label
                      key={feature}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-colors ${
                        selectedFeatures.includes(feature)
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200"
                      }`}
                    >
                      <Checkbox
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("features")
                          form.setValue(
                            "features",
                            checked
                              ? [...current, feature]
                              : current.filter((f) => f !== feature),
                            { shouldValidate: true }
                          )
                        }}
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div>
                    <Label className="text-sm font-medium">Nível de complexidade</Label>
                    <div className="mt-2 flex gap-2">
                      {(Object.entries(complexityLabels) as [Complexity, string][]).map(
                        ([value, label]) => (
                          <label
                            key={value}
                            className={`flex-1 cursor-pointer rounded-lg border-2 p-2 text-center text-sm transition-colors ${
                              complexity === value
                                ? "border-purple-600 bg-purple-50"
                                : "border-gray-200 hover:border-purple-200"
                            }`}
                          >
                            <input
                              type="radio"
                              value={value}
                              {...form.register("complexity")}
                              className="sr-only"
                            />
                            {label}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Deadline and details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Prazo e detalhes</h3>
                <div>
                  <Label>Prazo esperado</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {deadlines.map((d) => (
                      <label
                        key={d}
                        className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-colors ${
                          form.watch("deadline") === d
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-200"
                        }`}
                      >
                        <input
                          type="radio"
                          value={d}
                          {...form.register("deadline")}
                          className="sr-only"
                        />
                        <span className="text-sm">{d}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Urgência</Label>
                  <div className="mt-2 flex gap-2">
                    {(Object.entries(urgencyLabels) as [Urgency, string][]).map(
                      ([value, label]) => (
                        <label
                          key={value}
                          className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm transition-colors ${
                            urgency === value
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 hover:border-purple-200"
                          }`}
                        >
                          <input
                            type="radio"
                            value={value}
                            {...form.register("urgency")}
                            className="sr-only"
                          />
                          {label}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="references">Referências / links (opcional)</Label>
                  <Textarea
                    id="references"
                    placeholder="Cole links de sites ou apps que goste, para nos inspirar..."
                    {...form.register("references")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="briefing">Upload de briefing (opcional)</Label>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-gray-300 p-4">
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Funcionalidade de upload em preparação. Envie o ficheiro por email ou
                      WhatsApp após submeter o formulário.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Os seus dados de contacto</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      placeholder="O seu nome"
                      {...form.register("name")}
                      className="mt-1"
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...form.register("email")}
                      className="mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Preferência de contacto</Label>
                  <div className="mt-2 flex gap-2">
                    <label
                      className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm transition-colors ${
                        form.watch("contactPreference") === "whatsapp"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="whatsapp"
                        {...form.register("contactPreference")}
                        className="sr-only"
                      />
                      WhatsApp
                    </label>
                    <label
                      className={`flex-1 cursor-pointer rounded-lg border-2 p-3 text-center text-sm transition-colors ${
                        form.watch("contactPreference") === "email"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="email"
                        {...form.register("contactPreference")}
                        className="sr-only"
                      />
                      Email
                    </label>
                  </div>
                </div>

                {form.watch("contactPreference") === "whatsapp" && (
                  <div>
                    <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      placeholder="+244 9XX XXX XXX"
                      {...form.register("whatsapp")}
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label>Preferência de pagamento (opcional)</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {paymentOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center rounded-lg border-2 p-3 transition-colors ${
                          form.watch("paymentPreference") === opt
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-purple-200"
                        }`}
                      >
                        <input
                          type="radio"
                          value={opt}
                          {...form.register("paymentPreference")}
                          className="sr-only"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resumo do pedido</h3>

                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo de projeto:</span>
                    <span className="font-medium">
                      {projectTypeLabels[projectType as ProjectType]}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Objectivo:</span>
                    <span className="font-medium">{form.watch("objective")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Complexidade:</span>
                    <span className="font-medium">
                      {complexityLabels[complexity as Complexity]}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prazo:</span>
                    <span className="font-medium">{form.watch("deadline")}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Funcionalidades:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedFeatures.map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 text-center">
                  <p className="text-sm text-gray-600">Estimativa indicativa</p>
                  <p className="mt-1 text-xl font-bold text-purple-600">
                    {formatPriceRange(estimate.min, estimate.max)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Valores estimados; sujeito a briefing e validação.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Anterior
              </Button>

              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
                  disabled={!canProceed()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Seguinte
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {submitting ? "A enviar..." : "Enviar pedido"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
