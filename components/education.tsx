'use client'

type School = {
  institution: string
  degree: string
  period: string
}

const schools: School[] = [
  {
    institution: 'Vellore Institute of Technology',
    degree: 'Bachelor of Technology – Computer Science',
    period: 'Sep 2022 – Aug 2026',
  },
  {
    institution: 'Amity International School, Sec 46 Gurugram',
    degree: 'High School Education',
    period: 'Apr 2009 – Apr 2022',
  },
]

function SchoolEntry({ school }: { school: School }) {
  return (
    <div className="py-8 lg:py-10">
      <div className="flex flex-col gap-1">
        <p className="text-xl leading-snug text-foreground sm:text-2xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {school.institution}
        </p>
        <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.degree}
        </p>
        <p className="mt-1 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.period}
        </p>

      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Education
      </h2>

      <div className="divide-y divide-border">
        {schools.map((school) => (
          <SchoolEntry key={school.institution} school={school} />
        ))}
      </div>
    </section>
  )
}
