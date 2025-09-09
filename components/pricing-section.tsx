'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

export function PricingSection() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<null | 'lite' | 'standard' | 'fullqms'>(null)
  const comparisonFeatures = [
    {
      category: "Document Management (DocCore)",
      subtitle: "Core document control and management capabilities",
      features: [
        { text: "Centralized Document Management", lite: true, standard: true, fullqms: true },
        { text: "Version Control & Approval Workflow Management", lite: true, standard: true, fullqms: true },
        { text: "Document Change Management & Impact Analysis", lite: true, standard: true, fullqms: true },
        { text: "AI-Based Document Change Recommendations", lite: true, standard: true, fullqms: true },
        { text: "Document Validity Management", lite: true, standard: true, fullqms: true },
        { text: "Document-Standard Compliance Management", lite: true, standard: true, fullqms: true },
        { text: "Business Intelligence & Analytics (Dashboard)", lite: true, standard: true, fullqms: true },
        { text: "Automatic Alerts & Notifications", lite: true, standard: true, fullqms: true }
      ]
    },
    {
      category: "Audit & CAPA Management",
      subtitle: "Advanced audit and corrective action capabilities",
      features: [
        { text: "Internal and External Audit Management", standard: true, fullqms: true },
        { text: "Real-Time Mobile Audit Interface", standard: true, fullqms: true },
        { text: "Production Line Error Management", standard: true, fullqms: true },
        { text: "AI-Based Audit Gap Detection and Management", standard: true, fullqms: true },
        { text: "AI-Based Pre-Audits", standard: true, fullqms: true },
        { text: "AI-Based Audit Reporting", standard: true, fullqms: true },
        { text: "AI-Based Root Cause Analysis", standard: true, fullqms: true },
        { text: "AI-Based Corrective and Preventive Action (CAPA) Recommendations", standard: true, fullqms: true },
        { text: "Customer Complaint Management", standard: true, fullqms: true },
        { text: "AI-Assisted Customer Complaint CAPA Reports", standard: true, fullqms: true }
      ]
    },
    {
      category: "Supplier & Training Management",
      subtitle: "Comprehensive supplier quality and workforce management",
      features: [
        { text: "Centralized Supplier Quality & Certificate Management", fullqms: true },
        { text: "AI-Based Supplier Scoring System", fullqms: true },
        { text: "Supplier Performance Analysis & Dashboard", fullqms: true },
        { text: "AI-Based Supplier Risk Assessment", fullqms: true },
        { text: "Employee Training & Certification Management", fullqms: true },
        { text: "AI-Based Training Recommendations", fullqms: true },
        { text: "Regulation-Focused Certificate Validity Tracking", fullqms: true }
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6"
          >
            {t('pricing.header')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-brand-secondary/80 max-w-2xl mx-auto"
          >
            {t('pricing.sub')}
          </motion.p>
        </div>

        {/* Unified Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.transparent')}</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t('pricing.transparent.sub')}</p>
          </div>

          {/* Plans Overview (click to select) */}
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
              {/* Lite Plan */}
              <button
                type="button"
                onClick={() => setSelected('lite')}
                className={`text-left bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${
                  selected === 'lite' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    {/* Document icon */}
                    <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/>
                      <path d="M14 2v5h5"/>
                      <path d="M9 13h6M9 17h6M9 9h3"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.table.lite')}</h3>
                  <p className="text-gray-600 mb-4">{t('pricing.card.lite.desc')}</p>
                  {/* Module pills: wrap horizontally within card */}
                  <div className="w-full mt-4">
                    {selected === 'lite' && (
                      <div className="flex flex-row flex-wrap justify-center items-center gap-2">
                        {['DocCore'].map((m) => (
                          <span key={m} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs border border-blue-100 whitespace-nowrap">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {/* Standard Plan */}
              <button
                type="button"
                onClick={() => setSelected('standard')}
                className={`text-left bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${
                  selected === 'standard' ? 'border-amber-300 ring-2 ring-amber-200' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                    {/* Clipboard check icon */}
                    <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
                      <path d="M9 3h6v4H9z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.table.standard')}</h3>
                  <p className="text-gray-600 mb-4">{t('pricing.card.standard.desc')}</p>
                  <div className="w-full mt-4">
                    {selected === 'standard' && (
                      <div className="flex flex-row flex-wrap justify-center items-center gap-2">
                        {['DocCore','ResolveCore','AuditCore'].map((m) => (
                          <span key={m} className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs border border-orange-100 whitespace-nowrap">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {/* Full QMS Plan */}
              <button
                type="button"
                onClick={() => setSelected('fullqms')}
                className={`text-left bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${
                  selected === 'fullqms' ? 'border-gray-400 ring-2 ring-gray-300' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                    {/* Office building icon */}
                    <svg className="w-10 h-10 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="7" width="18" height="14" rx="2"/>
                      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                      <path d="M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2M12 21v-4"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.table.full')}</h3>
                  <p className="text-gray-600 mb-4">{t('pricing.card.full.desc')}</p>
                  <div className="w-full mt-4">
                    {selected === 'fullqms' && (
                      <div className="flex flex-row flex-wrap justify-center items-center gap-2">
                        {['DocCore','ResolveCore','AuditCore','SupplyCore','SkillCore'].map((m) => (
                          <span key={m} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200 whitespace-nowrap">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* CTA Inside Card */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{t('pricing.cta.title')}</h4>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                {t('pricing.cta.desc')}
              </p>
              <button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                {t('pricing.cta.button')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Included in Every Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
            <h3 className="text-3xl font-semibold text-center text-gray-900 mb-10">{t('pricing.includedEvery.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <span className="text-green-600 text-2xl leading-none" aria-hidden="true">✓</span>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t('pricing.includedEvery.ai')}</div>
                  <p className="text-gray-600">{t('pricing.includedEvery.ai.sub')}</p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <span className="text-green-600 text-2xl leading-none" aria-hidden="true">✓</span>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t('pricing.includedEvery.docs')}</div>
                  <p className="text-gray-600">{t('pricing.includedEvery.docs.sub')}</p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <span className="text-green-600 text-2xl leading-none" aria-hidden="true">✓</span>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t('pricing.includedEvery.compliance')}</div>
                  <p className="text-gray-600">{t('pricing.includedEvery.compliance.sub')}</p>
                </div>
              </div>
              {/* Item 4 */}
              <div className="flex items-start gap-4">
                <span className="text-green-600 text-2xl leading-none" aria-hidden="true">✓</span>
                <div>
                  <div className="text-xl font-semibold text-gray-900 mb-1">{t('pricing.includedEvery.support')}</div>
                  <p className="text-gray-600">{t('pricing.includedEvery.support.sub')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compare Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6 text-center">{t('pricing.compare')}</h2>
          <p className="text-xl text-brand-secondary/80 text-center mb-12">{t('pricing.compare.sub')}</p>
          
          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" role="table" aria-label={t('pricing.compare.caption')}>
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4"></div>
              <div className="p-4 text-center font-medium text-gray-900">Lite</div>
              <div className="p-4 text-center font-medium text-gray-900">Standard</div>
              <div className="p-4 text-center font-medium text-gray-900">Full QMS</div>
            </div>

            {/* Feature Categories */}
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900">{category.category}</h4>
                  {category.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>
                  )}
                </div>

                {/* Category Features */}
                {category.features.map((feature, featureIndex) => {
                  const featureText = typeof feature === 'string' ? feature : feature.text
                  const isIncluded = (plan: string) => {
                    if (typeof feature === 'string') return true
                    if (plan === 'lite' && 'lite' in feature) return feature.lite
                    if (plan === 'standard' && 'standard' in feature) return feature.standard
                    if (plan === 'fullqms' && 'fullqms' in feature) return feature.fullqms
                    return false
                  }

                  return (
                    <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 text-sm">
                      <div className="p-4 text-gray-700">{featureText}</div>
                      <div className="p-4 text-center">
                        {isIncluded('lite') === true ? '✓' : 
                         typeof isIncluded('lite') === 'string' ? isIncluded('lite') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('standard') === true ? '✓' : 
                         typeof isIncluded('standard') === 'string' ? isIncluded('standard') : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('fullqms') === true ? '✓' : 
                         typeof isIncluded('standard') === 'string' ? isIncluded('fullqms') : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We can tailor a plan specifically for your organization's unique requirements and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
              <button className="border-2 border-gray-900 text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
