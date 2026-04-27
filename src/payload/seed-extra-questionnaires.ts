import { getPayload } from "payload"
import config from "@payload-config"

/**
 * Seeds three additional questionnaire templates in the DB:
 *   - pedido-website
 *   - ativacao-marca
 *   - pedido-desenvolvimento
 *
 * Idempotent: re-running skips templates that already exist by slug.
 * After a template is created, it is translated in EN and FR via locale-scoped
 * updates with array IDs preserved (avoids wiping PT labels).
 *
 * Run: `npm run seed:extra-questionnaires`
 */

type QuestionType =
  | "shortText"
  | "longText"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "yesNo"
  | "singleChoice"
  | "multipleChoice"
  | "scale"

interface QOption {
  value: string
  pt: string
  en: string
  fr: string
}

interface QuestionDef {
  key: string
  type: QuestionType
  required: boolean
  pt: { label: string; helpText?: string }
  en: { label: string; helpText?: string }
  fr: { label: string; helpText?: string }
  options?: QOption[]
}

interface TemplateDef {
  slug: string
  pt: { title: string; introMessage: string; thankYouMessage: string }
  en: { title: string; introMessage: string; thankYouMessage: string }
  fr: { title: string; introMessage: string; thankYouMessage: string }
  questions: QuestionDef[]
}

// =============================================================================
// Reusable option sets
// =============================================================================

const TIMELINE_OPTIONS: QOption[] = [
  {
    value: "urgent",
    pt: "Urgente (até 4 semanas)",
    en: "Urgent (up to 4 weeks)",
    fr: "Urgent (jusqu'à 4 semaines)",
  },
  { value: "1_2m", pt: "1-2 meses", en: "1-2 months", fr: "1-2 mois" },
  { value: "3_6m", pt: "3-6 meses", en: "3-6 months", fr: "3-6 mois" },
  {
    value: "6m_plus",
    pt: "Mais de 6 meses",
    en: "More than 6 months",
    fr: "Plus de 6 mois",
  },
  {
    value: "open",
    pt: "Sem prazo definido",
    en: "No fixed deadline",
    fr: "Sans délai défini",
  },
]

const BUDGET_OPTIONS: QOption[] = [
  {
    value: "500k",
    pt: "Até 500.000 Kz",
    en: "Up to 500,000 Kz",
    fr: "Jusqu'à 500 000 Kz",
  },
  {
    value: "2m",
    pt: "500.000 – 2.000.000 Kz",
    en: "500,000 – 2,000,000 Kz",
    fr: "500 000 – 2 000 000 Kz",
  },
  {
    value: "5m",
    pt: "2.000.000 – 5.000.000 Kz",
    en: "2,000,000 – 5,000,000 Kz",
    fr: "2 000 000 – 5 000 000 Kz",
  },
  {
    value: "15m",
    pt: "5.000.000 – 15.000.000 Kz",
    en: "5,000,000 – 15,000,000 Kz",
    fr: "5 000 000 – 15 000 000 Kz",
  },
  {
    value: "15m_plus",
    pt: "Mais de 15.000.000 Kz",
    en: "More than 15,000,000 Kz",
    fr: "Plus de 15 000 000 Kz",
  },
  { value: "tbd", pt: "A definir", en: "To be defined", fr: "À définir" },
]

// =============================================================================
// Template 1 — Pedido de Website
// =============================================================================

const WEBSITE: TemplateDef = {
  slug: "pedido-website",
  pt: {
    title: "Pedido de Website",
    introMessage:
      "Obrigado por considerar a Kriativa. Este briefing ajuda-nos a desenhar o site certo para o seu negócio. Demora cerca de 8 minutos.",
    thankYouMessage:
      "Recebemos o seu pedido. Vamos analisar e voltar consigo em menos de 24 horas úteis com um plano e estimativa.",
  },
  en: {
    title: "Website Request",
    introMessage:
      "Thank you for considering Kriativa. This brief helps us design the right site for your business. It takes about 8 minutes.",
    thankYouMessage:
      "We received your request. We will review and get back to you in under 24 business hours with a plan and estimate.",
  },
  fr: {
    title: "Demande de Site Web",
    introMessage:
      "Merci d'envisager Kriativa. Ce briefing nous aide à concevoir le bon site pour votre activité. Cela prend environ 8 minutes.",
    thankYouMessage:
      "Nous avons reçu votre demande. Nous reviendrons vers vous en moins de 24 heures ouvrées avec un plan et une estimation.",
  },
  questions: [
    {
      key: "site_type",
      type: "singleChoice",
      required: true,
      pt: { label: "Que tipo de website precisa?" },
      en: { label: "What kind of website do you need?" },
      fr: { label: "Quel type de site vous faut-il ?" },
      options: [
        {
          value: "institutional",
          pt: "Institucional / Apresentação",
          en: "Institutional / Showcase",
          fr: "Institutionnel / Vitrine",
        },
        {
          value: "ecommerce",
          pt: "Loja online (e-commerce)",
          en: "Online store (e-commerce)",
          fr: "Boutique en ligne (e-commerce)",
        },
        {
          value: "landing",
          pt: "Landing page / Campanha",
          en: "Landing page / Campaign",
          fr: "Landing page / Campagne",
        },
        {
          value: "blog",
          pt: "Blog / Magazine",
          en: "Blog / Magazine",
          fr: "Blog / Magazine",
        },
        {
          value: "portal",
          pt: "Portal / Plataforma de conteúdos",
          en: "Portal / Content platform",
          fr: "Portail / Plateforme de contenus",
        },
        {
          value: "outro",
          pt: "Outro",
          en: "Other",
          fr: "Autre",
        },
      ],
    },
    {
      key: "goal",
      type: "longText",
      required: true,
      pt: {
        label: "Qual é o objectivo principal do site?",
        helpText:
          "Em uma ou duas frases — captar leads, vender, dar credibilidade, etc.",
      },
      en: {
        label: "What is the main goal of the site?",
        helpText:
          "In one or two sentences — capture leads, sell, build credibility, etc.",
      },
      fr: {
        label: "Quel est l'objectif principal du site ?",
        helpText:
          "En une ou deux phrases — capter des leads, vendre, gagner en crédibilité, etc.",
      },
    },
    {
      key: "audience",
      type: "shortText",
      required: true,
      pt: {
        label: "Quem é o público-alvo?",
        helpText: "Quem deve abrir o site — perfil, idade, sector.",
      },
      en: {
        label: "Who is the target audience?",
        helpText: "Who should open the site — profile, age, sector.",
      },
      fr: {
        label: "Qui est le public cible ?",
        helpText: "Qui doit ouvrir le site — profil, âge, secteur.",
      },
    },
    {
      key: "has_existing",
      type: "yesNo",
      required: true,
      pt: { label: "Tem um website actual?" },
      en: { label: "Do you have a current website?" },
      fr: { label: "Avez-vous un site actuel ?" },
    },
    {
      key: "existing_issues",
      type: "longText",
      required: false,
      pt: {
        label: "Se sim, o que NÃO está a funcionar?",
        helpText: "Lentidão, design antigo, sem mobile, falta de conteúdo, etc.",
      },
      en: {
        label: "If yes, what is NOT working?",
        helpText: "Slowness, outdated design, no mobile, lack of content, etc.",
      },
      fr: {
        label: "Si oui, qu'est-ce qui ne fonctionne pas ?",
        helpText: "Lenteur, design dépassé, pas de mobile, manque de contenu, etc.",
      },
    },
    {
      key: "features",
      type: "multipleChoice",
      required: true,
      pt: {
        label: "Funcionalidades necessárias",
        helpText: "Pode escolher mais do que uma.",
      },
      en: {
        label: "Required features",
        helpText: "You can pick more than one.",
      },
      fr: {
        label: "Fonctionnalités requises",
        helpText: "Vous pouvez en choisir plusieurs.",
      },
      options: [
        {
          value: "contact_form",
          pt: "Formulário de contacto",
          en: "Contact form",
          fr: "Formulaire de contact",
        },
        { value: "blog", pt: "Blog", en: "Blog", fr: "Blog" },
        {
          value: "online_store",
          pt: "Loja online",
          en: "Online store",
          fr: "Boutique en ligne",
        },
        {
          value: "client_area",
          pt: "Área de cliente / login",
          en: "Client area / login",
          fr: "Espace client / connexion",
        },
        {
          value: "newsletter",
          pt: "Newsletter",
          en: "Newsletter",
          fr: "Newsletter",
        },
        {
          value: "social",
          pt: "Integração com redes sociais",
          en: "Social media integration",
          fr: "Intégration des réseaux sociaux",
        },
        { value: "map", pt: "Mapa / Localização", en: "Map / Location", fr: "Carte / Localisation" },
        {
          value: "events",
          pt: "Calendário / Eventos",
          en: "Calendar / Events",
          fr: "Calendrier / Événements",
        },
        {
          value: "media",
          pt: "Galeria / Vídeos",
          en: "Gallery / Videos",
          fr: "Galerie / Vidéos",
        },
        { value: "chat", pt: "Chat ao vivo", en: "Live chat", fr: "Chat en direct" },
        { value: "faq", pt: "FAQ / Perguntas frequentes", en: "FAQ", fr: "FAQ" },
      ],
    },
    {
      key: "languages",
      type: "multipleChoice",
      required: true,
      pt: { label: "Línguas que pretende suportar" },
      en: { label: "Languages you want to support" },
      fr: { label: "Langues à prendre en charge" },
      options: [
        { value: "pt", pt: "Português", en: "Portuguese", fr: "Portugais" },
        { value: "en", pt: "Inglês", en: "English", fr: "Anglais" },
        { value: "fr", pt: "Francês", en: "French", fr: "Français" },
        {
          value: "other",
          pt: "Outras (descrever em 'Algo mais')",
          en: "Others (describe in 'Anything else')",
          fr: "Autres (préciser dans 'Autre chose')",
        },
      ],
    },
    {
      key: "branding_ready",
      type: "yesNo",
      required: true,
      pt: {
        label: "Já tem identidade visual definida (logo, cores, fontes)?",
      },
      en: {
        label: "Do you already have a defined visual identity (logo, colors, fonts)?",
      },
      fr: {
        label: "Avez-vous déjà une identité visuelle définie (logo, couleurs, polices) ?",
      },
    },
    {
      key: "content_ready",
      type: "singleChoice",
      required: true,
      pt: {
        label: "Conteúdo (textos e imagens) está pronto?",
      },
      en: { label: "Is the content (text and images) ready?" },
      fr: { label: "Le contenu (textes et images) est-il prêt ?" },
      options: [
        {
          value: "ready",
          pt: "Sim, totalmente pronto",
          en: "Yes, fully ready",
          fr: "Oui, totalement prêt",
        },
        {
          value: "partial",
          pt: "Parcialmente — falta produzir",
          en: "Partially — some still to produce",
          fr: "Partiellement — reste à produire",
        },
        {
          value: "need_help",
          pt: "Preciso de apoio para produzir conteúdo",
          en: "I need help producing content",
          fr: "J'ai besoin d'aide pour produire le contenu",
        },
      ],
    },
    {
      key: "references",
      type: "longText",
      required: false,
      pt: {
        label: "Sites que admire",
        helpText: "Links de sites que goste — ajuda-nos a perceber o estilo.",
      },
      en: {
        label: "Sites you admire",
        helpText: "Links to sites you like — helps us understand the style.",
      },
      fr: {
        label: "Sites que vous admirez",
        helpText: "Liens de sites qui vous plaisent — nous aide à saisir le style.",
      },
    },
    {
      key: "timeline",
      type: "singleChoice",
      required: true,
      pt: { label: "Prazo desejado" },
      en: { label: "Desired timeline" },
      fr: { label: "Délai souhaité" },
      options: TIMELINE_OPTIONS,
    },
    {
      key: "budget",
      type: "singleChoice",
      required: false,
      pt: {
        label: "Orçamento previsto",
        helpText: "Faixa indicativa, ajuda-nos a propor o âmbito certo.",
      },
      en: {
        label: "Expected budget",
        helpText: "Indicative range, helps us propose the right scope.",
      },
      fr: {
        label: "Budget prévu",
        helpText: "Fourchette indicative, nous aide à proposer le bon périmètre.",
      },
      options: BUDGET_OPTIONS,
    },
    {
      key: "maintenance",
      type: "yesNo",
      required: false,
      pt: {
        label: "Pretende contrato de manutenção mensal após o lançamento?",
      },
      en: {
        label: "Do you want a monthly maintenance contract after launch?",
      },
      fr: {
        label: "Souhaitez-vous un contrat de maintenance mensuel après le lancement ?",
      },
    },
    {
      key: "additional",
      type: "longText",
      required: false,
      pt: { label: "Algo mais que queira partilhar?" },
      en: { label: "Anything else you would like to share?" },
      fr: { label: "Autre chose à partager ?" },
    },
  ],
}

// =============================================================================
// Template 2 — Ativação de Marca e Branding
// =============================================================================

const BRANDING: TemplateDef = {
  slug: "ativacao-marca",
  pt: {
    title: "Ativação de Marca e Branding",
    introMessage:
      "Vamos construir uma marca à sua medida. Este briefing ajuda-nos a perceber a personalidade, o público e os pontos de contacto. Demora cerca de 10 minutos.",
    thankYouMessage:
      "Recebemos o seu briefing de marca. Vamos analisar e voltar consigo com uma proposta estruturada em menos de 48 horas úteis.",
  },
  en: {
    title: "Brand Activation and Branding",
    introMessage:
      "Let's build a brand tailored to you. This brief helps us understand the personality, the audience and the touchpoints. It takes about 10 minutes.",
    thankYouMessage:
      "We received your brand brief. We will review and get back to you with a structured proposal in under 48 business hours.",
  },
  fr: {
    title: "Activation de Marque et Branding",
    introMessage:
      "Construisons ensemble une marque sur mesure. Ce briefing nous aide à comprendre la personnalité, le public et les points de contact. Cela prend environ 10 minutes.",
    thankYouMessage:
      "Nous avons reçu votre briefing de marque. Nous reviendrons vers vous avec une proposition structurée en moins de 48 heures ouvrées.",
  },
  questions: [
    {
      key: "brand_status",
      type: "singleChoice",
      required: true,
      pt: { label: "Em que fase está a marca?" },
      en: { label: "What stage is the brand at?" },
      fr: { label: "À quel stade en est la marque ?" },
      options: [
        {
          value: "new",
          pt: "Marca nova / Lançamento",
          en: "New brand / Launch",
          fr: "Nouvelle marque / Lancement",
        },
        {
          value: "rebrand",
          pt: "Rebranding completo",
          en: "Full rebrand",
          fr: "Rebranding complet",
        },
        {
          value: "refresh",
          pt: "Refresh / Modernização",
          en: "Refresh / Modernization",
          fr: "Refresh / Modernisation",
        },
        {
          value: "subbrand",
          pt: "Sub-marca / Extensão",
          en: "Sub-brand / Extension",
          fr: "Sous-marque / Extension",
        },
        { value: "outro", pt: "Outro", en: "Other", fr: "Autre" },
      ],
    },
    {
      key: "business_summary",
      type: "longText",
      required: true,
      pt: {
        label: "Em uma frase, o que faz a empresa?",
        helpText: "Sector, produto/serviço principal, mercado.",
      },
      en: {
        label: "In one sentence, what does the company do?",
        helpText: "Sector, main product/service, market.",
      },
      fr: {
        label: "En une phrase, que fait l'entreprise ?",
        helpText: "Secteur, produit/service principal, marché.",
      },
    },
    {
      key: "audience",
      type: "longText",
      required: true,
      pt: {
        label: "Quem é o público-alvo?",
        helpText: "Idade, perfil, comportamento, contexto de uso.",
      },
      en: {
        label: "Who is the target audience?",
        helpText: "Age, profile, behaviour, usage context.",
      },
      fr: {
        label: "Qui est le public cible ?",
        helpText: "Âge, profil, comportement, contexte d'usage.",
      },
    },
    {
      key: "personality",
      type: "multipleChoice",
      required: true,
      pt: {
        label: "Que personalidade quer transmitir?",
        helpText: "Pode escolher 3-5 atributos.",
      },
      en: {
        label: "What personality do you want to convey?",
        helpText: "You can pick 3-5 attributes.",
      },
      fr: {
        label: "Quelle personnalité voulez-vous transmettre ?",
        helpText: "Vous pouvez en choisir 3-5.",
      },
      options: [
        { value: "sophisticated", pt: "Sofisticada", en: "Sophisticated", fr: "Sophistiquée" },
        { value: "fun", pt: "Divertida", en: "Fun", fr: "Amusante" },
        { value: "trustworthy", pt: "Confiável", en: "Trustworthy", fr: "Fiable" },
        { value: "innovative", pt: "Inovadora", en: "Innovative", fr: "Innovante" },
        { value: "traditional", pt: "Tradicional", en: "Traditional", fr: "Traditionnelle" },
        { value: "bold", pt: "Ousada", en: "Bold", fr: "Audacieuse" },
        { value: "warm", pt: "Próxima / Calorosa", en: "Warm", fr: "Chaleureuse" },
        { value: "technical", pt: "Técnica / Precisa", en: "Technical / Precise", fr: "Technique / Précise" },
        { value: "premium", pt: "Premium", en: "Premium", fr: "Premium" },
        { value: "accessible", pt: "Acessível", en: "Accessible", fr: "Accessible" },
        { value: "young", pt: "Jovem", en: "Young", fr: "Jeune" },
        { value: "elegant", pt: "Elegante", en: "Elegant", fr: "Élégante" },
      ],
    },
    {
      key: "existing_assets",
      type: "multipleChoice",
      required: false,
      pt: {
        label: "Que assets já existem?",
        helpText: "O que pode partilhar connosco.",
      },
      en: {
        label: "What assets already exist?",
        helpText: "What you can share with us.",
      },
      fr: {
        label: "Quels assets existent déjà ?",
        helpText: "Ce que vous pouvez nous partager.",
      },
      options: [
        { value: "logo", pt: "Logo", en: "Logo", fr: "Logo" },
        { value: "colors", pt: "Paleta de cores", en: "Color palette", fr: "Palette de couleurs" },
        { value: "typography", pt: "Tipografia", en: "Typography", fr: "Typographie" },
        { value: "manual", pt: "Manual de identidade", en: "Brand manual", fr: "Manuel d'identité" },
        { value: "icons", pt: "Sistema de ícones", en: "Icon system", fr: "Système d'icônes" },
        { value: "photo", pt: "Banco de fotografia", en: "Photography library", fr: "Banque de photos" },
        { value: "none", pt: "Nada — começamos do zero", en: "Nothing — starting from zero", fr: "Rien — on part de zéro" },
      ],
    },
    {
      key: "keep_change",
      type: "longText",
      required: false,
      pt: {
        label: "O que quer manter da identidade actual e o que quer mudar?",
        helpText: "Apenas se já tiver marca; deixe vazio se for nova.",
      },
      en: {
        label: "What do you want to keep from the current identity and what do you want to change?",
        helpText: "Only if you already have a brand; leave blank if new.",
      },
      fr: {
        label: "Que voulez-vous garder de l'identité actuelle et que voulez-vous changer ?",
        helpText: "Seulement si vous avez déjà une marque ; laisser vide si nouvelle.",
      },
    },
    {
      key: "differentiation",
      type: "longText",
      required: true,
      pt: {
        label: "Como se quer diferenciar dos concorrentes?",
        helpText: "O que torna a marca única — preço, qualidade, conveniência, valores, etc.",
      },
      en: {
        label: "How do you want to stand out from competitors?",
        helpText: "What makes the brand unique — price, quality, convenience, values, etc.",
      },
      fr: {
        label: "Comment voulez-vous vous démarquer de la concurrence ?",
        helpText: "Ce qui rend la marque unique — prix, qualité, commodité, valeurs, etc.",
      },
    },
    {
      key: "tone_of_voice",
      type: "multipleChoice",
      required: true,
      pt: { label: "Tom de voz da marca" },
      en: { label: "Brand tone of voice" },
      fr: { label: "Ton de voix de la marque" },
      options: [
        { value: "formal", pt: "Formal", en: "Formal", fr: "Formel" },
        { value: "informal", pt: "Informal / Próximo", en: "Informal / Friendly", fr: "Informel / Proche" },
        { value: "technical", pt: "Técnico", en: "Technical", fr: "Technique" },
        { value: "inspirational", pt: "Inspirador", en: "Inspirational", fr: "Inspirant" },
        { value: "playful", pt: "Divertido", en: "Playful", fr: "Ludique" },
        { value: "factual", pt: "Factual / Directo", en: "Factual / Direct", fr: "Factuel / Direct" },
        { value: "authoritative", pt: "Autoridade / Especialista", en: "Authoritative / Expert", fr: "Autorité / Expert" },
      ],
    },
    {
      key: "touchpoints",
      type: "multipleChoice",
      required: true,
      pt: {
        label: "Onde a marca vai aparecer?",
        helpText: "Pontos de contacto que precisam de design.",
      },
      en: {
        label: "Where will the brand appear?",
        helpText: "Touchpoints that need design.",
      },
      fr: {
        label: "Où la marque va-t-elle apparaître ?",
        helpText: "Points de contact nécessitant du design.",
      },
      options: [
        { value: "logo_only", pt: "Apenas logo + variações", en: "Logo + variations only", fr: "Logo + variantes seulement" },
        { value: "stationery", pt: "Papelaria (cartões, papel timbrado, envelope)", en: "Stationery (cards, letterhead, envelope)", fr: "Papeterie (cartes, en-tête, enveloppe)" },
        { value: "social", pt: "Redes sociais (templates)", en: "Social media (templates)", fr: "Réseaux sociaux (templates)" },
        { value: "website", pt: "Website", en: "Website", fr: "Site web" },
        { value: "packaging", pt: "Packaging / Embalagem", en: "Packaging", fr: "Packaging / Emballage" },
        { value: "uniforms", pt: "Vestuário / Uniformes", en: "Apparel / Uniforms", fr: "Vêtements / Uniformes" },
        { value: "signage", pt: "Sinalética / Decoração de espaço", en: "Signage / Space decoration", fr: "Signalétique / Décoration d'espace" },
        { value: "app_icon", pt: "Ícone de app", en: "App icon", fr: "Icône d'application" },
        { value: "merchandise", pt: "Brindes / Merchandise", en: "Merchandise", fr: "Goodies / Merchandise" },
        { value: "presentations", pt: "Templates de apresentação", en: "Presentation templates", fr: "Templates de présentation" },
      ],
    },
    {
      key: "color_typography",
      type: "longText",
      required: false,
      pt: {
        label: "Preferências de cores ou tipografia",
        helpText:
          "Cores que goste/evite, tipografia (serifada, sem serifa, manuscrita, etc.) ou deixe livre.",
      },
      en: {
        label: "Color or typography preferences",
        helpText:
          "Colors you like/avoid, typography (serif, sans, handwritten, etc.) or leave open.",
      },
      fr: {
        label: "Préférences de couleurs ou typographie",
        helpText:
          "Couleurs aimées/évitées, typographie (serif, sans-serif, manuscrite, etc.) ou laisser libre.",
      },
    },
    {
      key: "visual_references",
      type: "longText",
      required: false,
      pt: {
        label: "Marcas ou visuais que admire",
        helpText: "Links, marcas, exemplos. Pode ser de qualquer sector.",
      },
      en: {
        label: "Brands or visuals you admire",
        helpText: "Links, brands, examples. Can be from any sector.",
      },
      fr: {
        label: "Marques ou visuels que vous admirez",
        helpText: "Liens, marques, exemples. De tout secteur.",
      },
    },
    {
      key: "deliverables",
      type: "multipleChoice",
      required: true,
      pt: {
        label: "Entregáveis pretendidos",
        helpText: "O que precisa ter no fim do projecto.",
      },
      en: {
        label: "Expected deliverables",
        helpText: "What you need to have by the end of the project.",
      },
      fr: {
        label: "Livrables attendus",
        helpText: "Ce dont vous avez besoin à la fin du projet.",
      },
      options: [
        { value: "logo_set", pt: "Logo + variações (vertical, horizontal, monocromático)", en: "Logo + variations (vertical, horizontal, monochrome)", fr: "Logo + variantes (vertical, horizontal, monochrome)" },
        { value: "manual", pt: "Manual de identidade visual", en: "Brand identity manual", fr: "Manuel d'identité visuelle" },
        { value: "color_palette", pt: "Paleta de cores", en: "Color palette", fr: "Palette de couleurs" },
        { value: "typography", pt: "Sistema tipográfico", en: "Typography system", fr: "Système typographique" },
        { value: "icons", pt: "Sistema de ícones", en: "Icon system", fr: "Système d'icônes" },
        { value: "social_templates", pt: "Templates redes sociais", en: "Social media templates", fr: "Templates réseaux sociaux" },
        { value: "stationery", pt: "Papelaria completa", en: "Full stationery", fr: "Papeterie complète" },
        { value: "mockups", pt: "Mockups de aplicação", en: "Application mockups", fr: "Mockups d'application" },
      ],
    },
    {
      key: "timeline",
      type: "singleChoice",
      required: true,
      pt: { label: "Prazo desejado" },
      en: { label: "Desired timeline" },
      fr: { label: "Délai souhaité" },
      options: TIMELINE_OPTIONS,
    },
    {
      key: "budget",
      type: "singleChoice",
      required: false,
      pt: { label: "Orçamento previsto" },
      en: { label: "Expected budget" },
      fr: { label: "Budget prévu" },
      options: BUDGET_OPTIONS,
    },
    {
      key: "additional",
      type: "longText",
      required: false,
      pt: { label: "Algo mais que queira partilhar?" },
      en: { label: "Anything else you would like to share?" },
      fr: { label: "Autre chose à partager ?" },
    },
  ],
}

// =============================================================================
// Template 3 — Pedido de Projecto de Desenvolvimento
// =============================================================================

const DEVELOPMENT: TemplateDef = {
  slug: "pedido-desenvolvimento",
  pt: {
    title: "Pedido de Projecto de Desenvolvimento",
    introMessage:
      "Este briefing técnico ajuda-nos a desenhar a arquitectura certa para o seu projecto. É detalhado, demora cerca de 12 minutos.",
    thankYouMessage:
      "Recebemos o seu pedido. Vamos analisar requisitos e voltar consigo em menos de 48 horas úteis com uma proposta técnica e estimativa.",
  },
  en: {
    title: "Development Project Request",
    introMessage:
      "This technical brief helps us design the right architecture for your project. It is detailed and takes about 12 minutes.",
    thankYouMessage:
      "We received your request. We will review requirements and get back to you in under 48 business hours with a technical proposal and estimate.",
  },
  fr: {
    title: "Demande de Projet de Développement",
    introMessage:
      "Ce briefing technique nous aide à concevoir la bonne architecture pour votre projet. C'est détaillé, environ 12 minutes.",
    thankYouMessage:
      "Nous avons reçu votre demande. Nous analyserons les exigences et reviendrons vers vous en moins de 48 heures ouvrées avec une proposition technique et une estimation.",
  },
  questions: [
    {
      key: "project_type",
      type: "singleChoice",
      required: true,
      pt: { label: "Tipo de projecto" },
      en: { label: "Project type" },
      fr: { label: "Type de projet" },
      options: [
        { value: "webapp", pt: "Aplicação web", en: "Web application", fr: "Application web" },
        { value: "mobile", pt: "Aplicação móvel (iOS / Android)", en: "Mobile app (iOS / Android)", fr: "Application mobile (iOS / Android)" },
        { value: "internal_system", pt: "Sistema interno (CRM / ERP)", en: "Internal system (CRM / ERP)", fr: "Système interne (CRM / ERP)" },
        { value: "integration", pt: "Integração entre sistemas", en: "Systems integration", fr: "Intégration entre systèmes" },
        { value: "automation", pt: "Automação de processos", en: "Process automation", fr: "Automatisation de processus" },
        { value: "modernize", pt: "Modernização de sistema legacy", en: "Legacy system modernization", fr: "Modernisation d'un système legacy" },
        { value: "mvp", pt: "MVP / Prova de conceito", en: "MVP / Proof of concept", fr: "MVP / Preuve de concept" },
        { value: "outro", pt: "Outro", en: "Other", fr: "Autre" },
      ],
    },
    {
      key: "platforms",
      type: "multipleChoice",
      required: true,
      pt: {
        label: "Plataformas alvo",
        helpText: "Onde o sistema vai correr.",
      },
      en: {
        label: "Target platforms",
        helpText: "Where the system will run.",
      },
      fr: {
        label: "Plateformes cibles",
        helpText: "Où le système va tourner.",
      },
      options: [
        { value: "web", pt: "Web (browser)", en: "Web (browser)", fr: "Web (navigateur)" },
        { value: "ios", pt: "iOS", en: "iOS", fr: "iOS" },
        { value: "android", pt: "Android", en: "Android", fr: "Android" },
        { value: "desktop", pt: "Desktop (macOS / Windows / Linux)", en: "Desktop (macOS / Windows / Linux)", fr: "Desktop (macOS / Windows / Linux)" },
        { value: "api_only", pt: "API apenas (backend para outros)", en: "API only (backend for others)", fr: "API uniquement (backend pour d'autres)" },
      ],
    },
    {
      key: "problem",
      type: "longText",
      required: true,
      pt: {
        label: "Que problema o sistema vai resolver?",
        helpText: "Em duas ou três frases — situação actual e melhoria pretendida.",
      },
      en: {
        label: "What problem will the system solve?",
        helpText: "In two or three sentences — current situation and desired improvement.",
      },
      fr: {
        label: "Quel problème le système va-t-il résoudre ?",
        helpText: "En deux ou trois phrases — situation actuelle et amélioration souhaitée.",
      },
    },
    {
      key: "users",
      type: "longText",
      required: true,
      pt: {
        label: "Quem são os utilizadores?",
        helpText: "Perfis (clientes finais, equipa interna, técnicos no terreno, etc.) e contexto.",
      },
      en: {
        label: "Who are the users?",
        helpText: "Profiles (end customers, internal team, field technicians, etc.) and context.",
      },
      fr: {
        label: "Qui sont les utilisateurs ?",
        helpText: "Profils (clients finaux, équipe interne, techniciens terrain, etc.) et contexte.",
      },
    },
    {
      key: "has_existing",
      type: "yesNo",
      required: true,
      pt: { label: "Já existe um sistema actual?" },
      en: { label: "Is there an existing system?" },
      fr: { label: "Existe-t-il un système actuel ?" },
    },
    {
      key: "existing_details",
      type: "longText",
      required: false,
      pt: {
        label: "Se sim, descreva-o brevemente",
        helpText: "Tecnologias usadas, idade, principais limitações, dados a migrar.",
      },
      en: {
        label: "If yes, describe it briefly",
        helpText: "Technologies used, age, main limitations, data to migrate.",
      },
      fr: {
        label: "Si oui, décrivez-le brièvement",
        helpText: "Technologies utilisées, âge, principales limitations, données à migrer.",
      },
    },
    {
      key: "must_have",
      type: "longText",
      required: true,
      pt: {
        label: "Funcionalidades imprescindíveis para o lançamento",
        helpText: "O que é absolutamente necessário no v1.",
      },
      en: {
        label: "Must-have features for launch",
        helpText: "What is absolutely required in v1.",
      },
      fr: {
        label: "Fonctionnalités indispensables au lancement",
        helpText: "Ce qui est absolument requis en v1.",
      },
    },
    {
      key: "integrations",
      type: "longText",
      required: false,
      pt: {
        label: "Integrações necessárias",
        helpText: "Pagamentos (Multicaixa, Express), email, CRM/ERP, APIs externas, ERP angolano, AGT, etc.",
      },
      en: {
        label: "Required integrations",
        helpText: "Payments (Multicaixa, Express), email, CRM/ERP, external APIs, AGT, etc.",
      },
      fr: {
        label: "Intégrations nécessaires",
        helpText: "Paiements (Multicaixa, Express), email, CRM/ERP, APIs externes, AGT, etc.",
      },
    },
    {
      key: "expected_volume",
      type: "singleChoice",
      required: false,
      pt: {
        label: "Volume esperado de utilizadores activos",
        helpText: "Aproximação no primeiro ano.",
      },
      en: {
        label: "Expected active user volume",
        helpText: "Approximation for the first year.",
      },
      fr: {
        label: "Volume d'utilisateurs actifs attendu",
        helpText: "Approximation pour la première année.",
      },
      options: [
        { value: "lt_100", pt: "Menos de 100", en: "Less than 100", fr: "Moins de 100" },
        { value: "100_1k", pt: "100 a 1.000", en: "100 to 1,000", fr: "100 à 1 000" },
        { value: "1k_10k", pt: "1.000 a 10.000", en: "1,000 to 10,000", fr: "1 000 à 10 000" },
        { value: "10k_100k", pt: "10.000 a 100.000", en: "10,000 to 100,000", fr: "10 000 à 100 000" },
        { value: "100k_plus", pt: "Mais de 100.000", en: "More than 100,000", fr: "Plus de 100 000" },
      ],
    },
    {
      key: "data_sensitivity",
      type: "singleChoice",
      required: false,
      pt: {
        label: "Sensibilidade dos dados",
        helpText: "Afecta requisitos de segurança e auditoria.",
      },
      en: {
        label: "Data sensitivity",
        helpText: "Affects security and audit requirements.",
      },
      fr: {
        label: "Sensibilité des données",
        helpText: "Affecte les exigences de sécurité et d'audit.",
      },
      options: [
        { value: "public", pt: "Pública / Não sensível", en: "Public / Not sensitive", fr: "Publique / Non sensible" },
        { value: "internal", pt: "Interna da empresa", en: "Internal to the company", fr: "Interne à l'entreprise" },
        { value: "client", pt: "Confidencial (dados de clientes)", en: "Confidential (client data)", fr: "Confidentielle (données clients)" },
        { value: "regulated", pt: "Regulada (financeira / saúde / governamental)", en: "Regulated (finance / health / government)", fr: "Réglementée (finance / santé / gouvernementale)" },
      ],
    },
    {
      key: "auth",
      type: "multipleChoice",
      required: false,
      pt: { label: "Autenticação necessária" },
      en: { label: "Required authentication" },
      fr: { label: "Authentification requise" },
      options: [
        { value: "user_pass", pt: "Username + password", en: "Username + password", fr: "Nom d'utilisateur + mot de passe" },
        { value: "sso", pt: "SSO (Active Directory / SAML)", en: "SSO (Active Directory / SAML)", fr: "SSO (Active Directory / SAML)" },
        { value: "oauth", pt: "Login social (Google, Microsoft, Apple)", en: "Social login (Google, Microsoft, Apple)", fr: "Connexion sociale (Google, Microsoft, Apple)" },
        { value: "mfa", pt: "Autenticação multi-factor (MFA)", en: "Multi-factor authentication (MFA)", fr: "Authentification multi-facteurs (MFA)" },
        { value: "anonymous", pt: "Sem autenticação (público)", en: "No authentication (public)", fr: "Sans authentification (public)" },
      ],
    },
    {
      key: "ownership",
      type: "yesNo",
      required: false,
      pt: {
        label: "É importante ser dono do código (sem lock-in)?",
        helpText: "Permite trocar de fornecedor ou continuar internamente.",
      },
      en: {
        label: "Is owning the code (no lock-in) important?",
        helpText: "Allows switching vendor or continuing in-house.",
      },
      fr: {
        label: "Est-il important d'être propriétaire du code (sans lock-in) ?",
        helpText: "Permet de changer de prestataire ou de continuer en interne.",
      },
    },
    {
      key: "team_capacity",
      type: "yesNo",
      required: false,
      pt: {
        label: "A sua equipa vai dar manutenção depois do lançamento?",
        helpText: "Influencia a complexidade técnica recomendada.",
      },
      en: {
        label: "Will your team handle maintenance after launch?",
        helpText: "Influences the recommended technical complexity.",
      },
      fr: {
        label: "Votre équipe assurera-t-elle la maintenance après le lancement ?",
        helpText: "Influence la complexité technique recommandée.",
      },
    },
    {
      key: "timeline",
      type: "singleChoice",
      required: true,
      pt: { label: "Prazo desejado" },
      en: { label: "Desired timeline" },
      fr: { label: "Délai souhaité" },
      options: TIMELINE_OPTIONS,
    },
    {
      key: "budget",
      type: "singleChoice",
      required: false,
      pt: { label: "Orçamento previsto" },
      en: { label: "Expected budget" },
      fr: { label: "Budget prévu" },
      options: BUDGET_OPTIONS,
    },
    {
      key: "additional",
      type: "longText",
      required: false,
      pt: { label: "Algo mais que queira partilhar?" },
      en: { label: "Anything else you would like to share?" },
      fr: { label: "Autre chose à partager ?" },
    },
  ],
}

const ALL_TEMPLATES: TemplateDef[] = [WEBSITE, BRANDING, DEVELOPMENT]

// =============================================================================
// Seeding logic
// =============================================================================

async function seedOne(payload: Awaited<ReturnType<typeof getPayload>>, def: TemplateDef) {
  const existing = await payload.find({
    collection: "questionnaire-templates",
    where: { slug: { equals: def.slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    payload.logger.info(`Template '${def.slug}' already exists — skipping create.`)
    return
  }

  // Step 1: create with PT data
  const created = await payload.create({
    collection: "questionnaire-templates",
    locale: "pt",
    overrideAccess: true,
    data: {
      slug: def.slug,
      active: true,
      title: def.pt.title,
      introMessage: def.pt.introMessage,
      thankYouMessage: def.pt.thankYouMessage,
      questions: def.questions.map((q) => ({
        key: q.key,
        label: q.pt.label,
        helpText: q.pt.helpText,
        type: q.type,
        required: q.required,
        options: (q.options ?? []).map((o) => ({ label: o.pt, value: o.value })),
      })),
    },
  })

  payload.logger.info(`Template '${def.slug}' created.`)

  // Step 2: re-fetch to capture array IDs
  const ptDoc = await payload.findByID({
    collection: "questionnaire-templates",
    id: created.id,
    locale: "pt",
    overrideAccess: true,
  })

  // Step 3: translate per locale (full structure with IDs preserved)
  for (const locale of ["en", "fr"] as const) {
    await payload.update({
      collection: "questionnaire-templates",
      id: created.id,
      locale,
      overrideAccess: true,
      data: {
        title: def[locale].title,
        introMessage: def[locale].introMessage,
        thankYouMessage: def[locale].thankYouMessage,
        questions: ptDoc.questions?.map((q, i) => {
          const def_q = def.questions[i]
          return {
            id: q.id,
            key: q.key,
            type: q.type,
            required: q.required,
            label: def_q?.[locale].label ?? q.label,
            helpText: def_q?.[locale].helpText ?? q.helpText ?? null,
            options: q.options?.map((opt, j) => {
              const def_opt = def_q?.options?.[j]
              return {
                id: opt.id,
                value: opt.value,
                label: def_opt ? def_opt[locale] : opt.label,
              }
            }),
          }
        }),
      },
    })
    payload.logger.info(`  → translated to ${locale}`)
  }
}

async function run() {
  const payload = await getPayload({ config })
  for (const def of ALL_TEMPLATES) {
    await seedOne(payload, def)
  }
  payload.logger.info("Extra questionnaires seed complete.")
  process.exit(0)
}

run().catch((err) => {
  console.error("Seed failed:", err)
  if (err?.data?.errors) {
    console.error("Validation errors:", JSON.stringify(err.data.errors, null, 2))
  }
  process.exit(1)
})
