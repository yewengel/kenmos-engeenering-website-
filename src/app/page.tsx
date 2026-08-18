import HomeScrollStory from '@/components/home/HomeScrollStory'
import HomeContact from '@/components/home/HomeContact'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      {/* One continuous scroll story — no separate Hero. The `building`
          video is pinned and scrubbed by scroll position while engineering,
          services, projects, industries, and "why Kenmos" content dissolve
          in and out over it. It hands off into Contact below. */}
      <HomeScrollStory />
      <HomeContact />
    </main>
  )
}
