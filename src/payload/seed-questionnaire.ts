import { getPayload } from "payload"
import config from "@payload-config"

const TEMPLATE_SLUG = "briefing-inicial"

const ptTemplate = {
  title: "Briefing Inicial de Projecto",
  introMessage:
    "Obrigado por considerar a Kriativa. Este questionário ajuda-nos a perceber o seu projecto antes da primeira reunião — leva cerca de 10 minutos. As respostas vão directamente para a nossa equipa.",
  thankYouMessage:
    "Recebemos as suas respostas. Vamos analisar e voltar consigo em menos de 24 horas úteis com uma proposta clara e prazo realista.",
  questions: [
    {
      key: "project_type",
      label: "Que tipo de projecto pretende?",
      helpText: "Pode escolher mais do que uma opção.",
      type: "multipleChoice",
      required: true,
      options: [
        { label: "Website institucional", value: "website" },
        { label: "Loja online (e-commerce)", value: "ecommerce" },
        { label: "Aplicação móvel (iOS / Android)", value: "app-mobile" },
        { label: "Sistema CRM / ERP", value: "sistema" },
        { label: "Infra-estrutura & Cloud", value: "infra-cloud" },
        { label: "Equipamento tecnológico", value: "comercio" },
        { label: "Outro", value: "outro" },
      ],
    },
    {
      key: "goal",
      label: "Qual é o objectivo principal?",
      helpText: "Em uma ou duas frases.",
      type: "longText",
      required: true,
      options: [],
    },
    {
      key: "audience",
      label: "Quem é o público-alvo?",
      helpText: "Clientes finais, equipa interna, parceiros, instituições, etc.",
      type: "shortText",
      required: false,
      options: [],
    },
    {
      key: "has_existing",
      label: "Já existe um sistema/site/app actual?",
      type: "yesNo",
      required: true,
      options: [],
    },
    {
      key: "existing_details",
      label: "Se sim, descreva-o brevemente",
      helpText: "Tecnologias, idade, principais limitações.",
      type: "longText",
      required: false,
      options: [],
    },
    {
      key: "key_features",
      label: "Funcionalidades essenciais",
      helpText: "Liste as funcionalidades imprescindíveis para o lançamento.",
      type: "longText",
      required: true,
      options: [],
    },
    {
      key: "integrations",
      label: "Integrações necessárias",
      helpText: "Pagamentos (Multicaixa, Express), email, CRM externo, ERP, APIs.",
      type: "longText",
      required: false,
      options: [],
    },
    {
      key: "timeline",
      label: "Prazo desejado",
      type: "singleChoice",
      required: true,
      options: [
        { label: "Urgente (até 4 semanas)", value: "urgent" },
        { label: "1-2 meses", value: "1_2m" },
        { label: "3-6 meses", value: "3_6m" },
        { label: "Mais de 6 meses", value: "6m_plus" },
        { label: "Sem prazo definido", value: "open" },
      ],
    },
    {
      key: "budget",
      label: "Orçamento previsto (Kz)",
      helpText: "Faixa indicativa, ajuda-nos a propor o âmbito certo.",
      type: "singleChoice",
      required: false,
      options: [
        { label: "Até 500.000 Kz", value: "500k" },
        { label: "500.000 – 2.000.000 Kz", value: "2m" },
        { label: "2.000.000 – 5.000.000 Kz", value: "5m" },
        { label: "5.000.000 – 15.000.000 Kz", value: "15m" },
        { label: "Mais de 15.000.000 Kz", value: "15m_plus" },
        { label: "A definir", value: "tbd" },
      ],
    },
    {
      key: "references",
      label: "Referências de inspiração",
      helpText: "Sites, apps ou marcas que admire — ajuda-nos a perceber o gosto.",
      type: "longText",
      required: false,
      options: [],
    },
    {
      key: "ownership_priority",
      label: "Quão importante é ser dono do código e independência tecnológica?",
      type: "scale",
      required: false,
      options: [],
    },
    {
      key: "additional",
      label: "Algo mais que queira partilhar?",
      type: "longText",
      required: false,
      options: [],
    },
  ],
}

const enTranslation = {
  title: "Initial Project Briefing",
  introMessage:
    "Thank you for considering Kriativa. This questionnaire helps us understand your project before the first meeting — it takes about 10 minutes. Answers go directly to our team.",
  thankYouMessage:
    "We received your answers. We will review and get back to you in under 24 business hours with a clear proposal and realistic timeline.",
  questions: [
    {
      label: "What kind of project do you want?",
      helpText: "You can pick more than one option.",
      options: [
        "Institutional website",
        "Online store (e-commerce)",
        "Mobile app (iOS / Android)",
        "CRM / ERP system",
        "Infrastructure & Cloud",
        "Tech equipment",
        "Other",
      ],
    },
    {
      label: "What is the main goal?",
      helpText: "In one or two sentences.",
      options: [],
    },
    {
      label: "Who is the target audience?",
      helpText: "End customers, internal team, partners, institutions, etc.",
      options: [],
    },
    {
      label: "Is there an existing system/site/app today?",
      options: [],
    },
    {
      label: "If yes, describe it briefly",
      helpText: "Technologies, age, main limitations.",
      options: [],
    },
    {
      label: "Essential features",
      helpText: "List the must-have features for launch.",
      options: [],
    },
    {
      label: "Required integrations",
      helpText: "Payments (Multicaixa, Express), email, external CRM, ERP, APIs.",
      options: [],
    },
    {
      label: "Desired timeline",
      options: [
        "Urgent (up to 4 weeks)",
        "1-2 months",
        "3-6 months",
        "More than 6 months",
        "No fixed deadline",
      ],
    },
    {
      label: "Expected budget (Kz)",
      helpText: "Indicative range, helps us propose the right scope.",
      options: [
        "Up to 500,000 Kz",
        "500,000 – 2,000,000 Kz",
        "2,000,000 – 5,000,000 Kz",
        "5,000,000 – 15,000,000 Kz",
        "More than 15,000,000 Kz",
        "To be defined",
      ],
    },
    {
      label: "Inspiration references",
      helpText: "Sites, apps or brands you admire — helps us match your taste.",
      options: [],
    },
    {
      label: "How important is owning the code and technological independence?",
      options: [],
    },
    {
      label: "Anything else you would like to share?",
      options: [],
    },
  ],
}

const frTranslation = {
  title: "Briefing Initial de Projet",
  introMessage:
    "Merci d'envisager Kriativa. Ce questionnaire nous aide à comprendre votre projet avant la première réunion — il prend environ 10 minutes. Les réponses vont directement à notre équipe.",
  thankYouMessage:
    "Nous avons reçu vos réponses. Nous allons analyser et revenir vers vous en moins de 24 heures ouvrées avec une proposition claire et un délai réaliste.",
  questions: [
    {
      label: "Quel type de projet souhaitez-vous ?",
      helpText: "Vous pouvez choisir plus d'une option.",
      options: [
        "Site institutionnel",
        "Boutique en ligne (e-commerce)",
        "Application mobile (iOS / Android)",
        "Système CRM / ERP",
        "Infrastructure & Cloud",
        "Équipement tech",
        "Autre",
      ],
    },
    {
      label: "Quel est l'objectif principal ?",
      helpText: "En une ou deux phrases.",
      options: [],
    },
    {
      label: "Qui est le public cible ?",
      helpText:
        "Clients finaux, équipe interne, partenaires, institutions, etc.",
      options: [],
    },
    {
      label: "Existe-t-il déjà un système/site/app aujourd'hui ?",
      options: [],
    },
    {
      label: "Si oui, décrivez-le brièvement",
      helpText: "Technologies, âge, principales limitations.",
      options: [],
    },
    {
      label: "Fonctionnalités essentielles",
      helpText: "Listez les fonctionnalités indispensables pour le lancement.",
      options: [],
    },
    {
      label: "Intégrations nécessaires",
      helpText: "Paiements (Multicaixa, Express), email, CRM externe, ERP, APIs.",
      options: [],
    },
    {
      label: "Délai souhaité",
      options: [
        "Urgent (jusqu'à 4 semaines)",
        "1-2 mois",
        "3-6 mois",
        "Plus de 6 mois",
        "Sans délai défini",
      ],
    },
    {
      label: "Budget prévu (Kz)",
      helpText: "Fourchette indicative, nous aide à proposer le bon périmètre.",
      options: [
        "Jusqu'à 500 000 Kz",
        "500 000 – 2 000 000 Kz",
        "2 000 000 – 5 000 000 Kz",
        "5 000 000 – 15 000 000 Kz",
        "Plus de 15 000 000 Kz",
        "À définir",
      ],
    },
    {
      label: "Références d'inspiration",
      helpText:
        "Sites, apps ou marques que vous admirez — nous aide à comprendre votre goût.",
      options: [],
    },
    {
      label:
        "Quelle importance accordez-vous à la propriété du code et à l'indépendance technologique ?",
      options: [],
    },
    {
      label: "Autre chose à partager ?",
      options: [],
    },
  ],
}

async function run() {
  const payload = await getPayload({ config })

  // 1. Find or create the PT template.
  const existing = await payload.find({
    collection: "questionnaire-templates",
    where: { slug: { equals: TEMPLATE_SLUG } },
    limit: 1,
    locale: "pt",
    overrideAccess: true,
  })

  let templateId: number | string

  if (existing.docs.length > 0) {
    payload.logger.info(`Template '${TEMPLATE_SLUG}' already exists — skipping create.`)
    templateId = existing.docs[0].id
  } else {
    const created = await payload.create({
      collection: "questionnaire-templates",
      locale: "pt",
      overrideAccess: true,
      data: {
        slug: TEMPLATE_SLUG,
        active: true,
        title: ptTemplate.title,
        introMessage: ptTemplate.introMessage,
        thankYouMessage: ptTemplate.thankYouMessage,
        questions: ptTemplate.questions.map((q) => ({
          key: q.key,
          label: q.label,
          helpText: q.helpText,
          type: q.type as
            | "shortText"
            | "longText"
            | "email"
            | "phone"
            | "number"
            | "date"
            | "yesNo"
            | "singleChoice"
            | "multipleChoice"
            | "scale",
          required: q.required,
          options: q.options.map((opt) => ({
            label: opt.label,
            value: opt.value,
          })),
        })),
      },
    })
    templateId = created.id
    payload.logger.info(`Template '${TEMPLATE_SLUG}' created.`)
  }

  // 2. Add EN/FR translations of the localized fields.
  // Re-fetch fresh PT version (with array IDs and base structure).
  const ptDoc = await payload.findByID({
    collection: "questionnaire-templates",
    id: templateId,
    locale: "pt",
    overrideAccess: true,
  })

  for (const [locale, t] of [
    ["en", enTranslation],
    ["fr", frTranslation],
  ] as const) {
    // Payload validates the full document on every locale update, so we must
    // send title + introMessage + thankYouMessage + all questions in a single
    // call. Item IDs are preserved so existing rows are reused (otherwise PT
    // labels get wiped during recreation).
    await payload.update({
      collection: "questionnaire-templates",
      id: templateId,
      locale,
      overrideAccess: true,
      data: {
        title: t.title,
        introMessage: t.introMessage,
        thankYouMessage: t.thankYouMessage,
        questions: ptDoc.questions?.map((q, i) => {
          const tq = t.questions[i]
          return {
            id: q.id,
            key: q.key,
            type: q.type,
            required: q.required,
            label: tq?.label ?? q.label,
            helpText: tq?.helpText ?? q.helpText ?? null,
            options: q.options?.map((opt, j) => ({
              id: opt.id,
              value: opt.value,
              label: tq?.options[j] ?? opt.label,
            })),
          }
        }),
      },
    })
    payload.logger.info(`Template translated → ${locale}`)
  }

  // 3. Create one demo invite (PT) so we can test /q/<token>.
  const demoMarker = "demo-seed-pt"
  const existingDemo = await payload.find({
    collection: "questionnaire-invites",
    where: { notes: { equals: demoMarker } },
    limit: 1,
    overrideAccess: true,
  })

  if (existingDemo.docs.length === 0) {
    const invite = await payload.create({
      collection: "questionnaire-invites",
      overrideAccess: true,
      data: {
        template: templateId,
        locale: "pt",
        clientName: "Cliente Demo",
        clientEmail: "demo@example.com",
        notes: demoMarker,
      },
    })
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    payload.logger.info(`Demo invite ready → ${base}/q/${invite.token}`)
  } else {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    payload.logger.info(
      `Demo invite already exists → ${base}/q/${existingDemo.docs[0].token}`
    )
  }

  payload.logger.info("Questionnaire seed complete.")
  process.exit(0)
}

run().catch((err) => {
  console.error("Questionnaire seed failed:", err)
  if (err?.data?.errors) {
    console.error("Validation errors:", JSON.stringify(err.data.errors, null, 2))
  }
  process.exit(1)
})
