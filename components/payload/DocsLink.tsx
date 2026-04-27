"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"

/**
 * Sidebar link to the admin documentation page.
 * Rendered via admin.components.afterNavLinks.
 */
export default function DocsLink() {
  return (
    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--theme-elevation-100)" }}>
      <Link
        href="/admin/documentacao"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          fontSize: 13,
          color: "var(--theme-text)",
          textDecoration: "none",
          borderRadius: 4,
          transition: "background 120ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--theme-elevation-100)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
        }}
      >
        <BookOpen size={16} />
        <span>Documentação</span>
      </Link>
    </div>
  )
}
