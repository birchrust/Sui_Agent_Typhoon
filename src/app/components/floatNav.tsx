"use client"

import Link from "next/link"
import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit"
import { useAtom } from "jotai"
import { Component } from "lucide-react"
import { Tooltip } from "react-tooltip"

import { urlAtom } from "../stores"
import { Publish } from "./view/publish"

export function FloatNav() {
  const [url] = useAtom(urlAtom)
  const { connectionStatus } = useCurrentWallet()
  return (
    <nav
      className="border-light-900/20 bg-light-50/70 text-light-950 dark:border-dark-900/20 dark:bg-dark-50/50 dark:text-dark-950 fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-full border px-4 py-2 bg-blend-luminosity shadow-xs backdrop-blur-xl transition"
      aria-label="Floating Navigation"
    >
      {connectionStatus !== "connected" ? (
        <div className="cursor-not-allowed opacity-50">
          <div
            data-tooltip-id="connect-wallet"
            data-tooltip-content="Connect wallet on homepage to publish"
          >
            <Publish />
          </div>
          <Tooltip id="connect-wallet" offset={16} />
        </div>
      ) : (
        <Publish />
      )}
      {url && (
        <Link
          href={url}
          aria-label="Documentation"
          data-tooltip-id="publish"
          data-tooltip-content="Publish to walrus"
          className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1 hover:text-pink-500"
        >
          <Component size={24} aria-hidden="true" />
          <Tooltip id="publish" offset={16} />
        </Link>
      )}
    </nav>
  )
}
