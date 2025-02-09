import type { Metadata } from "next"
import { Asap, Inter } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import "@mysten/dapp-kit/dist/index.css"

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
  metadataBase: new URL("https://lolai.vercel.app/"),
  title: {
    default: "LoLAI",
    template: "%s | LoLAI",
  },
  description: "A collection of awesome test components with smooth animations",
  keywords: [
    "components, Smooth animations, Awesome test components, motion, motion, Interactive components",
  ],
  openGraph: {
    title: "LoLAI",
    description:
      "A collection of awesome test components with smooth animations",
    url: "https://lolai.vercel.app/",
    siteName: "LoLAI",
    images: [
      {
        width: 1920,
        height: 1080,
        url: "https://lolai.vercel.app/og.jpg",
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
        url: "https://LoLAI.dev/og.jpg",
        alt: "LoLAI Cover",
      },
    ],
    card: "summary_large_image",
    description:
      "A collection of awesome test components with smooth animations",
    site: "@educalvolpz",
    creator: "Eduardo Calvo",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${asap.variable} ${inter.className} bg-light-50 dark:bg-dark-50 antialiased transition-colors`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Providers>
            {children}

            <Toaster
              offset={{ bottom: "76px" }}
              mobileOffset={{ bottom: "76px" }}
              position="bottom-center"
              visibleToasts={1}
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast:
                    "dark:bg-dark-300 bg-light-50 rounded-lg p-4 border border-light-500 dark:border-dark-500 text-xs shadow-xs w-full",
                },
              }}
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
