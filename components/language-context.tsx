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
    'overview.sub': 'Follow a seamless path�from integration to results�that transforms quality management from chaos to controlled excellence.',
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
    'modules.sub': 'Discover how CERTI elevates quality management across your operations�from document control to customer satisfaction.',
    'modules.1.title': 'Smart Document Management',
    'modules.1.sub': 'Intelligent Document Control',
    'modules.1.desc': 'Centralize all compliance documents, map them intelligently to applicable standards, and use AI-assisted updates (e.g., new product introduction).',
    'modules.2.title': 'Audit Readiness',
    'modules.2.sub': 'Integrated Audit Management',
    'modules.2.desc': 'Digitize all your audits�internal, customer, or certification (e.g., ISO, BRC)�by logging issues with evidence, converting them into actionable tasks, and assigning owners, all in one integrated platform.',
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
    'video.loading': 'Video loading�',
    'cookie.message': 'We use cookies to analyze traffic and improve your experience. See our Privacy Policy.',
    'cookie.dismiss': 'Dismiss',
    'cookie.accept': 'Accept',
  },
    tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.overview': 'Genel Bakis',
    'nav.modules': 'Kullanim Senaryolari',
    'nav.caseStudies': 'Mod�ller',
    'nav.pricing': 'Fiyatlandirma',
    'nav.demo': 'Demo Talep Et',

    // Contact/Demo
    'demo.title': 'Demo Talep Et',
    'demo.request': 'Demonuzu Talep Edin',
    'demo.lead': 'Platformumuzu canli g�r�n. Uzmanlarimizla kisisellestirilmis bir demo planlayin ve operasyonlarinizi nasil d�n�st�rebilecegimizi kesfedin.',
    'demo.expect.title': 'Sizi Neler Bekliyor',
    'demo.expect.1.title': '30 dakikalik kisisellestirilmis demo',
    'demo.expect.1.sub': 'Sizin kullanim senaryonuza g�re uyarlanir',
    'demo.expect.2.title': 'Canli Soru-Cevap',
    'demo.expect.2.sub': 'Sorulariniza uzmanlarimiz yanit verir',
    'demo.expect.3.title': '�zel uygulama plani',
    'demo.expect.3.sub': 'Organizasyonunuz i�in yol haritasi sunulur',
    'contact.title': 'Iletisim Bilgileri',
    'contact.email': 'E-posta',
    'contact.telephone': 'Telefon',

    // Hero
    'hero.title.1': 'Yapay Zeka Doguslu',
    'hero.title.2': 'Kalite ve Uyumluluk',
    'hero.desc.1': '�reticiler i�in kalite y�netiminde yeni bir �ag.',
    'hero.desc.2': 'Ajan tabanli yapay zeka teknolojileri, agir d�zenlemeli sekt�rlere �zel.',
    'hero.cta.primary': 'Demo Talep Et',
    'hero.cta.secondary': 'Daha Fazla Bilgi',
    'hero.kpi.1': 'Uyumluluk',
    'hero.kpi.2': 'Daha Hizli Denetimler',
    'hero.kpi.3': 'Daha D�s�k Maliyet',

    // Overview journey
    'overview.capabilities': 'CERTI ile Yapabilecekleriniz',
    'overview.header': 'CERTI Yolculugunuza Baslayin',
    'overview.sub': 'Kalite y�netiminizi kaostan kontroll� m�kemmellige tasiyan sorunsuz entegrasyon ve basari yolunu izleyin.',
    'overview.step1.title': 'Kalite d�nyanizi baglayin',
    'overview.step1.desc': 'S�r�c� ve sistemlerinizi baglayin; CERTI is akisiniza sorunsuzca oturur, veriler karmasik tasimalara gerek kalmadan akar.',
    'overview.step1.tag': 'API-�ncelikli entegrasyon',
    'overview.step2.title': 'CERTI sirketinizi �grenir',
    'overview.step2.desc': 'Yapay zeka SOP�larinizi, HACCP planlarinizi ve politikalarinizi okur; bunlari uydugunuz standartlarla eslestirir.',
    'overview.step2.tag': 'Yapay zeka destekli dok�man analizi',
    'overview.step3.title': 'S�rekli denetime hazir kalin',
    'overview.step3.desc': 'Kanitlar canli ve izlenebilir kalir. CERTI her revizyonu izler; sahaya �ikmadan �nce �n kontrolleri yapar.',
    'overview.step3.tag': 'Ger�ek zamanli izleme',
    'overview.step4.title': 'Sorunlari kalici olarak ��z�n',
    'overview.step4.desc': 'Sorunlar ortaya �iktiginda CERTI k�k neden analizine rehberlik eder ve prosed�rlerinize g�re net D�F taslaklari olusturur.',
    'overview.step4.tag': 'Yapay zeka rehberli D�F',
    'overview.step5.title': 'G�venilirliginizi kanitlayin, geliri koruyun',
    'overview.step5.desc': 'Her zaman hazir kanit ve kapali d�ng� D�F ile bulgulari azaltir, m�steri g�venini korur ve y�ksek degerli s�zlesmeleri g�venceye alirsiniz.',
    'overview.step5.tag': 'Is etkisi',
    'overview.goto': 'Adima git',

    // Overview capabilities slider
    'overview.cap.1.title': 'Dok�man Kontrol�',
    'overview.cap.1.desc': 'Onay ve versiyonlama ile dok�manlari merkezilestirin.',
    'overview.cap.2.title': 'Denetim Y�netimi',
    'overview.cap.2.desc': 'Kontrol listeleri ve ger�ek zamanli raporlamayla denetimleri y�netin.',
    'overview.cap.3.title': 'Risk Degerlendirme',
    'overview.cap.3.desc': 'Yapay zeka i�g�r�leriyle riskleri belirleyip azaltin.',
    'overview.cap.4.title': 'Egitim ve Sertifikasyon',
    'overview.cap.4.desc': 'Egitimleri ve sertifikalari her zaman g�ncel tutun.',
    'overview.cap.5.title': 'Tedarik�i Kalitesi',
    'overview.cap.5.desc': 'Puan kartlari ve olay kayitlariyla tedarik�i kalitesini izleyin.',
    'overview.cap.6.title': 'Raporlama Paneli',
    'overview.cap.6.desc': 'Canli metrikleri ve uyum durumunu g�r�n.',

    // Modules
    'modules.header': 'Kullanim Senaryolari',
    'modules.sub': 'CERTI�nin dok�man y�netiminden m�steri memnuniyetine kadar �retim operasyonlarinizda kaliteyi nasil d�n�st�rd�g�n� kesfedin.',
    'modules.1.title': 'Akilli Dok�man Y�netimi',
    'modules.1.sub': 'Akilli Dok�man Kontrol�',
    'modules.1.desc': 'T�m uyum dok�manlarini ilgili standartlarin gereklilikleriyle akilli sekilde esleyerek merkezilestirin; yeni �r�n devreye alma gibi durumlarda yapay zeka destekli g�ncellemelerle hiz kazanin.',
    'modules.2.title': 'Denetime Hazirlik',
    'modules.2.sub': 'Entegre Denetim Y�netimi',
    'modules.2.desc': 'I�, m�steri veya belgelendirme denetimlerinizi; kanitli bulgu kaydi, g�revlestirme ve sorumlu atama ile tek bir platformda dijitallestirin.',
    'modules.3.title': '�retim Sorun Giderme',
    'modules.3.sub': 'Saha ��z�mleri',
    'modules.3.desc': 'K�k neden analizine rehberlik ve g�rev bazli aksiyon takibi ile �retim hattindaki sorunlari hizla ��z�n; durus s�relerini azaltin.',
    'modules.4.title': 'M�steri Memnuniyeti Y�netimi',
    'modules.4.sub': 'Yapilandirilmis Vaka Y�netimi',
    'modules.4.desc': 'Sikayetleri yapilandirilmis vakalara d�n�st�r�n, k�k nedenleri belirleyin, yapay zeka �nerileri ile d�zeltici eylemleri uygulayin ve m�sterilerinizle paylasabileceginiz net �zet raporlar �retin.',

    // Pricing
    'pricing.header': 'CERTI Paketinizi Se�in',
    'pricing.sub': 'Temelden baslayin, b�y�d�k�e ekleyin. T�m paketlerde yapay zeka destekli �ekirdek kalite �zellikleri bulunur.',
    'pricing.transparent': 'Seffaf Fiyatlandirma',
    'pricing.transparent.sub': 'Organizasyonunuzun boyutuna ve ihtiya�larina g�re kisisellestirilmis fiyat alin',
    'pricing.included.title': 'Her Pakette Neler Var',
    'pricing.cta.header': 'Baslamaya hazir misiniz?',
    'pricing.cta.body': 'Kisisellestirilmis fiyat alin ve hangi paketin size uygun oldugunu g�r�n',
    'pricing.cta.button': 'Fiyat Alin',
    'pricing.compare': 'Paketleri Karsilastirin',
    'pricing.compare.sub': 'T�m CERTI paketlerinde ayrintili �zellik karsilastirmasi',
    'pricing.extra.title': '�zel Bir ��z�m m� Lazim?',
    'pricing.extra.body': 'Organizasyonunuzun ihtiya� ve �l�egine �zel bir paket hazirlayabiliriz.',
    'pricing.extra.cta1': 'Satis ile Iletisime Ge�in',
    'pricing.extra.cta2': 'Demoyu Planlayin',
    'pricing.table.lite': 'Lite',
    'pricing.table.standard': 'Standard',
    'pricing.table.full': 'Full QMS',
    'pricing.includes': 'I�erir',

    // Footer
    'footer.company': 'Sirket',
    'footer.products': '�r�nler',
    'footer.solutions': '��z�mler',
    'footer.resources': 'Kaynaklar',
    'footer.home': 'Ana Sayfa',
    'footer.about': 'CERTI Hakkinda',
    'footer.contact': 'Iletisim',
    'footer.careers': 'Kariyer',
    'footer.news': 'Haberler',
    'footer.coreModules': 'Mod�ller',
    'footer.pricing': 'Fiyatlandirma',
    'footer.bookDemo': 'Demo Talep Et',
    'footer.documentation': 'Dok�mantasyon',
    'footer.api': 'API Referansi',
    'footer.support': 'Destek',
    'footer.status': 'Sistem Durumu',

    // Solutions links
    'solutions.docControl': 'Dok�man Kontrol�',
    'solutions.auditMgmt': 'Denetim Y�netimi',
    'solutions.risk': 'Risk Degerlendirme',
    'solutions.training': 'Egitim ve Sertifikasyon',
    'solutions.supplier': 'Tedarik�i Kalitesi',
    'solutions.reporting': 'Raporlama Paneli',

    // Misc
    'overview.goto': 'Adima git',
    'video.loading': 'Video y�kleniyor�',
    'cookie.message': 'Trafigi analiz etmek ve deneyiminizi iyilestirmek i�in �erez kullaniyoruz. Gizlilik Politikamizi inceleyin.',
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

