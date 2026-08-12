'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

const processStages = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    description:
      'We meet with clients and architects to understand project requirements, site conditions, budget, constraints, objectives, and delivery expectations.',
  },
  {
    step: '02',
    title: 'Structural Analysis & Design',
    description:
      'We develop structural systems using advanced analysis, finite-element modeling, and applicable engineering codes to achieve safety, efficiency, and reliability.',
  },
  {
    step: '03',
    title: 'Design Development & Coordination',
    description:
      'We coordinate structural designs with architectural, MEP, and other project disciplines to resolve conflicts and ensure clear, buildable documentation.',
  },
  {
    step: '04',
    title: 'Value Engineering',
    description:
      'We refine structural systems, material selection, member sizing, and detailing to optimize project cost without compromising structural performance.',
  },
  {
    step: '05',
    title: 'Technical Review & Documentation',
    description:
      'We perform detailed engineering checks and produce coordinated structural drawings, calculations, specifications, and technical documentation.',
  },
  {
    step: '06',
    title: 'Construction Supervision',
    description:
      'Our engineers inspect site works throughout construction to verify workmanship, materials, reinforcement, steel fabrication, and execution against the approved design.',
  },
  {
    step: '07',
    title: 'Final Inspection & Handover',
    description:
      'We support final technical inspections, identify outstanding structural issues, and ensure the completed work meets the required engineering standards.',
  },
]

const engineeringPrinciples = [
  ['Safety First', 'Structural safety remains the foundation of every decision.'],
  ['Technical Precision', 'Designs are developed through rigorous analysis and engineering checks.'],
  ['Cost Efficiency', 'We optimize materials and structural systems without sacrificing performance.'],
  ['Clear Communication', 'We maintain coordinated communication with clients, architects, contractors, and project teams.'],
]

export default function ProcessPage() {
  return (
    <main className="relative min-h-screen bg-white">

      <PageHero
        badge="Our Work Process"
        title="Our Process"
        description="A proven four-stage methodology that delivers structural excellence from discovery through construction supervision."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Process' },
        ]}
      />

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* 1. Intro Text */}
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D71920] md:text-xs">
              Step-by-Step Delivery
            </span>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#111112] sm:text-4xl lg:text-5xl">
              How We Deliver Structural Excellence
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              From the first consultation to final site supervision, our process combines rigorous engineering analysis, practical design decisions, and disciplined project execution.
            </p>
          </div>

          {/* 2. Full-Width Illustration Panel */}
          <div className="mb-12 relative overflow-hidden rounded-[1.5rem] border border-[#E9E4DC] bg-[#F7F7F5] px-4 py-2 sm:px-6 sm:py-3 shadow-[0_18px_50px_rgba(17,17,17,0.08)] w-full">
            <div className="pointer-events-none absolute inset-x-4 inset-y-2 border border-[#D71920]/15 sm:inset-x-6 sm:inset-y-3" />
            <div className="pointer-events-none absolute left-8 top-6 h-2 w-2 bg-[#D71920] sm:left-10 sm:top-8" />
            <img
              src="/images/process_ph.jpg"
              alt="Kenmos structural engineering process"
              className="relative w-full h-[220px] md:h-[340px] block object-cover object-left rounded-[1rem]"
            />
          </div>

          {/* 3. Cards Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {processStages.map((stage) => {
              // Determine grid span class
              const isFirst = stage.step === '01';
              const spanClass = isFirst ? 'md:col-span-3' : 'col-span-1';

              return (
                <article
                  key={stage.step}
                  className={
                    `group relative flex flex-col rounded-[1rem] border border-[#E9E4DC] bg-white p-5 sm:p-6 shadow-[0_12px_30px_rgba(17,17,17,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D71920]/25 hover:shadow-[0_18px_38px_rgba(17,17,17,0.09)] h-full ` +
                    spanClass
                  }
                >
                  <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#D71920] transition-all duration-300 group-hover:w-full" />
                  <span className="text-xs font-black tracking-[0.2em] text-[#D71920] mb-2 uppercase block">
                    {stage.step}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-[#111112] sm:text-lg mb-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-start">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 flex-grow">
                    {stage.description}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-16 border-t border-[#E9E4DC] pt-10 md:mt-20 md:pt-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D71920] md:text-xs">Engineering Principles</span>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-[#111112] sm:text-3xl">The standards behind every stage.</h3>
              </div>
              <div className="hidden h-px w-24 bg-[#D71920] md:block" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {engineeringPrinciples.map(([title, description], index) => (
                <div key={title} className="relative border border-[#E9E4DC] bg-[#F7F7F5] p-5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#D71920]">0{index + 1}</span>
                  <h4 className="mt-3 text-base font-bold text-[#111112]">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 md:py-24 bg-[#D71920] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 md:gap-8">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/90">
            Ready to Start
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-tight max-w-4xl">
            Begin Your Project with Our Proven Process
          </h2>
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            From initial consultation to final site supervision, our structured approach ensures your project is delivered with precision and value.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-[#D71920] hover:bg-gray-100 text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 transition-colors"
            >
              START YOUR PROJECT
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
