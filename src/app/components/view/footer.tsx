"use client"

import { useCurrentWallet } from "@mysten/dapp-kit"

export function Footer({ address }: { address?: string | undefined }) {
  const { currentWallet } = useCurrentWallet()

  const currentAddress = address
    ? address
    : (currentWallet?.accounts[0].address ?? "")

  return (
    <div className="mt-10 flex w-full items-center justify-between p-4 text-xs font-light text-white max-md:flex-col max-md:gap-2">
      <div>© Made on February 10, 2025</div>
      {currentAddress && (
        <div className="flex space-x-4">
          <span className="hidden font-medium text-white transition duration-300 hover:text-gray-400 lg:block">
            {currentAddress}
          </span>
          <span className="font-medium text-white transition duration-300 hover:text-gray-400 lg:hidden">
            {currentAddress.slice(0, 14) + "..." + currentAddress.slice(-14)}
          </span>
        </div>
      )}
    </div>
  )
}
