import Projects from '@/components/projects'
import PageTransition from '@/components/page-transition'
import TopNav from '@/components/top-nav'

export default function ProjectsPage() {
  return (
    <>
      <PageTransition />
      <TopNav />
      <main className="mx-auto w-full max-w-6xl">
        <Projects />
      </main>
    </>
  )
}
