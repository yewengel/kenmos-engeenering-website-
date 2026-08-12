import Link from 'next/link'
import React from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  badge?: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  imageSrc?: string
}

export default function PageHero({
  title,
  badge,
  description,
  breadcrumbs,
  imageSrc = '/images/hero-new.jpg',
}: PageHeroProps) {
  return (
    <section className="relative min-h-[260px] md:min-h-[280px] lg:min-h-[300px] overflow-hidden flex flex-col pt-[84px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={imageSrc}
      >
        <source src="/images/hero-new.MP4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 flex flex-1 flex-col justify-center items-center px-5 text-center sm:px-6 lg:px-8 pb-4">
        <div className="max-w-5xl">
          {badge ? (
            <div className="mx-auto mb-2 sm:mb-3 inline-flex items-center justify-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.35em] text-white">
              {badge}
            </div>
          ) : null}

          <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {description ? (
            <p className="mx-auto mt-2 sm:mt-3 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
              {description}
            </p>
          ) : null}

          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="mt-3 sm:mt-4 text-sm text-white/70">
              {breadcrumbs.map((item, index) => (
                <span key={item.label} className="inline-flex items-center gap-1">
                  {item.href ? (
                    <Link href={item.href} className="text-white/80 transition-colors duration-200 hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <span className="opacity-60">/</span> : null}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
