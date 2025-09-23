'use client'

import { motion } from 'framer-motion'
import { AnimatedBackground } from './animated-background'
import { SimpleVideo } from './simple-video'
import { useLanguage } from './language-context'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-14 md:pt-20 hero-portrait-offset">
      {/* Background Video */}
      <SimpleVideo 
        src="/gitness-spline-test.mp4"
      />
      
      {/* Brand-tinted overlay for better text readability and brand cohesion */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(62,39,35,0.35)' }}></div>
      {/* Smoother bottom fade bridge to white to blend into Overview (starts below KPI area) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-white/0 via-white/35 to-white" />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 content-container text-center hero-content -translate-y-6 md:-translate-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light text-brand-primary mb-4 leading-tight">
            {`CERTI: ${t('hero.title.1')}`}
            <br />
            {t('hero.title.2')}
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-brand-primary/90 mb-8 leading-relaxed"
          >
            {t('hero.desc.1')}
            <br />
            {t('hero.desc.2')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.smoothScrollToSection) {
                  window.smoothScrollToSection('demo')
                } else {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="btn-primary-hero text-lg relative z-20"
            >
              {t('hero.cta.primary')}
            </button>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.smoothScrollToSection) {
                  window.smoothScrollToSection('overview')
                } else {
                  const overviewSection = document.getElementById('overview');
                  if (overviewSection) {
                    overviewSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="btn-ghost-light text-lg relative z-20"
            >
              {t('hero.cta.secondary')}
            </button>
          </motion.div>
        </motion.div>

        {/* Quality & Compliance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[{v:'100%',t:t('hero.kpi.1')},{v:'80%',t:t('hero.kpi.2')},{v:'50%',t:t('hero.kpi.3')}].map((kpi, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/15 bg-white/20 backdrop-blur-md px-6 py-5 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-[#ffedac] mb-1 drop-shadow">{kpi.v}</div>
              <div className="text-[#afdbf5] text-sm font-medium">{kpi.t}</div>
            </div>
          ))}
        </motion.div>
      </div>


    </section>
  )
}

// Portrait-only extra spacing to avoid overlap with sticky header
// and iOS Safari dynamic bars
<style jsx global>{`
  @media (max-width: 768px) and (orientation: portrait) {
    .hero-portrait-offset { padding-top: 7rem !important; }
  }
`}</style>
