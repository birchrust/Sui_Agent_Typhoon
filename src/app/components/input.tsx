"use client"

import React, { forwardRef, useCallback, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { AnimationProps, motion } from "motion/react"
import { tv } from "tailwind-variants"

import { cn } from "../utils/cn"

interface InputProps extends React.ComponentProps<"input"> {
  feedbackError?: string
  isPending?: boolean
  currentState:
    | {
        errors: {
          address?: string[] | undefined
        }
        success: string
        apiError: string
        data: string
      }
    | {
        success: string
        data: any
        errors: {
          address: string
        }
      }
}

const EIXO_X_PLACEHOLDER = 24
const STANDARD_DURATION = 0.3

const InputStyles = tv({
  slots: {
    baseStyle: `w-full h-[42px] px-3 flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 focus-within:border-neutral-300 dark:focus-within:border-neutral-200 
    bg-neutral-50 dark:bg-neutral-900 transition-all duration-200 relative data-[filled=true]:border-neutral-300 dark:data-[filled=true]:border-neutral-200`,
    inputStyle: `flex-1 h-full py-2 outline-none text-sm text-neutral-500 dark:text-neutral-300 bg-transparent relative z-10 placeholder:sr-only 
    disabled:cursor-not-allowed`,
    placeholderStyle: `text-sm text-neutral-500 absolute left-3`,
    feedbackErrorStyle: `flex items-center gap-1 text-xs text-red-300 mt-1`,
  },
  variants: {
    error: {
      true: {
        baseStyle: `border-red-300`,
      },
    },
    disabled: {
      true: {
        baseStyle: `bg-neutral-200 dark:bg-neutral-800 cursor-not-allowed`,
      },
    },
  },
})

const { baseStyle, inputStyle, placeholderStyle, feedbackErrorStyle } =
  InputStyles()

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      feedbackError = "",
      disabled,
      value,
      isPending,
      currentState,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false)
    const [internalValue, setInternalValue] = useState("")
    const hasError =
      currentState.errors.address ??
      ("apiError" in currentState ? currentState.apiError : "")
    const handle = useCallback((type: "focus" | "blur") => {
      setIsFocus(type === "focus")
    }, [])

    function observeFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
      setInternalValue(event.target.value)
    }

    const isFilled = internalValue.length > 0 || !!value
    const isFocusOrFilled = isFocus || isFilled

    const isError = feedbackError.length > 0 && !disabled

    const placeholderAnimation: AnimationProps["animate"] = isFocusOrFilled
      ? {
          x: EIXO_X_PLACEHOLDER,
          filter: "blur(4px)",
          opacity: 0,
        }
      : {
          x: 0,
        }

    return (
      <div className="w-full max-w-[360px]">
        <div
          className={baseStyle({ error: isError, disabled })}
          data-filled={isFilled}
        >
          <input
            ref={ref}
            type="text"
            name="address"
            className={cn(inputStyle(), "pr-8")}
            placeholder={placeholder}
            onFocus={() => handle("focus")}
            onBlur={() => handle("blur")}
            onChange={observeFieldChange}
            disabled={disabled}
            value={value}
            {...props}
          />
          {isPending ? (
            <div className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center gap-1">
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <motion.circle
                  cx="4"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0,
                  }}
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.2,
                  }}
                />
                <motion.circle
                  cx="20"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.4,
                  }}
                />
              </motion.svg>
            </div>
          ) : (
            <button
              type="submit"
              className="absolute top-1/2 right-2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gray-300"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <motion.path
                  d="M5 12l14 0"
                  initial={{
                    strokeDasharray: "50%",
                    strokeDashoffset: "50%",
                  }}
                  animate={{
                    strokeDashoffset: internalValue ? 0 : "50%",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </motion.svg>
            </button>
          )}

          <motion.span
            className={placeholderStyle()}
            initial={{
              x: 0,
            }}
            animate={placeholderAnimation}
            transition={{
              easings: ["easeOut"],
              duration: STANDARD_DURATION,
            }}
          >
            {placeholder}
          </motion.span>
        </div>

        {isError && (
          <motion.span
            className={feedbackErrorStyle()}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: STANDARD_DURATION,
            }}
          >
            <AlertCircle size={12} />
            {feedbackError}
          </motion.span>
        )}

        <div className="h-6">
          {hasError && (
            <motion.span
              className={cn(feedbackErrorStyle(), "truncate pl-2")}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: STANDARD_DURATION,
              }}
            >
              <AlertCircle size={12} />
              <span className="truncate">
                {currentState.errors.address ??
                  ("apiError" in currentState ? currentState.apiError : "")}
              </span>
            </motion.span>
          )}
          {currentState.data && (
            <motion.span
              className={cn(
                "mt-1 flex items-center gap-1 text-xs font-medium text-green-500",
                "truncate pl-2"
              )}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: STANDARD_DURATION,
              }}
            >
              <CheckCircle size={12} />
              <span className="truncate">Successfully submitted!</span>
            </motion.span>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"
