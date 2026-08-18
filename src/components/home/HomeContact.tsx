'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { brand } from '@/lib/brand'
import Reveal from '@/components/Reveal'

const contactInfo = [
  { icon: Phone, title: 'Phone', detail: brand.phone, href: brand.phoneHref },
  { icon: Mail, title: 'Email', detail: brand.email, href: `mailto:${brand.email}` },
  { icon: MapPin, title: 'Office', detail: brand.location, href: 'https://www.google.com/maps?q=Enat+Building+Piazza+Addis+Ababa+Ethiopia' },
  { icon: Clock, title: 'Hours', detail: 'Mon–Fri: 8:00 AM – 6:00 PM, Sat: 8:00 AM – 12:00 PM', href: undefined },
]

const HomeContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="border-t border-[#111111]/10 bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Left — charcoal panel: statement + reachability */}
        <div className="relative overflow-hidden bg-[#111112] px-6 py-20 text-white sm:px-10 md:py-28 lg:px-16">
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />
          </div>

          <div className="relative z-10 max-w-lg">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D71920]">Let&apos;s Collaborate</span>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
                Ready to build your vision with precision?
              </h2>
              <p className="mt-5 text-[14px] font-light leading-relaxed text-white/60 md:text-[15px]">
                Discuss your building blueprints, steel truss connections, or value engineering parameters with our lead structural engineer.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col">
              {contactInfo.map((info, i) => (
                <Reveal key={info.title} delay={i * 0.06}>
                  <a
                    href={info.href}
                    target={info.href?.startsWith('http') ? '_blank' : undefined}
                    rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-start gap-4 border-t border-white/10 py-5 ${!info.href ? 'pointer-events-none' : 'group'}`}
                  >
                    <info.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D71920]" strokeWidth={1.7} />
                    <div className="min-w-0">
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">{info.title}</h5>
                      <p className="mt-1 text-[13px] font-light leading-snug text-white/85 transition-colors duration-300 group-hover:text-white md:text-[14px]">
                        {info.detail}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </div>

        {/* Right — cream panel: the form */}
        <div className="bg-[#F7F4EF] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
          <div className="max-w-lg">
            <Reveal>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-[#141414] md:text-3xl">
                Discuss Your Next Project
              </h3>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-[#666666]">
                Fill in your details and we&apos;ll get back to you once our team has reviewed your message.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#111111]/70">
                      Name <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border-0 border-b border-[#111111]/20 bg-transparent px-0 py-2.5 text-[14px] text-[#141414] placeholder:text-[#111111]/30 focus:border-[#D71920] focus:outline-none focus:ring-0"
                      placeholder="e.g. Yonas Abebe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#111111]/70">
                      Email <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border-0 border-b border-[#111111]/20 bg-transparent px-0 py-2.5 text-[14px] text-[#141414] placeholder:text-[#111111]/30 focus:border-[#D71920] focus:outline-none focus:ring-0"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#111111]/70">
                    Message <span className="text-[#D71920]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full resize-none border-0 border-b border-[#111111]/20 bg-transparent px-0 py-2.5 text-[14px] leading-relaxed text-[#141414] placeholder:text-[#111111]/30 focus:border-[#D71920] focus:outline-none focus:ring-0"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D71920] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white shadow-[0_14px_30px_rgba(215,25,32,0.22)] transition-all duration-300 hover:bg-[#be1218] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      Send Message
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>Thank you! Your request was sent. Our lead engineer will contact you shortly.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <span>There was a problem sending your message. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeContact
