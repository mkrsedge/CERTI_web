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
        { text: 'AI-Based CAPA Suggestions', standard: true, fullqms: true },
        { text: 'Customer Complaint Management', standard: true, fullqms: true },
        { text: 'AI-Assisted CAPA Reports for Complaints', standard: true, fullqms: true },
      ],
    },
    {
      category: 'Supplier & Training Management',
      subtitle: 'Comprehensive supplier quality and workforce management',
      features: [
        { text: 'Centralized Supplier Quality & Certification Management', fullqms: true },
        { text: 'AI-Based Supplier Scoring', fullqms: true },
        { text: 'Supplier Performance Analytics & Dashboards', fullqms: true },
        { text: 'AI-Based Supplier Risk Assessment', fullqms: true },
        { text: 'Workforce Training & Certification Management', fullqms: true },
        { text: 'AI-Based Training Recommendations', fullqms: true },
        { text: 'Regulatory Compliant Certificate Validity Tracking', fullqms: true },
      ],
    },
  ])

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

        {/* Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[{
            key: 'lite' as const,
            title: t('pricing.table.lite'),
            subtitle: 'Core document control'
          }, {
            key: 'standard' as const,
            title: t('pricing.table.standard'),
            subtitle: 'Audits + CAPA'
          }, {
            key: 'fullqms' as const,
            title: t('pricing.table.full'),
            subtitle: 'End-to-end quality'
          }].map((plan, idx) => (
            <div key={idx} className={`rounded-2xl border ${selectedPlan === plan.key ? 'border-gray-900 shadow-lg' : 'border-gray-200 shadow-sm'} bg-white`}> 
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                  <span className="text-sm text-gray-500">{plan.subtitle}</span>
                </div>
                <button
                  onClick={() => setSelectedPlan(plan.key)}
                  className={`mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${selectedPlan === plan.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  {selectedPlan === plan.key ? (lang === 'tr' ? 'Seçildi' : 'Selected') : (lang === 'tr' ? 'Seç' : 'Select')}
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Included in all plans */}
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
