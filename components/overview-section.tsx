'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './language-context'

type Step = {
  id: number
  title: string
  description: string
  tag: string
  icon: string
  gifPlaceholder: string
  imageSrc?: string
  imageAlt?: string
}

export function OverviewSection() {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const wheelLockRef = useRef(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stackRef = useRef<HTMLDivElement | null>(null)
  const [stackHeight, setStackHeight] = useState<number>(520)
  // Capabilities carousel refs/state
  const capsRef = useRef<HTMLDivElement | null>(null)
  const [capsPaused, setCapsPaused] = useState(false)
  const capsPausedRef = useRef(false)
  useEffect(() => { capsPausedRef.current = capsPaused }, [capsPaused])

  const steps: Step[] = [
    {
      id: 1,
      title: t('overview.step1.title'),
      description: t('overview.step1.desc'),
      tag: t('overview.step1.tag'),
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      gifPlaceholder: 'https://source.unsplash.com/1200x900/?data,api,integration',
      imageSrc: '/journey-1.jpg',
      imageAlt: 'Two hands connecting puzzle pieces symbolizing integration',
    },
    {
      id: 2,
      title: t('overview.step2.title'),
      description: t('overview.step2.desc'),
      tag: t('overview.step2.tag'),
      icon:
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      gifPlaceholder: 'https://source.unsplash.com/1200x900/?documents,analysis,ai',
      imageSrc: '/journey-2.jpg',
      imageAlt: 'AI reading SOPs and policies',
    },
    {
      id: 3,
      title: t('overview.step3.title'),
      description: t('overview.step3.desc'),
      tag: t('overview.step3.tag'),
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      gifPlaceholder: 'https://source.unsplash.com/1200x900/?audit,clipboard,factory',
      imageSrc: '/journey-3.jpg',
      imageAlt: 'Audit readiness dashboard',
    },
    {
      id: 4,
      title: t('overview.step4.title'),
      description: t('overview.step4.desc'),
      tag: t('overview.step4.tag'),
      icon:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      gifPlaceholder: 'https://source.unsplash.com/1200x900/?maintenance,engineering,tools',
      imageSrc: '/journey-4.jpg',
      imageAlt: 'Root-cause analysis and CAPA',
    },
    {
      id: 5,
      title: t('overview.step5.title'),
      description: t('overview.step5.desc'),
      tag: t('overview.step5.tag'),
      icon:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      gifPlaceholder: 'https://source.unsplash.com/1200x900/?dashboard,growth,charts',
      imageSrc: '/journey-5.jpg',
      imageAlt: 'Business impact and reliability',
    },
  ]

  // Measure the visible stack area height to size segments so each card gets a full viewport of scroll
  useEffect(() => {
    const measure = () => {
      const h = stackRef.current?.offsetHeight
      if (h && h !== stackHeight) setStackHeight(h)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [stackHeight])

  // Scroll-driven stacking: compute active step from container scroll progress
  useEffect(() => {
    let ticking = false
    const updateFromScroll = () => {
      const el = containerRef.current
      if (!el) return
      const start = el.offsetTop
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      const scrolled = Math.min(Math.max(window.scrollY - start, 0), total)
      // Ensure the first card remains fully visible before switching
      const STEP_SPACING = 120 // additional scroll per step for breathing room
      const perStep = Math.max(1, stackHeight + STEP_SPACING)
      const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(scrolled / perStep)))
      if (idx !== activeStep) setActiveStep(idx)
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateFromScroll()
          ticking = false
        })
        ticking = true
      }
    }
    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [steps.length, stackHeight, activeStep])

  // Auto-scroll capabilities carousel (mobile + desktop). Pauses on touch/hover and when offscreen.
  useEffect(() => {
    const el = capsRef.current
    if (!el) return
    let raf = 0
    let last = performance.now()
    const baseSpeed = 20 // px per second

    // Pause while user interacts
    const pause = () => setCapsPaused(true)
    const resume = () => setCapsPaused(false)
    el.addEventListener('pointerdown', pause, { passive: true })
    window.addEventListener('pointerup', resume, { passive: true })

    // Only run when visible
    let visible = true
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
    }, { threshold: 0.05 })
    io.observe(el)

    const tick = (now: number) => {
      const target = capsRef.current
      const dt = Math.min(64, now - last) / 1000 // clamp delta
      last = now
      if (target && visible && !capsPausedRef.current) {
        const speed = baseSpeed // px/sec
        target.scrollLeft += speed * dt
        const half = target.scrollWidth / 2
        if (half > 0 && target.scrollLeft >= half) target.scrollLeft -= half
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerdown', pause)
      window.removeEventListener('pointerup', resume)
    }
  }, [])

  return (
    <section className="min-h-screen bg-white px-6 py-20 relative">
      <div className="content-container overview-content">
        {/* Capabilities - compact horizontal slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-secondary text-center mb-6">{t('overview.capabilities')}</h2>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />
            <div
              ref={capsRef}
              onMouseEnter={() => setCapsPaused(true)}
              onMouseLeave={() => setCapsPaused(false)}
              onTouchStart={() => setCapsPaused(true)}
              onTouchEnd={() => setCapsPaused(false)}
              className={`carousel-shell ${capsPaused ? 'paused' : ''}`}
            >
              <div className="carousel-track">
                {(() => {
                  const titles = [
                    t('overview.cap.1.title'),
                    t('overview.cap.2.title'),
                    t('overview.cap.3.title'),
                    t('overview.cap.4.title'),
                    t('overview.cap.5.title'),
                  ]
                  const descs = [
                    t('overview.cap.1.desc'),
                    t('overview.cap.2.desc'),
                    t('overview.cap.3.desc'),
                    t('overview.cap.4.desc'),
                    t('overview.cap.5.desc'),
                  ]
                  const colors = [
                    'from-brand-secondary/80 to-brand-secondary',
                    'from-brand-secondary/60 to-brand-secondary/80',
                    'from-brand-secondary/40 to-brand-secondary/60',
                    'from-brand-secondary/20 to-brand-secondary/40',
                    'from-brand-primary/60 to-brand-secondary/20',
                  ]
                  const icons = [
                    (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2"/>
                        <path d="M7 8h10"/>
                        <path d="M7 12h6"/>
                        <path d="M7 16h4"/>
                      </svg>
                    ),
                    (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <path d="M7 10l5 5 5-5"/>
                        <path d="M12 15V3"/>
                      </svg>
                    ),
                    (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ),
                    (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12h8"/>
                        <path d="M12 8v8"/>
                      </svg>
                    ),
                    (
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z"/>
                        <path d="M8 7V5a2 2 0 0 1 2-2h3"/>
                      </svg>
                    ),
                  ]
                  const base = titles.map((_, i) => ({
                    title: titles[i] || 'Reporting Dashboard',
                    description: descs[i] || t('overview.cap.6.desc'),
                    color: colors[i] || 'from-slate-400 to-slate-600',
                  }))
                  const all = [...base, ...base]
                  return all.map((f, idx) => (
                    <div key={idx} className="min-w-[240px] max-w-[240px] bg-white/80 backdrop-blur border border-brand-secondary/10 rounded-2xl p-5 shadow-sm">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} mb-4 flex items-center justify-center`}>
                        {icons[idx % icons.length]}
                      </div>
                      <div className="text-brand-secondary font-semibold mb-1">{f.title}</div>
                      <div className="text-brand-secondary/70 text-sm leading-relaxed">{f.description}</div>
                    </div>
                  ))
                })()}
              </div>
            </div>
            {/* Side rail progress (desktop only) */}
            <div className="hidden lg:flex flex-col items-center gap-2 absolute -right-14 top-1/2 -translate-y-1/2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  aria-label={`${t('overview.goto')} ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeStep ? 'bg-brand-secondary' : 'bg-brand-secondary/30'}`}
                />
              ))}
            </div>
          </div>
          <style jsx>{`
            .carousel-shell { overflow: hidden; }
            .carousel-track { display: inline-flex; gap: 1rem; padding-right: 1rem; will-change: transform; animation: marquee 28s linear infinite; }
            .carousel-shell.paused .carousel-track { animation-play-state: paused; }
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .carousel-track { animation: none; }
            }
          `}</style>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 mb-6">{t('overview.header')}</h2>
          <p className="text-body-large max-w-3xl mx-auto leading-relaxed">{t('overview.sub')}</p>
        </motion.div>

        {/* Portrait-only swipeable Journey Cards (below header) */}
        <div className="block md:hidden mt-4">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-2 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
            aria-label={t('overview.header')}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className="snap-start min-w-[85%] max-w-[85%] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                {step.imageSrc && (
                  <img src={step.imageSrc} alt={step.imageAlt || step.title} className="w-full h-40 object-cover" loading="lazy" />
                )}
                <div className="p-4">
                  <div className="text-xs uppercase tracking-wider text-brand-secondary/70 mb-2">{step.tag}</div>
                  <div className="text-lg font-semibold text-brand-secondary mb-1">{step.title}</div>
                  <div className="text-brand-secondary/70 text-sm leading-relaxed">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stacked Cards - scroll pinned (hidden on portrait mobile) */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto px-2 journey-stack" style={{ height: (stackHeight + 120) * steps.length }}>
          <div className="sticky top-20">
            {/* Fade masks for cleaner readability */}
            <div className="pointer-events-none absolute -top-6 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-50" />
            <div className="pointer-events-none absolute -bottom-6 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-50" />
            <div ref={stackRef} className="relative h-[420px] sm:h-[480px] md:h-[520px]">
              {steps.map((step, index) => {
              const offset = index - activeStep
              const isActive = index === activeStep
              const z = index + 1
              const LAYER_GAP = 120 // previous cards move further up to free space
              const ENTER_OFFSET = 200 // next cards come in quicker
              const prevDepth = Math.max(0, -offset)
              const nextDepth = Math.max(0, offset)
              const scale = prevDepth > 0 ? Math.max(0.88, 1 - prevDepth * 0.04) : 1
              const y = prevDepth > 0
                ? -(prevDepth * LAYER_GAP) - 8
                : nextDepth > 0
                  ? (nextDepth * ENTER_OFFSET) + 80
                  : 0
              const opacity = nextDepth > 0 ? 0 : Math.max(0.18, 1 - prevDepth * 0.25)
              return (
                <div
                  key={step.id}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{ transform: `translateY(${y}px) scale(${scale})`, zIndex: z, opacity, pointerEvents: isActive ? 'auto' : 'none' }}
                  aria-hidden={!isActive}
                >
                  <div className="h-full w-full app-card overflow-hidden grid md:grid-cols-2">
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-secondary/70 mb-4">
                        {step.tag}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-secondary mb-4">{step.title}</h3>
                      <p className="text-brand-secondary/80 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="relative hidden md:block overflow-hidden rounded-r-3xl">
                      {step.imageSrc ? (
                        <img
                          src={step.imageSrc}
                          alt={step.imageAlt || step.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${(step as any).bgGrad ?? 'from-gray-100 to-gray-200'}`} />
                          <div className="absolute inset-0" style={{
                            background: 'radial-gradient(70% 70% at 80% 20%, rgba(255,255,255,0.25), rgba(0,0,0,0) 60%)'
                          }} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          </div>
          <style jsx>{`
            @media (max-width: 768px) and (orientation: portrait) {
              .journey-stack { display: none; }
            }
          `}</style>

          </div>
      </div>
    </section>
  )
}





