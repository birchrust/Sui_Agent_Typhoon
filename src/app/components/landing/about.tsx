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
    title: "Atoma Network",
    description:
      "Build with Atoma, a decentralized private and verifiable AI execution network. It provides the infrastructure for developers and enterprises to use open-source AI models and build AI applications with full privacy.",
  },
  {
    title: "Sui",
    description: "Sui delivers the benefits of Web3 with the ease of Web2",
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
          About LoL<span className="text-pink-500">AI </span>?
        </motion.h2>
        <div className="mt-16 grid gap-8 px-4 md:grid-cols-6">
          <div className="hidden md:block" />
          {list.map((i) => (
            <motion.div
              key={i.title}
              variants={item}
              className={cn(
                "group border-light-200 bg-light-100 dark:border-dark-200 dark:bg-dark-100 relative col-span-2 flex flex-col rounded-2xl border p-6 backdrop-blur-lg transition-all hover:border-pink-200",
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
          <div className="hidden md:block" />
        </div>
      </motion.section>
    </Sparkles>
  )
}
