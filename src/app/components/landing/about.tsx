"use client"

import { motion } from "motion/react"

import Divider from "@/app/components/landing/divider"
import { cn } from "@/app/utils/cn"

import { Sparkles } from "../sparkles"
import Rule from "./rule"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const list = [
  {
    title: "AI-Powered Analysis",
    description:
      "Using Atoma Network's advanced AI capabilities, Suicasm analyzes your Sui wallet and generates witty, personalized insights. Our AI understands blockchain patterns and turns them into entertaining observations.",
  },
  {
    title: "Privacy First",
    description: "Built on Atoma Network's secure infrastructure, your wallet analysis is completely private and verifiable. We believe humor shouldn't compromise security.",
  },
  {
    title: "Sui Integration",
    description: "Seamlessly connects with Sui blockchain, providing real-time analysis of your wallet. Experience the perfect blend of blockchain technology and entertainment.",
  },
]

export function About() {
  return (
    <Sparkles>
      <motion.section
        id="about"
        className="relative snap-start mx-auto max-w-7xl px-4 py-24 text-base"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Rule position="bottom-right" />
        <Rule position="bottom-left" />
        <Divider />
        <motion.h2
          className="font-title text-light-950 dark:text-dark-950 text-center text-3xl font-bold transition"
          variants={item}
        >
          About Sui<span className="text-pink-500">casm</span>
        </motion.h2>
        <div className="mt-16 grid gap-8 px-4 md:grid-cols-3">
          {list.map((i) => (
            <motion.div
              key={i.title}
              variants={item}
              className={cn(
                "group border-light-200 bg-light-100 dark:border-dark-200 dark:bg-dark-100 relative flex flex-col rounded-2xl border p-6 backdrop-blur-lg transition-all hover:border-pink-200",
                "box-light dark:box-light"
              )}
            >
              <h3 className="text-light-950 group-hover:text-light-50 dark:text-dark-950 mb-2 text-xl font-semibold transition">
                {i.title}
              </h3>
              <p className="text-light-900 group-hover:text-light-50 dark:text-dark-900 group-hover:dark:text-dark-950 transition">
                {i.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Sparkles>
  )
}
