"use client"

import { useState } from "react"
import { useFormFields } from "@payloadcms/ui"

export default function PublicInviteUrl() {
  const token = useFormFields(([fields]) => fields?.token?.value as string | undefined)
  const [copied, setCopied] = useState(false)

  if (!token) {
    return (
      <div className="field-type ui">
        <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
          Guarda o convite primeiro para gerar o link.
        </p>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const url = `${baseUrl}/q/${token}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="field-type ui">
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6,
        }}
      >
        URL Pública
      </label>
      <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
        <input
          readOnly
          value={url}
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #d4d4d4",
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 12,
            background: "#fafafa",
          }}
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          type="button"
          onClick={copy}
          style={{
            padding: "8px 12px",
            border: "1px solid #000",
            background: copied ? "#000" : "#fff",
            color: copied ? "#fff" : "#000",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#888", margin: "6px 0 0 0" }}>
        Envie este link ao cliente. Funciona até à data de expiração ou primeira submissão.
      </p>
    </div>
  )
}
