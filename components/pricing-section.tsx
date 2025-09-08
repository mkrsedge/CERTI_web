'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

export function PricingSection() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)

  const plans = useMemo(() => ([{
    name: t('pricing.table.lite'),
    desc: 'Essential document control',
    bullets: ['DocCore', 'Alerts & notifications', 'Analytics'],
  }, {
    name: t('pricing.table.standard'),
    desc: 'Audits + AI-powered CAPA',
    bullets: ['AuditCore', 'AI GAP detection', 'CAPA workflow'],
  }, {
    name: t('pricing.table.full'),
    desc: 'End-to-end quality suite',
    bullets: ['ResolveCore', 'SupplyCore', 'SkillCore'],
  }]), [t])

  // Map which modules belong to each plan (by index in ModulesSection order)
  const planModules: Record<number, number[]> = {
    0: [0],          // Lite -> Document Management
    1: [0, 1, 2],    // Standard -> Doc + Audit + Production Resolution
    2: [0, 1, 2, 3], // Full QMS -> All
  }

  const onSelect = useCallback((idx: number) => {
    setSelected(idx)
    const el = document.getElementById('plan-modules')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

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

        {/* Selectable plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
              className={`text-left bg-white rounded-2xl border shadow-sm p-6 transition-all ${
                selected === idx ? 'border-gray-900 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
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
            </motion.button>
          ))}
        </div>

        {/* Included in all bundles */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('pricing.included.title')}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
            {[
              'AI core features',
              'Secure hosting & backups',
              'Role-based access control',
              'Audit logs & traceability',
              'Email support',
              'Export & reporting',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Modules revealed on plan select */}
        <div id="plan-modules" className="mt-16">
          {selected !== null && (
            <>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {plans[selected].name} • Modules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {planModules[selected].map((modIdx) => (
                  <div key={modIdx} className="app-card p-6">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {modIdx === 0 && t('modules.1.title')}
                      {modIdx === 1 && t('modules.2.title')}
                      {modIdx === 2 && t('modules.3.title')}
                      {modIdx === 3 && t('modules.4.title')}
                    </div>
                    <div className="text-[#a9aecf] mb-2">
                      {modIdx === 0 && t('modules.1.sub')}
                      {modIdx === 1 && t('modules.2.sub')}
                      {modIdx === 2 && t('modules.3.sub')}
                      {modIdx === 3 && t('modules.4.sub')}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {modIdx === 0 && t('modules.1.desc')}
                      {modIdx === 1 && t('modules.2.desc')}
                      {modIdx === 2 && t('modules.3.desc')}
                      {modIdx === 3 && t('modules.4.desc')}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
