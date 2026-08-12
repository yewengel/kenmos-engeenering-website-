'use client'

import React from 'react'
import {
  Briefcase,
  Layers,
  ShieldCheck,
  Users,
  FileText,
  Wrench,
  ArrowRight,
} from 'lucide-react'

const serviceCards = [
  {
    title: 'Consultancy Services',
    description:
      'Technical reviews, peer audits, engineering advice, and specialized support for developers and investors.',
    icon: Briefcase,
  },
  {
    title: 'Structural Design',
    description:
      'We engineer reinforced concrete and steel-framed structures for buildings of every scale and complexity.',
    icon: Layers,
  },
  {
    title: 'Construction Supervision',
    description:
      'We conduct site inspections and quality audits to ensure design intent is faithfully executed on site.',
    icon: ShieldCheck,
  },
  {
    title: 'Project Management',
    description:
      'We coordinate design teams, milestones, and budgets to deliver projects on schedule and within scope.',
    icon: Users,
  },
  {
    title: 'Assessment & Retrofitting',
    description:
      'We evaluate existing structures and develop practical strengthening and retrofitting solutions for safety and longevity.',
    icon: Wrench,
  },
  {
    title: 'Tender & BOQ Preparation',
    description:
      'We produce accurate bills of quantities and tender documentation for transparent and efficient procurement.',
    icon: FileText,
  },
]

export default function ServicesFixed() {
  return (
    <section className="pt-1 pb-20 bg-white">
      <div className="w-full max-w-none px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[#E9E4DC] bg-[#FFF5F5] px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#D71920]">
              Our Engineering Solutions
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#111112] sm:text-4xl lg:text-5xl">
                Our Engineering Solutions
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                We provide comprehensive structural engineering solutions combining technical precision, safety, efficiency, and practical project delivery.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#E9E4DC] bg-[#F7F7F5] shadow-sm md:shadow-md">
            <img
              src="/images/services_ph.jpg"
              alt="Kenmos structural engineering services"
              className="w-full h-full min-h-[320px] object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="rounded-[1.3rem] border border-slate-200 bg-[#F7F7F5] p-6 shadow-[0_10px_30px_rgba(17,17,17,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(17,17,17,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D71920]/10 text-[#D71920]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-[#111112]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-20">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#E9E4DC] bg-[#F7F7F5] shadow-sm">
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="inline-block rounded-md bg-[#FCE8E9] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[#D71920]">
                Engineering Standards & Compliance
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black text-[#111112] sm:text-3xl">
                ASCE | ACI | EUROCODE | ETHIOPIAN BUILDING CODE
              </h3>
              <p className="mt-5 text-base leading-8 text-gray-600">
                Designs are checked against applicable engineering standards using rigorous structural analysis and finite-element methods to ensure compliance, safety, and durability.
              </p>
              <div className="mt-8 grid gap-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#111112] sm:grid-cols-2">
                {['ASCE', 'ACI', 'EUROCODE', 'ETHIOPIAN BUILDING CODE'].map((item) => (
                  <div key={item} className="rounded-2xl border border-[#E9E4DC] bg-[#F7F7F5] px-4 py-4 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-10">
          <div className="rounded-[1.5rem] border border-[#E9E4DC] bg-[#F7F7F5] p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D71920]">
              <ArrowRight className="h-4 w-4" />
              Our Approach
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-5">
              {['Understand', 'Analyze', 'Design', 'Review', 'Deliver'].map((step) => (
                <div
                  key={step}
                  className="rounded-3xl border border-[#E9E4DC] bg-[#F7F7F5] px-5 py-4 text-center text-sm font-semibold text-[#111112]"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[#E9E4DC] bg-[#F7F7F5] shadow-sm">
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <div className="inline-block rounded-md bg-[#FCE8E9] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[#D71920]">
                Value Engineering
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black text-[#111112] sm:text-3xl">
                Structural Integrity Meets Cost Optimization
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">
                Kenmos optimizes structural systems, material quantities, member sizes, concrete grades, steel grades, and detailing while maintaining safety, performance, and durability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
