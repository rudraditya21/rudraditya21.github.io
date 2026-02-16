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

const githubUsername = "rudraditya21"

type ContributionCell = {
  date: string
  level: number
  count: number
  isEmpty: boolean
  isFuture: boolean
}

const contributionLevelMap: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

async function getGithubContributions(username: string, year: number) {
  const token = process.env.PERSONAL_ACCESS_TOKEN
  if (!token) {
    return null
  }
  const query = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `
  const variables = {
    userName: username,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  }

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-site",
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 * 60 * 12 },
      })

      if (!response.ok) {
        continue
      }
      const payload = await response.json()
      if (payload.errors || !payload.data?.user) {
        continue
      }
      const days =
        payload.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
          (week: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
            week.contributionDays
        )
      const data = new Map<string, { level: number; count: number }>()
      for (const day of days) {
        data.set(day.date, {
          level: contributionLevelMap[day.contributionLevel] ?? 0,
          count: day.contributionCount,
        })
      }
      return data
    } catch {
      continue
    }
  }
  return null
}

function buildYearGrid(data: Map<string, { level: number; count: number }>, year: number) {
  const start = new Date(Date.UTC(year, 0, 1))
  const end = new Date(Date.UTC(year, 11, 31))
  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const startDay = start.getUTCDay()
  const weeks: ContributionCell[][] = []
  let currentWeek: ContributionCell[] = []

  for (let i = 0; i < startDay; i += 1) {
    currentWeek.push({
      date: "",
      level: 0,
      count: 0,
      isEmpty: true,
      isFuture: false,
    })
  }

  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const date = d.toISOString().slice(0, 10)
    const entry = data.get(date)
    const level = entry ? entry.level : 0
    const count = entry ? entry.count : 0
    const isFuture = d > today
    currentWeek.push({
      date,
      level,
      count,
      isEmpty: false,
      isFuture,
    })
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: "",
        level: 0,
        count: 0,
        isEmpty: true,
        isFuture: false,
      })
    }
    weeks.push(currentWeek)
  }

  return weeks
}

export default async function Home() {
  const now = new Date()
  const currentYear = now.getUTCFullYear()
  const contributions = (await getGithubContributions(githubUsername, currentYear)) ?? new Map()
  const weeks = buildYearGrid(contributions, currentYear)
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
            <Link href="#github" className="">{`[GITHUB]`}</Link>
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
            <Link href="#github" className="">{`[GITHUB]`}</Link>
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
      <div id="github" className="flex flex-col items-center justify-start min-h-svh py-6 px-8 space-y-2">
        <p className={`${bbhSansBartle.className} text-center text-4xl md:text-7xl lg:text-9xl `}>GITHUB</p>
        <div className="flex flex-col max-w-5xl lg:max-w-7xl mt-4 md:mt-6 w-full">
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
        </div>
      </div>
    </main>
  )
}
