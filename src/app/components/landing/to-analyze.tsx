"use client"

import dynamic from "next/dynamic"
import { motion } from "motion/react"

import Divider from "@/app/components/landing/divider"

import { AnalyticsForm } from "../analytics-form"
import Rule from "./rule"

const DynamicParticles = dynamic(
  () => import("../particles").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
)

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

export function ToAnalyze() {
  return (
    <motion.section
      id="to-analyze"
      className="relative snap-start min-h-[50vh] w-full flex-1 px-4 py-24"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Rule position="bottom-right" />
      <Rule position="bottom-left" />
      <Divider />
      <motion.h2
        variants={item}
        className="font-title text-light-950 dark:text-dark-950 text-center text-3xl font-bold transition"
      >
        To Analyze
      </motion.h2>
      <div className="mx-auto mt-16 flex max-w-3xl justify-center space-y-8">
        <AnalyticsForm />
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
