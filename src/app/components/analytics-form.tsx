"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import analyticsAction from "@/actions/analytics"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useAtom } from "jotai/react"
import { ArrowRight } from "lucide-react"

import { currenIdAtom, resultAtom } from "../stores"
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

  const [currenId, setCurrenId] = useAtom(currenIdAtom)

  const { currentWallet } = useCurrentWallet()

  const handleSetResult = () => {
    setResult(currentState.data?.meme1)
    setCurrenId(currentState.data?.resultId)

    if (currentState.data.address !== currentWallet?.accounts[0].address) {
      router.push(`/view/${currentState.data.resultId}`)
    } else {
      router.push("/view")
    }
  }

  const meme = currentState.data ? true : false

  return (
    <form
      action={actionFunction}
      className="flex w-full flex-col items-center justify-center"
    >

      <Input
        placeholder="Enter your Sui wallet address..."
        isPending={isPending}
        currentState={currentState}
      />
      {meme && (
        <div
          onClick={handleSetResult}
          className="candy-btn group relative isolate mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
        >
          Go to view
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </form>
  )
}
