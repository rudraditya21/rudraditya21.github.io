import { BBH_Sans_Bogle, BBH_Sans_Bartle } from "next/font/google"
import CurvedLoop from "@/components/curved-loop"

const bbhSansBoggle = BBH_Sans_Bogle({
  weight: '400',
  subsets: ['latin']
})

const bbhSansBartle = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className="relative isolate min-h-screen background-tricolor">
      <div className="hidden md:block py-6 px-8">
        <div className="flex flex-col items-center justify-center">
          <p className={`${bbhSansBartle.className} text-center md:text-7xl lg:text-9xl `}> # ENGINEER </p>
          <div className="flex w-3xl lg:w-6xl text-md lg:text-lg items-center justify-between tracking-widest">
            <p className="">{`[ABOUT]`}</p>
            <p className="">{`[PROJECTS]`}</p>
            <p className="">{`[WORK]`}</p>
          </div>
        </div>
        <CurvedLoop
          marqueeText="Built Different. Engineered Better."
          speed={3}
          curveAmount={200}
          direction="right"
          interactive={true}
          className={`${bbhSansBoggle.className} text-md`}
        />
      </div>
    </main>
  )
}
