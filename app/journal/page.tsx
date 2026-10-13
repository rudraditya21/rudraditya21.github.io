
import PageTransition from '@/components/page-transition'
import Publications from '@/components/publications'
import TopNav from '@/components/top-nav'

export default function JournalPage() {
  return (
    <>
      <PageTransition />
      <TopNav />
      <main className="mx-auto w-full max-w-6xl">
        <Publications />
      </main>
    </>
  )
}
