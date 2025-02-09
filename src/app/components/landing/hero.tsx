"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import Divider from "@/app/components/landing/divider"

import Rule from "./rule"

const DynamicParticles = dynamic(
  () => import("../particles").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
)

export function Hero() {
  const { connectionStatus } = useCurrentWallet()

  return (
    <motion.section
      id="hero"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      className="relative flex min-h-[90vh] snap-start flex-col items-center justify-center px-4"
    >
      <Rule position="bottom-right" />
      <Rule position="bottom-left" />
      <Divider />

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ rotate: 360, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image src="/dark-logo.png" width={120} height={120} alt="Logo Lolai" />
      </motion.div>

      <h1 className="font-title text-light-950 dark:text-dark-950 text-center text-5xl font-bold tracking-tight transition md:text-6xl">
        LoL<span className="ml-2 text-pink-500">AI</span>
      </h1>

      <p className="text-light-900 dark:text-dark-900 mt-6 max-w-2xl text-center text-xl transition">
        Discover your{" "}
        <span className="line-through decoration-pink-500">hidden</span> SUI
        wallet personality
        <br /> and unlock the true potential of your digital identity
      </p>
      <div className="mt-10 flex gap-4">
        {connectionStatus === "connected" ? (
          <Link
            href="#about"
            className="candy-btn group relative isolate inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
          >
            Get Started
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <ConnectButton
            connectText="Connect Wallet to Start"
            className="cursor-pointer"
          />
        )}
      </div>

      <div className="text-light-900 dark:text-dark-900 mt-14 hidden cursor-default items-center justify-start gap-3 text-xs font-medium tracking-widest uppercase transition sm:flex sm:justify-center">
        <span>Built for</span>
        <span className="group flex items-center gap-1.5">
          <span className="group-hover:text-pink-500 dark:group-hover:text-pink-500">
            Atoma Network
          </span>
        </span>
        <span>and</span>
        <span className="group flex items-center gap-1.5">
          <span className="group-hover:text-pink-500 dark:group-hover:text-pink-500">
            Sui
          </span>
        </span>
      </div>
      <DynamicParticles
        className="absolute inset-0 z-0"
        quantity={30}
        ease={10}
        color="#ffffff"
        refresh
      />
    </motion.section>
  )
}
