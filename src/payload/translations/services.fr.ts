import type { ServiceTranslation } from "./types.ts"

export const servicesFr: Record<string, ServiceTranslation> = {
  desenvolvimento: {
    title: "Développement Logiciel",
    shortDescription:
      "Systèmes CRM et ERP, applications mobiles, sites web, boutiques en ligne et solutions ponctuelles — conçus autour du processus réel du client.",
    description:
      "Nous construisons systèmes, applications et plateformes qui relient les entreprises à l'ère numérique — du système interne qui structure l'opération à l'app mobile qui place le service dans la main du client final. Chaque projet est conçu à partir du processus réel, au lieu de forcer le client à s'adapter à un produit importé.",
    deliverables: [
      "Systèmes CRM (commercial, pipeline, historique)",
      "Systèmes ERP (opération, finance, RH, stock)",
      "Applications mobiles (iOS et Android, natives ou multiplateforme)",
      "Sites institutionnels et interactifs",
      "Boutiques en ligne (E-commerce avec paiements locaux)",
      "Solutions ponctuelles sur mesure",
      "Panneau d'administration (CMS / back-office)",
      "Documentation technique et support post-livraison",
    ],
    pricing: [
      {
        description: "Présence en ligne ou outil interne ponctuel.",
        features: [
          "Site institutionnel jusqu'à 5 pages, ou",
          "Outil interne simple (jusqu'à 3 écrans)",
          "Design responsive",
          "Formulaires et SEO de base",
          "Support 30 jours",
        ],
      },
      {
        description: "Plateforme structurée pour faire passer l'opération à l'échelle.",
        features: [
          "Site avec CMS ou app multiplateforme",
          "Boutique en ligne avec intégration Multicaixa",
          "Backend avec API et panneau admin",
          "Notifications et intégrations tierces",
          "Support 90 jours",
        ],
      },
      {
        description: "Système complet (CRM, ERP, app entreprise).",
        features: [
          "CRM ou ERP sur mesure du processus",
          "App mobile publiée sur les stores",
          "Backend scalable et intégrations ERP/financières",
          "Panneau admin complet + rapports",
          "Forfait de maintenance et évolution",
        ],
      },
    ],
    priceTable: [
      "Site institutionnel / interactif",
      "Boutique en ligne (e-commerce)",
      "Application mobile (iOS / Android)",
      "Système CRM sur mesure",
      "Système ERP sur mesure",
      "Solution ponctuelle / dashboard / automatisation",
    ],
    faq: [
      {
        question: "Construisez-vous de zéro ou utilisez-vous des produits prêts ?",
        answer:
          "Les deux. Pour des cas CRM et ERP simples, nous pouvons partir d'une base open-source que nous accélérons ; pour des processus spécifiques, nous concevons depuis zéro. La décision est technique et économique — pas dogmatique.",
      },
      {
        question: "Combien de temps prend un projet ?",
        answer:
          "Site institutionnel : 2-3 semaines. Boutique en ligne ou app mobile typique : 6 à 12 semaines. CRM/ERP sur mesure : 3 à 6 mois, avec livraisons incrémentales toutes les 2-3 semaines.",
      },
      {
        question: "Publiez-vous l'app sur les stores (App Store / Play Store) ?",
        answer:
          "Oui. Nous gérons tout le processus de publication sur Apple App Store et Google Play, y compris la création des assets requis, captures d'écran, métadonnées et comptes développeur.",
      },
      {
        question: "Qui est propriétaire du code ?",
        answer:
          "Le client. Nous livrons dépôt, documentation et identifiants. Pas de lock-in — Kriativa peut continuer comme partenaire d'évolution, ou une autre équipe peut reprendre.",
      },
      {
        question: "Soutenez-vous ce que vous livrez ?",
        answer:
          "Oui. Chaque livraison inclut une période de garantie (30-90 jours selon le forfait) et nous proposons un forfait mensuel pour maintenance, évolution continue et SLA — utile pour CRM/ERP en production.",
      },
      {
        question: "Travaillez-vous avec des clients hors de Luanda ?",
        answer:
          "Oui. Nous travaillons à distance avec des clients dans toutes les provinces angolaises et dans la région (Cap-Vert, Mozambique, Afrique du Sud). Visioconférence par défaut, déplacements ponctuels quand le projet le justifie.",
      },
    ],
  },

  "infra-cloud": {
    title: "Infrastructure & Cloud",
    shortDescription:
      "Architecture serveur, virtualisation, bases de données et migration vers AWS, Azure ou Google Cloud. La fondation technologique avant l'application.",
    description:
      "Nous concevons et exploitons la fondation technologique qui soutient le logiciel. Pour des clients qui ont besoin d'une base solide — serveurs, réseaux, bases de données, cloud — avant ou en parallèle de toute application. Nous parlons la langue des administrateurs systèmes et celle du business.",
    deliverables: [
      "Architecture serveur et réseau",
      "Virtualisation (VMware, Hyper-V, KVM)",
      "Bases de données (Oracle, PostgreSQL, SQL Server)",
      "Migration on-premises → cloud (AWS, Azure, GCP)",
      "Analyse de coûts et plan de migration",
      "Gestion cloud continue (FinOps, monitoring, SLA)",
      "Configuration de domaines, DNS et certificats SSL",
      "Email d'entreprise (Microsoft 365, Google Workspace)",
      "Backup, haute disponibilité et disaster recovery",
    ],
    pricing: [
      {
        description: "Configuration initiale et démarrage.",
        features: [
          "Domaine, DNS et SSL",
          "Email d'entreprise (jusqu'à 10 boîtes)",
          "Hébergement web ou cloud de base",
          "Backup automatique",
          "Support 30 jours",
        ],
      },
      {
        description: "Passage de serveurs physiques à un cloud géré.",
        features: [
          "Audit et plan de migration",
          "Provisioning AWS / Azure / GCP",
          "Migration d'applications et bases de données",
          "Monitoring et alertes",
          "Documentation opérationnelle",
          "Support 90 jours",
        ],
      },
      {
        description: "Gestion continue de l'infrastructure.",
        features: [
          "Monitoring 24/7 et alertes",
          "Patching et mises à jour de sécurité",
          "Gestion des backups et DR",
          "Optimisation continue des coûts cloud",
          "SLA avec temps de réponse convenu",
          "Rapport mensuel",
        ],
      },
    ],
    priceTable: [
      "Domaine + email d'entreprise (jusqu'à 10 comptes)",
      "Hébergement web géré (annuel)",
      "Configuration AWS / Azure / GCP",
      "Migration on-premises → cloud",
      "Implémentation de base de données (Oracle / PostgreSQL)",
      "Forfait gestion cloud (mensuel)",
    ],
    faq: [
      {
        question: "Quel cloud choisir — AWS, Azure ou Google Cloud ?",
        answer:
          "Cela dépend de ce que vous avez déjà et où vous allez. Les entreprises avec Microsoft 365 et Active Directory bénéficient souvent d'Azure. Les équipes avec une stack open-source sont à l'aise sur AWS ou GCP. Nous faisons l'analyse avant de recommander — nous ne vendons pas un cloud, nous vendons la bonne décision.",
      },
      {
        question: "Pouvez-vous nous déplacer d'un serveur physique au bureau vers le cloud ?",
        answer:
          "Oui. Nous auditons d'abord ce qui existe (applications, bases de données, dépendances), présentons un plan de migration avec fenêtre de downtime estimée et coûts cloud projetés, puis exécutons par phases pour minimiser le risque.",
      },
      {
        question: "Et si nous sommes déjà sur le cloud mais la facture est hors de contrôle ?",
        answer:
          "Nous faisons un audit FinOps : nous identifions les ressources sous-utilisées, instances mal dimensionnées, snapshots orphelins et opportunités de Reserved Instances ou Savings Plans. Nous réduisons typiquement la facture de 20 à 40% au premier trimestre.",
      },
      {
        question: "Pouvez-vous opérer des bases de données Oracle ?",
        answer:
          "Oui. Nous avons l'expérience d'Oracle Database dans des environnements corporatifs exigeants — banque, télécom — y compris RAC, Data Guard et migrations vers PostgreSQL ou Aurora quand le licensing le justifie.",
      },
      {
        question: "Comment fonctionne le forfait mensuel ?",
        answer:
          "Modèle clair : monitoring continu, patching, gestion des backups, réponse aux incidents avec SLA convenu, et rapport mensuel sur la santé de l'infra et la facture cloud. Pas de surprises en fin de mois.",
      },
    ],
  },

  comercio: {
    title: "Commerce Tech",
    shortDescription:
      "Fourniture d'équipement — serveurs, périphériques, dispositifs — qui complète les solutions livrées. Un seul interlocuteur.",
    description:
      "Nous vendons l'équipement technologique qui soutient les solutions logicielles et infrastructure que nous livrons — pour que le client ait un seul interlocuteur au lieu de coordonner trois fournisseurs. Équipement de marque, garantie formelle, facture conforme à la législation angolaise.",
    deliverables: [
      "Serveurs et équipements de centre de données",
      "Postes de travail et portables corporatifs",
      "Équipements réseau (switches, routeurs, pare-feu)",
      "Appareils mobiles et tablettes",
      "Périphériques (écrans, imprimantes, scanners)",
      "Équipement POS et lecteurs de codes-barres",
      "Accessoires et consommables",
      "Garantie formelle et facture conforme au droit angolais",
    ],
    pricing: [
      {
        description:
          "Le commerce tech est chiffré au cas par cas, selon les spécifications, la quantité et la disponibilité.",
        features: [
          "Devis sous 48 heures ouvrées",
          "Équipement de marque avec garantie formelle",
          "Facture émise en Angola, conforme AGT",
          "Livraison à Luanda et en province",
          "Possibilité d'achat groupé avec projet logiciel/infra",
        ],
      },
    ],
    priceTable: [
      "Poste de travail corporatif",
      "Portable professionnel",
      "Serveur entry-level (rack 1U)",
      "Switch managé (24-48 ports)",
      "Pare-feu / routeur corporatif",
      "Onduleur (jusqu'à 3kVA)",
    ],
    faq: [
      {
        question: "Vendez-vous uniquement à des clients avec un projet existant ?",
        answer:
          "Non. Le commerce tech est ouvert à tout client — particulier, entreprise ou institution. L'avantage pour les clients qui travaillent déjà avec nous, c'est la coordination : un seul interlocuteur pour logiciel, infra et équipement, avec une facture unique.",
      },
      {
        question: "Avez-vous de l'équipement en stock ou est-ce sur commande ?",
        answer:
          "Articles courants (portables, écrans, switches communs) peuvent être en stock ; spécifications spécifiques (serveurs configurés, équipement Oracle, licences VMware) sur commande avec délai de 2 à 6 semaines selon l'origine.",
      },
      {
        question: "La garantie est-elle gérée par vous ou par le fabricant ?",
        answer:
          "Nous coordonnons la garantie. Le client nous parle ; nous traitons avec le fabricant. Pour l'équipement critique (serveurs, réseaux), nous proposons des forfaits de support étendu avec remplacement en 24-48h.",
      },
      {
        question: "Émettez-vous des factures conformes au droit angolais ?",
        answer:
          "Oui. Facture émise en Angola, avec NIF du client, conforme aux exigences AGT. Nous acceptons les commandes d'institutions publiques et d'ONG avec les formalités contractuelles habituelles (engagement, ordre d'achat).",
      },
      {
        question: "Faites-vous l'installation et la configuration ?",
        answer:
          "Oui, en service optionnel — l'équipement arrive chez le client prêt à démarrer. Pour les entreprises avec plusieurs postes, nous préparons une image standard et coordonnons le déploiement.",
      },
    ],
  },
}
