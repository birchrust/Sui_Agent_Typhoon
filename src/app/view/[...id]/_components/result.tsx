"use client"

import { motion } from "motion/react"

export const Result = ({ text }: { text?: string | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 1,
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="flex h-full flex-row items-center justify-center px-8 leading-loose text-balance max-lg:flex-col-reverse max-lg:px-4 max-md:gap-16 lg:w-2/3 xl:text-2xl"
    >
      {text ? text : "Not result yet"}
    </motion.div>
  )
}
