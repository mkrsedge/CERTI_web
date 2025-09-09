'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function PricingSection() {
  const { t, lang } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<null | 'lite' | 'standard' | 'fullqms'>(null)

  // Localized module labels and plan mapping
  const moduleLabels = [
    t('modules.1.title'),
    t('modules.2.title'),
    t('modules.3.title'),
    t('modules.4.title'),
  ]
  const planToModules: Record<'lite'|'standard'|'fullqms', number[]> = {
    lite: [0],
    standard: [0,1,2],
    fullqms: [0,1,2,3],
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t('pricing.header')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('pricing.sub')}
          </motion.p>
        </div>

        {/* Packages (no extra descriptions) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[{ key: 'lite' as const, title: t('pricing.table.lite') },
            { key: 'standard' as const, title: t('pricing.table.standard') },
            { key: 'fullqms' as const, title: t('pricing.table.full') }
          ].map((plan, idx) => (
            <button
              key={plan.key}
              type="button"
              onClick={() => setSelectedPlan(plan.key)}
              className={`rounded-2xl border bg-white p-6 text-left transition-all ${
                selectedPlan === plan.key ? 'border-gray-900 shadow-lg' : 'border-gray-200 shadow-sm hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                {selectedPlan === plan.key && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white">
                    {lang === 'tr' ? 'Seçildi' : 'Selected'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Modules included in selected package (pills) */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              {lang === 'tr' ? 'Paketin kapsadığı modüller' : 'Modules included in this package'}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {planToModules[selectedPlan].map((m) => (
                <span key={m} className="px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-sm border border-gray-200">
                  {moduleLabels[m]}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Included in every package */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-normal text-gray-900 mb-4 text-center">{t('pricing.included.title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {[
              (lang==='tr' ? 'Yapay zeka çekirdek özellikleri' : 'AI core features'),
              (lang==='tr' ? 'Güvenli barındırma ve yedekleme' : 'Secure hosting & backups'),
              (lang==='tr' ? 'Rol tabanlı erişim kontrolü' : 'Role-based access control'),
              (lang==='tr' ? 'Denetim kayıtları ve izlenebilirlik' : 'Audit logs & traceability'),
              (lang==='tr' ? 'E-posta destek' : 'Email support'),
              (lang==='tr' ? 'Dışa aktarma ve raporlama' : 'Export & reporting'),
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <span className="inline-flex text-green-600"><Check /></span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-center text-white shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h4 className="text-3xl font-bold mb-4">{t('pricing.cta.header')}</h4>
              <p className="text-gray-200 mb-8">{t('pricing.cta.body')}</p>
              <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
                {t('pricing.cta.button')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

