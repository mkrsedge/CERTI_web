'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from './language-context'

type ArcadeDemo = {
  id: string
  label: string
  title: string
  subtitle: string
  src: string
}

const arcadeDemos: ArcadeDemo[] = [
  {
    id: 'customer-complaint',
    label: 'Issue Management',
    title: "Investigate and Resolve a Customer Complaint with CERTI's Guided Root Cause Analysis",
    subtitle: 'Guided Root Cause Analysis',
    src: 'https://demo.arcade.software/3MKupUKJpzgNv0fdVre0?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  },
  {
    id: 'change-management',
    label: 'Change Management',
    title: 'Change Management and Impact Analysis with CERTI',
    subtitle: 'Impact Analysis',
    src: 'https://demo.arcade.software/GJc8ZvZZeKBOBM58HIn1?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  }
]

function ArcadeEmbed({ demo }: { demo: ArcadeDemo }) {
  return (
    <div style={{ position: 'relative', paddingBottom: 'calc(49.296875% + 41px)', height: '0', width: '100%' }}>
      <iframe
        src={demo.src}
        title={demo.title}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  )
}

export function UseCasesSection() {
  const { t } = useLanguage()
  const [activeDemoId, setActiveDemoId] = useState(arcadeDemos[0].id)
  const activeDemo = arcadeDemos.find((demo) => demo.id === activeDemoId) ?? arcadeDemos[0]

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

        <div className="space-y-6">
          <p className="text-left text-gray-600">
            Select a use case below to interactively experience the CERTI workflow.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-3 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Use case demos"
          >
            {arcadeDemos.map((demo) => {
              const isActive = demo.id === activeDemo.id

              return (
                <button
                  key={demo.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="use-case-demo-panel"
                  onClick={() => setActiveDemoId(demo.id)}
                  className={`shrink-0 rounded-xl px-5 py-3 text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-[#fff7dc] shadow-lg border-l-4 border-[#3e2723] ring-1 ring-[#ffedac]'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <span className="block text-sm font-semibold text-gray-900">{demo.label}</span>
                  <span className="block text-xs text-gray-600">{demo.subtitle}</span>
                </button>
              )
            })}
          </motion.div>

          <motion.div
            key={activeDemo.id}
            id="use-case-demo-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="app-card p-4 md:p-6"
          >
            <div className="mb-5">
              <h3 className="text-2xl font-semibold text-gray-900">{activeDemo.title}</h3>
              <p className="text-[#a9aecf] font-medium mt-2">{activeDemo.subtitle}</p>
            </div>
            <ArcadeEmbed demo={activeDemo} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
