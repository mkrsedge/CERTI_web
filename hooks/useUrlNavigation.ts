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
        // Wait for loading screen to complete (1200ms) plus buffer time
        setTimeout(handleNavigation, 1500)
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
    
    // Don't automatically correct URLs that are already in the correct format
    // This prevents redirecting from /tr#usecases to /en#usecases
    const currentPath = window.location.pathname
    const currentHash = window.location.hash
    
    // If we're already on a language-specific URL with a hash, don't change it
    if ((currentPath === '/tr' || currentPath === '/en') && currentHash) {
      return
    }
    
    // Only update if URL doesn't match expected format for non-language-specific URLs
    const timer = setTimeout(() => {
      const currentSection = getCurrentSection()
      const langPrefix = lang === 'tr' ? '/tr' : '/en'
      const expectedUrl = `${window.location.origin}${langPrefix}#${currentSection}`
      
      // Only update if we're on the root path without a language prefix
      if (window.location.pathname === '/' && !window.location.hash) {
        window.history.replaceState({}, '', expectedUrl)
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [lang])

  return {
    updateUrl,
    getCurrentSection,
    navigateToSection
  }
}
