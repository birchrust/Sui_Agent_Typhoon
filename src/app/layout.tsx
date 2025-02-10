import type { Metadata } from "next"
import { Asap, Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

import "./globals.css"
import "@mysten/dapp-kit/dist/index.css"
import "react-tooltip/dist/react-tooltip.css"

import { ThemeProvider } from "next-themes"

import { Providers } from "./components/providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})
const asap = Asap({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-asap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lolai.vercel.app"),
  title: {
    default: "LoLAI",
    template: "%s | LoLAI",
  },
  openGraph: {
    title: "LoLAI",
    description: "LoLAI - AI Agent for Atoma Network",
    url: "https://lolai.vercel.app",
    siteName: "LoLAI",
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://LoLAI.dev/og.png",
        alt: "LoLAI Cover",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    title: "LoLAI",
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://LoLAI.dev/og.png",
        alt: "LoLAI Cover",
      },
    ],
    card: "summary_large_image",
    description: "LoLAI - AI Agent for Atoma Network",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

type ComponentPageLayout = {
  children: React.ReactNode
}

export default function RootLayout({ children }: ComponentPageLayout) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${asap.variable} ${inter.className} bg-light-50 dark:bg-dark-50 antialiased transition-colors`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
