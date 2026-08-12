import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { industries } from '@/data/industries'
import Footer from '@/components/Footer'
import ProjectGallery from '@/components/ProjectGallery'

type Params = { slug: string }

export default function IndustryPage({ params }: { params: Params }) {
  const industry = industries.find((item) => item.id === params.slug)
  if (!industry) return notFound()

  const galleryImages = [industry.image]

  return (
    <main className="relative min-h-screen bg-white pt-[108px]">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-2 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-600 mb-3">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/industries">Industries</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{industry.title}</span>
        </nav>
        <div className="mb-4">
          <Link
            href="/industries"
            className="inline-flex items-center rounded bg-[#D71920] px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#be1218]"
          >
            Back to Industries
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-4 pb-6">
        <div className="grid grid-cols-2 items-start gap-8">
          <div className="min-w-0 overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-lg">
            <Image
              src={industry.image}
              alt={industry.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="min-w-0 flex flex-col justify-start gap-5">
            <div>
              <h1 className="font-heading text-3xl font-black uppercase tracking-tight text-[#111112] mb-4">{industry.title}</h1>
              <div className="space-y-3 text-sm text-gray-600">
                <p><span className="font-semibold">Market:</span> {industry.market}</p>
                <p><span className="font-semibold">Typical Project Types:</span> {industry.projectTypes.join(', ')}</p>
                <p><span className="font-semibold">Services Provided:</span> {industry.services.join(', ')}</p>
                <p><span className="font-semibold">Structural Systems:</span> {industry.structuralSystems.join(', ')}</p>
                <p><span className="font-semibold">Project Scale:</span> {industry.scale}</p>
                <p><span className="font-semibold">Design Standards:</span> {industry.standards}</p>
              </div>
            </div>

            <section className="space-y-5 text-gray-700">
              {industry.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">{paragraph}</p>
              ))}
            </section>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-[#111112] mb-4">Image Gallery</h3>
            <ProjectGallery images={galleryImages} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-600">Engineering Capabilities</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Structural Design',
                  'Construction Supervision',
                  'Project Management',
                  'Assessment & Retrofitting',
                  'BIM / Digital Engineering',
                  'Foundation Engineering',
                  'Seismic Design',
                ].map((capability) => (
                  <div key={capability} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#111112]">
                    {capability}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold text-[#111112]">Planning a project in this industry?</h3>
              <p className="mt-3 text-sm text-gray-600">Work with Kenmos Engineering for structural design, review, and construction supervision tailored to your sector.</p>
              <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#D71920] px-5 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-[#be1218]">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }))
}
