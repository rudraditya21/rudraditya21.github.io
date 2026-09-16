'use client'

import { useInView } from '@/hooks/use-in-view'

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

function SchoolEntry({ school, index }: { school: School; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-2xl bg-foreground p-6 text-background sm:p-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xl leading-snug sm:text-2xl" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {school.institution}
        </p>
        <p className="text-sm text-background/80" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.degree}
        </p>
        <p className="mt-1 text-xs text-background/60" style={{ fontFamily: 'var(--font-inter)' }}>
          {school.period}
        </p>

      </div>
    </div>
  )
}

export default function Education() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="px-12 py-16 md:py-24">
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className="mb-10 whitespace-nowrap leading-[0.88] tracking-tight text-[clamp(1.15rem,calc((100vw-20rem)/18),3rem)]"
        style={{
          fontFamily: 'var(--font-unbounded)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Education
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {schools.map((school, i) => (
          <SchoolEntry key={school.institution} school={school} index={i} />
        ))}
      </div>
    </section>
  )
}
