'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from './language-context'

export function CaseStudiesSection() {
  const { t, lang } = useLanguage()
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const modules = [
    {
      number: '01',
      title: 'DOCCORE',
      subtitle: lang === 'tr' ? 'Dokümanlar, her zaman denetime hazır' : 'Documents, always audit-ready',
      description: lang === 'tr' ? 'Akıllı doküman kontrolü ve değişiklik yönetimi.' : 'Intelligent document control & change management.',
      published: 'AUG 2024',
      fullDescription: lang === 'tr'
        ? 'Her değişikliğin neyi etkilediğini tahmin etmeye son verin. DocCore her kalite dokümanını desteklediği madde ile ilişkilendirir; sürümleri, onayları ve uyumluluk etkisini tek bir iz üzerinde takip eder.'
        : 'Stop guessing what each change touches. DocCore links every quality document to the clause it supports, then tracks versions, approvals, and compliance impact in a single audit trail.',
      features: (lang === 'tr'
        ? ['Madde bazlı doküman eşleştirme ve açıkların görünür kılınması', 'Etkisini belirten akıllı değişiklik talepleri (ilişkili prosedür ve eğitimlerle)', 'Rol bazlı onay akışları ve temiz denetim izleri', 'Revizyonlarla senkron kanıt ekleri']
        : ['Clause-aware document mapping & gap detection', 'Smart change requests with impact guidance (linked procedures, training)', 'Role-based approvals and clean audit trails', 'Evidence attachments that stay in sync with revisions']),
      outcome: lang === 'tr' ? 'Daha hızlı revizyonlar, daha az kör nokta, temiz kanıtlar.' : 'Faster revisions, fewer blind spots, clean evidence.'
    },
    {
      number: '02',
      title: 'AUDITCORE',
      subtitle: lang === 'tr' ? 'Her denetimi ilk seferde başarıyla geçin' : 'Pass every audit on the first attempt',
      description: lang === 'tr' ? 'Mobil denetimler, Yapay Zeka ön kontrolleri, anlık hazırlık durumu.' : 'Mobile audits, AI pre-checks, real-time readiness.',
      published: 'SEP 2024',
      fullDescription: lang === 'tr'
        ? 'Kendi şablonlarınızla mobil denetimler yürütün, bulguları gerçek zamanlı oluşturun ve hangi maddelerin hazır olup olmadığını denetçiden önce gösteren canlı kapsama görünümünü izleyin.'
        : "Run mobile audits with your own templates, generate findings in real time, and see live clause coverage that tells you exactly what's ready and what's not—before the auditor does.",
      features: (lang === 'tr'
        ? ['Özelleştirilebilir kontrol listeleri ve mobil veri toplama', 'Olası uygunsuzlukları işaretleyen Yapay Zeka ön kontrolleri', 'Maddelere göre canlı kapsama paneli', 'Denetçiye sunulacak tek tık kanıt paketleri']
        : ['Customizable checklists and mobile capture', 'AI pre-checks that flag likely non-conformances', 'Live clause coverage dashboard', 'One-click evidence packets ready for auditors']),
      outcome: lang === 'tr' ? 'Hazırlık süresi haftalardan saatlere iner.' : 'Preparation in hours, not weeks.'
    },
    {
      number: '03',
      title: 'RESOLVECORE',
      subtitle: lang === 'tr' ? 'Sorunları büyümeden çözün' : 'Resolve issues before they escalate',
      description: lang === 'tr' ? 'Yapay Zeka taslaklı DÖF’ler, Kök Neden Analizi, doğrulama.' : 'AI-drafted CAPAs, RCA, and verification.',
      published: 'OCT 2024',
      fullDescription: lang === 'tr'
        ? 'Sorunları ve müşteri şikayetlerini kalıcı çözümlere dönüştürün. ResolveCore kök neden analizine rehberlik eder, prosedürlerinize dayanarak DÖF taslakları üretir ve etkililik doğrulamalarını takip eder; sorunların tekrarlamasını engeller.'
        : "Turn issues and customer complaints into lasting fixes. ResolveCore guides root cause analysis, drafts corrective and preventive actions from your procedures, and verifies effectiveness—so problems don’t return.",
      features: (lang === 'tr'
        ? ['Kök Neden Analizi rehberliği (örn. 5 Neden)', 'SOP ve formlarla bağlantılı Yapay Zeka destekli DÖF taslakları', 'Vade hatırlatmalarıyla etkililik kontrolleri', 'Tekrarlayan riskleri izlemek için eğilim analizi']
        : ['Root cause analysis guidance (e.g., 5 Whys)', 'AI-assisted CAPAs linked to SOPs and forms', 'Effectiveness checks with due date reminders', 'Trend analysis to track repeat risks']),
      outcome: lang === 'tr' ? 'Tekrarlayan bulgularda ölçülebilir azalma, daha hızlı çözüm.' : 'Measurably fewer repeat findings and faster resolutions.'
    },
    {
      number: '04',
      title: 'SUPPLYCORE',
      subtitle: lang === 'tr' ? 'Tedarikçilerden sürpriz yok.' : 'No surprises from suppliers.',
      description: lang === 'tr' ? 'Tedarikçi devreye alma, dokümanlar, uygunsuzluklar.' : 'Supplier onboarding, documentation, and non-conformances.',
      published: 'NOV 2024',
      fullDescription: lang === 'tr'
        ? 'Onayları, spesifikasyonları ve sertifikaları merkezileştirin. Son kullanımlardan önce uyarılar alın, uygunsuzlukları kaydedin ve sorunları doğrudan DÖF akışına yönlendirin; üretim hattı tedarikçi sorununu en zor yoldan öğrenmesin.'
        : 'Centralize approvals, specs, and certificates. Receive reminders before expiries, log non-conformances, and route issues straight into CAPA—so production never learns about a supplier problem the hard way.',
      features: (lang === 'tr'
        ? ['Sertifika ve spesifikasyonlarda son tarih takibi', 'Zamanında doküman, olay ve eğilimlerle tedarikçi puanlama/panelleri', 'Tedarikçi olaylarının DÖF’e aktarımı', 'Devreye alma iş akışları ve doküman toplama']
        : ['Expiry tracking for certs & specs', 'Supplier scoring and performance dashboards (on-time docs, incidents, trend lines)', 'Supplier incidents to CAPA handoff', 'Onboarding workflows and doc collection']),
      outcome: lang === 'tr' ? 'Güvenilir tedarik zinciri, daha güçlü denetimler.' : 'A more reliable supply chain and stronger audits.'
    },
    {
      number: '05',
      title: 'SKILLCORE',
      subtitle: lang === 'tr' ? 'İşgücü uyumluluğu otomatik pilotta' : 'Workforce compliance on autopilot',
      description: lang === 'tr' ? 'Eğitim, yetkinlik ve sertifikasyonlar otomatik pilotta.' : 'Workforce training, skills & certifications on autopilot.',
      published: 'DEC 2024',
      fullDescription: lang === 'tr'
        ? 'Bir sertifika veya eğitim gerektiğinde, SkillCore rol ve lokasyona göre doğru aksiyonları önerir, tamamlamayı teşvik eder ve temiz, dışa aktarılabilir bir iz bırakır; işgücü uyumluluğu geri kalmaz.'
        : 'When a certification or training is required, SkillCore auto-suggests the right actions by role and site, encourages completion, and maintains a clean, exportable trail—so workforce compliance never falls behind.',
      features: (lang === 'tr'
        ? ['Merkezi yetkinlik belgeleri, eğitim kayıtları ve beyanlar (hızlı arama ile)', 'Son tarih takibi ve yenilemeler (çalışan ve yöneticilere bildirimlerle)', 'SOP değişiklikleri ve DÖF aksiyonlarından otomatik atamalar (vade kurallarıyla)', 'Rol/lokasyon kapsam matrisi, boşluk uyarıları ve artan hatırlatmalar']
        : ['Centralized credentials, training records, and attestations with fast search', 'Expiry tracking and renewals with notifications to employees & supervisors', 'Auto-assignments from SOP changes and CAPA actions with due date rules', 'Role/site coverage matrix with gap alerts and escalating reminders']),
      outcome: lang === 'tr' ? 'Eğitime bağlı bulgularda azalma, sürpriz son tarihler yok, denetime hazır kayıtlar.' : 'Fewer training-related findings, zero-surprise expiries, audit-ready records.'
    }
  ]

  return (
    <section id="case-studies" className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-secondary mb-6">{lang === 'tr' ? 'ÇEKİRDEK MODÜLLER' : 'CORE MODULES'}</h2>
          <p className="text-xl text-brand-secondary/80 max-w-3xl mx-auto">
            {lang === 'tr' ? 'İşletme operasyonlarınızdaki her alanı kapsayacak şekilde tasarlanmış kapsamlı modül paketimizi keşfedin.' : 'Explore our comprehensive suite of modules designed to address every aspect of your business operations and growth.'}
          </p>
        </motion.div>

        {/* Module Sections */}
        <div className="space-y-12">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl border-4 p-8 md:p-12 relative overflow-hidden" style={{borderColor: '#3e2723'}}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8">
                    <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-4 uppercase tracking-wide" style={{color: '#3e2723'}}>
                      {module.title}
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{color: '#3e2723'}}>
                      {module.description}
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-end">
                    <button
                      onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      className="px-8 py-4 font-bold text-xl transition-colors uppercase tracking-wide rounded-full shadow-lg"
                      style={{backgroundColor: '#ffedac', color: '#3e2723'}}
                    >
                      {lang === 'tr' ? 'DETAYLAR' : 'DETAILS'}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedModule === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-top border-gray-200">
                        <h4 className="text-3xl font-bold mb-6 uppercase tracking-wide" style={{color: '#3e2723'}}>
                          {module.subtitle}
                        </h4>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                          {module.fullDescription}
                        </p>
                        <div className="grid grid-cols-1 gap-8">
                          <div>
                            <h5 className="text-xl font-bold mb-6 uppercase tracking-wide" style={{color: '#3e2723'}}>{lang === 'tr' ? 'Temel Yetenekler:' : 'Key Capabilities:'}</h5>
                            <ul className="space-y-3">
                              {module.features.map((feature: string, featureIndex: number) => (
                                <li key={featureIndex} className="flex items-start gap-3">
                                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{backgroundColor: '#3e2723'}}></div>
                                  <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-gray-700 text-base leading-relaxed font-medium mt-6"><span className="uppercase tracking-wide font-bold" style={{color: '#3e2723'}}>{lang === 'tr' ? 'Sonuç: ' : 'Outcome: '}</span>{module.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
