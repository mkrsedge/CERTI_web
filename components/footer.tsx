'use client'

import { useLanguage } from './language-context'
import { useUrlNavigation } from '@/hooks/useUrlNavigation'

export function Footer() {
  const { t } = useLanguage()
  const { navigateToSection } = useUrlNavigation()

  const handleSectionClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault()
    navigateToSection(section)
    
    // Also scroll to the section
    const element = document.getElementById(section)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-brand-secondary text-brand-primary py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-brand-primary font-semibold text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><a href="#home" onClick={(e) => handleSectionClick('home', e)} className="hover:text-brand-primary transition-colors">{t('footer.home')}</a></li>
              <li><a href="#overview" onClick={(e) => handleSectionClick('overview', e)} className="hover:text-brand-primary transition-colors">{t('footer.about')}</a></li>
              <li><a href="#demo" onClick={(e) => handleSectionClick('demo', e)} className="hover:text-brand-primary transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-brand-primary font-semibold text-lg mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2">
              <li><a href="#modules" onClick={(e) => handleSectionClick('modules', e)} className="hover:text-brand-primary transition-colors">{t('nav.modules')}</a></li>
              <li><a href="#case-studies" onClick={(e) => handleSectionClick('case-studies', e)} className="hover:text-brand-primary transition-colors">{t('nav.caseStudies')}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-brand-primary font-semibold text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><a href="#pricing" onClick={(e) => handleSectionClick('pricing', e)} className="hover:text-brand-primary transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="#demo" onClick={(e) => handleSectionClick('demo', e)} className="hover:text-brand-primary transition-colors">{t('footer.bookDemo')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-brand-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-xl font-bold text-brand-primary">CERTI</div>
              <span className="text-brand-primary/70">AI-Native Quality & Compliance</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</a>
              </div>

              <div className="text-brand-primary/70 text-sm">
                &copy; 2024 CERTI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

