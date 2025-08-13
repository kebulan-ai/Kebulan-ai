import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { AuthProvider } from "@/components/auth/auth-provider"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Kebulan.ai - AI-Powered App Creation Platform",
  description:
    "Empower your vision with AI-driven app creation. Craft innovative applications with cultural relevance and cutting-edge technology.",
  generator: "Kebulan.ai",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
