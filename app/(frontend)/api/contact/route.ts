import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { getPayloadClient } from "@/lib/payload"

const DATA_DIR = join(process.cwd(), ".data")
const CONTACTS_FILE = join(DATA_DIR, "contacts.json")

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

interface ContactBody {
  name?: string
  email?: string
  whatsapp?: string
  subject?: string
  message?: string
}

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory may already exist
  }
}

async function readContacts(): Promise<unknown[]> {
  try {
    const data = await readFile(CONTACTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function notify(contact: ContactBody & { id: string }) {
  const notifyTo = process.env.PAYLOAD_EMAIL_NOTIFY
  if (!notifyTo) return

  try {
    const payload = await getPayloadClient()
    const html = `
<!DOCTYPE html>
<html lang="pt"><body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#fff;border:1px solid #e8e8e8;">
        <tr><td style="padding:32px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#666;">Nova mensagem</p>
          <h1 style="margin:0;font-size:22px;color:#000;">${escapeHtml(contact.subject ?? "(sem assunto)")}</h1>
          <p style="margin:14px 0 0 0;font-size:14px;color:#333;">
            <strong style="color:#000;">${escapeHtml(contact.name ?? "(sem nome)")}</strong>
            &middot; <a href="mailto:${escapeHtml(contact.email ?? "")}" style="color:#000;">${escapeHtml(contact.email ?? "")}</a>
            ${contact.whatsapp ? ` &middot; ${escapeHtml(contact.whatsapp)}` : ""}
          </p>
          <p style="margin:24px 0 0 0;font-size:14px;line-height:1.6;color:#333;white-space:pre-wrap;">${escapeHtml(contact.message ?? "")}</p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#fafafa;font-size:11px;color:#999;text-align:center;">
          Kriativa &middot; Conectando Mundos
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`.trim()

    await payload.sendEmail({
      to: notifyTo,
      subject: `[Kriativa] Contacto: ${contact.subject ?? "sem assunto"} (${contact.name ?? "sem nome"})`,
      html,
      text: [
        `Nova mensagem do site — ${contact.subject ?? ""}`,
        `De: ${contact.name ?? "(sem nome)"} <${contact.email ?? "(sem email)"}>${contact.whatsapp ? ` ${contact.whatsapp}` : ""}`,
        "",
        contact.message ?? "",
      ].join("\n"),
      replyTo: contact.email,
    })
  } catch (err) {
    console.error("[contact] failed to send notification:", err)
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody

    await ensureDataDir()
    const contacts = await readContacts()

    const contact = {
      id: `contact_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    }

    contacts.push(contact)
    await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2))

    // Send notification email (best effort — does not block the response).
    notify(contact).catch(() => {})

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso", id: contact.id },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao processar a mensagem" },
      { status: 500 }
    )
  }
}
