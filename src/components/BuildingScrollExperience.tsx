'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

// Scrub-optimized encode of /video/building.mp4 — re-encoded with a keyframe on every
// frame (see project notes) so the browser can seek to any point instantly and land on
// a sharp, correctly-decoded frame. The source clip has a single keyframe for its whole
// 10s runtime, which makes native currentTime scrubbing land on corrupted/blurry
// B-frames — this file fixes that without altering a single pixel of the footage.
const VIDEO_SRC = '/video/building-scrub.mp4'

// Sampled from the source footage's own background — keeps the page and the video
// feeling like one continuous surface instead of a video "box" sitting on a page.
const SCENE_BG = '#191a1c'

// Scroll progress (0–1) at which each story beat's copy is on screen. Chosen to match
// what actually happens in the footage: foundation → frame rising → envelope/finishing →
// completed building. Small holds at the very start/end give the intro and CTA a beat
// to breathe before/after the building starts moving.
const BEATS = [
  { from: 0, to: 0.16, align: 'left' as const },
  { from: 0.18, to: 0.42, align: 'left' as const },
  { from: 0.46, to: 0.72, align: 'right' as const },
  { from: 0.76, to: 0.92, align: 'center' as const },
  { from: 0.94, to: 1, align: 'center' as const },
]

function activeBeatIndex(progress: number) {
  for (let i = 0; i < BEATS.length; i++) {
    const beat = BEATS[i]
    const isLast = i === BEATS.length - 1
    if (progress >= beat.from && (isLast ? progress <= beat.to : progress < beat.to)) {
      return i
    }
  }
  // In a gap between beats — keep showing the nearer one rather than nothing.
  return progress < BEATS[0].from ? 0 : BEATS.length - 1
}

const HOLD_START = 0.03
const HOLD_END = 0.03

// Maps overall section scroll progress to a point in the video's own timeline, holding
// the first/last frame briefly so the intro and CTA aren't cut off mid-motion.
function progressToVideoTime(progress: number, duration: number) {
  if (duration <= 0) return 0
  if (progress <= HOLD_START) return 0
  if (progress >= 1 - HOLD_END) return duration
  const t = (progress - HOLD_START) / (1 - HOLD_START - HOLD_END)
  return t * duration
}

export default function BuildingScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const durationRef = useRef(0)
  const targetTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const [isReady, setIsReady] = useState(false)
  const [loadPct, setLoadPct] = useState(0)
  const [beatIndex, setBeatIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // One pending seek in flight at a time — never stack currentTime writes.
  const flushSeek = useCallback(() => {
    rafRef.current = null
    const video = videoRef.current
    if (!video) return
    const target = targetTimeRef.current
    if (Math.abs(video.currentTime - target) > 0.008) {
      video.currentTime = target
    }
  }, [])

  const scheduleSeek = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(flushSeek)
  }, [flushSeek])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest))

    const nextBeat = activeBeatIndex(clamped)
    setBeatIndex((prev) => (prev === nextBeat ? prev : nextBeat))

    if (!isReady || durationRef.current <= 0) return
    targetTimeRef.current = progressToVideoTime(clamped, durationRef.current)
    scheduleSeek()
  })

  // Preload the video and hold the experience until it can be scrubbed frame-accurately.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()

    const onLoadedMetadata = () => {
      durationRef.current = video.duration || 0
      // Paint the very first frame immediately so there's never a blank sticky panel.
      try {
        video.currentTime = 0
      } catch {
        // Some browsers reject a seek before enough data is buffered — ignored, the
        // 'canplaythrough'/'loadeddata' handler below still gates readiness.
      }
    }

    const onProgress = () => {
      if (!video.duration) return
      const ranges = video.buffered
      const bufferedEnd = ranges.length ? ranges.end(ranges.length - 1) : 0
      setLoadPct(Math.min(100, Math.round((bufferedEnd / video.duration) * 100)))
    }

    const onReady = () => {
      setLoadPct(100)
      setIsReady(true)
      targetTimeRef.current = progressToVideoTime(scrollYProgress.get(), durationRef.current)
      scheduleSeek()
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('progress', onProgress)
    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplaythrough', onReady)

    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('progress', onProgress)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplaythrough', onReady)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={containerRef}
      id="home-scroll-story"
      className="relative w-full"
      style={{ height: '420vh', backgroundColor: SCENE_BG }}
    >
      <div
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: SCENE_BG }}
      >
        <video
          ref={videoRef}
          className="h-full w-full"
          style={{ objectFit: 'contain', objectPosition: 'center', backgroundColor: SCENE_BG }}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        <AnimatePresence>
          {!isReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center"
              style={{ backgroundColor: SCENE_BG }}
            >
              <div className="flex flex-col items-center gap-8">
                <div className="relative h-12 w-12">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/15"
                    style={{ borderTopColor: 'rgba(215, 25, 32, 0.9)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border border-white/10"
                    style={{ borderBottomColor: 'rgba(255,255,255,0.5)' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
                    Loading Experience
                  </p>
                  <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(215,25,32,0.9) 0%, rgba(255,120,120,0.9) 100%)',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: Math.max(0.02, loadPct / 100) }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    {loadPct}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <StoryOverlay beatIndex={beatIndex} />
      </div>
    </section>
  )
}

type Align = 'center' | 'left' | 'right'

const alignClasses: Record<Align, string> = {
  center: 'items-center justify-center px-6 text-center',
  left: 'items-center justify-start px-6 text-left sm:px-10 lg:px-20',
  right: 'items-center justify-end px-6 text-right sm:px-10 lg:px-20',
}

const contentAlignClasses: Record<Align, string> = {
  center: 'items-center',
  left: 'items-start',
  right: 'items-end',
}

function StoryOverlay({ beatIndex }: { beatIndex: number }) {
  const align = BEATS[beatIndex].align

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={beatIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 flex ${alignClasses[align]}`}
        >
          <div className={`flex max-w-3xl flex-col ${contentAlignClasses[align]}`}>
            {beatIndex === 0 && <IntroCopy />}
            {beatIndex === 1 && <FeatureCopy eyebrow="01 — Structural Core" heading={<>Designed from<br />the inside out.</>} body="Every column, every beam — engineered and set in place before a single wall goes up." />}
            {beatIndex === 2 && <FeatureCopy eyebrow="02 — Layered Assembly" heading={<>Every structure<br />reveals what<br /><span className="text-white/50">makes it work.</span></>} body="From structural frame to finished façade — a system of components aligned with tolerances measured in millimetres." />}
            {beatIndex === 3 && <FinalCopy />}
            {beatIndex === 4 && <CtaCopy />}
          </div>

          {beatIndex === 0 && (
            <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-10 lg:px-20 pointer-events-auto max-w-[1440px] mx-auto w-full flex flex-col items-center">
              <div className="w-fit flex flex-col items-start">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-4 pl-2">
                  KENMOS STRUCTURAL ENGINEERING
                </p>
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:gap-16 lg:gap-24 bg-white shadow-2xl rounded-2xl py-4 px-12 md:px-20 w-fit text-black">
                  <div className="flex flex-col items-center justify-center text-center gap-0">
                    <div className="text-xl md:text-2xl font-heading font-extrabold tracking-tight leading-none">15<span className="text-[#D71920]">+</span></div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">YEARS OF EXPERIENCE</div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-0">
                    <div className="text-xl md:text-2xl font-heading font-extrabold tracking-tight leading-none">800<span className="text-[#D71920]">+</span></div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">PROJECTS COMPLETED</div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-0">
                    <div className="text-xl md:text-2xl font-heading font-extrabold tracking-tight leading-none">20<span className="text-[#D71920]">+</span></div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">EXPERT ENGINEERS</div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-0">
                    <div className="text-xl md:text-2xl font-heading font-extrabold tracking-tight leading-none">1B<span className="text-[#D71920]">+</span></div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">BIRR PROJECT VALUE HANDLED</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function IntroCopy() {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-[2px] w-12 bg-[#D71920]"></div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-[12px]">
          STRUCTURAL EXCELLENCE. LASTING IMPACT.
        </p>
      </div>
      <h1
        className="font-sans font-bold leading-[1.15] tracking-tight text-white uppercase"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3.75rem)', letterSpacing: '-0.02em' }}
      >
        ENGINEERING
        <br />
        <span className="text-[#D71920]">STRONGER</span>
        <br />
        FOUNDATIONS
      </h1>
      <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
        Kenmos Engineering delivers precise structural solutions shaped by technical expertise, responsible design, and long-term value.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
        <a href="/services" className="px-8 py-4 bg-[#D71920] text-white font-semibold hover:bg-[#be1218] transition-colors rounded-[1rem] text-xs tracking-[0.15em] uppercase flex items-center gap-2 shadow-[0_10px_20px_rgba(215,25,32,0.2)]">
          OUR SERVICES <span aria-hidden="true">&rarr;</span>
        </a>
        <a href="/projects" className="px-8 py-4 border border-white/40 text-white hover:bg-white hover:text-[#111111] transition-all duration-300 rounded-[1rem] font-semibold text-xs tracking-[0.15em] uppercase flex items-center gap-2">
          VIEW PROJECTS <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  )
}

function FeatureCopy({ eyebrow, heading, body }: { eyebrow: string; heading: React.ReactNode; body: string }) {
  return (
    <div className="max-w-md">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50 sm:text-[11px]">
        {eyebrow}
      </p>
      <h2
        className="font-heading font-medium leading-[1.1] tracking-tight text-white/90"
        style={{ fontSize: 'clamp(1.8rem, 4.2vw, 3.2rem)', letterSpacing: '-0.018em' }}
      >
        {heading}
      </h2>
      <p className="mt-6 max-w-sm text-[13.5px] leading-relaxed text-white/55 sm:text-[14.5px]">
        {body}
      </p>
    </div>
  )
}

function FinalCopy() {
  return (
    <>
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/50 sm:text-[11px]">
        03 — The Completed Structure
      </p>
      <h2
        className="font-heading font-medium leading-[1.05] tracking-tight text-white/90"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 4.4rem)', letterSpacing: '-0.02em' }}
      >
        What begins as
        <br />
        structure becomes
        <br />
        <span className="text-white/50">landmark.</span>
      </h2>
    </>
  )
}

function CtaCopy() {
  return (
    <>
      <p className="mb-8 max-w-xl text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
        Kenmos Engineering — structural design, steel construction, and end-to-end
        project delivery since 2009.
      </p>
      <div className="pointer-events-auto flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <a
          href="/projects"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D71920] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 hover:bg-[#be1218] active:scale-[0.98]"
          style={{ boxShadow: '0 14px 34px rgba(215, 25, 32, 0.28)' }}
        >
          Explore More
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 transition-all duration-200 hover:border-white/40 hover:text-white"
        >
          Start a Project
        </a>
      </div>
    </>
  )
}
