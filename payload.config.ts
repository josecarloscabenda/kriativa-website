import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import sharp from "sharp"

import { Users } from "./src/collections/Users.ts"
import { Media } from "./src/collections/Media.ts"
import { Services } from "./src/collections/Services.ts"
import { Portfolio } from "./src/collections/Portfolio.ts"
import { Testimonials } from "./src/collections/Testimonials.ts"
import { Posts } from "./src/collections/Posts.ts"
import { QuestionnaireTemplates } from "./src/collections/QuestionnaireTemplates.ts"
import { QuestionnaireInvites } from "./src/collections/QuestionnaireInvites.ts"
import { QuestionnaireResponses } from "./src/collections/QuestionnaireResponses.ts"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Kriativa",
    },
    components: {
      afterNavLinks: ["@/components/payload/DocsLink"],
      views: {
        documentacao: {
          Component: "@/components/payload/DocsView",
          path: "/documentacao",
          exact: true,
          meta: { title: "Documentação" },
        },
      },
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Portfolio,
    Testimonials,
    Posts,
    QuestionnaireTemplates,
    QuestionnaireInvites,
    QuestionnaireResponses,
  ],
  editor: lexicalEditor(),
  email:
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      ? nodemailerAdapter({
          defaultFromName: process.env.PAYLOAD_EMAIL_FROM_NAME ?? "Kriativa",
          defaultFromAddress:
            process.env.PAYLOAD_EMAIL_FROM_ADDRESS ?? process.env.SMTP_USER,
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 465),
            secure: Number(process.env.SMTP_PORT ?? 465) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        })
      : undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      max: 5,
      idleTimeoutMillis: 10_000,
    },
  }),
  sharp,
  plugins: [
    // Vercel Blob storage for Media uploads. Token name is custom
    // (KRIATIVA_READ_WRITE_TOKEN) — set in Vercel project env vars and locally.
    // When the token is missing, Payload falls back to local FS (dev only).
    vercelBlobStorage({
      enabled: Boolean(process.env.KRIATIVA_READ_WRITE_TOKEN),
      collections: {
        // disablePayloadAccessControl: true tells the cloud-storage plugin to
        // store the direct Vercel Blob CDN URL on the doc.url field, instead
        // of the Payload-internal /api/media/file/... path that 404s when no
        // local FS copy exists.
        media: {
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.KRIATIVA_READ_WRITE_TOKEN,
    }),
  ],
  localization: {
    locales: [
      { label: "Português", code: "pt" },
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
    ],
    defaultLocale: "pt",
    fallback: true,
  },
})
