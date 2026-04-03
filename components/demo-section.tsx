'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useLanguage } from './language-context'

const DEFAULT_BOOKING_URL = 'https://calendar.app.google/bBPikunCZbbzPqVHA'

export function DemoSection() {
  const { lang, t } = useLanguage()
  const phoneNumber = useMemo(() => (lang === 'tr' ? '+90 542 599 18 84' : '+1 917 689 34 36'), [lang])
  const telHref = useMemo(() => phoneNumber.replace(/[^\d+]/g, ''), [phoneNumber])
  const bookingUrl = process.env.NEXT_PUBLIC_GOOGLE_SCHEDULER_URL || DEFAULT_BOOKING_URL
  const bookingTitle = lang === 'tr' ? 'CERTI demo planlama takvimi' : 'CERTI demo booking calendar'
  const fallbackLabel = lang === 'tr' ? 'Takvimi yeni sekmede ac' : 'Open scheduler in a new tab'
  const helperText =
    lang === 'tr'
      ? 'Uygun bir zamani secmek icin asagidaki takvimi kullanin.'
      : 'Use the calendar below to choose a time that works for you.'

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 mb-6">{t('demo.title')}</h2>
          <p className="text-body-large max-w-3xl mx-auto">{t('demo.lead')}</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-brand-secondary rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-brand-primary mb-4">{t('demo.expect.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <div>
                    <div className="text-brand-primary font-medium">{t('demo.expect.1.title')}</div>
                    <div className="text-brand-primary/70 text-sm">{t('demo.expect.1.sub')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <div>
                    <div className="text-brand-primary font-medium">{t('demo.expect.2.title')}</div>
                    <div className="text-brand-primary/70 text-sm">{t('demo.expect.2.sub')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <div>
                    <div className="text-brand-primary font-medium">{t('demo.expect.3.title')}</div>
                    <div className="text-brand-primary/70 text-sm">{t('demo.expect.3.sub')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-secondary rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-brand-primary mb-4">{t('contact.title')}</h3>
              <div className="space-y-3 text-brand-primary/80">
                <div>
                  <div className="text-brand-primary font-medium">{t('contact.email')}</div>
                  <a href="mailto:info@makers-edge.com" className="hover:underline text-brand-primary">info@makers-edge.com</a>
                </div>
                <div>
                  <div className="text-brand-primary font-medium">{t('contact.telephone')}</div>
                  <a href={`tel:${telHref}`} className="hover:underline text-brand-primary">{phoneNumber}</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('demo.request')}</h3>
            <p className="text-sm text-gray-600 mb-6">{helperText}</p>

            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50">
              <iframe
                src={bookingUrl}
                title={bookingTitle}
                className="w-full h-[520px] md:h-[580px] lg:h-[620px] border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen"
              />
            </div>

            <noscript>
              <p className="mt-4 text-sm text-gray-600">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {fallbackLabel}
                </a>
              </p>
            </noscript>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
