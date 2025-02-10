"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit"
import { useAtom } from "jotai"
import { Component } from "lucide-react"
import { Tooltip } from "react-tooltip"

import { currenIdAtom, urlAtom } from "../stores"
import { Publish } from "./view/publish"

export function FloatNav() {
  const [url] = useAtom(urlAtom)
  const [currenId] = useAtom(currenIdAtom)
  const { connectionStatus } = useCurrentWallet()

  const pathname = usePathname()
  return (
    <nav
      className="border-light-900/20 bg-light-50/70 text-light-950 dark:border-dark-900/20 dark:bg-dark-50/50 dark:text-dark-950 fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-full border px-4 py-2 bg-blend-luminosity shadow-xs backdrop-blur-xl transition"
      aria-label="Floating Navigation"
    >
      <Link
        href={`https://twitter.com/intent/tweet?url=https://suicasm.vercel.app/view/${currenId}`}
        aria-label="Share on X"
        data-tooltip-id="share"
        data-tooltip-content="Share on X"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="fill-light-950 dark:fill-dark-950 hover:fill-pink-500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="X Icon"
        >
          <path d="M14.773 2.5h2.545l-5.56 6.354 6.54 8.646h-5.12l-4.01-5.244-4.59 5.244H2.032l5.946-6.796L1.704 2.5h5.25l3.626 4.793L14.773 2.5zm-.893 13.477h1.41L6.19 3.943H4.676l9.204 12.034z"></path>
        </svg>
        <Tooltip id="share" offset={16} />
      </Link>
      {/* {connectionStatus !== "connected" ? (
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
      )} */}
    </nav>
  )
}
