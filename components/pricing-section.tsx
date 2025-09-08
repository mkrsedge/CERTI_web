'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

const Check = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function PricingSection() {
  const { t, lang } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<null | 'lite' | 'standard' | 'fullqms'>(null)
  const comparisonFeatures = (lang === 'tr' ? [
    {
      category: 'Doküman Yönetimi (DocCore)',
      subtitle: 'Temel doküman kontrol ve yönetim yetenekleri',
      features: [
        { text: 'Merkezi Doküman Yönetimi', lite: true, standard: true, fullqms: true },
        { text: 'Versiyon Kontrolü ve Onay İş Akışları', lite: true, standard: true, fullqms: true },
        { text: 'Doküman Değişiklik Yönetimi ve Etki Analizi', lite: true, standard: true, fullqms: true },
        { text: 'Yapay Zeka Tabanlı Değişiklik Önerileri', lite: true, standard: true, fullqms: true },
        { text: 'Doküman Geçerlilik Yönetimi', lite: true, standard: true, fullqms: true },
        { text: 'Doküman-Standart Uygunluk Yönetimi', lite: true, standard: true, fullqms: true },
        { text: 'İş Zekası ve Analitik (Panel)', lite: true, standard: true, fullqms: true },
        { text: 'Otomatik Uyarılar ve Bildirimler', lite: true, standard: true, fullqms: true },
      ],
    },
    {
      category: 'Denetim ve DÖF Yönetimi',
      subtitle: 'Gelişmiş denetim ve düzeltici/önleyici faaliyet yetenekleri',
      features: [
        { text: 'İç ve Dış Denetim Yönetimi', standard: true, fullqms: true },
        { text: 'Gerçek Zamanlı Mobil Denetim Arayüzü', standard: true, fullqms: true },
        { text: 'Üretim Hattı Hata Yönetimi', standard: true, fullqms: true },
        { text: 'Yapay Zeka ile Denetim Açığı Tespiti ve Yönetimi', standard: true, fullqms: true },
        { text: 'Yapay Zeka ile Ön Denetimler', standard: true, fullqms: true },
        { text: 'Yapay Zeka ile Denetim Raporlama', standard: true, fullqms: true },
        { text: 'Yapay Zeka ile Kök Neden Analizi', standard: true, fullqms: true },
        { text: 'Yapay Zeka ile DÖF Önerileri', standard: true, fullqms: true },
        { text: 'Müşteri Şikâyeti Yönetimi', standard: true, fullqms: true },
        { text: 'Müşteri Şikâyetlerinde Yapay Zeka Destekli DÖF Raporları', standard: true, fullqms: true },
      ],
    },
    {
      category: 'Tedarikçi ve Eğitim Yönetimi',
      subtitle: 'Kapsamlı tedarikçi kalitesi ve iş gücü yönetimi',
      features: [
        { text: 'Merkezi Tedarikçi Kalitesi ve Sertifika Yönetimi', fullqms: true },
        { text: 'Yapay Zeka Tabanlı Tedarikçi Puanlama', fullqms: true },
        { text: 'Tedarikçi Performans Analizi ve Paneller', fullqms: true },
        { text: 'Yapay Zeka Tabanlı Tedarikçi Risk Değerlendirme', fullqms: true },
        { text: 'Çalışan Eğitim ve Sertifikasyon Yönetimi', fullqms: true },
        { text: 'Yapay Zeka Tabanlı Eğitim Önerileri', fullqms: true },
        { text: 'Mevzuata Uygun Sertifika Geçerlilik Takibi', fullqms: true },
      ],
    },
  ] : [
  {
      category: 'Document Management (DocCore)',
      subtitle: 'Core document control and management capabilities',
      features: [
        { text: 'Centralized Document Management', lite: true, standard: true, fullqms: true },
        { text: 'Version Control & Approval Workflow Management', lite: true, standard: true, fullqms: true },
        { text: 'Document Change Management & Impact Analysis', lite: true, standard: true, fullqms: true },
        { text: 'AI-Based Document Change Recommendations', lite: true, standard: true, fullqms: true },
        { text: 'Document Validity Management', lite: true, standard: true, fullqms: true },
        { text: 'Document-Standard Compliance Management', lite: true, standard: true, fullqms: true },
        { text: 'Business Intelligence & Analytics (Dashboard)', lite: true, standard: true, fullqms: true },
        { text: 'Automatic Alerts & Notifications', lite: true, standard: true, fullqms: true },
      ],
    },
    {
      category: 'Audit & CAPA Management',
      subtitle: 'Advanced audit and corrective action capabilities',
      features: [
        { text: 'Internal and External Audit Management', standard: true, fullqms: true },
        { text: 'Real-Time Mobile Audit Interface', standard: true, fullqms: true },
        { text: 'Production Line Error Management', standard: true, fullqms: true },
        { text: 'AI-Based Audit Gap Detection and Management', standard: true, fullqms: true },
        { text: 'AI-Based Pre-Audits', standard: true, fullqms: true },
        { text: 'AI-Based Audit Reporting', standard: true, fullqms: true },
        { text: 'AI-Based Root Cause Analysis', standard: true, fullqms: true },
        { text: 'AI-Based Corrective and Preventive Action (CAPA) Recommendations', standard: true, fullqms: true },
        { text: 'Customer Complaint Management', standard: true, fullqms: true },
        { text: 'AI-Assisted Customer Complaint CAPA Reports', standard: true, fullqms: true },
      ],
    },
    {
      category: 'Supplier & Training Management',
      subtitle: 'Comprehensive supplier quality and workforce management',
      features: [
        { text: 'Centralized Supplier Quality & Certificate Management', fullqms: true },
        { text: 'AI-Based Supplier Scoring System', fullqms: true },
        { text: 'Supplier Performance Analysis & Dashboard', fullqms: true },
        { text: 'AI-Based Supplier Risk Assessment', fullqms: true },
        { text: 'Employee Training & Certification Management', fullqms: true },
        { text: 'AI-Based Training Recommendations', fullqms: true },
        { text: 'Regulation-Focused Certificate Validity Tracking', fullqms: true },
      ],
    },
  ]) as const

  const check = '✓'
  const isSelected = (plan: 'lite' | 'standard' | 'fullqms') => selectedPlan === plan

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

          {/* Plans Overview */}
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Lite */}
              <div
                onClick={() => setSelectedPlan('lite')}
                role="button"
                className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 group cursor-pointer ${
                  isSelected('lite') ? 'border-gray-900 shadow-md ring-2 ring-gray-900/10' : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
                aria-pressed={isSelected('lite')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Lite</h4>
                  <p className="text-gray-600 mb-4">{lang === 'tr' ? 'Temel doküman kontrolü ve temel denetim yetenekleri' : 'Essential document control and basic audit capabilities'}</p>
                  {isSelected('lite') && (
                    <div className="mt-4 text-left">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('pricing.includes')}</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">DocCore</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Standard */}
              <div
                onClick={() => setSelectedPlan('standard')}
                role="button"
                className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 group cursor-pointer ${
                  isSelected('standard') ? 'border-gray-900 shadow-md ring-2 ring-gray-900/10' : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
                aria-pressed={isSelected('standard')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Standard</h4>
                  <p className="text-gray-600 mb-4">{lang === 'tr' ? 'Gelişmiş denetim yetenekleri ve yapay zeka destekli DÖF yönetimi' : 'Advanced audit capabilities with AI-powered CAPA management'}</p>
                  {isSelected('standard') && (
                    <div className="mt-4 text-left">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('pricing.includes')}</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">DocCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">ResolveCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">AuditCore</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enterprise */}
              <div
                onClick={() => setSelectedPlan('fullqms')}
                role="button"
                className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 group cursor-pointer ${
                  isSelected('fullqms') ? 'border-gray-900 shadow-md ring-2 ring-gray-900/10' : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
                aria-pressed={isSelected('fullqms')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Full QMS</h4>
                  <p className="text-gray-600 mb-4">{lang === 'tr' ? 'Uçtan uca kalite yönetimi ve tam otomasyon' : 'End-to-end quality management with complete automation'}</p>
                  {isSelected('fullqms') && (
                    <div className="mt-4 text-left">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t('pricing.includes')}</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">DocCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">ResolveCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">AuditCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">SupplyCore</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">SkillCore</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Benefits */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('pricing.included.title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(lang === 'tr' 
                  ? [
                      { title: 'Yapay Zeka Destekli İçgörüler', desc: 'Akıllı öneriler ve otomatik analiz' },
                      { title: 'Doküman Yönetimi', desc: 'Sürüm takibi ile merkezi kontrol' },
                      { title: 'Uyumluluk Araçları', desc: 'Yerleşik mevzuat uyumluluğu özellikleri' },
                      { title: '7/24 Destek', desc: 'İhtiyacınız olduğunda uzman desteği' },
                    ]
                  : [
                      { title: 'AI-Powered Insights', desc: 'Smart recommendations and automated analysis' },
                      { title: 'Document Management', desc: 'Centralized control with version tracking' },
                      { title: 'Compliance Tools', desc: 'Built-in regulatory compliance features' },
                      { title: '24/7 Support', desc: 'Expert assistance whenever you need it' },
                    ]
                ).map((it, i) => (
                  <div key={i} className="flex items-start">
                    <span className="text-green-500 mr-4 mt-1 text-xl"><Check /></span>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">{it.title}</h5>
                      <p className="text-gray-600 text-sm">{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{t('pricing.cta.header')}</h4>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">{t('pricing.cta.body')}</p>
              <button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                {t('pricing.cta.button')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Compare Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-20"
        >
          <h2 className="text-3xl font-normal text-gray-900 mb-4 text-center">{t('pricing.compare')}</h2>
          <p className="text-gray-600 text-center mb-12">{t('pricing.compare.sub')}</p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4"></div>
              <div className="p-4 text-center font-medium text-gray-900">{t('pricing.table.lite')}</div>
              <div className="p-4 text-center font-medium text-gray-900">{t('pricing.table.standard')}</div>
              <div className="p-4 text-center font-medium text-gray-900">{t('pricing.table.full')}</div>
            </div>

            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="bg-gray-50 border-b border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900">{category.category}</h4>
                  {category.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{category.subtitle}</p>
                  )}
                </div>

                {category.features.map((feature, featureIndex) => {
                  const featureText = typeof feature === 'string' ? feature : feature.text
                  const isIncluded = (plan: 'lite' | 'standard' | 'fullqms') => {
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
                        {isIncluded('lite') === true ? (
                          <span className="inline-flex text-green-600 justify-center"><Check /></span>
                        ) : typeof isIncluded('lite') === 'string' ? (isIncluded('lite') as string) : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('standard') === true ? (
                          <span className="inline-flex text-green-600 justify-center"><Check /></span>
                        ) : typeof isIncluded('standard') === 'string' ? (isIncluded('standard') as string) : ''}
                      </div>
                      <div className="p-4 text-center">
                        {isIncluded('fullqms') === true ? (
                          <span className="inline-flex text-green-600 justify-center"><Check /></span>
                        ) : typeof isIncluded('fullqms') === 'string' ? (isIncluded('fullqms') as string) : ''}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('pricing.extra.title')}</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{t('pricing.extra.body')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">{t('pricing.extra.cta1')}</button>
                <button className="border-2 border-gray-900 text-gray-900 font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 hover:text-white transition-colors">{t('pricing.extra.cta2')}</button>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  )
}

