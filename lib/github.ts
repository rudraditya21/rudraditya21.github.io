const contributionLevelMap: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export type ContributionCell = {
  date: string
  level: number
  count: number
  isEmpty: boolean
  isFuture: boolean
}

export type RepoItem = {
  name: string
  description: string | null
  url: string
}

export type GithubOverview = {
  contributions: Map<string, { level: number; count: number }>
  repos: RepoItem[]
}

export async function getGithubOverview(
  username: string,
  year: number
): Promise<GithubOverview | null> {
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
        pinnedItems(first: 4, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
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
      const repos = payload.data.user.pinnedItems.nodes.map(
        (repo: { name: string; description: string | null; url: string }) => ({
          name: repo.name,
          description: repo.description,
          url: repo.url,
        })
      )
      return {
        contributions: data,
        repos,
      }
    } catch {
      continue
    }
  }
  return null
}

export function buildYearGrid(
  data: Map<string, { level: number; count: number }>,
  year: number
) {
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
