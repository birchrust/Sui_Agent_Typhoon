"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import analyticsAction from "@/actions/analytics"
import { useAtom } from "jotai/react"
import { ArrowRight } from "lucide-react"

import { resultAtom } from "../stores"
import { Input } from "./input"

const initialState = {
  success: "",
  apiError: "",
  errors: { address: "" },
  data: "",
}

export const AnalyticsForm = () => {
  const router = useRouter()
  const [currentState, actionFunction, isPending] = useActionState(
    analyticsAction,
    initialState
  )
  const [_, setResult] = useAtom(resultAtom)

  const handleSetResult = () => {
    setResult(currentState.data?.meme1)
    router.push("/view")
  }

  const meme = currentState.data ? true : false

  return (
    <form
      action={actionFunction}
      className="flex w-full flex-col items-center justify-center"
    >
      <Input
        placeholder="Enter your SUI wallet address..."
        isPending={isPending}
        currentState={currentState}
      />
      {meme && (
        <div
          onClick={handleSetResult}
          className="candy-btn cursor-pointer group relative isolate mt-4 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
        >
          Go to view
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </form>
  )
}
