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
    'overview.sub': 'Follow a seamless pathï¿½from integration to resultsï¿½that transforms quality management from chaos to controlled excellence.',
    'overview.step1.title': 'Connect your quality ecosystem',
    'overview.step1.desc': 'Connect your drives and systems. CERTI fits into your workflow so data flows in without messy migrations.',
    'overview.step1.tag': 'API-first integration',
    'overview.step2.title': 'CERTI learns your organization',
    'overview.step2.desc': 'Our AI reads your SOPs, HACCP plans, and policies, then maps them to the standards you follow.',
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
    'modules.sub': 'Discover how CERTI elevates quality management across your operationsï¿½from document control to customer satisfaction.',
    'modules.1.title': 'Smart Document Management',
    'modules.1.sub': 'Intelligent Document Control',
    'modules.1.desc': 'Centralize all compliance documents, map them intelligently to applicable standards, and use AI-assisted updates (e.g., new product introduction).',
    'modules.2.title': 'Audit Readiness',
    'modules.2.sub': 'Integrated Audit Management',
    'modules.2.desc': 'Digitize all your auditsï¿½internal, customer, or certification (e.g., ISO, BRC)ï¿½by logging issues with evidence, converting them into actionable tasks, and assigning owners, all in one integrated platform.',
    'modules.3.title': 'Production Issue Resolution',
    'modules.3.sub': 'Factory Floor Solutions',
    'modules.3.desc': 'Quickly resolve issues on the factory floor and reduce downtime through guided root cause analysis and task-based action tracking.',
    'modules.4.title': 'Customer Complaint Resolution',
    'modules.4.sub': 'Structured Case Management',
    'modules.4.desc': 'Turn complaints into structured cases, identify root causes, implement AI-suggested corrective actions, and generate clear summary reports to share with customers.',

    // Pricing
    'pricing.header': 'Choose Your CERTI Plan',
    'pricing.sub': 'Start with the essentials and scale up as you grow. All plans include our core AI-powered quality management features.',
    'pricing.transparent': 'Transparent Pricing',
    'pricing.transparent.sub': "Get personalized pricing based on your organization's size and requirements",
    'pricing.included.title': "What's Included in Every Plan",
    'pricing.cta.header': 'Ready to Get Started?',
    'pricing.cta.body': 'Get personalized pricing and see which plan is perfect for your organization',
    'pricing.cta.button': 'Get Pricing',
    'pricing.compare': 'Compare Plans',
    'pricing.compare.sub': 'Detailed feature comparison across all CERTI bundles',
    'pricing.extra.title': 'Need a Custom Solution?',
    'pricing.extra.body': "We can tailor a plan specifically for your organization's unique requirements and scale.",
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
    'video.loading': 'Video loadingï¿½',
    'cookie.message': 'We use cookies to analyze traffic and improve your experience. See our Privacy Policy.',
    'cookie.dismiss': 'Dismiss',
    'cookie.accept': 'Accept',
  },
    tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.overview': 'Genel Bakis',
    'nav.modules': 'Kullanim Senaryolari',
    'nav.caseStudies': 'Modï¿½ller',
    'nav.pricing': 'Fiyatlandirma',
    'nav.demo': 'Demo Talep Et',

    // Contact/Demo
    'demo.title': 'Demo Talep Et',
    'demo.request': 'Demonuzu Talep Edin',
    'demo.lead': 'Platformumuzu canli gï¿½rï¿½n. Uzmanlarimizla kisisellestirilmis bir demo planlayin ve operasyonlarinizi nasil dï¿½nï¿½stï¿½rebilecegimizi kesfedin.',
    'demo.expect.title': 'Sizi Neler Bekliyor',
    'demo.expect.1.title': '30 dakikalik kisisellestirilmis demo',
    'demo.expect.1.sub': 'Sizin kullanim senaryonuza gï¿½re uyarlanir',
    'demo.expect.2.title': 'Canli Soru-Cevap',
    'demo.expect.2.sub': 'Sorulariniza uzmanlarimiz yanit verir',
    'demo.expect.3.title': 'ï¿½zel uygulama plani',
    'demo.expect.3.sub': 'Organizasyonunuz iï¿½in yol haritasi sunulur',
    'contact.title': 'Iletisim Bilgileri',
    'contact.email': 'E-posta',
    'contact.telephone': 'Telefon',

    // Hero
    'hero.title.1': 'Yapay Zeka Doguslu',
    'hero.title.2': 'Kalite ve Uyumluluk',
    'hero.desc.1': 'ï¿½reticiler iï¿½in kalite yï¿½netiminde yeni bir ï¿½ag.',
    'hero.desc.2': 'Ajan tabanli yapay zeka teknolojileri, agir dï¿½zenlemeli sektï¿½rlere ï¿½zel.',
    'hero.cta.primary': 'Demo Talep Et',
    'hero.cta.secondary': 'Daha Fazla Bilgi',
    'hero.kpi.1': 'Uyumluluk',
    'hero.kpi.2': 'Daha Hizli Denetimler',
    'hero.kpi.3': 'Daha Dï¿½sï¿½k Maliyet',

    // Overview journey
    'overview.capabilities': 'CERTI ile Yapabilecekleriniz',
    'overview.header': 'CERTI Yolculugunuza Baslayin',
    'overview.sub': 'Kalite yï¿½netiminizi kaostan kontrollï¿½ mï¿½kemmellige tasiyan sorunsuz entegrasyon ve basari yolunu izleyin.',
    'overview.step1.title': 'Kalite dï¿½nyanizi baglayin',
    'overview.step1.desc': 'Sï¿½rï¿½cï¿½ ve sistemlerinizi baglayin; CERTI is akisiniza sorunsuzca oturur, veriler karmasik tasimalara gerek kalmadan akar.',
    'overview.step1.tag': 'API-ï¿½ncelikli entegrasyon',
    'overview.step2.title': 'CERTI sirketinizi ï¿½grenir',
    'overview.step2.desc': 'Yapay zeka SOPï¿½larinizi, HACCP planlarinizi ve politikalarinizi okur; bunlari uydugunuz standartlarla eslestirir.',
    'overview.step2.tag': 'Yapay zeka destekli dokï¿½man analizi',
    'overview.step3.title': 'Sï¿½rekli denetime hazir kalin',
    'overview.step3.desc': 'Kanitlar canli ve izlenebilir kalir. CERTI her revizyonu izler; sahaya ï¿½ikmadan ï¿½nce ï¿½n kontrolleri yapar.',
    'overview.step3.tag': 'Gerï¿½ek zamanli izleme',
    'overview.step4.title': 'Sorunlari kalici olarak ï¿½ï¿½zï¿½n',
    'overview.step4.desc': 'Sorunlar ortaya ï¿½iktiginda CERTI kï¿½k neden analizine rehberlik eder ve prosedï¿½rlerinize gï¿½re net Dï¿½F taslaklari olusturur.',
    'overview.step4.tag': 'Yapay zeka rehberli Dï¿½F',
    'overview.step5.title': 'Gï¿½venilirliginizi kanitlayin, geliri koruyun',
    'overview.step5.desc': 'Her zaman hazir kanit ve kapali dï¿½ngï¿½ Dï¿½F ile bulgulari azaltir, mï¿½steri gï¿½venini korur ve yï¿½ksek degerli sï¿½zlesmeleri gï¿½venceye alirsiniz.',
    'overview.step5.tag': 'Is etkisi',

    // Overview capabilities slider
    'overview.cap.1.title': 'Dokï¿½man Kontrolï¿½',
    'overview.cap.1.desc': 'Onay ve versiyonlama ile dokï¿½manlari merkezilestirin.',
    'overview.cap.2.title': 'Denetim Yï¿½netimi',
    'overview.cap.2.desc': 'Kontrol listeleri ve gerï¿½ek zamanli raporlamayla denetimleri yï¿½netin.',
    'overview.cap.3.title': 'Risk Degerlendirme',
    'overview.cap.3.desc': 'Yapay zeka iï¿½gï¿½rï¿½leriyle riskleri belirleyip azaltin.',
    'overview.cap.4.title': 'Egitim ve Sertifikasyon',
    'overview.cap.4.desc': 'Egitimleri ve sertifikalari her zaman gï¿½ncel tutun.',
    'overview.cap.5.title': 'Tedarikï¿½i Kalitesi',
    'overview.cap.5.desc': 'Puan kartlari ve olay kayitlariyla tedarikï¿½i kalitesini izleyin.',
    'overview.cap.6.title': 'Raporlama Paneli',
    'overview.cap.6.desc': 'Canli metrikleri ve uyum durumunu gï¿½rï¿½n.',

    // Modules
    'modules.header': 'Kullanim Senaryolari',
    'modules.sub': 'CERTIï¿½nin dokï¿½man yï¿½netiminden mï¿½steri memnuniyetine kadar ï¿½retim operasyonlarinizda kaliteyi nasil dï¿½nï¿½stï¿½rdï¿½gï¿½nï¿½ kesfedin.',
    'modules.1.title': 'Akilli Dokï¿½man Yï¿½netimi',
    'modules.1.sub': 'Akilli Dokï¿½man Kontrolï¿½',
    'modules.1.desc': 'Tï¿½m uyum dokï¿½manlarini ilgili standartlarin gereklilikleriyle akilli sekilde esleyerek merkezilestirin; yeni ï¿½rï¿½n devreye alma gibi durumlarda yapay zeka destekli gï¿½ncellemelerle hiz kazanin.',
    'modules.2.title': 'Denetime Hazirlik',
    'modules.2.sub': 'Entegre Denetim Yï¿½netimi',
    'modules.2.desc': 'Iï¿½, mï¿½steri veya belgelendirme denetimlerinizi; kanitli bulgu kaydi, gï¿½revlestirme ve sorumlu atama ile tek bir platformda dijitallestirin.',
    'modules.3.title': 'ï¿½retim Sorun Giderme',
    'modules.3.sub': 'Saha ï¿½ï¿½zï¿½mleri',
    'modules.3.desc': 'Kï¿½k neden analizine rehberlik ve gï¿½rev bazli aksiyon takibi ile ï¿½retim hattindaki sorunlari hizla ï¿½ï¿½zï¿½n; durus sï¿½relerini azaltin.',
    'modules.4.title': 'Mï¿½steri Memnuniyeti Yï¿½netimi',
    'modules.4.sub': 'Yapilandirilmis Vaka Yï¿½netimi',
    'modules.4.desc': 'Sikayetleri yapilandirilmis vakalara dï¿½nï¿½stï¿½rï¿½n, kï¿½k nedenleri belirleyin, yapay zeka ï¿½nerileri ile dï¿½zeltici eylemleri uygulayin ve mï¿½sterilerinizle paylasabileceginiz net ï¿½zet raporlar ï¿½retin.',

    // Pricing
    'pricing.header': 'CERTI Paketinizi Seï¿½in',
    'pricing.sub': 'Temelden baslayin, bï¿½yï¿½dï¿½kï¿½e ekleyin. Tï¿½m paketlerde yapay zeka destekli ï¿½ekirdek kalite ï¿½zellikleri bulunur.',
    'pricing.transparent': 'Seffaf Fiyatlandirma',
    'pricing.transparent.sub': 'Organizasyonunuzun boyutuna ve ihtiyaï¿½larina gï¿½re kisisellestirilmis fiyat alin',
    'pricing.included.title': 'Her Pakette Neler Var',
    'pricing.cta.header': 'Baslamaya hazir misiniz?',
    'pricing.cta.body': 'Kisisellestirilmis fiyat alin ve hangi paketin size uygun oldugunu gï¿½rï¿½n',
    'pricing.cta.button': 'Fiyat Alin',
    'pricing.compare': 'Paketleri Karsilastirin',
    'pricing.compare.sub': 'Tï¿½m CERTI paketlerinde ayrintili ï¿½zellik karsilastirmasi',
    'pricing.extra.title': 'ï¿½zel Bir ï¿½ï¿½zï¿½m mï¿½ Lazim?',
    'pricing.extra.body': 'Organizasyonunuzun ihtiyaï¿½ ve ï¿½lï¿½egine ï¿½zel bir paket hazirlayabiliriz.',
    'pricing.extra.cta1': 'Satis ile Iletisime Geï¿½in',
    'pricing.extra.cta2': 'Demoyu Planlayin',
    'pricing.table.lite': 'Lite',
    'pricing.table.standard': 'Standard',
    'pricing.table.full': 'Full QMS',
    'pricing.includes': 'Iï¿½erir',

    // Footer
    'footer.company': 'Sirket',
    'footer.products': 'ï¿½rï¿½nler',
    'footer.solutions': 'ï¿½ï¿½zï¿½mler',
    'footer.resources': 'Kaynaklar',
    'footer.home': 'Ana Sayfa',
    'footer.about': 'CERTI Hakkinda',
    'footer.contact': 'Iletisim',
    'footer.careers': 'Kariyer',
    'footer.news': 'Haberler',
    'footer.coreModules': 'Modï¿½ller',
    'footer.pricing': 'Fiyatlandirma',
    'footer.bookDemo': 'Demo Talep Et',
    'footer.documentation': 'Dokï¿½mantasyon',
    'footer.api': 'API Referansi',
    'footer.support': 'Destek',
    'footer.status': 'Sistem Durumu',

    // Solutions links
    'solutions.docControl': 'Dokï¿½man Kontrolï¿½',
    'solutions.auditMgmt': 'Denetim Yï¿½netimi',
    'solutions.risk': 'Risk Degerlendirme',
    'solutions.training': 'Egitim ve Sertifikasyon',
    'solutions.supplier': 'Tedarikï¿½i Kalitesi',
    'solutions.reporting': 'Raporlama Paneli',

    // Misc
    'video.loading': 'Video yï¿½kleniyorï¿½',
    'cookie.message': 'Trafigi analiz etmek ve deneyiminizi iyilestirmek iï¿½in ï¿½erez kullaniyoruz. Gizlilik Politikamizi inceleyin.',
    'cookie.dismiss': 'Kapat',
    'cookie.accept': 'Kabul Et',
  },
}

// Targeted Turkish fixes for mojibake strings
const trOverrides: Record<string, string> = {
  "hero.title.1": "Yapay Zeka Tabanlı",
  "hero.desc.1": "Üreticiler için kalite yönetiminde yeni bir çağ.",
  "hero.desc.2": "Ajan tabanlı yapay zeka teknolojileri, ağır düzenlemeli sektörlere özel.",
  "overview.step4.title": "Sorunları kalıcı olarak çözün",
  "overview.step4.desc": "Sorunlar ortaya çıktığında CERTI kök neden analizine rehberlik eder ve prosedürlerinize göre net DÖF taslakları oluşturur.",
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

  const t = useMemo(
    () => (key: string) => {
      if (lang === 'tr' && trOverrides[key]) return trOverrides[key]
      return dict[lang]?.[key] ?? dict.en[key] ?? key
    },
    [lang]
  )
  const value = useMemo(() => ({ lang, setLang, t }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

