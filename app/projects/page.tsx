import Projects from '@/components/projects'
import ProjectsPageTransition from '@/components/projects-page-transition'
import TopNav from '@/components/top-nav'

export default function ProjectsPage() {
  return (
    <>
      <ProjectsPageTransition />
      <TopNav />
      <main className="mx-auto w-full max-w-6xl">
        <Projects />
      </main>
    </>
  )
}
