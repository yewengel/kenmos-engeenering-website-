'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import projects from '@/data/projects'

export default function ProjectsPage() {
  const categories = ['All', 'Commercial', 'Residential', 'Institutional', 'Hospitality', 'Infrastructure']
  const [selected, setSelected] = useState('All')

  const filteredProjects =
    selected === 'All'
      ? projects
      : projects.filter((p) => p.category === selected)

  return (
    <main className="relative min-h-screen bg-white">

      <PageHero
        badge="Our Works"
        title="Engineering Projects"
        description="A selective showcase of institutional grandstands, mixed-use headquarters, and specialized structures designed and supervised by Kenmos Engineering."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
      />

      {/* Filter Bar (moved below hero on white background) */}
      <div className="mt-8 w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => {
            const isActive = selected === category

            return (
              <button
                key={category}
                onClick={() => setSelected(category)}
                className={
                  `rounded-full px-5 py-2.5 text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none ` +
                  (isActive
                    ? 'bg-[#D71920] text-white shadow-sm ring-2 ring-[#D71920]/40'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }
                aria-pressed={isActive}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-none px-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.18 } }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-400 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.08)]"
                >
                  <Link
                  href={`/projects/${project.id}`}
                  className="relative block h-56 w-full flex-shrink-0 overflow-hidden bg-gray-100 sm:h-64 md:h-72 transition-all duration-200 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-1.5 p-2.5">
                    <span className="inline-flex w-fit items-center bg-[#D71920]/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-[#D71920]">
                      {project.category}
                    </span>

                    <h2 className="min-h-[1.4rem] line-clamp-2 font-heading text-[11px] font-black uppercase leading-tight tracking-tight text-[#111112]">
                      {project.title}
                    </h2>

                    <p className="min-h-[1.4rem] line-clamp-2 whitespace-pre-line text-[10px] font-light leading-snug text-gray-500">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-0.5">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#D71920] transition-colors duration-200 hover:text-red-700"
                      >
                        Discuss Project
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}