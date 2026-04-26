import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

const DATA_DIR = join(process.cwd(), ".data")
const LEADS_FILE = join(DATA_DIR, "leads.json")

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory may already exist
  }
}

async function readLeads(): Promise<unknown[]> {
  try {
    const data = await readFile(LEADS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await ensureDataDir()
    const leads = await readLeads()

    const lead = {
      id: `lead_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    }

    leads.push(lead)
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2))

    // TODO: Plug in email/webhook notification here
    // Option 1: Send email via nodemailer
    // Option 2: Send webhook to Make/Zapier
    // See site.config.ts for configuration

    return NextResponse.json(
      { success: true, message: "Lead registada com sucesso", id: lead.id },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro ao processar o pedido" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leads = await readLeads()
    return NextResponse.json({ leads, total: leads.length })
  } catch {
    return NextResponse.json({ leads: [], total: 0 })
  }
}
