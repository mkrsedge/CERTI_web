'use client'

import { useState, useEffect, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { SocialProofSection } from '@/components/social-proof-section'
import { OverviewSection } from '@/components/overview-section'
import { UseCasesSection } from '@/components/use-cases-section'
import { ModulesSection } from '@/components/modules-section'
import { PricingSection } from '@/components/pricing-section'
import { DemoSection } from '@/components/demo-section'
import { Footer } from '@/components/footer'
import { LoadingScreen } from '@/components/loading-screen'
import Script from 'next/script'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const mainRef = useRef<HTMLElement>(null)

  // Handle initial hash navigation on page load
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.replace('#', '')
      console.log('Initial hash:', hash) // Debug log
      
      if (hash && hash !== 'home') {
        // Wait for loading screen to complete (1200ms) plus additional time for content to be visible
        setTimeout(() => {
          const element = document.getElementById(hash)
          console.log('Element found:', element) // Debug log
          
          if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset
            
            console.log('Scrolling to:', offsetPosition) // Debug log
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
            setActiveSection(hash)
          } else {
            console.log('Element not found for hash:', hash) // Debug log
            // Try again after a longer delay if element not found
            setTimeout(() => {
              const retryElement = document.getElementById(hash)
              if (retryElement) {
                const headerOffset = 80
                const elementPosition = retryElement.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                })
                setActiveSection(hash)
              }
            }, 1000)
          }
        }, 1500) // Wait for loading screen (1200ms) + 300ms buffer
      }
    }

    // Handle initial hash on page load
    handleInitialHash()
  }, [])

  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'overview', 'usecases', 'modules', 'pricing', 'demo']
      const scrollPosition = window.scrollY + 150 // Increased offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  // GSAP Scroll Animation Setup
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap) return
    
    // Disable heavy animations on mobile for better performance
    const isMobile = window.innerWidth <= 768
    if (isMobile) return

    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    const ScrollToPlugin = window.ScrollToPlugin

    if (!ScrollTrigger || !ScrollToPlugin) return

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Create simple stacking scroll animation
    const createScrollAnimation = () => {
      const heroSection = document.getElementById('home')
      const overviewSection = document.getElementById('overview')
      
      if (!heroSection || !overviewSection) return

      // Pin the hero section and handle all animations concurrently
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: false,
        }
      })

      // Add both animations to the master timeline for concurrent execution
      masterTimeline
        .to('.hero-content', {
          opacity: 0,
          y: -50,
          duration: 1,
          ease: 'power2.out'
        }, 0)
        .to('.hero-video', {
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        }, 0)
        .fromTo(overviewSection, 
          { y: '100vh' },
          { y: 0, duration: 1, ease: 'power2.out' }
        , 0) // Start at the same time (0)

      // GSAP ScrollToPlugin is now handled in navigation component
    }

    // Wait for DOM to be ready
    const timer = setTimeout(createScrollAnimation, 100)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  // Handle navigation with optimized smooth scroll
  const handleSectionChange = (section: string) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    
    const getHeaderOffset = () => {
      const nav = document.querySelector('nav.full-width-navbar') as HTMLElement | null
      if (!nav) return 60
      const styles = getComputedStyle(nav)
      const varVal = styles.getPropertyValue('--header-height').trim()
      const parsed = parseFloat(varVal.replace('px', ''))
      const h = Number.isFinite(parsed) ? parsed : nav.offsetHeight || 60
      return h + 8 // small breathing room
    }
    
    if (section === 'home') {
      if (isMobile) {
        // Use native scrolling on mobile for better performance
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollToPlugin) {
        (window as any).gsap.to(window, { duration: 0.6, scrollTo: { y: 0 }, ease: 'power2.out' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    
    const element = document.getElementById(section)
    if (element) {
      if (isMobile) {
        // Use native scrolling on mobile for better performance
        const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollToPlugin) {
        (window as any).gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: element, offsetY: getHeaderOffset() },
          ease: 'power2.out'
        })
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <LoadingScreen minimumLoadingTime={1200}>
      {/* Load GSAP for navigation animations */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js" 
        strategy="afterInteractive"
      />

      <main id="main" ref={mainRef} className="relative">
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        <div id="home" className="section" data-section="home">
          <HeroSection />
        </div>
        
        <div id="overview" className="section" data-section="overview">
          <OverviewSection />
        </div>

        <div id="social-proof" className="section" data-section="social-proof">
          <SocialProofSection />
        </div>
        
        <div id="usecases" className="section" data-section="usecases">
          <UseCasesSection />
        </div>
        
        <div id="modules" className="section" data-section="modules">
          <ModulesSection />
        </div>
        
        <div id="pricing" className="section" data-section="pricing">
          <PricingSection />
        </div>
        
        <div id="demo" className="section" data-section="demo">
          <DemoSection />
        </div>
      </main>
      
      <Footer />
      
      {/* SEO Content Section - Hidden but accessible to search engines */}
      <section className="sr-only" aria-hidden="false">
        <div className="container mx-auto px-6 py-8">
          <h2>CERTI QMS - Complete Quality Management System Solution</h2>
          <p>
            <strong>Get CERTI</strong> - the leading <strong>Quality Management System</strong> for manufacturers. 
            Our <strong>CERTI QMS software</strong> provides comprehensive <strong>certi quality management</strong> 
            solutions that streamline your entire quality process.
          </p>
          
          <h3>Why Choose CERTI QMS Software?</h3>
          <ul>
            <li><strong>Document Control:</strong> Advanced document management with version control and approval workflows</li>
            <li><strong>Audit Management:</strong> Streamlined audit preparation and execution with mobile capabilities</li>
            <li><strong>CAPA Management:</strong> AI-powered corrective and preventive action management</li>
            <li><strong>Supplier Quality:</strong> Complete supplier onboarding and quality monitoring</li>
            <li><strong>Training Management:</strong> Employee training tracking and certification management</li>
            <li><strong>Risk Assessment:</strong> Comprehensive risk identification and mitigation planning</li>
          </ul>
          
          <h3>Industry Compliance</h3>
          <p>
            <strong>CERTI compliance software</strong> ensures adherence to <strong>ISO 9001</strong>, <strong>FDA compliance</strong>, 
            <strong>ISO 13485</strong>, and other quality standards. Our <strong>QMS software</strong> is designed for 
            <strong>manufacturing quality</strong> excellence.
          </p>
          
          <h3>Get CERTI Today</h3>
          <p>
            Ready to transform your quality management? <strong>Get CERTI</strong> and experience the power of 
            AI-native <strong>certi quality management</strong>. Contact us for a personalized demo of our 
            <strong>Quality Management System</strong>.
          </p>
        </div>
      </section>
    </LoadingScreen>
  )
}

// Extend Window interface for GSAP
declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
    ScrollToPlugin: any
    smoothScrollToSection: (sectionId: string) => void
  }
}
