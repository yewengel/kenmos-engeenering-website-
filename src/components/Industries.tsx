'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { industries } from '@/lib/brand'

const Industries = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="industries"
      className="w-full bg-white/70 py-8 md:py-9 lg:py-10 overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-5 w-full text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D71920] md:text-xs">
            Sectors We Serve
          </span>

          <h2 className="mt-2 whitespace-normal text-[0.78rem] font-black leading-tight tracking-[-0.03em] text-black sm:text-[1.35rem] sm:tracking-[-0.025em] md:text-[1.7rem] lg:text-[2.05rem] xl:text-[2.4rem] 2xl:text-[2.7rem]">
            Engineering Expertise Across Diverse Industries
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {industries.map((ind) => (
            <motion.div
              key={ind.id}
              variants={cardVariants}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.08)]"
            >
              <div className="relative block h-56 w-full flex-shrink-0 overflow-hidden bg-gray-100 transition-all duration-200 sm:h-64 md:h-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-6 sm:px-5 md:px-6">
                  <h3 className="text-[13px] font-black leading-tight tracking-tight text-white md:text-base">
                    {ind.title}
                  </h3>

                  <p className="mt-1 text-[10px] font-light leading-[1.45] text-white md:text-[13px]">
                    {ind.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Industries