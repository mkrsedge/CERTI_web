'use client'

import { useLanguage } from './language-context'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">{t('footer.home')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.news')}</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2">
              <li><a href="#modules" className="hover:text-white transition-colors">{t('nav.caseStudies')}</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">DocCore</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">AuditCore</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">ResolveCore</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">SupplyCore</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">SkillCore</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.solutions')}</h3>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.docControl')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.auditMgmt')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.risk')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.training')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.supplier')}</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">{t('solutions.reporting')}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">{t('footer.bookDemo')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.documentation')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.api')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.support')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.status')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-xl font-bold text-white">CERTI</div>
              <span className="text-gray-500">AI-Native Quality & Compliance</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>

              <div className="text-gray-500 text-sm">
                &copy; 2024 CERTI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

