'use client'

import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Services from '@/components/ServicesFixed'

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <PageHero
        badge="Our Engineering Solutions"
        title="Consultancy Services"
        description="Trusted engineering services across structural design, construction supervision, project management, retrofit assessment, tender documentation, and BIM."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />
      <div className="pt-0">
        <Services />
      </div>
      <Footer />
    </main>
  )
}
