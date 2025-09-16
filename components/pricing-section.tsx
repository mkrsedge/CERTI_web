'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

export function PricingSection() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<null | 'lite' | 'standard' | 'fullqms'>(null)
  const comparisonFeatures = [
    {
      category: "Smart Doc Management",
      categoryChecks: { lite: true, standard: true, fullqms: true },
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

  const [expandedCategories, setExpandedCategories] = useState<boolean[]>(() =>
    comparisonFeatures.map((_, index) => index !== 0)
  )

  const checkMark = '\u2713'

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => prev.map((value, i) => (i === index ? !value : value)))
  }

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
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Lite</div>
                    <div className="text-gray-500 text-sm">Entry-level document control</div>
                  </div>
                </div>
              </button>

              {/* Standard Plan */}
              <button
                type="button"
                onClick={() => setSelected('standard')}
                className={`text-left bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${
                  selected === 'standard' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Standard</div>
                    <div className="text-gray-500 text-sm">Advanced audit + CAPA</div>
                  </div>
                </div>
              </button>

              {/* Full QMS Plan */}
              <button
                type="button"
                onClick={() => setSelected('fullqms')}
                className={`text-left bg-white rounded-2xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${
                  selected === 'fullqms' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Full QMS</div>
                    <div className="text-gray-500 text-sm">End-to-end automation</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Included in every plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            {comparisonFeatures.map((category, categoryIndex) => {
              const isCollapsible = categoryIndex === 0
              const isExpanded = !isCollapsible || expandedCategories[categoryIndex]

              return (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 items-stretch">
                    <button
                      type="button"
                      onClick={() => isCollapsible && toggleCategory(categoryIndex)}
                      className={`p-4 text-left flex items-start justify-between gap-4 ${isCollapsible ? 'cursor-pointer' : ''}`}
                      aria-expanded={isCollapsible ? isExpanded : undefined}
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.category}</h4>
                        {category.subtitle && (
                          <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>
                        )}
                      </div>
                      {isCollapsible && (
                        <span className="text-gray-500 text-xl leading-none">
                          {isExpanded ? '-' : '+'}
                        </span>
                      )}
                    </button>
                    {(['lite', 'standard', 'fullqms'] as const).map(plan => (
                      <div key={plan} className="p-4 text-center font-medium text-gray-900 flex items-center justify-center">
                        {category.categoryChecks && category.categoryChecks[plan] ? checkMark : ''}
                      </div>
                    ))}
                  </div>

                  {/* Category Features */}
                  {isExpanded && category.features.map((feature, featureIndex) => {
                    const featureText = typeof feature === 'string' ? feature : feature.text
                    const isIncluded = (plan: string) => {
                      if (typeof feature === 'string') return true
                      if (plan === 'lite' && 'lite' in feature) return (feature as any).lite
                      if (plan === 'standard' && 'standard' in feature) return (feature as any).standard
                      if (plan === 'fullqms' && 'fullqms' in feature) return (feature as any).fullqms
                      return false
                    }

                    return (
                      <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 text-sm">
                        <div className="p-4 text-gray-700">{featureText}</div>
                        <div className="p-4 text-center">
                          {isIncluded('lite') === true ? checkMark :
                           typeof isIncluded('lite') === 'string' ? (isIncluded('lite') as any) : ''}
                        </div>
                        <div className="p-4 text-center">
                          {isIncluded('standard') === true ? checkMark :
                           typeof isIncluded('standard') === 'string' ? (isIncluded('standard') as any) : ''}
                        </div>
                        <div className="p-4 text-center">
                          {isIncluded('fullqms') === true ? checkMark :
                           typeof isIncluded('fullqms') === 'string' ? (isIncluded('fullqms') as any) : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
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

