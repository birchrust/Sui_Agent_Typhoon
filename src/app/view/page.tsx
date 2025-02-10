"use client"

import localFont from "next/font/local"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useAtom } from "jotai/react"
import { motion } from "motion/react"

import { FloatNav } from "../components/floatNav"
import { Footer } from "../components/view/footer"
import { Header } from "../components/view/header"
import { Publish } from "../components/view/publish"
import { resultAtom } from "../stores"
import { cn } from "../utils/cn"

const merriweatherFont = localFont({
  src: "../../../public/fonts/Merriweather-Italic.ttf",
})

export default function ViewPage() {
  const [result] = useAtom(resultAtom)
  const { currentWallet } = useCurrentWallet()

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url(/img/bg-home.jpeg)",
        backgroundSize: "auto 100%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className={cn(
          "from-opacity-10 absolute inset-0 flex min-h-screen flex-col items-start justify-between bg-black/30 bg-gradient-to-br to-transparent p-6 shadow-lg backdrop-blur-2xl",
          merriweatherFont.className
        )}
      >
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 1,
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="flex h-full items-center flex-row justify-center px-8 leading-loose text-balance max-lg:flex-col-reverse max-lg:px-4 max-md:gap-16 lg:w-2/3 xl:text-2xl"
        >
          {result ? result : "Not result yet"}
        </motion.div>
        <Footer address={currentWallet?.accounts[0].address ?? ""} />
      </div>
      <FloatNav />
    </div>
  )
}
