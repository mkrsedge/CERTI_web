'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
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
    title: 'Submit and Investigate a Customer Complaint',
    subtitle: 'Guided Root Cause Analysis & CAPA',
    src: 'https://demo.arcade.software/PWBNgAKPv8EJf19bvGFh?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  },
  {
    id: 'allergen-mismatch',
    label: 'Food Safety',
    title: 'Review and Resolve an Allergen Mismatch in Product Labeling',
    subtitle: 'Allergen Control & Corrective Actions',
    src: 'https://demo.arcade.software/bP7Y8IEhBHDzW04BhAvw?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  },
  {
    id: 'batch-record',
    label: 'Batch Records',
    title: 'Submit a Batch Record and Resolve COA Holds',
    subtitle: 'Digital Batch Logging & Compliant Release',
    src: 'https://demo.arcade.software/tij5FFovUpB2Osh5YYAp?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  },
  {
    id: 'change-management',
    label: 'Change Management',
    title: 'Manage Change Requests for SQF Food Safety Code Updates',
    subtitle: 'Regulatory Updates & Impact Analysis',
    src: 'https://demo.arcade.software/cBFS9NrdbaO31ZYF8530?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'
  }
]

function ArcadeEmbed({ demo }: { demo: ArcadeDemo }) {
  const embedRef = useRef<HTMLDivElement>(null)

  const openFullscreen = async () => {
    const element = embedRef.current
    if (!element) return

    if (element.requestFullscreen) {
      await element.requestFullscreen()
    }
  }

  return (
    <div ref={embedRef} className="relative bg-white">
      <button
        type="button"
        onClick={openFullscreen}
        className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/95 text-[#3e2723] shadow-md backdrop-blur transition hover:bg-white md:hidden"
        aria-label="Open demo fullscreen"
        title="Open fullscreen"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M16 3h3a2 2 0 0 1 2 2v3" />
          <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      </button>

      <div style={{ position: 'relative', paddingBottom: 'calc(49.296875% + 41px)', height: '0', width: '100%' }}>
        <iframe
          src={demo.src}
          title={demo.title}
          frameBorder="0"
          loading="lazy"
          allowFullScreen
          allow="clipboard-write; fullscreen"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
        />
      </div>
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
