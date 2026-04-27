"use client"

import { useEffect, useState } from "react"
import { useFormFields } from "@payloadcms/ui"

/**
 * Custom admin field showing the public URL of an invite with a copy button.
 * Colors use Payload's theme CSS variables so it works in both light and
 * dark mode.
 */
export default function PublicInviteUrl() {
  const token = useFormFields(([fields]) => fields?.token?.value as string | undefined)
  const [copied, setCopied] = useState(false)
  const [origin, setOrigin] = useState<string>("")

  // Read origin at runtime — independent of build-time NEXT_PUBLIC_SITE_URL.
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin)
  }, [])

  if (!token) {
    return (
      <div className="field-type ui">
        <p style={{ fontSize: 12, color: "var(--theme-elevation-500)", margin: 0 }}>
          Guarda o convite primeiro para gerar o link.
        </p>
      </div>
    )
  }

  const baseUrl = origin || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
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
          color: "var(--theme-text)",
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
            border: "1px solid var(--theme-border-color, var(--theme-elevation-150))",
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 12,
            background: "var(--theme-input-bg, var(--theme-elevation-50))",
            color: "var(--theme-text)",
          }}
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          type="button"
          onClick={copy}
          style={{
            padding: "8px 12px",
            border: "1px solid var(--theme-text)",
            background: copied ? "var(--theme-text)" : "transparent",
            color: copied ? "var(--theme-bg)" : "var(--theme-text)",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            transition: "background 120ms, color 120ms",
          }}
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <p
        style={{
          fontSize: 11,
          color: "var(--theme-elevation-500)",
          margin: "6px 0 0 0",
        }}
      >
        Envie este link ao cliente. Funciona até à data de expiração ou primeira submissão.
      </p>
    </div>
  )
}
