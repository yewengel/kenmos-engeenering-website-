'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { aboutContent } from '@/lib/brand'

const About = () => {
  return (
    <section id="about" className="section-padding bg-transparent pt-8 sm:pt-12 md:pt-16 lg:pt-24">
      <div className="w-full max-w-none px-3 sm:px-4 lg:px-6">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.3fr_0.75fr_1fr] lg:gap-14 xl:gap-16">
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[760px] overflow-hidden rounded-[2.2rem]">
              <div className="absolute inset-0 translate-y-6 rounded-[2.2rem] border border-[#D71920]/70" />
              <div className="relative z-10 overflow-hidden rounded-[1.75rem] shadow-[0_32px_90px_rgba(17,17,17,0.14)] aspect-video bg-black">
                <video
                  src="/images/about_collage_1.mp4"
                  poster="/images/about_collage_1.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  aria-label="Kenmos Structural Engineering design collage"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center lg:items-center lg:text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#D71920]">{aboutContent.subtitle}</span>
            <h2 className="mt-4 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] text-black sm:text-[2.45rem] lg:text-[2.8rem] xl:text-[3.15rem]">
              Building the Future
              <span className="block mt-2">with Precision</span>
              <span className="block mt-2 text-[#D71920]">&amp; Integrity</span>
            </h2>
          </div>

          <div className="flex flex-col justify-center lg:pl-4">
            <div className="flex flex-col gap-5 lg:max-w-[480px]">
              <div className="flex flex-col gap-4 text-[15px] font-normal leading-8 text-gray-600 md:text-[16px]">
                {aboutContent.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pt-1">
                <motion.a whileHover={{ scale: 1.03, x: 5 }} whileTap={{ scale: 0.97 }} href="/about" className="group inline-flex items-center gap-3 rounded-full border border-[#D71920] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#D71920] transition-all duration-300 hover:bg-[#D71920] hover:text-white">
                  MORE ABOUT US
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
