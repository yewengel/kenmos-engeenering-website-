'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { brand } from '@/lib/brand'

/**
 * ONE CONTINUOUS SCROLL STORY.
 *
 * There is no Hero, no stacked content sections. This single component IS
 * the homepage from the first pixel down to the hand-off into Contact.
 *
 *   scroll container (tall track, gives the timeline room to play out)
 *   │
 *   ├── sticky viewport (pinned full-screen stage)
 *   │   └── building video — a scrubbing source, not an autoplay video
 *   │
 *   └── scroll distance through the track === animation progress
 *
 * MECHANISM — one scroll system, one master progress value, driving both
 * the building AND the text from the same number every frame:
 *
 *   window scroll (passive listener, just "wakes" the loop)
 *         -> read the track's position directly from the DOM (getBoundingClientRect)
 *         -> that IS master progress (0 -> 1), no other system computes it
 *         -> requestAnimationFrame loop
 *         -> current += (target - current) * smoothing   (smooth interpolation,
 *            time-normalized so it feels identical at 60Hz, 120Hz, or a
 *            throttled tab — see SCRUB_SMOOTHING below)
 *         -> video.currentTime = current * duration          <- building
 *         -> text panel opacity / transform from `current`   <- text
 *         -> both painted in the SAME function, from the SAME `current`,
 *            in the SAME frame — there is no way for them to drift apart.
 *
 * No React state is ever touched by scrolling — not for progress, not for
 * the pin/release swap, not for the video, not for the text. Nothing here
 * re-renders while the user scrolls; the loop only writes `style.opacity` /
 * `style.transform` / `video.currentTime` directly. The video element is
 * mounted once and never remounted, re-keyed, or has its `src` touched
 * again; `play()` / `pause()` are called exactly once, on mount, purely to
 * unlock scrubbing — never during scroll.
 */

// ---------------------------------------------------------------------------
// Timeline: 5 equal 20% stages, each one beat of [inStart, inEnd, outStart,
// outEnd] in master progress (0 -> 1) — text fades/rises in over
// [inStart,inEnd], holds while the building keeps transforming underneath
// it, then fades/lifts out over [outStart,outEnd] as the NEXT stage begins.
//
// Beats are carved from contiguous, non-overlapping 20% slots with a small
// dead gap at every boundary (outEnd of one beat < inStart of the next).
// That gap is what guarantees no text stacking: stage N is fully at
// opacity 0 before stage N+1 starts rising from 0 — there is never a
// scroll position where two stages are both visible, and the transition
// always lands where the building is between structural states, not mid-
// state.
// ---------------------------------------------------------------------------
const GAP = 0.015
const FADE_IN = 0.04
const FADE_OUT = 0.04

/** A contiguous [start, end) slot -> a non-overlapping 4-point beat inside it. */
function slotToBeat(start: number, end: number): [number, number, number, number] {
  return [start + GAP, start + GAP + FADE_IN, end - GAP - FADE_OUT, end - GAP]
}

// Five perfect 20% blocks, mapped directly to the building's own structural
// progression — stage N owns exactly the scroll range where the building
// moves from state N to state N+1.
const SLOT_1: [number, number] = [0, 0.2]
const SLOT_2: [number, number] = [0.2, 0.4]
const SLOT_3: [number, number] = [0.4, 0.6]
const SLOT_4: [number, number] = [0.6, 0.8]
const SLOT_5: [number, number] = [0.8, 1]

const BEAT_1 = slotToBeat(...SLOT_1)
const BEAT_2 = slotToBeat(...SLOT_2)
const BEAT_3 = slotToBeat(...SLOT_3)
const BEAT_4 = slotToBeat(...SLOT_4)
// Stage 5 is the closing statement: fades in and holds through to the very
// end (there's nothing after it but the whiteout into Contact).
const BEAT_5_IN: [number, number] = [SLOT_5[0] + GAP, SLOT_5[0] + GAP + FADE_IN]

const WHITEOUT_RANGE: [number, number] = [0.94, 1]

// Scrim over the video, keyed to the same five stages — a touch darker
// while a stage's text is fully held (for legibility), a touch lighter in
// the gaps between stages so the building's own transformation reads
// clearly with nothing competing for attention.
const OVERLAY_INPUT = [
  0, 0.055, 0.145, 0.185, 0.255, 0.345, 0.385, 0.455, 0.545, 0.585, 0.655,
  0.745, 0.785, 0.855, 0.94, 1,
]
const OVERLAY_OUTPUT = [
  0.42, 0.42, 0.42, 0.46, 0.5, 0.5, 0.46, 0.5, 0.5, 0.46, 0.5, 0.5, 0.46,
  0.46, 0.5, 0.7,
]

// ---------------------------------------------------------------------------
// Pure math + DOM painting helpers. No hooks, no React state, no framer
// motion — plain functions called from inside the one rAF loop below.
// ---------------------------------------------------------------------------

/** Piecewise-linear interpolation across arbitrary (xs, ys) keyframes. */
function piecewiseLinear(x: number, xs: readonly number[], ys: readonly number[]): number {
  const n = xs.length
  if (n === 0) return 0
  if (x <= xs[0]) return ys[0]
  if (x >= xs[n - 1]) return ys[n - 1]
  for (let i = 0; i < n - 1; i++) {
    if (x >= xs[i] && x <= xs[i + 1]) {
      const span = xs[i + 1] - xs[i]
      const t = span === 0 ? 0 : (x - xs[i]) / span
      return ys[i] + (ys[i + 1] - ys[i]) * t
    }
  }
  return ys[n - 1]
}

// Most of the handful of painted elements sit unchanged at their resting
// value (0) at any given scroll position — only the current stage is
// actually moving. These caches skip the DOM write when the computed value
// hasn't changed, so a frame only ever touches style on what's genuinely
// animating right now, leaving more headroom for the video seek itself.
const lastOpacity = new WeakMap<HTMLElement, string>()
const lastTransform = new WeakMap<HTMLElement, string>()

function setOpacity(el: HTMLElement, value: number) {
  const next = value.toFixed(4)
  if (lastOpacity.get(el) === next) return
  el.style.opacity = next
  lastOpacity.set(el, next)
}

function setTransform(el: HTMLElement, value: string) {
  if (lastTransform.get(el) === value) return
  el.style.transform = value
  lastTransform.set(el, value)
}

function applyOpacity(el: HTMLElement | null, progress: number, xs: readonly number[], ys: readonly number[]) {
  if (!el) return
  setOpacity(el, piecewiseLinear(progress, xs, ys))
}

/** Fade-out -> slight upward movement -> fade-in, the standard stage beat. */
function applyBeat(el: HTMLElement | null, progress: number, range: readonly number[], distance = 26) {
  if (!el) return
  const opacity = piecewiseLinear(progress, range, [0, 1, 1, 0])
  const y = piecewiseLinear(progress, range, [distance, 0, 0, -distance])
  setOpacity(el, opacity)
  setTransform(el, `translate3d(0, ${y.toFixed(2)}px, 0)`)
}

/** Closing statement: fades/rises in, then holds (no fade-out). */
function applyClosing(el: HTMLElement | null, progress: number, range: readonly [number, number], distance = 22) {
  if (!el) return
  const opacity = piecewiseLinear(progress, [range[0], range[1], 1], [0, 1, 1])
  const y = piecewiseLinear(progress, range, [distance, 0])
  setOpacity(el, opacity)
  setTransform(el, `translate3d(0, ${y.toFixed(2)}px, 0)`)
}

function applyVideoScale(el: HTMLElement | null, progress: number) {
  if (!el) return
  const scale = piecewiseLinear(progress, [0, 1], [1, 1.06])
  setTransform(el, `scale(${scale.toFixed(4)})`)
}

const PINNED_STAGE_CLASS = 'fixed inset-x-0 top-0 z-0 h-[100svh] w-full overflow-hidden bg-[#0a0a0a]'
const RELEASED_STAGE_CLASS = 'absolute inset-x-0 bottom-0 z-0 h-[100svh] w-full overflow-hidden bg-[#0a0a0a]'

// How much of the gap to the target the video/text close per animation
// frame, at a 60Hz reference rate: `current += (target - current) * 0.08`
// each ~16.7ms tick. Scaled by the *actual* elapsed time between frames
// (`REFERENCE_FRAME_MS`), so it closes the gap at the same real-world speed
// whether the display is 60Hz, 120Hz, or a throttled background tab
// catching up — one smoothing model driving both building and text.
const SCRUB_SMOOTHING = 0.08
const REFERENCE_FRAME_MS = 1000 / 60
// Skip a video seek once the target is within this many seconds of the
// last one — sub-frame seeks on a compressed video are wasted decode work
// with no visible benefit. Small, so the building reads as continuously
// transforming rather than snapping between structural states.
const MIN_SEEK_DELTA = 0.008
// Below this distance-to-target, treat the loop as converged and let it
// sleep — "continue the animation loop only while necessary."
const CONVERGED_EPSILON = 0.0006

const HomeScrollStory = () => {
  // ---- DOM refs. These are the only things the scroll system touches. ----
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const overlayRef = useRef<HTMLDivElement>(null)
  const whiteoutRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  // One text container per stage — a fixed set of elements created once at
  // mount and never added to or removed from while scrolling. Only their
  // opacity/transform change, and the beat math guarantees at most one of
  // the five is ever above opacity 0 at a time.
  const panel1Ref = useRef<HTMLDivElement>(null)
  const panel2Ref = useRef<HTMLDivElement>(null)
  const panel3Ref = useRef<HTMLDivElement>(null)
  const panel4Ref = useRef<HTMLDivElement>(null)
  const panel5Ref = useRef<HTMLDivElement>(null)

  // Non-visual state the loop carries between frames.
  const durationRef = useRef(0)
  const isPinnedRef = useRef(true)
  const lastSeekRef = useRef(-1)

  // One-time video priming: load metadata, then a single play()->pause()
  // cycle to unlock currentTime scrubbing on iOS/Safari. Never repeated,
  // never tied to scroll.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const unlock = () => {
      const p = video.play()
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }

    const onLoaded = () => {
      durationRef.current = video.duration || 0
      unlock()
    }

    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      onLoaded()
    } else {
      video.addEventListener('loadedmetadata', onLoaded)
    }

    const retryUnlock = () => unlock()
    window.addEventListener('touchstart', retryUnlock, { once: true, passive: true })
    window.addEventListener('scroll', retryUnlock, { once: true, passive: true })

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener('touchstart', retryUnlock)
      window.removeEventListener('scroll', retryUnlock)
    }
  }, [])

  // ---- THE scroll system. One track, one loop, one master progress. ----
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId: number | null = null
    let current = 0
    let target = 0
    let lastFrameTime: number | null = null

    // The track's own position on screen IS master progress — no separate
    // scroll-position bookkeeping to keep in sync with it, and nothing else
    // computes progress independently.
    const computeTarget = () => {
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const raw = scrollable > 0 ? -rect.top / scrollable : 0
      target = Math.min(Math.max(raw, 0), 1)
    }

    // Paint the building AND the text from the same progress value, in the
    // same function call, every frame — this is the whole of "synchronized."
    const paint = (progress: number) => {
      const shouldPin = progress < 0.999
      if (shouldPin !== isPinnedRef.current) {
        isPinnedRef.current = shouldPin
        if (stageRef.current) stageRef.current.className = shouldPin ? PINNED_STAGE_CLASS : RELEASED_STAGE_CLASS
      }

      // The video is a scrubbing source: only currentTime is ever touched,
      // only when it has actually moved, never play()/pause()/src here.
      const duration = durationRef.current
      if (videoRef.current && duration) {
        const t = progress * duration
        if (Number.isFinite(t) && Math.abs(t - lastSeekRef.current) > MIN_SEEK_DELTA) {
          videoRef.current.currentTime = t
          lastSeekRef.current = t
        }
      }
      applyVideoScale(videoRef.current, progress)

      applyOpacity(overlayRef.current, progress, OVERLAY_INPUT, OVERLAY_OUTPUT)
      applyOpacity(whiteoutRef.current, progress, WHITEOUT_RANGE, [0, 1])
      applyOpacity(scrollCueRef.current, progress, [0, 0.03], [1, 0])

      applyBeat(panel1Ref.current, progress, BEAT_1)
      applyBeat(panel2Ref.current, progress, BEAT_2)
      applyBeat(panel3Ref.current, progress, BEAT_3)
      applyBeat(panel4Ref.current, progress, BEAT_4)
      applyClosing(panel5Ref.current, progress, BEAT_5_IN)
    }

    // window scroll -> master progress -> rAF -> smooth interpolation -> paint
    const tick = (now: number) => {
      // Elapsed time since the last painted frame, clamped so a throttled/
      // backgrounded tab resuming doesn't slam `current` straight to
      // `target` in one jump — it still eases, just over a bounded step.
      const dt = lastFrameTime === null ? REFERENCE_FRAME_MS : Math.min(now - lastFrameTime, 100)
      lastFrameTime = now

      computeTarget()
      const factor = 1 - Math.pow(1 - SCRUB_SMOOTHING, dt / REFERENCE_FRAME_MS)
      current += (target - current) * factor
      if (Math.abs(target - current) < CONVERGED_EPSILON) current = target
      paint(current)

      if (Math.abs(target - current) > CONVERGED_EPSILON) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null // converged — sleep until the next scroll wakes us
        lastFrameTime = null // start clean next time, not with a stale gap
      }
    }

    const wake = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick)
    }

    // Paint the correct frame synchronously before the first scroll event —
    // handles a page refresh with a restored scroll position correctly,
    // with no flash from progress 0, and no mismatch between video and text.
    computeTarget()
    current = target
    paint(current)

    window.addEventListener('scroll', wake, { passive: true })
    window.addEventListener('resize', wake, { passive: true })

    return () => {
      window.removeEventListener('scroll', wake)
      window.removeEventListener('resize', wake)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  const stats = brand.heroStats

  return (
    <div id="home-scroll-story" ref={trackRef} className="relative h-[560vh] bg-[#0a0a0a] sm:h-[680vh] lg:h-[780vh]">
      <div ref={stageRef} className={PINNED_STAGE_CLASS}>
        <video
          ref={videoRef}
          src="/building.mp4"
          muted
          playsInline
          preload="auto"
          style={{ transform: 'scale(1)', willChange: 'transform', backfaceVisibility: 'hidden' }}
          className="absolute inset-0 h-full w-full origin-center object-cover"
          aria-hidden="true"
        />

        {/* Legibility + brand-tint scrim, intensity choreographed per stage */}
        <div
          ref={overlayRef}
          style={{ opacity: 0.42, willChange: 'opacity' }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />

        <h1 className="sr-only">{brand.name} — {brand.tagline}</h1>

        {/* ---- Stage 1 (0-20%): building begins ---- */}
        <div
          ref={panel1Ref}
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D71920] sm:text-xs">
            Building Begins
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase leading-[0.96] tracking-tight text-white">
            Engineering What&apos;s Next
          </h2>
          <p className="mt-5 max-w-xl text-[13px] font-light leading-relaxed text-white/80 sm:text-sm">
            {brand.signatureLine}
          </p>
        </div>

        {/* ---- Stage 2 (20-40%): structural components begin changing ---- */}
        <div
          ref={panel2Ref}
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D71920] sm:text-xs">
            Structural Foundations
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase leading-[0.96] tracking-tight text-white">
            Precision In Every Structure
          </h2>
          <p className="mt-5 max-w-xl text-[13px] font-light leading-relaxed text-white/80 sm:text-sm">
            Optimized steel and concrete designs that reduce cost while preserving safety and performance.
          </p>
        </div>

        {/* ---- Stage 3 (40-60%): more of the structure is revealed ---- */}
        <div
          ref={panel3Ref}
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D71920] sm:text-xs">
            Advanced Analysis
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase leading-[0.96] tracking-tight text-white">
            Engineered From The Inside Out
          </h2>
          <p className="mt-5 max-w-xl text-[13px] font-light leading-relaxed text-white/80 sm:text-sm">
            Advanced modelling tools evaluate wind, seismic, and load performance before we build.
          </p>
        </div>

        {/* ---- Stage 4 (60-80%): building approaches completion ---- */}
        <div
          ref={panel4Ref}
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D71920] sm:text-xs">
            Proven Track Record
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase leading-[0.96] tracking-tight text-white">
            Built For Performance
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-heading text-[clamp(1.3rem,3vw,1.9rem)] font-black leading-none text-white">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Stage 5 (80-100%): building complete, closing statement ---- */}
        <div
          ref={panel5Ref}
          style={{ opacity: 0, willChange: 'opacity, transform' }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D71920] sm:text-xs">
            {brand.shortName}
          </span>
          <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] font-black uppercase leading-[0.96] tracking-tight text-[#D71920]">
            Kenmos Engineering
          </h2>
          <p className="mt-5 max-w-xl text-[13px] font-light uppercase tracking-[0.2em] text-white/80 sm:text-sm">
            Structural Excellence. Lasting Impact.
          </p>
          <Link
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D71920] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white shadow-[0_14px_30px_rgba(215,25,32,0.28)] transition-all duration-300 hover:bg-[#be1218]"
          >
            Let&apos;s Build Together
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Whiteout crossfade into the Contact section that follows */}
        <div
          ref={whiteoutRef}
          style={{ opacity: 0, willChange: 'opacity' }}
          className="pointer-events-none absolute inset-0 z-[15] bg-[#F7F4EF]"
        />

        <div
          ref={scrollCueRef}
          style={{ opacity: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll to Build</span>
          <span className="animate-bounce">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomeScrollStory
