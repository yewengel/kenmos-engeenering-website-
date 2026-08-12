'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, FileText, CheckCircle2, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ProjectType = 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure' | 'Other' | ''

interface QuoteFormValues {
  fullName: string
  email: string
  phone: string
  company: string
  projectType: ProjectType
  budget: string
  consultDate: string
  description: string
}

const emptyForm: QuoteFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  consultDate: '',
  description: '',
}

const PROJECT_TYPES: ProjectType[] = ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Other']

const Navigation = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [form, setForm] = useState<QuoteFormValues>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormValues, string>>>({})
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const firstErrorRef = useRef<HTMLInputElement>(null)

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'Projects', href: '/projects', id: 'projects' },
    { name: 'Industries', href: '/industries', id: 'industries' },
    { name: 'Our Process', href: '/process', id: 'process' },
    { name: 'More', href: '/more', id: 'more' },
    { name: 'Contact Us', href: '/contact', id: 'contact' },
  ]

  const heroWhiteNavItemIds = ['home', 'about', 'services', 'projects', 'industries', 'process', 'more', 'contact']
  const forceScrolledRoutes = ['about', 'services', 'projects', 'industries', 'process', 'articles', 'careers', 'events', 'contact']
  const isForceScrolledPage = forceScrolledRoutes.some((route) => pathname === `/${route}` || pathname.startsWith(`/${route}/`))
  const isDetailPageRoute = pathname.startsWith('/projects/') || pathname.startsWith('/industries/')

  const getLinkTextClass = (itemId: string, isHeroVisibleState: boolean) => {
    if (isHeroVisibleState && heroWhiteNavItemIds.includes(itemId)) {
      return 'text-white hover:text-[#D71920]'
    }
    return 'text-gray-900 hover:text-[#D71920]'
  }

  const MORE_ITEMS = [
    { name: 'News & Articles', href: '/articles' },
    { name: 'Careers', href: '/careers' },
    { name: 'Events', href: '/events' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = pathname === '/'
      const isTop = window.scrollY <= 20

      setScrolled(isForceScrolledPage || !isTop || isDetailPageRoute)
      setIsHeroVisible(isHomePage ? isTop : false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isForceScrolledPage, isDetailPageRoute])

  useEffect(() => {
    setMoreOpen(false)
    setMobileMoreOpen(false)
  }, [pathname])

  const toggleMoreMenu = () => {
    setMoreOpen((prev) => !prev)
  }

  const closeMoreMenu = () => {
    setMoreOpen(false)
  }

  const openQuoteModal = () => {
    setMobileMenuOpen(false)
    setMoreOpen(false)
    setMobileMoreOpen(false)
    setIsQuoteModalOpen(true)
    setSubmitState('idle')
  }

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false)
    setTimeout(() => {
      setForm(emptyForm)
      setErrors({})
      setSubmitState('idle')
    }, 220)
  }

  useEffect(() => {
    if (!isQuoteModalOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuoteModal()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = originalOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuoteModalOpen])

  useEffect(() => {
    const onRequestQuote = () => openQuoteModal()
    window.addEventListener('kenmos:openQuoteModal', onRequestQuote)
    return () => window.removeEventListener('kenmos:openQuoteModal', onRequestQuote)
  }, [])

  const validate = (): Partial<Record<keyof QuoteFormValues, string>> => {
    const next: Partial<Record<keyof QuoteFormValues, string>> = {}
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) {
      next.phone = 'Please enter your phone number.'
    } else if (!/^[+()\d\s-]{6,}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!form.projectType) next.projectType = 'Please select a project type.'
    if (!form.consultDate) next.consultDate = 'Please select a preferred consultation date.'
    if (!form.description.trim()) {
      next.description = 'Please describe your project briefly.'
    } else if (form.description.trim().length < 15) {
      next.description = 'Please provide at least 15 characters of detail.'
    }
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstField = (Object.keys(nextErrors) as (keyof QuoteFormValues)[])[0]
      const el = document.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[data-quote-field="${firstField}"]`)
      el?.focus()
      return
    }
    setSubmitState('submitting')
    setTimeout(() => { setSubmitState('success') }, 900)
  }

  const update = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const field = 'w-full rounded-[1rem] border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 focus:border-[#D71920] transition-colors'

  return (
    <>
      <header className={cn('fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ease-in-out', scrolled ? 'bg-white border-b border-gray-100 shadow-sm backdrop-blur-md' : 'bg-transparent border-b-0 shadow-none backdrop-blur-none')}>
        <div className="mx-auto grid h-[84px] w-full max-w-[1440px] grid-cols-2 items-center px-5 sm:px-6 lg:grid-cols-3 lg:px-8 nav-desktop">
          <div className="flex items-center justify-start logo-left">
            <Link href="/" prefetch={true} className="flex flex-shrink-0 items-center">
              <img
                src={isHeroVisible ? "/images/hero2-logo.png" : "/images/hero-logo.png"}
                alt="Kenmos Engineering"
                className="w-[168px] md:w-[175px] h-auto transition-opacity duration-350"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-[18px] xl:gap-[32px]">
              {navItems.slice(0, -1).map((item) => {
                if (item.id === 'more') {
                  return (
                    <div key={item.name} className="relative flex items-center">
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleMoreMenu()
                        }}
                        onMouseEnter={() => setMoreOpen(true)}
                        onMouseLeave={() => closeMoreMenu()}
                        className={cn(
                          'relative inline-flex items-center gap-1 whitespace-nowrap pb-1 text-[11px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.14em] lg:tracking-[0.16em] xl:tracking-[0.16em] transition-all duration-350 leading-none hover:scale-[1.03]',
                          isHeroVisible ? getLinkTextClass(item.id, isHeroVisible) : 'text-gray-900 hover:text-[#D71920]',
                        )}
                      >
                        {item.name}
                        <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', moreOpen ? 'rotate-180' : '')} />
                        {isActive(item.href) && (
                          <span className="absolute -bottom-1.5 left-1/2 h-[3px] w-[60%] -translate-x-1/2 bg-[#D71920] rounded-full" />
                        )}
                      </Link>

                      <AnimatePresence>
                        {moreOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute left-0 top-full z-50 mt-3 min-w-[220px] rounded-[18px] border border-gray-200 bg-white py-2 shadow-[0_24px_60px_rgba(17,17,17,0.12)]"
                            onMouseEnter={() => setMoreOpen(true)}
                            onMouseLeave={() => setMoreOpen(false)}
                          >
                            {MORE_ITEMS.map((moreItem) => (
                              <Link
                                key={moreItem.name}
                                href={moreItem.href}
                                prefetch={true}
                                onClick={closeMoreMenu}
                                className={cn(
                                  'block rounded-[14px] px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors duration-200',
                                  isActive(moreItem.href)
                                    ? 'bg-[#FCE8E8] text-[#D71920]'
                                    : 'text-gray-700 hover:bg-[#F9F5F3] hover:text-[#D71920]',
                                )}
                              >
                                {moreItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      'relative inline-flex items-center whitespace-nowrap pb-1 text-[11px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.14em] lg:tracking-[0.16em] xl:tracking-[0.16em] transition-all duration-350 leading-none hover:scale-[1.03]',
                      isHeroVisible ? getLinkTextClass(item.id, isHeroVisible) : 'text-gray-900 hover:text-[#D71920]',
                    )}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1.5 left-1/2 h-[3px] w-[60%] -translate-x-1/2 bg-[#D71920] rounded-full" />
                    )}
                  </Link>
                )
              })}

              <Link
                key={navItems[navItems.length - 1].name}
                href={navItems[navItems.length - 1].href}
                prefetch={true}
                className={cn(
                  'relative inline-flex items-center whitespace-nowrap pb-1 text-[11px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.14em] lg:tracking-[0.16em] xl:tracking-[0.16em] transition-all duration-350 leading-none hover:scale-[1.03]',
                  isHeroVisible ? getLinkTextClass(navItems[navItems.length - 1].id, isHeroVisible) : 'text-gray-900 hover:text-[#D71920]',
                )}
              >
                {navItems[navItems.length - 1].name}
                {isActive(navItems[navItems.length - 1].href) && (
                  <span className="absolute -bottom-1.5 left-1/2 h-[3px] w-[60%] -translate-x-1/2 bg-[#D71920] rounded-full" />
                )}
              </Link>
            </div>
          </nav>

          <div className="flex items-center justify-end nav-right">
            <button type="button" onClick={openQuoteModal} className="hidden lg:inline-flex h-[42px] min-w-[172px] w-auto whitespace-nowrap text-center flex-shrink-0 items-center justify-center gap-1.5 rounded-[7px] bg-[#D71920] px-4 mr-4 xl:mr-5 text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.16em] lg:tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#be1218] hover:scale-[1.02] active:scale-[0.98]">
              GET A QUOTE
              <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0" />
            </button>
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={cn('lg:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none transition-colors duration-350', isHeroVisible ? 'text-white' : 'text-gray-900')} aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="fixed inset-x-0 top-[84px] z-50 lg:hidden border-t border-gray-200 bg-white/97 px-4 pb-4 pt-2 shadow-[0_20px_45px_rgba(17,17,17,0.12)] backdrop-blur-xl max-h-[calc(100vh-84px)] overflow-y-auto">
              <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-1 border border-gray-100 bg-white p-2 rounded-lg">
                {navItems.slice(0, -1).map((item) => {
                  if (item.id === 'more') {
                    return (
                      <div key={item.name} className="rounded">
                        <button
                          type="button"
                          onClick={() => setMobileMoreOpen((prev) => !prev)}
                          className={cn('relative flex w-full items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-colors rounded text-gray-700 hover:bg-gray-50 hover:text-[#D71920]', mobileMoreOpen ? 'bg-red-50/70 text-[#D71920]' : '')}
                        >
                          <span>More</span>
                          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', mobileMoreOpen ? 'rotate-180' : '')} />
                        </button>

                        <AnimatePresence>
                          {mobileMoreOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="overflow-hidden">
                              <div className="mt-1 flex flex-col gap-1 rounded-[14px] border border-gray-100 bg-gray-50 p-1">
                                {MORE_ITEMS.map((moreItem) => (
                                  <Link
                                    key={moreItem.name}
                                    href={moreItem.href}
                                    prefetch={true}
                                    onClick={() => {
                                      setMobileMenuOpen(false)
                                      setMobileMoreOpen(false)
                                    }}
                                    className={cn('rounded-[12px] px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors duration-200', isActive(moreItem.href) ? 'bg-[#FCE8E8] text-[#D71920]' : 'text-gray-700 hover:bg-white hover:text-[#D71920]')}
                                  >
                                    {moreItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'relative px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-colors rounded',
                        isActive(item.href) ? 'text-[#D71920] bg-red-50/70' : 'text-gray-700 hover:bg-gray-50 hover:text-[#D71920]',
                      )}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <span className="absolute bottom-1 left-1/2 h-[3px] w-[50%] -translate-x-1/2 bg-[#D71920] rounded-full" />
                      )}
                    </Link>
                  )
                })}

                <Link
                  key={navItems[navItems.length - 1].name}
                  href={navItems[navItems.length - 1].href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'relative px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-colors rounded',
                    isActive(navItems[navItems.length - 1].href) ? 'text-[#D71920] bg-red-50/70' : 'text-gray-700 hover:bg-gray-50 hover:text-[#D71920]',
                  )}
                >
                  {navItems[navItems.length - 1].name}
                  {isActive(navItems[navItems.length - 1].href) && (
                    <span className="absolute bottom-1 left-1/2 h-[3px] w-[50%] -translate-x-1/2 bg-[#D71920] rounded-full" />
                  )}
                </Link>
                <button type="button" onClick={openQuoteModal} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#D71920] px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">
                  GET A QUOTE
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isQuoteModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
              <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.2 }} className="w-full max-w-2xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D71920]">Request a Consultation</p>
                    <h3 className="mt-2 text-2xl font-black text-gray-950">Tell us about your project</h3>
                  </div>
                  <button type="button" onClick={closeQuoteModal} className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:border-[#D71920] hover:text-[#D71920]" aria-label="Close quote form">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Full Name</label>
                    <input ref={firstErrorRef} data-quote-field="fullName" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={field} placeholder="Full Name" />
                    {errors.fullName ? <p className="mt-2 text-sm text-[#D71920]">{errors.fullName}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Email</label>
                    <input data-quote-field="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={field} placeholder="Email Address" />
                    {errors.email ? <p className="mt-2 text-sm text-[#D71920]">{errors.email}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Phone</label>
                    <input data-quote-field="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={field} placeholder="Phone Number" />
                    {errors.phone ? <p className="mt-2 text-sm text-[#D71920]">{errors.phone}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Company</label>
                    <input value={form.company} onChange={(e) => update('company', e.target.value)} className={field} placeholder="Company" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Project Type</label>
                    <select data-quote-field="projectType" value={form.projectType} onChange={(e) => update('projectType', e.target.value as ProjectType)} className={field}>
                      <option value="">Select</option>
                      {PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {errors.projectType ? <p className="mt-2 text-sm text-[#D71920]">{errors.projectType}</p> : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Budget</label>
                    <input value={form.budget} onChange={(e) => update('budget', e.target.value)} className={field} placeholder="Budget Range" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Consultation Date</label>
                    <input type="date" data-quote-field="consultDate" value={form.consultDate} onChange={(e) => update('consultDate', e.target.value)} className={field} />
                    {errors.consultDate ? <p className="mt-2 text-sm text-[#D71920]">{errors.consultDate}</p> : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">Project Brief</label>
                    <textarea data-quote-field="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} className={field} placeholder="Describe your project briefly" />
                    {errors.description ? <p className="mt-2 text-sm text-[#D71920]">{errors.description}</p> : null}
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileText className="h-4 w-4 text-[#D71920]" />
                      We typically respond within one business day.
                    </div>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D71920] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#be1218]">
                      {submitState === 'submitting' ? 'Sending…' : 'Submit Request'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {submitState === 'success' ? (
                    <div className="sm:col-span-2 flex items-center gap-3 rounded-[1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                      Thank you. We will be in touch shortly.
                    </div>
                  ) : null}
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  )
}

export default Navigation
