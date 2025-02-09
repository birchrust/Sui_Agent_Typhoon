import Footer from "@/app/components/footer"
import { About } from "@/app/components/landing/about"
import Divider from "@/app/components/landing/divider"
import { Hero } from "@/app/components/landing/hero"
import { ToAnalyze } from "@/app/components/landing/to-analyze"

export default function Home() {
  return (
    <>
      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col">
        <Divider orientation="vertical" />
        <Divider orientation="vertical" className="right-auto left-0" />
        <Hero />
        <About />
        <ToAnalyze />
        <Footer />
      </main>
    </>
  )
}
