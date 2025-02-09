export function Footer({ address }: { address: string }) {
  return (
    <div className="mt-10 flex w-full items-center justify-between p-4 text-xs font-light text-white max-md:flex-col max-md:gap-2">
      <div>© Made on February 10, 2025</div>

      <div className="flex space-x-4">
        <span className="font-medium hidden lg:block text-white transition duration-300 hover:text-gray-400">
          {address}
        </span>
        <span className="font-medium lg:hidden text-white transition duration-300 hover:text-gray-400">
          {address.slice(0, 14) + "..." + address.slice(-14)}
        </span>
      </div>
    </div>
  )
}
