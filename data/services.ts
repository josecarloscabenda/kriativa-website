export interface PricingTier {
  name: string
  description: string
  features: string[]
  priceRange: { min: number; max: number }
  highlight?: boolean
}

export interface ServiceItem {
  slug: string
  title: string
  shortDescription: string
  icon: string
  startingPrice: number
  href: string
  description: string
  deliverables: string[]
  technologies: string[]
  pricing: PricingTier[]
  priceTable: { item: string; min: number; max: number }[]
  faq: { question: string; answer: string }[]
}

export const services: ServiceItem[] = [
  {
    slug: "desenvolvimento",
    title: "Desenvolvimento de Software",
    shortDescription:
      "Sistemas CRM e ERP, aplicações móveis, websites, lojas online e soluções pontuais — feitos à medida do processo do cliente.",
    icon: "/servicos/Desenvolvimento de Software.svg",
    startingPrice: 249000,
    href: "/servicos/desenvolvimento",
    description:
      "Construímos sistemas, aplicações e plataformas que ligam o negócio à era digital — do sistema interno que organiza a operação à aplicação móvel que coloca o serviço na mão do cliente final. Cada projecto é desenhado a partir do processo real, em vez de forçar o cliente a adaptar-se a um produto importado.",
    deliverables: [
      "Sistemas CRM (gestão comercial, pipeline, histórico)",
      "Sistemas ERP (operação, financeiro, RH, stock)",
      "Aplicações Móveis (iOS e Android, nativas ou multiplataforma)",
      "Websites Institucionais e Interactivos",
      "Lojas Online (E-commerce com pagamentos locais)",
      "Soluções Pontuais Sob Medida",
      "Painel de administração (CMS / back-office)",
      "Documentação técnica e suporte pós-entrega",
    ],
    technologies: [
      "Next.js / React",
      "Node.js",
      "TypeScript",
      "Python",
      "Flutter / React Native",
      "Swift / Kotlin",
      "PostgreSQL",
      "Firebase",
      "PHP / Laravel",
      "WordPress",
    ],
    pricing: [
      {
        name: "Essencial",
        description: "Presença online ou ferramenta interna pontual.",
        features: [
          "Site institucional até 5 páginas, ou",
          "Ferramenta interna simples (até 3 ecrãs)",
          "Design responsivo",
          "Formulários e SEO base",
          "Suporte 30 dias",
        ],
        priceRange: { min: 249000, max: 581000 },
      },
      {
        name: "Profissional",
        description: "Plataforma estruturada para escalar a operação.",
        features: [
          "Website com CMS ou app multiplataforma",
          "Loja online com integração Multicaixa",
          "Backend com API e painel admin",
          "Notificações e integrações (3rd-party)",
          "Suporte 90 dias",
        ],
        priceRange: { min: 664000, max: 1660000 },
        highlight: true,
      },
      {
        name: "Sob Medida",
        description: "Sistema completo (CRM, ERP, app empresarial).",
        features: [
          "CRM ou ERP à medida do processo",
          "App móvel publicada nas lojas",
          "Backend escalável e integrações ERP/financeiras",
          "Painel admin completo + relatórios",
          "Avença de manutenção e evolução",
        ],
        priceRange: { min: 2075000, max: 6225000 },
      },
    ],
    priceTable: [
      { item: "Website institucional / interactivo", min: 249000, max: 996000 },
      { item: "Loja online (e-commerce)", min: 415000, max: 1660000 },
      { item: "Aplicação móvel (iOS / Android)", min: 830000, max: 3320000 },
      { item: "Sistema CRM à medida", min: 1245000, max: 4150000 },
      { item: "Sistema ERP à medida", min: 2075000, max: 6225000 },
      { item: "Solução pontual / dashboard / automação", min: 332000, max: 1660000 },
    ],
    faq: [
      {
        question: "Constroem o sistema de raiz ou trabalham com produtos prontos?",
        answer:
          "Constroem-se as duas vertentes. Para CRM e ERP simples, podemos partir de uma base open-source que aceleramos; para processos específicos, desenhamos a partir do zero. A decisão é técnica e económica — não dogmática.",
      },
      {
        question: "Quanto tempo demora um projecto?",
        answer:
          "Site institucional fica em 2-3 semanas. Loja online ou app móvel típica entre 6 e 12 semanas. CRM/ERP à medida varia de 3 a 6 meses, com entregas incrementais a cada 2-3 semanas.",
      },
      {
        question: "Publicam a app nas lojas (App Store / Play Store)?",
        answer:
          "Sim. Tratamos do processo de publicação na Apple App Store e Google Play, incluindo a criação dos assets exigidos, screenshots, metadata e contas de developer.",
      },
      {
        question: "Quem fica dono do código?",
        answer:
          "O cliente. Entregamos repositório, documentação e credenciais. Não há lock-in — a Kriativa pode continuar como parceiro de evolução, ou outra equipa pode assumir.",
      },
      {
        question: "Suportam o que entregam?",
        answer:
          "Sim. Cada entrega inclui um período de garantia (30-90 dias dependendo do pacote) e oferecemos avença mensal para manutenção, evolução contínua e SLA — útil para CRM/ERP em produção.",
      },
      {
        question: "Trabalham com clientes fora de Luanda?",
        answer:
          "Sim. Trabalhamos remotamente com clientes em todas as províncias de Angola e na região (Cabo Verde, Moçambique, África do Sul). Reuniões por videoconferência, deslocações pontuais quando o projecto justifica.",
      },
    ],
  },
  {
    slug: "infra-cloud",
    title: "Infra-estrutura & Cloud",
    shortDescription:
      "Arquitectura de servidores, virtualização, bases de dados e migração para AWS, Azure ou Google Cloud. A fundação tecnológica antes da aplicação.",
    icon: "/servicos/Infra e Cloud.svg",
    startingPrice: 332000,
    href: "/servicos/infra-cloud",
    description:
      "Desenhamos e operamos a fundação tecnológica que suporta o software. Para clientes que precisam de uma base sólida — servidores, redes, bases de dados, cloud — antes ou em paralelo com qualquer aplicação. Falamos a língua dos administradores de sistemas e a linguagem do negócio.",
    deliverables: [
      "Arquitectura de servidores e redes",
      "Virtualização (VMware, Hyper-V, KVM)",
      "Bases de dados (Oracle, PostgreSQL, SQL Server)",
      "Migração on-premises → cloud (AWS, Azure, GCP)",
      "Análise de custos e plano de migração",
      "Gestão cloud contínua (FinOps, monitorização, SLA)",
      "Configuração de domínios, DNS e certificados SSL",
      "Email corporativo (Microsoft 365, Google Workspace)",
      "Backup, alta disponibilidade e disaster recovery",
    ],
    technologies: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "VMware",
      "Oracle Database",
      "PostgreSQL",
      "SQL Server",
      "Linux (RHEL, Ubuntu)",
      "Microsoft 365",
      "Google Workspace",
      "Cloudflare",
      "Terraform",
    ],
    pricing: [
      {
        name: "Setup",
        description: "Configuração inicial e arranque.",
        features: [
          "Domínio, DNS e SSL",
          "Email corporativo (até 10 caixas)",
          "Alojamento web ou cloud básica",
          "Backup automático",
          "Suporte 30 dias",
        ],
        priceRange: { min: 332000, max: 830000 },
      },
      {
        name: "Migração Cloud",
        description: "Saída de servidores físicos para cloud gerida.",
        features: [
          "Auditoria e plano de migração",
          "Provisionamento AWS / Azure / GCP",
          "Migração de aplicações e bases de dados",
          "Monitorização e alertas",
          "Documentação operacional",
          "Suporte 90 dias",
        ],
        priceRange: { min: 1245000, max: 4150000 },
        highlight: true,
      },
      {
        name: "Avença Mensal",
        description: "Gestão contínua da infra-estrutura.",
        features: [
          "Monitorização 24/7 e alertas",
          "Patching e updates de segurança",
          "Gestão de backups e DR",
          "Optimização contínua de custos cloud",
          "SLA com tempo de resposta acordado",
          "Relatório mensal",
        ],
        priceRange: { min: 332000, max: 1660000 },
      },
    ],
    priceTable: [
      { item: "Domínio + email corporativo (até 10 contas)", min: 166000, max: 415000 },
      { item: "Alojamento web gerido (anual)", min: 249000, max: 830000 },
      { item: "Setup AWS / Azure / GCP", min: 415000, max: 1660000 },
      { item: "Migração on-premises → cloud", min: 1245000, max: 4150000 },
      { item: "Implementação de base de dados (Oracle / PostgreSQL)", min: 664000, max: 2490000 },
      { item: "Avença de gestão cloud (mensal)", min: 332000, max: 1660000 },
    ],
    faq: [
      {
        question: "Que cloud devo escolher — AWS, Azure ou Google Cloud?",
        answer:
          "Depende do que já tem e para onde vai. Empresas com Microsoft 365 e Active Directory beneficiam frequentemente de Azure. Equipas com stack open-source ficam à vontade em AWS ou GCP. Fazemos a análise antes de recomendar — não vendemos uma cloud, vendemos a decisão certa.",
      },
      {
        question: "Conseguem mover-nos de um servidor físico no escritório para a cloud?",
        answer:
          "Sim. Auditamos primeiro o que existe (aplicações, bases de dados, dependências), apresentamos plano de migração com janela de downtime estimada e custos cloud projectados, e executamos por fases para minimizar risco.",
      },
      {
        question: "E se já temos cloud mas a factura está descontrolada?",
        answer:
          "Fazemos auditoria de FinOps: identificamos recursos sub-utilizados, instâncias mal dimensionadas, snapshots órfãos, e oportunidades de Reserved Instances ou Savings Plans. Tipicamente reduzimos a factura entre 20% e 40% no primeiro trimestre.",
      },
      {
        question: "Conseguem operar bases de dados Oracle?",
        answer:
          "Sim. Temos experiência com Oracle Database em ambientes corporativos exigentes — banca, telco — incluindo RAC, Data Guard e migrações para PostgreSQL ou Aurora quando o licenciamento o justifica.",
      },
      {
        question: "Como funciona a avença mensal?",
        answer:
          "Modelo claro: monitorização contínua, patching, gestão de backups, resposta a incidentes com SLA acordado, e relatório mensal com saúde da infra-estrutura e factura cloud. Sem surpresas no fim do mês.",
      },
    ],
  },
  {
    slug: "comercio",
    title: "Comércio Tecnológico",
    shortDescription:
      "Fornecimento de equipamento — servidores, periféricos, dispositivos — que complementa as soluções entregues. Um só interlocutor.",
    icon: "/servicos/Comercio Tecnologico.svg",
    startingPrice: 0,
    href: "/servicos/comercio",
    description:
      "Vendemos o material tecnológico que apoia as soluções de software e infra-estrutura que entregamos — para o cliente ter um único interlocutor em vez de coordenar três fornecedores. Equipamento de marca, garantia formal, factura conforme à legislação angolana.",
    deliverables: [
      "Servidores e equipamento de centro de dados",
      "Estações de trabalho e portáteis corporativos",
      "Equipamento de rede (switches, routers, firewalls)",
      "Dispositivos móveis e tablets",
      "Periféricos (monitores, impressoras, scanners)",
      "Equipamento de POS e leitores de código de barras",
      "Acessórios e consumíveis",
      "Garantia formal e factura conforme à lei angolana",
    ],
    technologies: [
      "HPE / Dell / Lenovo",
      "Cisco / MikroTik / Ubiquiti",
      "Microsoft / Apple / Samsung",
      "Logitech / HP / Epson",
      "APC / Schneider",
    ],
    pricing: [
      {
        name: "Sob consulta",
        description:
          "O comércio tecnológico é cotado caso a caso, conforme especificações, quantidade e disponibilidade.",
        features: [
          "Cotação em 48 horas úteis",
          "Equipamento de marca com garantia formal",
          "Factura emitida em Angola, conforme AGT",
          "Entrega em Luanda e províncias",
          "Possibilidade de compra integrada com projecto de software/infra",
        ],
        priceRange: { min: 0, max: 0 },
      },
    ],
    priceTable: [
      { item: "Estação de trabalho corporativa", min: 415000, max: 1660000 },
      { item: "Portátil profissional", min: 581000, max: 2490000 },
      { item: "Servidor entry-level (rack 1U)", min: 1245000, max: 4150000 },
      { item: "Switch gerido 24-48 portas", min: 332000, max: 1245000 },
      { item: "Firewall / Router corporativo", min: 415000, max: 2075000 },
      { item: "UPS / No-break (até 3kVA)", min: 207500, max: 996000 },
    ],
    faq: [
      {
        question: "Vendem só a quem tem projecto convosco?",
        answer:
          "Não. O comércio tecnológico está aberto a qualquer cliente — particular, empresa ou instituição. A vantagem para quem já tem projecto connosco é a coordenação: um único interlocutor para software, infra e equipamento, com factura única.",
      },
      {
        question: "Têm equipamento em stock ou é por encomenda?",
        answer:
          "Itens correntes (portáteis, monitores, switches comuns) podem estar em stock; especificações específicas (servidores configurados, equipamento Oracle, licenças VMware) são por encomenda com prazo de 2 a 6 semanas conforme origem.",
      },
      {
        question: "A garantia é tratada por vocês ou pelo fabricante?",
        answer:
          "Coordenamos a garantia. O cliente fala connosco; nós tratamos com o fabricante. No caso de equipamento crítico (servidores, redes), oferecemos pacotes de suporte estendido com substituição em 24-48 horas.",
      },
      {
        question: "Emitem factura conforme à legislação angolana?",
        answer:
          "Sim. Factura emitida em Angola, com NIF do cliente, conforme exigências da AGT. Aceitamos pedidos de instituições públicas e ONGs com os formalismos contratuais habituais (cabimentação, ordem de compra).",
      },
      {
        question: "Fazem instalação e configuração?",
        answer:
          "Sim, como serviço opcional — o equipamento chega ao cliente já preparado para arrancar. Para empresas com vários postos, fazemos imagem-padrão e deployment coordenado.",
      },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-AO").format(value) + " Kz"
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`
}
