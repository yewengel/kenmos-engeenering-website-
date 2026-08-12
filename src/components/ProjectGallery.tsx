"use client"

import React, { useState } from 'react'

interface Props {
  images: string[]
}

export default function ProjectGallery({ images }: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = (i: number) => { setIndex(i); setOpen(true) }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="overflow-hidden rounded-md bg-gray-50 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Project image ${i+1}`} className="w-full h-56 object-contain p-3" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <div className="relative max-w-6xl w-full">
            <button onClick={() => setOpen(false)} className="absolute right-2 top-2 z-60 rounded bg-white/90 px-3 py-1 text-sm">Close</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index]} alt={`Enlarged ${index+1}`} className="w-full max-h-[80vh] object-contain rounded" />

            {images.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setIndex((index-1+images.length)%images.length) }} className="rounded bg-white/90 px-3 py-1">Prev</button>
                <span className="text-white">{index+1} / {images.length}</span>
                <button onClick={(e) => { e.stopPropagation(); setIndex((index+1)%images.length) }} className="rounded bg-white/90 px-3 py-1">Next</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
