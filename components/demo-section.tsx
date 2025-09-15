'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useLanguage } from './language-context'

export function DemoSection() {
  const { lang, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    message: ''
  })
  const phoneNumber = useMemo(() => (lang === 'tr' ? '+90 542 599 18 84' : '+1 917 689 34 36'), [lang])
  const telHref = useMemo(() => phoneNumber.replace(/[^\d+]/g, ''), [phoneNumber])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed')
      }
      setStatus({ ok: true, message: lang === 'tr' ? 'Talebiniz alındı. Yakında sizinle iletişime geçeceğiz.' : 'Your request has been received. We will contact you shortly.' })
      setFormData({ name: '', email: '', company: '', phone: '', employees: '', message: '' })
    } catch (err: any) {
      setStatus({ ok: false, message: lang === 'tr' ? 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' : 'Something went wrong. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-light text-white mb-6">{t('demo.title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('demo.lead')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('demo.request')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700 mb-2">{t('form.fullName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    id="demo-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors"
                    placeholder={t('form.fullName.placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700 mb-2">{t('form.workEmail')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    id="demo-email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors"
                    placeholder={t('form.workEmail.placeholder')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="demo-company" className="block text-sm font-medium text-gray-700 mb-2">{t('form.company')}</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    id="demo-company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors"
                    placeholder={t('form.company.placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="demo-phone" className="block text-sm font-medium text-gray-700 mb-2">{t('form.phone')}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    id="demo-phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors"
                    placeholder={lang === 'tr' ? t('form.phone.placeholder.tr') : t('form.phone.placeholder.en')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="demo-employees" className="block text-sm font-medium text-gray-700 mb-2">{t('form.companySize')}</label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  id="demo-employees"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors"
                >
                  <option value="">{t('form.companySize.placeholder')}</option>
                  <option value="1-10">{t('form.companySize.1-10')}</option>
                  <option value="11-50">{t('form.companySize.11-50')}</option>
                  <option value="51-200">{t('form.companySize.51-200')}</option>
                  <option value="201-1000">{t('form.companySize.201-1000')}</option>
                  <option value="1000+">{t('form.companySize.1000+')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="demo-message" className="block text-sm font-medium text-gray-700 mb-2">{t('form.message')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  id="demo-message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a9aecf] focus:border-transparent outline-none transition-colors resize-none"
                  placeholder={t('form.message.placeholder')}
                ></textarea>
              </div>

              {status && (
                <div className={status.ok ? 'text-green-600' : 'text-red-600'}>
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a9aecf] hover:bg-[#9299c4]'
                }`}
              >
                {isSubmitting ? (lang === 'tr' ? 'Gönderiliyor…' : 'Sending…') : t('form.scheduleDemo')}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">{t('demo.expect.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a9aecf] rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">{t('demo.expect.1.title')}</div>
                    <div className="text-gray-400 text-sm">{t('demo.expect.1.sub')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a9aecf] rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">{t('demo.expect.2.title')}</div>
                    <div className="text-gray-400 text-sm">{t('demo.expect.2.sub')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a9aecf] rounded-full mt-2"></div>
                  <div>
                    <div className="text-white font-medium">{t('demo.expect.3.title')}</div>
                    <div className="text-gray-400 text-sm">{t('demo.expect.3.sub')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">{t('contact.title')}</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <div className="text-[#a9aecf] font-medium">{t('contact.email')}</div>
                  <a href="mailto:info@makers-edge.com" className="hover:underline">info@makers-edge.com</a>
                </div>
                <div>
                  <div className="text-[#a9aecf] font-medium">{t('contact.telephone')}</div>
                  <a href={`tel:${telHref}`} className="hover:underline">{phoneNumber}</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
