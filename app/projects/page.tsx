import Projects from '@/components/projects'
import TopNav from '@/components/top-nav'

export default function ProjectsPage() {
  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-6xl">
        <Projects />
      </main>
    </>
  )
}
