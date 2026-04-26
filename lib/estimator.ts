export type ProjectType =
  | "website"
  | "ecommerce"
  | "app-mobile"
  | "sistema"
  | "infra-cloud"
  | "comercio"

export type Complexity = "basico" | "medio" | "avancado"
export type Urgency = "normal" | "urgente"

interface PriceRange {
  min: number
  max: number
}

const basePrices: Record<ProjectType, PriceRange> = {
  website: { min: 249000, max: 996000 },
  ecommerce: { min: 415000, max: 1660000 },
  "app-mobile": { min: 830000, max: 3320000 },
  sistema: { min: 1245000, max: 6225000 },
  "infra-cloud": { min: 332000, max: 4150000 },
  comercio: { min: 0, max: 0 },
}

const complexityMultipliers: Record<Complexity, number> = {
  basico: 1.0,
  medio: 1.3,
  avancado: 1.7,
}

const urgencyMultiplier: Record<Urgency, number> = {
  normal: 1.0,
  urgente: 1.2,
}

export function calculateEstimate(
  projectType: ProjectType,
  complexity: Complexity,
  urgency: Urgency
): PriceRange {
  const base = basePrices[projectType]
  const cMul = complexityMultipliers[complexity]
  const uMul = urgencyMultiplier[urgency]

  return {
    min: Math.round(base.min * cMul * uMul),
    max: Math.round(base.max * cMul * uMul),
  }
}

export const projectTypeLabels: Record<ProjectType, string> = {
  website: "Website Institucional",
  ecommerce: "Loja Online (E-commerce)",
  "app-mobile": "Aplicação Móvel (iOS / Android)",
  sistema: "Sistema CRM / ERP / Interno",
  "infra-cloud": "Infra-estrutura & Cloud",
  comercio: "Equipamento Tecnológico",
}

export const complexityLabels: Record<Complexity, string> = {
  basico: "Básico",
  medio: "Médio",
  avancado: "Avançado",
}

export const urgencyLabels: Record<Urgency, string> = {
  normal: "Normal (3-8 semanas)",
  urgente: "Urgente (+20%)",
}

export const projectFeatures: Record<ProjectType, string[]> = {
  website: [
    "Design responsivo",
    "SEO optimizado",
    "CMS (auto-administrável)",
    "Blog integrado",
    "Formulários de contacto",
    "Multi-idioma",
    "Integração redes sociais",
    "Newsletter",
    "Analytics e dashboards",
    "Integração com API externa",
  ],
  ecommerce: [
    "Catálogo de produtos",
    "Carrinho e checkout",
    "Pagamentos Multicaixa Express",
    "Pagamentos por referência",
    "Gestão de stock",
    "Painel admin",
    "Integração com transportadoras",
    "Sistema de cupões / promoções",
    "Conta de cliente",
    "Multi-idioma",
  ],
  "app-mobile": [
    "Login / Autenticação",
    "Notificações push",
    "Geolocalização / Mapas",
    "Câmara / Upload de fotos",
    "Pagamentos in-app",
    "Chat / Mensagens",
    "Perfil de utilizador",
    "Painel admin web",
    "Funcionalidade offline",
    "Integração com API",
    "Publicação App Store / Play Store",
    "Analytics integrados",
  ],
  sistema: [
    "Gestão de clientes (CRM)",
    "Pipeline de vendas / oportunidades",
    "Facturação e contas a receber",
    "Gestão de stock e armazém",
    "Recursos humanos / folha de vencimentos",
    "Multi-empresa / multi-armazém",
    "Relatórios e BI",
    "Integração contabilística",
    "App móvel para vendedores / técnicos",
    "Gestão documental",
    "Workflow / aprovações",
    "Integração com API externa",
  ],
  "infra-cloud": [
    "Domínio + email corporativo",
    "Alojamento web gerido",
    "Migração para AWS / Azure / GCP",
    "Implementação de base de dados",
    "Setup de servidor (VM / dedicado)",
    "Backup e disaster recovery",
    "Monitorização 24/7",
    "Auditoria de segurança",
    "Optimização de custos cloud",
    "Avença de gestão mensal",
  ],
  comercio: [
    "Estações de trabalho / portáteis",
    "Servidores",
    "Equipamento de rede",
    "Dispositivos móveis e tablets",
    "Impressoras e periféricos",
    "POS / leitores de código",
    "UPS / no-break",
    "Garantia estendida",
    "Instalação e configuração",
  ],
}
