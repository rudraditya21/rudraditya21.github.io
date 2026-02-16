"use client"
import { BBH_Sans_Bogle, BBH_Sans_Bartle } from "next/font/google"
import CurvedLoop from "@/components/curved-loop"
import Link from "next/link"
import { GithubLogoIcon } from "@phosphor-icons/react"
import { buildYearGrid, getGithubOverview } from "@/lib/github"

const bbhSansBoggle = BBH_Sans_Bogle({
  weight: '400',
  subsets: ['latin']
})

const bbhSansBartle = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin']
})

const githubUsername = "rudraditya21"


export default async function Home() {
  const now = new Date()
  const currentYear = now.getUTCFullYear()
  const overview = await getGithubOverview(githubUsername, currentYear)
  const contributions = overview?.contributions ?? new Map()
  const weeks = buildYearGrid(contributions, currentYear)
  const repos = overview?.repos ?? []
  const work = [
    {
      company: "Nova Signal",
      link: "https://www.nova-signal.com/",
      start: "June 2025",
      end: "Present",
    }
  ]

  return (
    <main className="relative isolate min-h-screen background-tricolor">
      <div className="hidden md:block py-6 px-8">
        <div className="flex flex-col items-center justify-center">
          <p className={`${bbhSansBartle.className} text-center md:text-7xl lg:text-9xl `}> # ENGINEER </p>
          <div className="flex w-3xl lg:w-6xl text-md lg:text-lg items-center justify-between tracking-widest">
            <Link href="#about" className="">{`[ABOUT]`}</Link>
            <Link href="#github" className="">{`[GITHUB]`}</Link>
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
            <Link href="#github" className="">{`[GITHUB]`}</Link>
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
      <div id="github" className="flex flex-col items-center justify-start min-h-svh py-6 px-8 space-y-2">
        <p className={`${bbhSansBartle.className} text-center text-4xl md:text-7xl lg:text-9xl `}>GITHUB</p>
        <div className="flex flex-col max-w-5xl lg:max-w-7xl mt-4 md:mt-6 w-full space-y-8">
          <div className="heatmap bg-black/40 rounded-2xl p-4 md:p-6">
            <div className={`${bbhSansBoggle.className} heatmap-legend`}>
              <span className="heatmap-legend-dots">
                <span className="heatmap-cell heatmap-level-0" />
                <span className="heatmap-cell heatmap-level-1" />
                <span className="heatmap-cell heatmap-level-2" />
                <span className="heatmap-cell heatmap-level-3" />
                <span className="heatmap-cell heatmap-level-4" />
              </span>
            </div>
            <div className="heatmap-grid" aria-hidden="true">
              {weeks.map((week, weekIndex) => (
                <div className="heatmap-week" key={weekIndex}>
                  {week.map((cell, dayIndex) => (
                    <span
                      key={`${weekIndex}-${dayIndex}`}
                      className={`heatmap-cell heatmap-level-${cell.level}${cell.isEmpty ? " heatmap-empty" : ""}${cell.isFuture ? " heatmap-future" : ""}`}
                      title={
                        cell.isEmpty
                          ? undefined
                          : `${cell.date} · ${cell.count} contributions`
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <Link
                key={repo.url}
                href={repo.url}
                className={`group bg-black/40 rounded-2xl p-5 md:p-6 border border-white/5 hover:border-white/20 transition-colors ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className={`${bbhSansBartle.className} text-xl md:text-2xl`}>{repo.name}</p>
                  <span className="text-xs uppercase tracking-widest text-white/60">
                    Public
                  </span>
                </div>
                <p className={`${bbhSansBoggle.className} mt-3 text-base text-white/70`}>
                  {repo.description ?? "No description provided."}
                </p>
              </Link>
            ))}
            <Link
              href={`https://github.com/${githubUsername}`}
              className="bg-foreground text-background rounded-2xl p-5 md:p-6 flex items-end justify-between xl:col-span-1"
            >
              <p className={`${bbhSansBartle.className} text-2xl md:text-3xl`}>View More</p>
              <span className="text-xs uppercase tracking-widest">
                <GithubLogoIcon size={22} />
              </span>
            </Link>
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
