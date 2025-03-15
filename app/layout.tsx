import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "João Moitinho | Desenvolvedor & Designer",
  description:
    "Portfólio de João Moitinho, desenvolvedor web full stack e designer gráfico especializado em criar experiências digitais envolventes com tecnologias web modernas.",
  metadataBase: new URL("https://portfolio-moitinho.vercel.app"),
  keywords: ["desenvolvedor", "designer", "portfólio", "desenvolvimento web", "frontend", "UI/UX", "React", "Next.js"],
  authors: [{ name: "João Moitinho" }],
  creator: "João Moitinho",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portfolio-moitinho.vercel.app/",
    title: "João Moitinho | Desenvolvedor & Designer",
    description:
      "Portfólio de João Moitinho, desenvolvedor web full stack e designer gráfico especializado em criar experiências digitais envolventes com tecnologias web modernas.",
    siteName: "João Moitinho",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "João Moitinho Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "João Moitinho | Desenvolvedor & Designer",
    description:
      "Portfólio de João Moitinho, desenvolvedor web full stack e designer gráfico especializado em criar experiências digitais envolventes com tecnologias web modernas.",
    creator: "@eumoitinho",
    images: ["https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'