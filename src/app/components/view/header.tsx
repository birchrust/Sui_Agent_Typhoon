"use client"

import { format } from "date-fns"
import { motion } from "motion/react"
import { TypeAnimation } from "react-type-animation"

export const Header = () => {
  return (
    <motion.div
      initial={{ top: 300, opacity: 0 }}
      animate={{ top: 0, opacity: 1 }}
      exit={{ top: -300, opacity: 0 }}
      className="relative mb-20 flex w-full flex-col items-center"
    >
      <div className="m-auto w-full p-0 sm:p-4">
        <header className="flex w-full items-center justify-between">
          <ul>
            <li>
              <span className="fixed font-mono text-sm font-bold text-white">
                <TypeAnimation
                  sequence={[
                    "Hi, welcome!",
                    1000,
                    "",
                    "Today is " + format(new Date(), "EEEE, do"),
                    1000,
                  ]}
                  style={{ fontFamily: "Roboto mono" }}
                  wrapper="span"
                  speed={30}
                  repeat={Infinity}
                />
              </span>
            </li>
          </ul>
        </header>
      </div>
    </motion.div>
  )
}
