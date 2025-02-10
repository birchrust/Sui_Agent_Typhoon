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
  metadataBase: new URL("https://suicasm.vercel.app"),
  title: {
    default: "Suicasm",
    template: "%s | Suicasm",
  },
  openGraph: {
    title: "Suicasm",
    description: "AI-powered humor analysis for your sui wallet - Where blockchain meets comedy!",
    url: "https://suicasm.vercel.app",
    siteName: "Suicasm",
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://suicasm.vercel.app/og.png",
        alt: "Suicasm Cover",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    title: "Suicasm",
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://suicasm.vercel.app/og.png",
        alt: "Suicasm Cover",
      },
    ],
    card: "summary_large_image",
    description: "AI-powered humor analysis for your sui wallet - Where blockchain meets comedy!",
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
