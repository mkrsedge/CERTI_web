'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from './language-context'

export function ModulesSection() {
  const { t, lang } = useLanguage()
  const [activeModule, setActiveModule] = useState(0)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const modules = [
    {
      title: t('modules.1.title'),
      subtitle: t('modules.1.sub'),
      description: t('modules.1.desc'),
      features: ['Intelligent standards mapping', 'AI-assisted document updates', 'Centralized document control', 'Compliance tracking'],
      color: 'from-blue-500 to-blue-600',
      videoId: lang === 'tr' ? 'gzlBOoJhP4o' : 'IcV9a3_bZVY',
      videoTitle: lang === 'tr' ? 'Akıllı Doküman Yönetimi (TR)' : 'Smart Document Management (EN)'
    },
    {
      title: t('modules.2.title'),
      subtitle: t('modules.2.sub'),
      description: t('modules.2.desc'),
      features: ['Digital audit logging', 'Evidence management', 'Task assignment', 'Multi-standard support'],
      color: 'from-purple-500 to-purple-600',
      videoId: lang === 'tr' ? 'BB2pqvCokDQ' : '6-ug5Wme6qQ',
      videoTitle: lang === 'tr' ? 'Denetime Hazırlık (TR)' : 'Audit Readiness (EN)'
    },
    {
      title: t('modules.3.title'),
      subtitle: t('modules.3.sub'),
      description: t('modules.3.desc'),
      features: ['Guided root cause analysis', 'Task-based tracking', 'Downtime reduction', 'Real-time issue resolution'],
      color: 'from-green-500 to-green-600',
      videoId: lang === 'tr' ? 'lO1Zllt9vqs' : 'zTuzGvD0TZc',
      videoTitle: lang === 'tr' ? 'Üretim Hattı Sorun Giderme (TR)' : 'Production Issue Resolution (EN)'
    },
    {
      title: t('modules.4.title'),
      subtitle: t('modules.4.sub'),
      description: t('modules.4.desc'),
      features: ['Structured case management', 'AI-suggested corrections', 'Automated report generation', 'Customer communication'],
      color: 'from-slate-400 to-slate-500',
      videoId: lang === 'tr' ? 'X6jP6FoM8Tc' : 'kl5RDH5F4VQ',
      videoTitle: lang === 'tr' ? 'Müşteri Şikayeti Yönetimi (TR)' : 'Customer Complaint Resolution (EN)'
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
          <h2 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">{t('modules.header')}</h2>
          <p className="text-xl text-brand-secondary/80 max-w-3xl mx-auto">{t('modules.sub')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Module Navigation */}
          <div className="space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeModule === index
                    ? 'bg-white shadow-lg border-l-4 border-[#a9aecf]'
                    : 'bg-transparent hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setActiveModule(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {module.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Module Details */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="app-card p-8"
          >
            {/* Video Section with framed viewport */}
            {modules[activeModule].videoId ? (
              <div className="mb-8">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 relative">
                  <div className={`absolute inset-0 pointer-events-none rounded-xl p-[2px]`} style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(255,237,172,0.4))'}} />
                  <div className="absolute inset-[2px] rounded-[10px] overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${modules[activeModule].videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`}
                    title={modules[activeModule].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    loading="lazy"
                    referrerPolicy="origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                    onError={(e) => {
                      const iframe = e.currentTarget as HTMLIFrameElement
                      // Fallback to standard domain if nocookie domain encounters restrictions
                      const id = modules[activeModule].videoId
                      iframe.src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`
                    }}
                  ></iframe>
                  </div>
                </div>

              </div>
            ) : (
              <div className="mb-8">
                <div className="aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${modules[activeModule].color} flex items-center justify-center mb-4 mx-auto`}>
                      <div className="text-white text-2xl font-bold">
                        {modules[activeModule].title.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>
                    <p className="text-gray-500">Video coming soon</p>
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {modules[activeModule].title}
            </h3>
            
            <p className="text-[#a9aecf] font-medium mb-4">
              {modules[activeModule].subtitle}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {modules[activeModule].description}
            </p>

            {/* Key features removed previously to keep layout minimal */}


          </motion.div>
        </div>
      </div>
    </section>
  )
}


