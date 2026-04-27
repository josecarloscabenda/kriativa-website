import type { Metadata } from "next"
import localFont from "next/font/local"
import "../globals.css"

const gugi = localFont({
  src: "../../../public/fontes/Gugi-Regular.ttf",
  variable: "--font-gugi",
  display: "swap",
  weight: "400",
})

const textMeOne = localFont({
  src: "../../../public/fontes/TextMeOne-Regular.ttf",
  variable: "--font-text-me-one",
  display: "swap",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Questionário | Kriativa",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function QuestionnaireRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <body className={`${gugi.variable} ${textMeOne.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
