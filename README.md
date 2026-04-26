# Kriativa — Website Institucional

Website institucional moderno para a **Kriativa**, agência de tecnologia e marketing digital sediada em Luanda, Angola.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui**
- **React Hook Form** + **Zod** (validação de formulários)
- **Lucide React** (ícones)

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env.local

# 3. Configurar variáveis (editar .env.local)
# - NEXT_PUBLIC_WHATSAPP_NUMBER → número de WhatsApp
# - NEXT_PUBLIC_CONTACT_EMAIL → email de contacto
# - Redes sociais, analytics, etc.

# 4. Correr em modo de desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) no browser.

## Configuração

### Variáveis de Ambiente (.env.local)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL do site (ex.: https://kriativa.ao) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto público |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp com código do país |
| `NEXT_PUBLIC_PHONE` | Número de telefone |
| `NEXT_PUBLIC_INSTAGRAM` | URL do Instagram |
| `NEXT_PUBLIC_FACEBOOK` | URL do Facebook |
| `NEXT_PUBLIC_LINKEDIN` | URL do LinkedIn |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domínio Plausible (opcional) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (opcional) |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | Configuração email (servidor) |
| `WEBHOOK_URL` | URL webhook Make/Zapier (opcional) |

### Configuração do Site (site.config.ts)

O ficheiro `site.config.ts` na raiz contém todas as configurações centralizadas do site, incluindo textos, contactos e disclaimers.

## Estrutura do Projeto

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Layout raiz (Navbar + Footer)
├── globals.css                 # Estilos globais + tema
├── servicos/
│   ├── page.tsx                # Visão geral dos serviços
│   └── [slug]/page.tsx         # Páginas individuais (websites, apps, branding, marketing)
├── portfolio/page.tsx          # Portfólio com filtros
├── blog/
│   ├── page.tsx                # Listagem do blog
│   └── [slug]/page.tsx         # Artigo individual
├── encomendar/page.tsx         # Simulador / formulário de encomenda (stepper)
├── sobre/page.tsx              # Sobre nós
├── contacto/page.tsx           # Formulário de contacto
├── api/
│   ├── leads/route.ts          # API para leads do simulador
│   └── contact/route.ts        # API para formulário de contacto
├── sitemap.ts                  # Sitemap XML dinâmico
└── robots.ts                   # Robots.txt

components/
├── ui/                         # Componentes shadcn/ui
├── navbar.tsx                  # Navbar fixa
├── footer.tsx                  # Footer completo
├── hero-section.tsx            # Hero principal
├── service-cards.tsx           # Cards de serviços
├── pricing-table.tsx           # Tabelas de preços
├── faq-accordion.tsx           # FAQ em accordion
├── portfolio-grid.tsx          # Grid de portfólio com filtros
├── blog-list.tsx               # Lista de artigos com pesquisa
├── stepper-form.tsx            # Formulário multi-step (simulador)
├── contact-form.tsx            # Formulário de contacto
├── cta-section.tsx             # Secção CTA reutilizável
├── value-proposition.tsx       # Proposta de valor
├── testimonials.tsx            # Depoimentos
└── specialist-modal.tsx        # Modal "Falar com Especialista"

data/
├── services.ts                 # Dados dos serviços (preços, FAQ, etc.)
├── portfolio.ts                # Itens do portfólio
├── blog.ts                     # Artigos do blog
└── testimonials.ts             # Depoimentos

lib/
├── utils.ts                    # Utilitários (cn)
└── estimator.ts                # Lógica de estimativas de preço
```

## Funcionalidades

- **SEO**: Metadata por página, OpenGraph, sitemap.xml, robots.txt
- **Formulários**: Validação com Zod + React Hook Form
- **Simulador**: Formulário multi-step com estimativa automática de preços
- **Blog**: 5 artigos iniciais com pesquisa e filtros por tag
- **Portfólio**: Grid com filtros por categoria
- **API Routes**: Endpoints para leads e contactos (armazenamento local em JSON)
- **Analytics**: Suporte opcional para Plausible e Google Analytics
- **i18n**: Preparado em PT-PT, estrutura pronta para EN no futuro
- **Responsivo**: Design adaptado para mobile, tablet e desktop
- **Acessibilidade**: HTML semântico, labels em inputs, foco visível

## Deploy (Vercel)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente no dashboard da Vercel
# Settings → Environment Variables → adicionar as variáveis do .env.example
```

Ou conectar directamente o repositório GitHub ao Vercel para deploy automático.

## Próximos Passos (Evolução)

- [ ] Integrar CMS (Sanity, Strapi ou similar) para blog e portfólio
- [ ] Ligação a base de dados (PostgreSQL/Prisma) para leads
- [ ] Envio de emails via API (nodemailer ou Resend)
- [ ] Webhook para Make/Zapier
- [ ] Autenticação para painel admin
- [ ] Suporte multi-idioma (PT-PT / EN)
- [ ] Upload real de ficheiros (Cloudinary, S3 ou similar)
- [ ] Integração Google Maps no contacto

## Checklist SEO e Performance

- [x] Metadata única por página
- [x] OpenGraph tags
- [x] sitemap.xml dinâmico
- [x] robots.txt
- [x] HTML semântico (h1, h2, nav, main, footer, article)
- [x] Imagens com next/image (otimização automática)
- [x] Fontes otimizadas (next/font)
- [x] Lazy loading automático (Next.js)
- [x] Static generation (SSG) para páginas estáticas
- [x] Design responsivo
- [x] Labels e aria em formulários
- [x] Contraste aceitável (fundo branco + texto escuro)

## Notas

- **Preços** são sempre apresentados como estimativas com o aviso: _"Valores estimados; sujeito a briefing e validação."_
- **Nenhum dado sensível** (NIF, IBAN, moradas privadas, etc.) é incluído
- **Contactos** são configuráveis via variáveis de ambiente
- **Depoimentos** na homepage são exemplos fictícios (marcados como tal)
