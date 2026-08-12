'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import { industries } from '@/lib/brand'

export default function IndustriesPage() {
const containerVariants = {
hidden: {},
visible: {
transition: {
staggerChildren: 0.1,
},
},
}

const cardVariants = {
hidden: {
opacity: 0,
y: 30,
},
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.6,
ease: 'easeOut',
},
},
}

return ( <main className="relative min-h-screen bg-white">
{/* Page Hero */}
<PageHero
badge="Sectors We Serve"
title="Industries"
description="Structural engineering expertise across diverse sectors — from commercial high-rises to heavy industrial steel structures."
breadcrumbs={[
{
label: 'Home',
href: '/',
},
{
label: 'Industries',
},
]}
/>

  {/* Industries Grid */}
  <section className="px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-none px-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {industries.map((ind) => (
          <motion.div
            key={ind.id}
            variants={cardVariants}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-400 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.08)]"
          >
            {/* Industry Image */}
            <Link
              href={`/industries/${ind.id}`}
              className="group/image relative block h-[280px] w-full overflow-hidden bg-gray-950 sm:h-[320px] md:h-[360px] transition-all duration-200 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ind.image}
                alt={ind.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-110"
              />

              {/* Dark Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

              {/* Industry Title on Image */}
              <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-8 sm:px-5">
                <h3 className="text-[13px] font-black leading-tight tracking-tight text-white md:text-base">
                  {ind.title}
                </h3>
              </div>

              {/* Arrow Button */}
              <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-[#D71920]/90 text-white shadow-[0_8px_20px_rgba(215,25,32,0.35)] transition-all duration-300 group-hover/image:bg-[#D71920]">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>

            {/* Industry Content */}
            <div className="flex flex-1 flex-col gap-1.5 p-2.5">
              <h3 className="min-h-[1.4rem] line-clamp-2 font-heading text-[11px] font-black uppercase leading-tight tracking-tight text-[#111112] transition-colors duration-200 group-hover:text-[#D71920]">
                {ind.title}
              </h3>

              <p className="min-h-[1.4rem] line-clamp-2 whitespace-pre-line text-[10px] font-light leading-snug text-gray-500">
                {ind.description}
              </p>

              {/* Explore Link */}
              <div className="mt-auto pt-0.5">
                <Link
                  href={`/industries/${ind.id}`}
                  className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#D71920] transition-colors duration-200 hover:text-red-700"
                >
                  Explore Industry
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* CTA */}
    <div className="mt-20 text-center">
      <motion.a
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full bg-[#D71920] px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-[0_14px_30px_rgba(215,25,32,0.22)] transition-all duration-300 hover:bg-[#be1218]"
      >
        DISCUSS YOUR PROJECT

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.a>
    </div>
  </section>

  {/* Footer */}
  <Footer />
</main>

)
}
