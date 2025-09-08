'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Lang = 'en' | 'tr'
type I18nDict = Record<Lang, Record<string, string>>

const dict: I18nDict = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.overview': 'Overview',
    'nav.modules': 'Use Cases',
    'nav.caseStudies': 'Modules',
    'nav.pricing': 'Pricing',
    'nav.demo': 'Book a Demo',

    // Contact/Demo
    'demo.title': 'Book a Demo',
    'demo.request': 'Request Your Demo',
    'demo.lead': "See CERTI in action. Schedule a personalized demo with our experts and discover how we can transform your quality operations.",
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
    'overview.step1.desc': 'Connect your drives and systems. CERTI fits into your workflow so data flows in without messy migrations.',
    'overview.step1.tag': 'API-first integration',
    'overview.step2.title': 'CERTI learns your organization',
    'overview.step2.desc': "Our AI reads your SOPs, HACCP plans, and policies, then maps them to the standards you follow.",
    'overview.step2.tag': 'AI-powered document analysis',
    'overview.step3.title': 'Stay continuously audit-ready',
    'overview.step3.desc': 'Evidence stays live and traceable. CERTI monitors every revision and runs AI pre-checks before you walk the floor.',
    'overview.step3.tag': 'Real-time monitoring',
    'overview.step4.title': 'Resolve issues for good',
    'overview.step4.desc': 'When issues arise, CERTI guides root cause analysis and drafts precise CAPAs based on your procedures.',
    'overview.step4.tag': 'AI-guided CAPA workflow',
    'overview.step5.title': 'Demonstrate reliability and protect revenue',
    'overview.step5.desc': 'With always-ready evidence and closed-loop CAPAs, you reduce findings, keep customers confident, and safeguard high-value contracts.',
    'overview.step5.tag': 'Business impact',

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
    'modules.header': 'Use Cases',
    'modules.sub': 'Discover how CERTI elevates quality management across your operations—from document control to customer satisfaction.',
    'modules.1.title': 'Smart Document Management',
    'modules.1.sub': 'Intelligent Document Control',
    'modules.1.desc': 'Centralize all compliance documents, map them intelligently to applicable standards, and use AI-assisted updates (e.g., new product introduction).',
    'modules.2.title': 'Audit Readiness',
    'modules.2.sub': 'Integrated Audit Management',
    'modules.2.desc': 'Digitize all your audits—internal, customer, or certification (e.g., ISO, BRC)—by logging issues with evidence, converting them into actionable tasks, and assigning owners, all in one integrated platform.',
    'modules.3.title': 'Production Issue Resolution',
    'modules.3.sub': 'Factory Floor Solutions',
    'modules.3.desc': 'Quickly resolve issues on the factory floor and reduce downtime through guided root cause analysis and task-based action tracking.',
    'modules.4.title': 'Customer Complaint Resolution',
    'modules.4.sub': 'Structured Case Management',
    'modules.4.desc': 'Transform complaints into structured cases, identify root causes, apply corrective actions with AI suggestions, and share concise summary reports with customers.',

    // Pricing
    'pricing.header': 'Choose Your CERTI Package',
    'pricing.sub': 'Start from the basics and add as you grow. All packages include AI-powered core quality features.',
    'pricing.transparent': 'Transparent Pricing',
    'pricing.transparent.sub': 'Get personalized pricing based on your organization’s size and needs',
    'pricing.included.title': 'What’s Included in Every Package',
    'pricing.cta.header': 'Ready to get started?',
    'pricing.cta.body': 'Get personalized pricing and see which package fits you best',
    'pricing.cta.button': 'Get Pricing',
    'pricing.compare': 'Compare Packages',
    'pricing.compare.sub': 'Detailed feature comparison across all CERTI packages',
    'pricing.extra.title': 'Need a Custom Solution?',
    'pricing.extra.body': 'We can tailor a package to your organization’s needs and scale.',
    'pricing.extra.cta1': 'Contact Sales',
    'pricing.extra.cta2': 'Schedule Demo',
    'pricing.table.lite': 'Lite',
    'pricing.table.standard': 'Standard',
    'pricing.table.full': 'Full QMS',
    'pricing.includes': 'Includes',

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
    'footer.coreModules': 'Core Modules',
    'footer.pricing': 'Pricing',
    'footer.bookDemo': 'Book a Demo',
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
    'video.loading': 'Video loading…',
    'cookie.message': 'We use cookies to analyze traffic and improve your experience. See our Privacy Policy.',
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

    // Contact/Demo
    'demo.title': 'Demo Talep Et',
    'demo.request': 'Demonuzu Talep Edin',
    'demo.lead': 'Platformumuzu canlı görün. Uzmanlarımızla kişiselleştirilmiş bir demo planlayın ve kalite operasyonlarınızı nasıl dönüştürebileceğimizi keşfedin.',
    'demo.expect.title': 'Sizi Neler Bekliyor',
    'demo.expect.1.title': '30 dakikalık kişiselleştirilmiş demo',
    'demo.expect.1.sub': 'Kullanım senaryonuza göre uyarlanır',
    'demo.expect.2.title': 'Canlı Soru-Cevap',
    'demo.expect.2.sub': 'Sorularınıza uzmanlarımız yanıt verir',
    'demo.expect.3.title': 'Özel uygulama planı',
    'demo.expect.3.sub': 'Organizasyonunuz için yol haritası sunulur',
    'contact.title': 'İletişim Bilgileri',
    'contact.email': 'E‑posta',
    'contact.telephone': 'Telefon',

    // Hero
    'hero.title.1': 'Yapay Zeka Tabanlı',
    'hero.title.2': 'Kalite ve Uyumluluk',
    'hero.desc.1': 'Üreticiler için kalite ve uyumlukta yeni bir dönem.',
    'hero.desc.2': "CERTI'nin Yapay Zeka ajanları sayesinde kalite yönetiminde çağ atlayın.",
    'hero.cta.primary': 'Demo Talep Et',
    'hero.cta.secondary': 'Daha Fazla Bilgi',
    'hero.kpi.1': 'Uyumluluk',
    'hero.kpi.2': 'Daha Hızlı Denetimler',
    'hero.kpi.3': 'Daha Düşük Maliyet',

    // Overview journey
    'overview.capabilities': 'CERTI ile Yapabilecekleriniz',
    'overview.header': 'CERTI Yolculuğunuza Başlayın',
    'overview.sub': 'Kalite yönetiminizi kaostan kontrollü mükemmelliğe taşıyan, entegrasyondan sonuçlara uzanan sorunsuz bir yol izleyin.',
    'overview.step1.title': 'Kalite ekosisteminizi bağlayın',
    'overview.step1.desc': 'Sürücülerinizi ve sistemlerinizi bağlayın; CERTI iş akışınıza sorunsuzca oturur, veriler karmaşık taşımalara gerek kalmadan akar.',
    'overview.step1.tag': 'API‑öncelikli entegrasyon',
    'overview.step2.title': 'CERTI şirketinizi öğrensin',
    'overview.step2.desc': 'Yapay zeka SOP’larınızı, HACCP planlarınızı ve politikalarınızı okur; bunları uyduğunuz standartlarla eşleştirir.',
    'overview.step2.tag': 'Yapay zeka destekli doküman analizi',
    'overview.step3.title': 'Sürekli denetime hazır kalın',
    'overview.step3.desc': 'Kanıtlar canlı ve izlenebilir kalır. CERTI her revizyonu izler; sahaya çıkmadan önce ön kontrolleri yapar.',
    'overview.step3.tag': 'Gerçek zamanlı izleme',
    'overview.step4.title': 'Sorunları kalıcı olarak çözün',
    'overview.step4.desc': 'Sorunlar ortaya çıktığında CERTI kök neden analizine rehberlik eder ve prosedürlerinize göre net DÖF taslakları oluşturur.',
    'overview.step4.tag': 'Yapay zeka rehberli DÖF',
    'overview.step5.title': 'Güvenilirliğinizi kanıtlayın, geliri koruyun',
    'overview.step5.desc': 'Her zaman hazır kanıt ve kapalı döngü DÖF ile bulguları azaltır, müşteri güvenini korur ve yüksek değerli sözleşmeleri güvenceye alırsınız.',
    'overview.step5.tag': 'İş etkisi',

    // Overview capabilities slider
    'overview.cap.1.title': 'Doküman Kontrolü',
    'overview.cap.1.desc': 'Onay ve versiyonlama ile dokümanları merkezileştirin.',
    'overview.cap.2.title': 'Denetim Yönetimi',
    'overview.cap.2.desc': 'Kontrol listeleri ve gerçek zamanlı raporlamayla denetimleri yönetin.',
    'overview.cap.3.title': 'Risk Değerlendirme',
    'overview.cap.3.desc': 'Yapay zeka içgörüleriyle riskleri belirleyip azaltın.',
    'overview.cap.4.title': 'Eğitim ve Sertifikasyon',
    'overview.cap.4.desc': 'Eğitimleri ve sertifikaları her zaman güncel tutun.',
    'overview.cap.5.title': 'Tedarikçi Kalitesi',
    'overview.cap.5.desc': 'Puan kartları ve olay kayıtlarıyla tedarikçi kalitesini izleyin.',
    'overview.cap.6.title': 'Raporlama Paneli',
    'overview.cap.6.desc': 'Canlı metrikleri ve uyum durumunu görün.',

    // Modules
    'modules.header': 'Kullanım Senaryoları',
    'modules.sub': 'CERTI’nin kalite yönetimini doküman kontrolden müşteri memnuniyetine kadar operasyonlarınız genelinde nasıl yükselttiğini keşfedin.',
    'modules.1.title': 'Akıllı Doküman Yönetimi',
    'modules.1.sub': 'Akıllı Doküman Kontrolü',
    'modules.1.desc': 'Tüm uyum dokümanlarını ilgili standartlarla akıllıca eşleyerek merkezileştirin; yeni ürün devreye alma gibi durumlarda yapay zeka destekli güncellemelerle hız kazanın.',
    'modules.2.title': 'Denetime Hazırlık',
    'modules.2.sub': 'Entegre Denetim Yönetimi',
    'modules.2.desc': 'İç, müşteri veya belgelendirme denetimlerinizi; kanıtlı bulgu kaydı, görev atama ve sorumluluk yönetimiyle tek bir platformda dijitalleştirin.',
    'modules.3.title': 'Üretim Sorun Giderme',
    'modules.3.sub': 'Saha Çözümleri',
    'modules.3.desc': 'Kök neden analizine rehberlik ve görev bazlı aksiyon takibiyle üretim hattındaki sorunları hızla çözün; duruş sürelerini azaltın.',
    'modules.4.title': 'Müşteri Memnuniyeti Yönetimi',
    'modules.4.sub': 'Yapılandırılmış Vaka Yönetimi',
    'modules.4.desc': 'Şikayetleri yapılandırılmış vakalara dönüştürün, kök nedenleri belirleyin, yapay zeka önerileriyle düzeltici eylemleri uygulayın ve müşterilerinizle paylaşabileceğiniz net özet raporlar üretin.',

    // Pricing
    'pricing.header': 'CERTI Paketinizi Seçin',
    'pricing.sub': 'Temelden başlayın, büyüdükçe ekleyin. Tüm paketlerde yapay zeka destekli çekirdek kalite özellikleri bulunur.',
    'pricing.transparent': 'Şeffaf Fiyatlandırma',
    'pricing.transparent.sub': 'Organizasyonunuzun boyutuna ve ihtiyaçlarına göre kişiselleştirilmiş fiyat alın',
    'pricing.included.title': 'Her Pakette Neler Var',
    'pricing.cta.header': 'Başlamaya hazır mısınız?',
    'pricing.cta.body': 'Kişiselleştirilmiş fiyat alın ve hangi paketin size uygun olduğunu görün',
    'pricing.cta.button': 'Fiyat Alın',
    'pricing.compare': 'Paketleri Karşılaştırın',
    'pricing.compare.sub': 'Tüm CERTI paketlerinde ayrıntılı özellik karşılaştırması',
    'pricing.extra.title': 'Özel Bir Çözüm mü Lazım?',
    'pricing.extra.body': 'Organizasyonunuzun ihtiyacı ve ölçeğine özel bir paket hazırlayabiliriz.',
    'pricing.extra.cta1': 'Satış ile İletişime Geçin',
    'pricing.extra.cta2': 'Demoyu Planlayın',
    'pricing.table.lite': 'Lite',
    'pricing.table.standard': 'Standard',
    'pricing.table.full': 'Full QMS',
    'pricing.includes': 'İçerir',

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
    'footer.coreModules': 'Modüller',
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
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null
    const initial: Lang = stored || ((document?.documentElement.getAttribute('lang') || 'en').startsWith('tr') ? 'tr' : 'en')
    setLangState(initial)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', initial)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') localStorage.setItem('lang', l)
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
