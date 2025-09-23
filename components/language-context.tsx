'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'tr'
type I18nDict = Record<Lang, Record<string, string>>

const dict: I18nDict = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.overview': 'Overview',
    'nav.modules': 'Use-Cases',
    'nav.caseStudies': 'Modules',
    'nav.pricing': 'Pricing',
    'nav.demo': 'Book a Demo',
    'nav.toggle.toTR': 'Switch to Turkish',
    'nav.toggle.toEN': 'Switch to English',

    // Hero
    'hero.title.1': 'AI-Native',
    'hero.title.2': 'Quality & Compliance',
    'hero.desc.1': 'A new era of Quality Management for manufacturers.',
    'hero.desc.2': 'Agentic AI tailored for highly regulated industries.',
    'hero.cta.primary': 'Book a Demo',
    'hero.cta.secondary': 'Learn More',
    'hero.kpi.1': 'Compliance',
    'hero.kpi.2': 'Faster Audits',
    'hero.kpi.3': 'Lower Costs',

    // Overview journey
    'overview.capabilities': 'What CERTI Enables',
    'overview.header': 'Start Your CERTI Journey',
    'overview.sub': 'Follow a seamless path—from integration to results—that transforms quality management from chaos to controlled excellence.',
    'overview.step1.title': 'Connect your quality ecosystem',
    'overview.step1.desc': 'Connect your systems and processes. CERTI adapts to your workflow; data flows seamlessly without complex integrations.',
    'overview.step1.tag': 'API-first integration',
    'overview.step2.title': 'CERTI learns your organization',
    'overview.step2.desc': 'Our AI maps your documents to standards, automatically detecting gaps and updates to ensure continuous compliance.',
    'overview.step2.tag': 'AI-powered document analysis',
    'overview.step3.title': 'Stay continuously audit-ready',
    'overview.step3.desc': 'Non-conformities, CAPAs, and related evidence remain live and traceable. CERTI tracks all actions for you, providing automatic pre-audit checks before inspections.',
    'overview.step3.tag': 'Real-time monitoring',
    'overview.step4.title': 'Resolve issues for good',
    'overview.step4.desc': 'When issues arise, CERTI guides root cause analysis and drafts precise CAPAs based on your procedures.',
    'overview.step4.tag': 'AI-guided CAPA workflow',
    'overview.step5.title': 'Demonstrate reliability and protect revenue',
    'overview.step5.desc': 'With always-ready evidence and closed-loop CAPAs, you reduce findings, keep customers confident, and safeguard high-value contracts.',
    'overview.step5.tag': 'Business impact',
    'overview.goto': 'Go to step',

    // Overview capabilities slider
    'overview.cap.1.title': 'Document Control',
    'overview.cap.1.desc': 'Centralize documents with approvals and versioning.',
    'overview.cap.2.title': 'Audit Management',
    'overview.cap.2.desc': 'Run audits with checklists and real-time reporting.',
    'overview.cap.3.title': 'Risk Assessment',
    'overview.cap.3.desc': 'Identify and mitigate risks with AI insights.',
    'overview.cap.4.title': 'Training & Certification',
    'overview.cap.4.desc': 'Keep workforce training and certifications current.',
    'overview.cap.5.title': 'Supplier Quality',
    'overview.cap.5.desc': 'Track supplier quality with scorecards and incident logs.',
    'overview.cap.6.title': 'Reporting Dashboard',
    'overview.cap.6.desc': 'See live metrics and compliance status.',

    // Modules
    'modules.header': 'Use-Cases',
    'modules.sub': 'Discover how CERTI elevates quality management across your operations—from document control to customer satisfaction.',
    'modules.1.title': 'Smart Document Management',
    'modules.1.sub': 'Intelligent Document Control',
    'modules.1.desc': 'Centralize all compliance documents, map them intelligently to applicable standards, and use AI-assisted updates (e.g., new product introduction).',
    'modules.2.title': 'Audit Readiness',
    'modules.2.sub': 'Integrated Audit Management',
    'modules.2.desc': 'Digitize all your audits—internal, customer, or certification (e.g., ISO, BRC)—with findings, evidence, and assignments in one platform.',
    'modules.3.title': 'Production Issue Resolution',
    'modules.3.sub': 'Factory Floor Solutions',
    'modules.3.desc': 'Resolve issues on the factory floor faster with guided root cause analysis and task-based tracking.',
    'modules.4.title': 'Customer Complaint Resolution',
    'modules.4.sub': 'Structured Case Management',
    'modules.4.desc': 'Turn complaints into lasting fixes with linked SOPs, CAPAs, and effectiveness checks.',

    // Contact/Demo
    'demo.title': 'Book a Demo',
    'demo.request': 'Request Your Demo',
    'demo.lead': 'See CERTI in action. Schedule a personalized demo with our experts and discover how we can transform your quality operations.',
    'demo.expect.title': 'What to Expect',
    'demo.expect.1.title': '30-minute personalized demo',
    'demo.expect.1.sub': 'Tailored to your specific use case',
    'demo.expect.2.title': 'Live Q&A session',
    'demo.expect.2.sub': 'Get your questions answered by experts',
    'demo.expect.3.title': 'Custom implementation plan',
    'demo.expect.3.sub': 'Receive a roadmap for your organization',
    'contact.title': 'Contact Information',
    'contact.email': 'Email',
    'contact.telephone': 'Phone',

    // Form
    'form.fullName': 'Full Name *',
    'form.fullName.placeholder': 'John Doe',
    'form.workEmail': 'Work Email *',
    'form.workEmail.placeholder': 'john@company.com',
    'form.company': 'Company *',
    'form.company.placeholder': 'Company Name',
    'form.phone': 'Phone',
    'form.phone.placeholder.en': '+1 (555) 123-4567',
    'form.phone.placeholder.tr': '+90 5xx xxx xx xx',
    'form.companySize': 'Company Size',
    'form.companySize.placeholder': 'Select company size',
    'form.companySize.1-10': '1-10 employees',
    'form.companySize.11-50': '11-50 employees',
    'form.companySize.51-200': '51-200 employees',
    'form.companySize.201-1000': '201-1000 employees',
    'form.companySize.1000+': '1000+ employees',
    'form.preferredDate': 'Preferred Date',
    'form.preferredTime': 'Preferred Time',
    'form.preferredTime.placeholder': 'Select a time slot',
    'form.message': 'Tell us about your needs',
    'form.message.placeholder': "Briefly describe your current challenges and what you're looking to achieve...",
    'form.scheduleDemo': 'Schedule Demo',
    'pricing.customSolution.title': 'Need a Custom Solution?',
    'pricing.customSolution.desc': 'We can tailor a plan specifically for your organization\'s unique requirements and scale.',
    'pricing.customSolution.contactSales': 'Contact Sales',
    'pricing.customSolution.scheduleDemo': 'Schedule Demo',

    // Pricing (headings and shared labels)
    'pricing.header': 'Pricing',
    'pricing.sub': 'Start simple and scale. Every plan includes core AI-powered quality features.',
    'pricing.transparent': 'Transparent Pricing',
    'pricing.transparent.sub': 'Get pricing tailored to your organization’s size and needs.',
    'pricing.compare': 'Compare Plans',
    'pricing.compare.sub': 'Detailed feature comparison across all CERTI plans',
    'pricing.compare.caption': 'Comparison table for Lite, Standard, and Full QMS',
    'pricing.includedEvery.title': 'Included in Every Plan',
    'pricing.includedEvery.ai': 'AI Insights',
    'pricing.includedEvery.ai.sub': 'Smart suggestions and automated analysis',
    'pricing.includedEvery.docs': 'Document Management',
    'pricing.includedEvery.docs.sub': 'Centralized control with version tracking',
    'pricing.includedEvery.compliance': 'Compliance Tools',
    'pricing.includedEvery.compliance.sub': 'Built-in regulatory readiness',
    'pricing.includedEvery.support': '24/7 Support',
    'pricing.includedEvery.support.sub': 'Expert help when you need it',

    // Bundle descriptions
    'pricing.bundle.lite.sub': 'Entry-level document control',
    'pricing.bundle.standard.sub': 'Advanced audit + CAPA',
    'pricing.bundle.fullqms.sub': 'End-to-end automation',

    // Footer
    'footer.company': 'Company',
    'footer.products': 'Products',
    'footer.solutions': 'Solutions',
    'footer.resources': 'Resources',
    'footer.home': 'Home',
    'footer.about': 'About CERTI',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.news': 'News',
    'footer.coreModules': 'Modules',
    'footer.pricing': 'Pricing',
    'footer.bookDemo': 'Book Demo',
    'footer.documentation': 'Documentation',
    'footer.api': 'API Reference',
    'footer.support': 'Support',
    'footer.status': 'System Status',

    // Solutions links
    'solutions.docControl': 'Document Control',
    'solutions.auditMgmt': 'Audit Management',
    'solutions.risk': 'Risk Assessment',
    'solutions.training': 'Training & Certification',
    'solutions.supplier': 'Supplier Quality',
    'solutions.reporting': 'Reporting Dashboard',

    // Misc
    'video.loading': 'Loading video…',
    'cookie.message': 'We use cookies to analyze traffic and improve your experience. Review our Privacy Policy.',
    'cookie.dismiss': 'Dismiss',
    'cookie.accept': 'Accept',
  },
  tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.overview': 'Genel Bakış',
    'nav.modules': 'Kullanım Senaryoları',
    'nav.caseStudies': 'Modüller',
    'nav.pricing': 'Fiyatlandırma',
    'nav.demo': 'Demo Talep Et',
    'nav.toggle.toTR': 'Türkçe’ye geç',
    'nav.toggle.toEN': 'İngilizceye geç',

    // Hero
    'hero.title.1': 'Yapay Zeka Tabanlı',
    'hero.title.2': 'Kalite ve Uyum',
    'hero.desc.1': 'Üreticiler için yeni nesil Kalite Yönetimi.',
    'hero.desc.2': 'Regülasyona tabi sektörler için uçtan uca yapay zekâ çözümleri.',
    'hero.cta.primary': 'Demo Talep Et',
    'hero.cta.secondary': 'Daha Fazla Bilgi',
    'hero.kpi.1': 'Uyumluluk',
    'hero.kpi.2': 'Daha Hızlı Denetimler',
    'hero.kpi.3': 'Daha Düşük Maliyet',

    // Overview journey
    'overview.capabilities': 'CERTI Neleri Sağlar',
    'overview.header': 'CERTI Yolculuğunuza Başlayın',
    'overview.sub': 'Entegrasyondan sonuca kesintisiz bir yol izleyin—kaostan kontrollü mükemmelliğe geçin.',
    'overview.step1.title': 'Kalite ekosisteminizi bağlayın',
    'overview.step1.desc': 'Sistem ve süreçlerinizi zahmetsizce CERTI\'ye bağlayın. CERTI iş akışınıza uyum sağlar; verileriniz karmaşık entegrasyonlara ihtiyaç duymadan sorunsuzca işlenir.',
    'overview.step1.tag': 'API-öncelikli entegrasyon',
    'overview.step2.title': 'CERTI kurumunuzu öğrenir',
    'overview.step2.desc': 'Yapay zekâ dokümanlarınızı standartlarla eşleştirir, eksikleri ve güncellemeleri otomatik saptayarak sürekli uyumluluk sağlar.',
    'overview.step2.tag': 'Yapay zekâ ile doküman analizi',
    'overview.step3.title': 'Sürekli denetime hazır kalın',
    'overview.step3.desc': 'Uyumsuzluklar, DÖF\'ler ve ilgili kanıtlar her zaman canlı ve izlenebilir. CERTI tüm aksiyonları sizin için takip eder, denetim öncesinde otomatik ön kontroller sağlar.',
    'overview.step3.tag': 'Gerçek zamanlı izleme',
    'overview.step4.title': 'Sorunları kalıcı olarak çözün',
    'overview.step4.desc': 'Sorunlar ortaya çıktığında CERTI kök neden analizini yönlendirir ve prosedürlerinize dayalı doğru DÖF/CAPA taslakları oluşturur.',
    'overview.step4.tag': 'Yapay Zeka destekli CAPA iş akışı',
    'overview.step5.title': 'Güvenilirliğinizi kanıtlayın, satışlarınızı güvence altına alın',
    'overview.step5.desc': 'Her zaman hazır kanıtlar ve detaylı DÖF\'ler ile bulguları azaltır, müşteri güvenini korur, yüksek değerli sözleşmeleri güvence altına alır.',
    'overview.step5.tag': 'İş etkisi',
    'overview.goto': 'Adıma git',

    // Overview capabilities slider
    'overview.cap.1.title': 'Doküman Kontrolü',
    'overview.cap.1.desc': 'Onay ve versiyonlama ile merkezileştirin.',
    'overview.cap.2.title': 'Denetim Yönetimi',
    'overview.cap.2.desc': 'Kontrol listeleri ve gerçek zamanlı raporlama.',
    'overview.cap.3.title': 'Risk Değerlendirme',
    'overview.cap.3.desc': 'Yapay Zeka içgörüleriyle riskleri tespit ve azaltma.',
    'overview.cap.4.title': 'Eğitim ve Sertifikasyon',
    'overview.cap.4.desc': 'Eğitim ve sertifikaları güncel tutun.',
    'overview.cap.5.title': 'Tedarikçi Kalitesi',
    'overview.cap.5.desc': 'Skorkartlar ve olay kayıtlarıyla takip.',
    'overview.cap.6.title': 'Raporlama Paneli',
    'overview.cap.6.desc': 'Canlı metrikler ve uyum durumu.',

    // Modules
    'modules.header': 'Kullanım Senaryoları',
    'modules.sub': 'CERTI’nin, doküman kontrolden müşteri memnuniyetine kadar operasyonlarınızı nasıl güçlendirdiğini keşfedin.',
    'modules.1.title': 'Akıllı Doküman Yönetimi',
    'modules.1.sub': 'Akıllı Doküman Kontrolü',
    'modules.1.desc': 'Tüm uyum dokümanlarını merkezileştirin, ilgili standartlara akıllıca eşleyin ve Yapay Zeka destekli güncellemeler yapın (örn. yeni ürün devreye alma).',
    'modules.2.title': 'Denetime Hazırlık',
    'modules.2.sub': 'Entegre Denetim Yönetimi',
    'modules.2.desc': 'Tüm denetimlerinizi (iç, müşteri veya belgelendirme) tek platformda bulgular, kanıtlar ve atamalarla dijitalleştirin.',
    'modules.3.title': 'Üretim Hattı Sorun Giderme',
    'modules.3.sub': 'Saha Çözümleri',
    'modules.3.desc': 'Rehberli kök neden analizi ve görev bazlı takip ile hat sorunlarını daha hızlı çözün.',
    'modules.4.title': 'Müşteri Şikayeti Çözümü',
    'modules.4.sub': 'Yapılandırılmış Vaka Yönetimi',
    'modules.4.desc': 'Şikayetleri SOP\'lara bağlı CAPA ve etkinlik kontrolleriyle kalıcı çözümlere dönüştürün.',

    // Contact/Demo
    'demo.title': 'Demo Talep Et',
    'demo.request': 'Demoyu Talep Edin',
    'demo.lead': 'CERTI’yi canlı görün. Uzmanlarımızla kişiselleştirilmiş bir demo planlayın ve kalite operasyonlarınızı nasıl dönüştürebileceğimizi keşfedin.',
    'demo.expect.title': 'Ne Beklemelisiniz',
    'demo.expect.1.title': '30 dakikalık kişiselleştirilmiş demo',
    'demo.expect.1.sub': 'Özel kullanım senaryonunuza uyarlanır',
    'demo.expect.2.title': 'Canlı Soru-Cevap',
    'demo.expect.2.sub': 'Sorularınıza uzmanlarımız cevap verir',
    'demo.expect.3.title': 'Özel uygulama planı',
    'demo.expect.3.sub': 'Kuruluşunuza özel bir yol haritası alırsınız',
    'contact.title': 'İletişim Bilgileri',
    'contact.email': 'E‑posta',
    'contact.telephone': 'Telefon',

    // Form
    'form.fullName': 'Ad Soyad *',
    'form.fullName.placeholder': 'Adınız Soyadınız',
    'form.workEmail': 'İş E‑postası *',
    'form.workEmail.placeholder': 'ad@firma.com',
    'form.company': 'Firma *',
    'form.company.placeholder': 'Firma Adı',
    'form.phone': 'Telefon',
    'form.phone.placeholder.en': '+1 (555) 123-4567',
    'form.phone.placeholder.tr': '+90 5xx xxx xx xx',
    'form.companySize': 'Firma Büyüklüğü',
    'form.companySize.placeholder': 'Büyüklük seçin',
    'form.companySize.1-10': '1-10 çalışan',
    'form.companySize.11-50': '11-50 çalışan',
    'form.companySize.51-200': '51-200 çalışan',
    'form.companySize.201-1000': '201-1000 çalışan',
    'form.companySize.1000+': '1000+ çalışan',
    'form.preferredDate': 'Tercih Edilen Tarih',
    'form.preferredTime': 'Tercih Edilen Saat',
    'form.preferredTime.placeholder': 'Saat aralığı seçiniz',
    'form.message': 'İhtiyaçlarınızı anlatın',
    'form.message.placeholder': 'Mevcut zorluklarınızı ve hedeflerinizi kısaca paylaşın…',
    'form.scheduleDemo': 'Demoyu Planla',
    'pricing.customSolution.title': 'Özel Çözüm Gerekiyor mu?',
    'pricing.customSolution.desc': 'Kuruluşunuzun benzersiz gereksinimleri ve ölçeğine özel bir plan hazırlayabiliriz.',
    'pricing.customSolution.contactSales': 'Satış Ekibi ile İletişim',
    'pricing.customSolution.scheduleDemo': 'Demo Talep Et',

    // Pricing (headings and shared labels)
    'pricing.header': 'Fiyatlandırma',
    'pricing.sub': 'Basit başlayın, büyüdükçe ekleyin. Tüm paketlerde Yapay Zeka destekli temel kalite özellikleri bulunur.',
    'pricing.transparent': 'Şeffaf Fiyatlandırma',
    'pricing.transparent.sub': 'Kuruluşunuzun boyutuna ve ihtiyacına göre kişiselleştirilmiş fiyat alırsınız.',
    'pricing.compare': 'Paketleri Karşılaştırın',
    'pricing.compare.sub': 'Tüm CERTI paketlerinde ayrıntılı özellik karşılaştırması',
    'pricing.compare.caption': 'Lite, Standard ve Full QMS için karşılaştırma tablosu',
    'pricing.includedEvery.title': 'Her Planda Neler Var',
    'pricing.includedEvery.ai': 'Yapay Zeka İçgörüleri',
    'pricing.includedEvery.ai.sub': 'Akıllı öneriler ve otomatik analiz',
    'pricing.includedEvery.docs': 'Doküman Yönetimi',
    'pricing.includedEvery.docs.sub': 'Sürüm takibi ile merkezi kontrol',
    'pricing.includedEvery.compliance': 'Uyumluluk Araçları',
    'pricing.includedEvery.compliance.sub': 'Yerleşik mevzuat uyumluluğu özellikleri',
    'pricing.includedEvery.support': '7/24 Destek',
    'pricing.includedEvery.support.sub': 'İhtiyacınız olduğunda uzman desteği',

    // Bundle descriptions
    'pricing.bundle.lite.sub': 'Temel doküman kontrolü',
    'pricing.bundle.standard.sub': 'Gelişmiş denetim + DÖF Yönetimi',
    'pricing.bundle.fullqms.sub': 'Uçtan uca otomasyon',

    // Footer
    'footer.company': 'Şirket',
    'footer.products': 'Ürünler',
    'footer.solutions': 'Çözümler',
    'footer.resources': 'Kaynaklar',
    'footer.home': 'Ana Sayfa',
    'footer.about': 'CERTI Hakkında',
    'footer.contact': 'İletişim',
    'footer.careers': 'Kariyer',
    'footer.news': 'Haberler',
    'footer.coreModules': 'Ana Modüller',
    'footer.pricing': 'Fiyatlandırma',
    'footer.bookDemo': 'Demo Talep Et',
    'footer.documentation': 'Dokümantasyon',
    'footer.api': 'API Referansı',
    'footer.support': 'Destek',
    'footer.status': 'Sistem Durumu',

    // Solutions links
    'solutions.docControl': 'Doküman Kontrolü',
    'solutions.auditMgmt': 'Denetim Yönetimi',
    'solutions.risk': 'Risk Değerlendirme',
    'solutions.training': 'Eğitim ve Sertifikasyon',
    'solutions.supplier': 'Tedarikçi Kalitesi',
    'solutions.reporting': 'Raporlama Paneli',

    // Misc
    'video.loading': 'Video yükleniyor…',
    'cookie.message': 'Trafiği analiz etmek ve deneyiminizi iyileştirmek için çerez kullanıyoruz. Gizlilik Politikamızı inceleyin.',
    'cookie.dismiss': 'Kapat',
    'cookie.accept': 'Kabul Et',
  },
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }

const LanguageContext = createContext<Ctx | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    // Get language from URL first, then localStorage, then default to English
    const getLanguageFromUrl = () => {
      if (typeof window === 'undefined') return 'en'
      const pathname = window.location.pathname
      return pathname.startsWith('/tr') ? 'tr' : 'en'
    }
    
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null
    const urlLang = getLanguageFromUrl()
    const initial: Lang = urlLang || stored || 'en'
    
    setLangState(initial)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', initial)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', l)
      
      // Update URL to reflect language change
      const currentPath = window.location.pathname
      const currentHash = window.location.hash
      const newLangPrefix = l === 'tr' ? '/tr' : '/en'
      
      // Remove existing language prefix and add new one
      let newPath = currentPath.replace(/^\/[a-z]{2}/, '') || '/'
      newPath = newPath === '/' ? newLangPrefix : `${newLangPrefix}${newPath}`
      
      const newUrl = `${window.location.origin}${newPath}${currentHash}`
      window.history.pushState({}, '', newUrl)
    }
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', l)
  }

  const t = useMemo(() => (key: string) => dict[lang]?.[key] ?? dict.en[key] ?? key, [lang])
  const value = useMemo(() => ({ lang, setLang, t }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

