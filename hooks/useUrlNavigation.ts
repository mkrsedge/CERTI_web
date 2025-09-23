'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/components/language-context'

export function useUrlNavigation() {
  const { lang } = useLanguage()

  // Function to update URL when navigating to sections
  const updateUrl = (section: string) => {
    if (typeof window === 'undefined') return
    
    const baseUrl = window.location.origin
    const langPrefix = lang === 'tr' ? '/tr' : '/en'
    const newUrl = `${baseUrl}${langPrefix}#${section}`
    
    // Update URL without page reload
    window.history.pushState({}, '', newUrl)
    
    // Dispatch custom event for URL change
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  // Function to get current section from URL
  const getCurrentSection = (): string => {
    if (typeof window === 'undefined') return 'home'
    
    const hash = window.location.hash.replace('#', '')
    return hash || 'home'
  }

  // Function to handle section navigation
  const navigateToSection = (section: string, onSectionChange?: (section: string) => void) => {
    updateUrl(section)
    if (onSectionChange) {
      onSectionChange(section)
    }
  }

  // Listen for browser back/forward buttons and handle initial hash
  useEffect(() => {
    const handleNavigation = () => {
      const section = getCurrentSection()
      // Scroll to section if it exists
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

    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        // Wait for the page to fully load before scrolling
        setTimeout(handleNavigation, 100)
      }
    }

    // Handle popstate (back/forward buttons)
    const handlePopState = () => {
      setTimeout(handleNavigation, 50)
    }

    // Handle initial load
    handleInitialHash()
    
    // Handle browser navigation
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Initialize URL on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const currentSection = getCurrentSection()
    const langPrefix = lang === 'tr' ? '/tr' : '/en'
    const expectedUrl = `${window.location.origin}${langPrefix}#${currentSection}`
    
    // Only update if URL doesn't match expected format
    if (window.location.pathname !== langPrefix || window.location.hash !== `#${currentSection}`) {
      window.history.replaceState({}, '', expectedUrl)
    }
  }, [lang])

  return {
    updateUrl,
    getCurrentSection,
    navigateToSection
  }
}
