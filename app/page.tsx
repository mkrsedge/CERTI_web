'use client'

import { useState, useEffect, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { OverviewSection } from '@/components/overview-section'
import { ModulesSection } from '@/components/modules-section'
import { CaseStudiesSection } from '@/components/case-studies-section'
import { PricingSection } from '@/components/pricing-section'
import { DemoSection } from '@/components/demo-section'
import { Footer } from '@/components/footer'
import Script from 'next/script'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const mainRef = useRef<HTMLElement>(null)

  // Handle scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'overview', 'modules', 'case-studies', 'pricing', 'demo']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Scroll Animation Setup
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gsap) return

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

      // Create smooth scroll behavior for navigation
      const smoothScrollToSection = (sectionId: string) => {
        const targetSection = document.getElementById(sectionId)
        if (targetSection) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: targetSection, offsetY: 80 },
            ease: 'power2.out'
          })
        }
      }

      // Expose smooth scroll function globally for button clicks
      window.smoothScrollToSection = smoothScrollToSection
    }

    // Wait for DOM to be ready
    const timer = setTimeout(createScrollAnimation, 100)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  // Handle navigation with GSAP smooth scroll
  const handleSectionChange = (section: string) => {
    // Immediate navigation for better responsiveness
    const element = document.getElementById(section)
    if (element) {
      // Use native smooth scroll for immediate response
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      // Then enhance with GSAP if available
      if (typeof window !== 'undefined' && window.smoothScrollToSection) {
        setTimeout(() => {
          window.smoothScrollToSection(section)
        }, 100)
      }
    }
  }

  return (
    <>
      {/* Load GSAP for navigation animations */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" 
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js" 
        strategy="beforeInteractive"
      />

      <main ref={mainRef} className="relative">
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        <div id="home" className="section" data-section="home">
          <HeroSection />
        </div>
        
        <div id="overview" className="section" data-section="overview">
          <OverviewSection />
        </div>
        
        <div id="modules" className="section" data-section="modules">
          <ModulesSection />
        </div>
        
        <div id="case-studies" className="section" data-section="case-studies">
          <CaseStudiesSection />
        </div>
        
        <div id="pricing" className="section" data-section="pricing">
          <PricingSection />
        </div>
        
        <div id="demo" className="section" data-section="demo">
          <DemoSection />
        </div>
      </main>
      
      <Footer />
    </>
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
