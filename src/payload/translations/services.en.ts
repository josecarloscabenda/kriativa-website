import type { ServiceTranslation } from "./types.ts"

export const servicesEn: Record<string, ServiceTranslation> = {
  desenvolvimento: {
    title: "Software Development",
    shortDescription:
      "CRM and ERP systems, mobile apps, websites, online stores and one-off solutions — built around the client's actual process.",
    description:
      "We build systems, applications and platforms that connect businesses to the digital era — from the internal system that runs operations to the mobile app that puts the service in the customer's hand. Each project is designed around the real process, instead of forcing the client to adapt to an imported product.",
    deliverables: [
      "CRM systems (sales, pipeline, history)",
      "ERP systems (operations, finance, HR, stock)",
      "Mobile apps (iOS and Android, native or cross-platform)",
      "Institutional and Interactive Websites",
      "Online stores (E-commerce with local payments)",
      "Custom one-off solutions",
      "Admin panel (CMS / back-office)",
      "Technical documentation and post-delivery support",
    ],
    pricing: [
      {
        description: "Online presence or one-off internal tool.",
        features: [
          "Institutional site up to 5 pages, or",
          "Simple internal tool (up to 3 screens)",
          "Responsive design",
          "Forms and basic SEO",
          "30-day support",
        ],
      },
      {
        description: "Structured platform built to scale operations.",
        features: [
          "Website with CMS or cross-platform app",
          "Online store with Multicaixa integration",
          "Backend with API and admin panel",
          "Notifications and 3rd-party integrations",
          "90-day support",
        ],
      },
      {
        description: "Complete system (CRM, ERP, enterprise app).",
        features: [
          "CRM or ERP tailored to the process",
          "Mobile app published to stores",
          "Scalable backend and ERP/finance integrations",
          "Full admin panel + reports",
          "Maintenance and evolution retainer",
        ],
      },
    ],
    priceTable: [
      "Institutional / interactive website",
      "Online store (e-commerce)",
      "Mobile app (iOS / Android)",
      "Custom CRM system",
      "Custom ERP system",
      "One-off solution / dashboard / automation",
    ],
    faq: [
      {
        question: "Do you build from scratch or work with off-the-shelf products?",
        answer:
          "Both. For simple CRM and ERP cases, we may start from an open-source base and accelerate; for specific processes, we design from zero. The decision is technical and economic — not dogmatic.",
      },
      {
        question: "How long does a project take?",
        answer:
          "Institutional site: 2-3 weeks. Typical online store or mobile app: 6 to 12 weeks. Custom CRM/ERP: 3 to 6 months, with incremental deliveries every 2-3 weeks.",
      },
      {
        question: "Do you publish the app to the stores (App Store / Play Store)?",
        answer:
          "Yes. We handle the full publishing process on Apple App Store and Google Play, including required assets, screenshots, metadata and developer accounts.",
      },
      {
        question: "Who owns the code?",
        answer:
          "The client. We hand over repository, documentation and credentials. No lock-in — Kriativa can stay as evolution partner, or another team can take over.",
      },
      {
        question: "Do you support what you deliver?",
        answer:
          "Yes. Each delivery includes a warranty period (30-90 days depending on the package) and we offer a monthly retainer for maintenance, continuous evolution and SLA — useful for CRM/ERP in production.",
      },
      {
        question: "Do you work with clients outside Luanda?",
        answer:
          "Yes. We work remotely with clients in every Angolan province and across the region (Cape Verde, Mozambique, South Africa). Video meetings as default, on-site travel when the project warrants it.",
      },
    ],
  },

  "infra-cloud": {
    title: "Infrastructure & Cloud",
    shortDescription:
      "Server architecture, virtualization, databases and migration to AWS, Azure or Google Cloud. The technological foundation before the application.",
    description:
      "We design and operate the technological foundation that supports the software. For clients who need a solid base — servers, networks, databases, cloud — before or alongside any application. We speak the language of system administrators and the language of business.",
    deliverables: [
      "Server and network architecture",
      "Virtualization (VMware, Hyper-V, KVM)",
      "Databases (Oracle, PostgreSQL, SQL Server)",
      "On-premises → cloud migration (AWS, Azure, GCP)",
      "Cost analysis and migration plan",
      "Continuous cloud management (FinOps, monitoring, SLA)",
      "Domain, DNS and SSL certificate setup",
      "Corporate email (Microsoft 365, Google Workspace)",
      "Backup, high availability and disaster recovery",
    ],
    pricing: [
      {
        description: "Initial setup and rollout.",
        features: [
          "Domain, DNS and SSL",
          "Corporate email (up to 10 mailboxes)",
          "Web hosting or basic cloud",
          "Automated backup",
          "30-day support",
        ],
      },
      {
        description: "Move from physical servers to managed cloud.",
        features: [
          "Audit and migration plan",
          "AWS / Azure / GCP provisioning",
          "Application and database migration",
          "Monitoring and alerts",
          "Operations documentation",
          "90-day support",
        ],
      },
      {
        description: "Continuous infrastructure management.",
        features: [
          "24/7 monitoring and alerts",
          "Patching and security updates",
          "Backup and DR management",
          "Continuous cloud cost optimization",
          "SLA with agreed response time",
          "Monthly report",
        ],
      },
    ],
    priceTable: [
      "Domain + corporate email (up to 10 accounts)",
      "Managed web hosting (yearly)",
      "AWS / Azure / GCP setup",
      "On-premises → cloud migration",
      "Database implementation (Oracle / PostgreSQL)",
      "Cloud management retainer (monthly)",
    ],
    faq: [
      {
        question: "Which cloud should I pick — AWS, Azure or Google Cloud?",
        answer:
          "It depends on what you have today and where you are going. Companies on Microsoft 365 and Active Directory often benefit from Azure. Teams with an open-source stack are at home on AWS or GCP. We do the analysis before recommending — we don't sell a cloud, we sell the right decision.",
      },
      {
        question: "Can you move us from a physical server in the office to the cloud?",
        answer:
          "Yes. We first audit what exists (apps, databases, dependencies), present a migration plan with estimated downtime window and projected cloud costs, then execute in phases to minimize risk.",
      },
      {
        question: "What if we are already on the cloud but the bill is out of control?",
        answer:
          "We run a FinOps audit: we identify under-utilized resources, mis-sized instances, orphan snapshots and Reserved Instance / Savings Plan opportunities. We typically cut the bill by 20-40% in the first quarter.",
      },
      {
        question: "Can you operate Oracle databases?",
        answer:
          "Yes. We have experience with Oracle Database in demanding corporate environments — banking, telco — including RAC, Data Guard and migrations to PostgreSQL or Aurora when licensing justifies it.",
      },
      {
        question: "How does the monthly retainer work?",
        answer:
          "Clear model: continuous monitoring, patching, backup management, incident response with agreed SLA, and a monthly report on infra health and cloud bill. No surprises at month-end.",
      },
    ],
  },

  comercio: {
    title: "Tech Commerce",
    shortDescription:
      "Equipment supply — servers, peripherals, devices — that complements the solutions delivered. One single counterpart.",
    description:
      "We sell the technological equipment that supports the software and infrastructure solutions we deliver — so the client has one single counterpart instead of coordinating three vendors. Branded equipment, formal warranty, invoice compliant with Angolan law.",
    deliverables: [
      "Servers and data-center equipment",
      "Workstations and corporate laptops",
      "Network equipment (switches, routers, firewalls)",
      "Mobile devices and tablets",
      "Peripherals (monitors, printers, scanners)",
      "POS equipment and barcode scanners",
      "Accessories and consumables",
      "Formal warranty and Angolan-law-compliant invoice",
    ],
    pricing: [
      {
        description:
          "Tech commerce is quoted case by case, based on specs, quantity and availability.",
        features: [
          "Quote within 48 business hours",
          "Branded equipment with formal warranty",
          "Invoice issued in Angola, AGT-compliant",
          "Delivery in Luanda and provinces",
          "Bundling option with software/infra projects",
        ],
      },
    ],
    priceTable: [
      "Corporate workstation",
      "Professional laptop",
      "Entry-level server (1U rack)",
      "Managed switch (24-48 ports)",
      "Corporate firewall / router",
      "UPS / no-break (up to 3kVA)",
    ],
    faq: [
      {
        question: "Do you sell only to clients with an existing project?",
        answer:
          "No. Tech commerce is open to any client — individual, company or institution. The advantage for clients who already work with us is coordination: a single counterpart for software, infra and equipment, with a single invoice.",
      },
      {
        question: "Do you keep equipment in stock or is it on order?",
        answer:
          "Common items (laptops, monitors, common switches) may be in stock; specific specs (configured servers, Oracle equipment, VMware licenses) are made-to-order with 2 to 6 weeks lead time depending on origin.",
      },
      {
        question: "Is the warranty handled by you or by the manufacturer?",
        answer:
          "We coordinate the warranty. The client speaks to us; we handle the manufacturer. For critical equipment (servers, networking), we offer extended support packages with 24-48h replacement.",
      },
      {
        question: "Do you issue invoices compliant with Angolan law?",
        answer:
          "Yes. Invoice issued in Angola, with client's NIF, compliant with AGT requirements. We accept orders from public institutions and NGOs with the standard contractual formalities (commitment, purchase order).",
      },
      {
        question: "Do you handle installation and configuration?",
        answer:
          "Yes, as an optional service — equipment arrives at the client ready to start. For companies with multiple workstations, we prepare a standard image and coordinate the deployment.",
      },
    ],
  },
}
