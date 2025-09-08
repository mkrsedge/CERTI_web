'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

export function PricingSection() {
  const { t } = useLanguage()

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

        {/* Simple plans overview (static, build-safe) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            name: 'Lite',
            desc: 'Essential document control',
            bullets: ['DocCore', 'Alerts & notifications', 'Analytics']
          }, {
            name: 'Standard',
            desc: 'Audits + AI-powered CAPA',
            bullets: ['AuditCore', 'AI GAP detection', 'CAPA workflow']
          }, {
            name: 'Full QMS',
            desc: 'End-to-end quality suite',
            bullets: ['ResolveCore', 'SupplyCore', 'SkillCore']
          }].map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
            >
              <div className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</div>
              <div className="text-gray-600 mb-4">{plan.desc}</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {plan.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
