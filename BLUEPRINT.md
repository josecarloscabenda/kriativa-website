# Blueprint — Stack & configuração do `kriativa-website`

Resumo do que foi usado/referenciado neste projecto, organizado para servir de template em sites futuros. Não aprofunda cores/temas — foca-se em stack, decisões estruturais e configurações críticas.

## 1. Stack base

- **Framework:** Next.js 16.2 (App Router) + React 19.2
- **CMS headless:** Payload 3.84 montado no mesmo Next app em `app/(payload)`
- **DB:** Postgres (Supabase Session Pooler) via `@payloadcms/db-postgres`
- **Storage Media:** Vercel Blob via `@payloadcms/storage-vercel-blob`
- **Email transaccional:** SMTP custom via `@payloadcms/email-nodemailer`
- **i18n:** `next-intl@4` no frontend + localização nativa do Payload no CMS
- **Estilo:** Tailwind 4 + `shadcn` (Radix UI) — componentes em `components/ui/`
- **Forms:** `react-hook-form` + `zod` + `@hookform/resolvers`
- **Editor rich text:** `@payloadcms/richtext-lexical`
- **Imagens:** `sharp` (resize automático Payload) + `next/image`
- **Hosting:** Vercel (auto-deploy a partir de `main` no GitHub)

## 2. Estrutura de pastas (template recomendado)

```
app/
  (frontend)/
    [locale]/         ← páginas traduzidas (pt default sem prefixo, /en, /fr)
    api/              ← route handlers (contact, webhooks)
    q/                ← rotas fora de [locale] precisam de layout próprio
    globals.css
  (payload)/          ← admin gerado (não editar manualmente, importMap auto)
src/
  collections/        ← schemas Payload (Users, Media, Posts, etc.)
  payload/            ← seeds e scripts (translate, seed-questionnaire)
components/
  ui/                 ← shadcn primitives
  payload/            ← custom views/links do admin
i18n/
  routing.ts request.ts navigation.ts
messages/
  pt.json en.json fr.json
lib/                  ← payload.ts (helpers DB), utils, format
site.config.ts        ← env-driven config global (contactos, social, analytics)
payload.config.ts     ← config CMS no root
next.config.ts        ← withPayload + withNextIntl + remotePatterns
middleware.ts         ← next-intl
```

## 3. Configurações críticas (não-óbvias) a replicar

1. **Pool Postgres apertado** em `payload.config.ts` — `max: 2, idleTimeoutMillis: 5000` para não saturar pooler do Supabase free.
2. **Vercel Blob:**
   - Token custom (ex. `KRIATIVA_READ_WRITE_TOKEN`) em vez do default `BLOB_READ_WRITE_TOKEN`.
   - `disablePayloadAccessControl: true` dentro da collection, não no topo do plugin.
   - `next.config.ts` precisa de `remotePatterns` para `*.public.blob.vercel-storage.com`.
3. **Importmap do Payload:** correr `npm run generate:importmap` e commitar `app/(payload)/admin/importMap.js` sempre que adicionar plugin/custom view (senão admin fica em tela preta).
4. **i18n:** `localePrefix: "as-needed"` em `i18n/routing.ts` → default sem prefixo.
5. **Rotas fora de `[locale]`** (ex. `/q/[token]`) precisam de **layout próprio** com `<html><body>` + import de `globals.css`.
6. **Páginas com `force-dynamic`** não devem exportar `generateStaticParams` — corre na build na mesma e bate na DB.
7. **Updates a arrays localizados no Payload** → enviar o array completo num só `update` por locale, com `id` preservado e todos os campos `required` preenchidos.

## 4. Scripts úteis em `package.json`

- `dev`, `build`, `start`
- `generate:importmap` — após qualquer alteração ao admin do Payload
- `generate:types` — regenera `src/payload-types.ts`
- `seed`, `translate`, `seed:questionnaire` — scripts ad-hoc com `--env-file=.env.local`

## 5. Coleções Payload típicas (reutilizáveis)

`Users` (auth) · `Media` (uploads) · `Services` · `Portfolio` · `Testimonials` · `Posts` (blog) · `QuestionnaireTemplates/Invites/Responses` (módulo de briefing).

Convenção: **labels em PT plain** (`label: "Imagem de capa"`), nomes internos em inglês (`name: "image"`).

## 6. Componentes frontend reutilizáveis (em `components/`)

`navbar`, `footer`, `hero-section`, `value-proposition`, `service-cards`, `pricing-table`, `portfolio-grid`, `testimonials`, `blog-list`, `faq-accordion`, `contact-form`, `cta-section`, `language-switcher`, `cosmic-background` (genérico), `stepper-form`.

## 7. Integrações externas a configurar por projecto

- **DNS:** A record para Vercel + A explícito para `mail.<dominio>` se houver email no host antigo (não deixar como CNAME para `@`).
- **SMTP:** host/port 465 SSL para envios transaccionais.
- **Vercel env vars:** `DATABASE_URI`, `PAYLOAD_SECRET`, `<TOKEN>_READ_WRITE_TOKEN`, `SMTP_*`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, etc. (ver `site.config.ts`).
- **GitHub:** repo público ligado à Vercel, deploy automático em push para `main`.

## 8. Admin custom

- View custom registada via `admin.components.views` (ex. `/admin/documentacao`).
- Link na sidebar via `admin.components.afterNavLinks`.
- Padrão: criar componente em `components/payload/` e referenciar pelo path `@/components/payload/...`.


Como exemplo
https://www.bakerhughes.com/