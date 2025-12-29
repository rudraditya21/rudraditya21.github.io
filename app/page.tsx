import { BBH_Sans_Bogle, BBH_Sans_Bartle } from "next/font/google"
import CurvedLoop from "@/components/curved-loop"
import Link from "next/link"

const bbhSansBoggle = BBH_Sans_Bogle({
  weight: '400',
  subsets: ['latin']
})

const bbhSansBartle = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const work = [
    {
      company: "Nova Signal",
      link: "https://www.nova-signal.com/",
      start: "June 2025",
      end: "Present",
    }
  ]

  const projects = [
    {
      title: "Lattice Programming Language",
      github: "https://github.com/rudraditya21/lattice",
    },
    {
      title: "Texedo",
      github: "https://github.com/rudraditya21/texedo",
    },
    {
      title: "Aegis",
      github: "https://github.com/rudraditya21/aegis",
    },
    {
      title: "Aurora",
      github: "https://github.com/rudraditya21/aurora",
    },
  ]
  return (
    <main className="relative isolate min-h-screen background-tricolor">
      <div className="hidden md:block py-6 px-8">
        <div className="flex flex-col items-center justify-center">
          <p className={`${bbhSansBartle.className} text-center md:text-7xl lg:text-9xl `}> # ENGINEER </p>
          <div className="flex w-3xl lg:w-6xl text-md lg:text-lg items-center justify-between tracking-widest">
            <Link href="#about" className="">{`[ABOUT]`}</Link>
            <Link href="#projects" className="">{`[PROJECTS]`}</Link>
            <Link href="#work" className="">{`[WORK]`}</Link>
          </div>
        </div>
        <CurvedLoop
          marqueeText="Built Different. Engineered Better."
          speed={3}
          curveAmount={300}
          direction="right"
          interactive={true}
          className={`${bbhSansBoggle.className} text-md`}
        />
      </div>
      <div className="block md:hidden min-h-svh py-3 px-4">
        <div className="flex flex-col items-center justify-center">
          <p className={`${bbhSansBartle.className} text-center text-3xl`}> # ENGINEER </p>
          <div className="flex mt-4 justify-between w-screen text-center py-3 px-4">
            <Link href="#about" className="">{`[ABOUT]`}</Link>
            <Link href="#projects" className="">{`[PROJECTS]`}</Link>
            <Link href="#work" className="">{`[WORK]`}</Link>
          </div>
          <CurvedLoop
            marqueeText="Built Different. Engineered Better."
            speed={3}
            curveAmount={300}
            direction="right"
            interactive={true}
            className={`${bbhSansBoggle.className} text-md`}
          />
        </div>
      </div>
      <div id="about" className="flex flex-col items-center justify-center min-h-svh py-6 px-8 space-y-2">
        <p className={`${bbhSansBartle.className} text-center text-4xl md:text-7xl lg:text-9xl `}>ABOUT</p>
        <p className={`${bbhSansBoggle.className} max-w-5xl lg:max-w-7xl text-3xl lg:text-4xl text-justify`}>{`I’m not an average engineer. I work by understanding problems at their core, reasoning from first principles, and designing solutions that hold up under scale and complexity. I care about clarity, correctness, and long-term reliability over quick wins.`}</p>
      </div>
      <div id="projects" className="flex flex-col items-center justify-start min-h-svh py-6 px-8 space-y-2">
        <p className={`${bbhSansBartle.className} text-center text-4xl md:text-7xl lg:text-9xl `}>PROJECTS</p>
        <div className="flex flex-col lg:flex-row max-w-5xl lg:max-w-7xl mt-4 md:mt-6 w-full gap-6">
          <div className="flex flex-col space-y-2 w-full lg:w-1/2">
            {projects.map((project, index) => (
              <Link
                href={project.github} key={index}
                className={`${bbhSansBoggle.className} text-4xl border-b-2 border-white py-6 block w-full `}
              >
                {project.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-2 w-full lg:w-1/2 bg-foreground text-background items-end justify-end py-6 px-4">
            <Link href="https://github.com/rudraditya21" className={`${bbhSansBartle.className} text-2xl md:text-4xl lg:text-5xl`}>View More</Link>
          </div>
        </div>
      </div>
      <div id="work" className="flex flex-col items-center justify-start min-h-svh py-6 px-8 space-y-2">
        <p className={`${bbhSansBartle.className} text-center text-4xl md:text-7xl lg:text-9xl `}>WORK</p>
        <div className="flex flex-col lg:flex-row max-w-5xl lg:max-w-7xl mt-4 md:mt-6 w-full">
          <div className="flex flex-col space-y-2 w-full">
            {work.map((work, index) => (
              <Link
                href={work.link} key={index}
                className={` flex flex-col space-y-2 border-b-2 border-white py-6 w-full `}
              >
                <p className={`${bbhSansBoggle.className} text-4xl`}>{work.company}</p>
                <p className="text-md tracking-widest uppercase">{work.start} - {work.end}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
