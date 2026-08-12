'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import StatsBar from '@/components/StatsBar'

const Hero = () => {
  return (
    <div className="relative overflow-x-hidden">
      <section id="home" className="relative flex flex-col w-full items-center justify-start overflow-hidden bg-black pb-0 lg:h-screen lg:justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.02, x: '0%', y: '0%' }}
          animate={{
            scale: [1.02, 1.1, 1.05, 1.1, 1.02],
            x: ['0%', '-2.5%', '1.5%', '-1.25%', '0%'],
            y: ['0%', '-1.2%', '0.6%', '-0.7%', '0%']
          }}
          transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="h-full w-full"
        >
          <video
            src="/images/hero-new.MP4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            aria-hidden
            onLoadedMetadata={(e) => {
              try {
                e.currentTarget.currentTime = 0
                e.currentTarget.play()
              } catch (err) {
                // ignore autoplay/play promise errors
              }
            }}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.35)_100%)]"></div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_right,rgba(215,25,32,0.24),transparent_32%)]"></div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center px-5 pt-[calc(64px+0.5rem)] pb-[clamp(0.9rem,2.5vh,1.5rem)] sm:pt-[calc(64px+0.75rem)] sm:pb-[clamp(1.5rem,3vh,2rem)] sm:px-6 lg:pt-0 lg:py-[clamp(2.5rem,4.5vh,4.5rem)] lg:px-8">
        <div className="w-full max-w-[40rem] lg:max-w-[44rem] lg:ml-[clamp(1rem,2.5vw,2.5rem)] md:ml-[1.5rem] sm:ml-[0.75rem] ml-0">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="flex flex-col gap-[clamp(0.4rem,1.15vh,0.95rem)]">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-[#D71920]" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.35em] text-white/90">STRUCTURAL EXCELLENCE. LASTING IMPACT.</span>
            </div>

            <h1 className="text-[clamp(1.8rem,7vh,2.5rem)] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[clamp(2.5rem,8vh,4.2rem)] lg:text-[clamp(3.5rem,8.5vh,5.2rem)]">
              <span className="block">ENGINEERING</span>
              <span className="my-0.5 block text-[#D71920] md:my-1.5">STRONGER</span>
              <span className="block">FOUNDATIONS</span>
            </h1>

            <p className="max-w-xl text-xs font-light leading-relaxed text-gray-200 sm:text-sm md:text-base lg:text-[clamp(1rem,2.2vh,1.15rem)]">
              Kenmos Engineering delivers precise structural solutions shaped by technical expertise, responsible design, and long-term value.
            </p>

            <div className="mt-0 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services" prefetch={true} className="group inline-flex items-center gap-1.5 rounded-full bg-[#D71920] px-6 py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.24em] text-white shadow-[0_14px_30px_rgba(215,25,32,0.22)] transition-all duration-300 hover:bg-[#be1218] sm:px-7">
                  OUR SERVICES
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/projects" prefetch={true} className="group inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/10 px-6 py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:px-7">
                  VIEW PROJECTS
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <div className="mt-4 md:mt-5 lg:mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/35">
              Kenmos Structural Engineering
            </div>
          </motion.div>
        </div>
      </div>

        <div className="relative md:absolute inset-x-0 md:bottom-[clamp(2.25rem,5vh,3.5rem)] z-20 flex justify-start md:justify-center px-5 sm:px-6 lg:px-8 mt-2 md:mt-0">
          <div className="w-full md:w-[88%] lg:w-[85%] max-w-[1100px]">
            <StatsBar />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
