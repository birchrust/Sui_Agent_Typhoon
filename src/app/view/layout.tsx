import localFont from "next/font/local"

import { FloatNav } from "../components/floatNav"
import { Header } from "../components/view/header"
import { cn } from "../utils/cn"

type Props = {
  children: React.ReactNode
}

const merriweatherFont = localFont({
  src: "../../../public/fonts/Merriweather-Italic.ttf",
})

export default function Layout({ children }: Props) {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url(/img/bg-home.jpeg)",
        backgroundSize: "auto 100%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className={cn(
          "from-opacity-10 absolute inset-0 flex min-h-screen flex-col items-start justify-between bg-black/30 bg-gradient-to-br to-transparent p-6 shadow-lg backdrop-blur-2xl",
          merriweatherFont.className
        )}
      >
        <Header />
        {children}
      </div>
      <FloatNav />
    </div>
  )
}
