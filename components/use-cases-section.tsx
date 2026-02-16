'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from './language-context'

type UseCaseItem = {
  title: string
  subtitle: string
  description: string
  color: string
  videoId: string
  videoTitle: string
  featured: boolean
  icon: JSX.Element
}

export function UseCasesSection() {
  const { t, lang } = useLanguage()
  const [activeModule, setActiveModule] = useState(0)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const modules: UseCaseItem[] = [
    {
      title: t('usecases.promo.title'),
      subtitle: t('usecases.promo.subtitle'),
      description: t('usecases.promo.desc'),
      color: 'from-[#3e2723] to-[#a9aecf]',
      videoId: 'VRzwUWquSxc',
      videoTitle: lang === 'tr' ? 'CERTI Urun Tanitimi' : 'CERTI Product Overview',
      featured: true,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 icon-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M10 8l6 4-6 4z" />
        </svg>
      )
    },
    {
      title: t('modules.1.title'),
      subtitle: t('modules.1.sub'),
      description: t('modules.1.desc'),
      color: 'from-brand-secondary/80 to-brand-secondary',
      videoId: lang === 'tr' ? 'gzlBOoJhP4o' : 'IcV9a3_bZVY',
      videoTitle: lang === 'tr' ? 'Akilli Dokuman Yonetimi (TR)' : 'Smart Document Management (EN)',
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 icon-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2"/>
          <path d="M7 8h10"/>
          <path d="M7 12h6"/>
          <path d="M7 16h4"/>
        </svg>
      )
    },
    {
      title: t('modules.2.title'),
      subtitle: t('modules.2.sub'),
      description: t('modules.2.desc'),
      color: 'from-brand-secondary/60 to-brand-secondary/80',
      videoId: lang === 'tr' ? 'BB2pqvCokDQ' : '6-ug5Wme6qQ',
      videoTitle: lang === 'tr' ? 'Denetime Hazirlik (TR)' : 'Audit Readiness (EN)',
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 icon-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <path d="M7 10l5 5 5-5"/>
          <path d="M12 15V3"/>
        </svg>
      )
    },
    {
      title: t('modules.3.title'),
      subtitle: t('modules.3.sub'),
      description: t('modules.3.desc'),
      color: 'from-brand-secondary/40 to-brand-secondary/60',
      videoId: lang === 'tr' ? 'lO1Zllt9vqs' : 'zTuzGvD0TZc',
      videoTitle: lang === 'tr' ? 'Uretim Hatti Sorun Giderme (TR)' : 'Production Issue Resolution (EN)',
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 icon-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      )
    },
    {
      title: t('modules.4.title'),
      subtitle: t('modules.4.sub'),
      description: t('modules.4.desc'),
      color: 'from-brand-secondary/20 to-brand-secondary/40',
      videoId: lang === 'tr' ? 'X6jP6FoM8Tc' : 'kl5RDH5F4VQ',
      videoTitle: lang === 'tr' ? 'Musteri Sikayeti Yonetimi (TR)' : 'Customer Complaint Resolution (EN)',
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 icon-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
      )
    }
  ]

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 mb-6">{t('modules.header')}</h2>
          <p className="text-body-large max-w-3xl mx-auto">{t('modules.sub')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                  activeModule === index
                    ? module.featured
                      ? 'bg-[#fff7dc] shadow-lg border-l-4 border-[#3e2723] ring-1 ring-[#ffedac]'
                      : 'bg-white shadow-lg border-l-4 border-[#a9aecf]'
                    : module.featured
                      ? 'bg-[#ffedac]/25 border border-[#ffedac]/70 hover:bg-[#ffedac]/35 hover:shadow-md'
                      : 'bg-transparent hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveModule(index)}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${module.featured ? 'bg-[#3e2723]/10' : 'bg-gray-100'}`}>
                  {module.icon}
                </div>
                <div>
                  {module.featured && (
                    <span className="inline-block text-[10px] uppercase tracking-[0.12em] font-semibold text-[#3e2723] bg-[#ffedac]/70 px-2 py-1 rounded-full mb-2">
                      {t('usecases.promo.badge')}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-gray-600 text-sm">{module.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="app-card p-8"
          >
            <div className="mb-8">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 relative">
                <div className={'absolute inset-0 pointer-events-none rounded-xl p-[2px]'} style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(255,237,172,0.4))'}} />
                <div className="absolute inset-[2px] rounded-[10px] overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${modules[activeModule].videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`}
                    title={modules[activeModule].videoTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    loading="lazy"
                    referrerPolicy="origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                    onError={(e) => {
                      const iframe = e.currentTarget as HTMLIFrameElement
                      const id = modules[activeModule].videoId
                      iframe.src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`
                    }}
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                {modules[activeModule].icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{modules[activeModule].title}</h3>
            </div>

            <p className="text-[#a9aecf] font-medium mb-4">{modules[activeModule].subtitle}</p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {modules[activeModule].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
