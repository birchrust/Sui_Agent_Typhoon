import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center">
      <div className="relative flex snap-start flex-col items-center justify-center px-4">
        <Link
          href="/"
          className="candy-btn group relative isolate inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
        >
          Page not found, go back
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  )
}
