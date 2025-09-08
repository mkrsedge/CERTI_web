'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from './language-context'

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { lang, setLang, t } = useLanguage()
  const [language] = useState('EN')
  const toggleLanguage = () => setLang(lang === 'en' ? 'tr' : 'en')

  useEffect(() => {
    // Initialize navigation immediately for better responsiveness
    const checkGSAP = () => {
      if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
        initializeNavigation()
        return true
      }
      return false
    }

    // Try immediately, then retry once after a short delay
    if (!checkGSAP()) {
      const timer = setTimeout(checkGSAP, 200)
      return () => clearTimeout(timer)
    }
  }, [])

  // Reduce navbar height and add blur on scroll
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector('nav.full-width-navbar')
      if (!nav) return
      if (window.scrollY > 8) nav.classList.add('navbar--scrolled')
      else nav.classList.remove('navbar--scrolled')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initializeNavigation = () => {
    const { gsap, ScrollTrigger } = window as any

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Select all sections and corresponding nav links
    const sections = document.querySelectorAll(".section[data-section]")
    const navLinks = document.querySelectorAll(".nav-menu__link")
    const indicator = document.getElementById('nav-indicator') as HTMLSpanElement | null
    
    console.log(`Found ${sections.length} sections and ${navLinks.length} nav links`)
    
    let lastActiveIndex = -1

    // Function to set the active navigation link
    function updateIndicator(activeIndex: number) {
      if (!indicator) return
      const center = document.querySelector('.navbar-center') as HTMLElement | null
      const link = navLinks[activeIndex] as HTMLElement | undefined
      if (!center || !link) return
      const cRect = center.getBoundingClientRect()
      const lRect = link.getBoundingClientRect()
      const left = lRect.left - cRect.left
      indicator.style.transform = `translateX(${left}px)`
      indicator.style.width = `${lRect.width}px`
      indicator.style.opacity = '1'
    }

    function setActiveLink(activeIndex: number) {
      if (lastActiveIndex !== activeIndex) {
        console.log(`Setting active link: ${activeIndex}`)
        navLinks.forEach((link, idx) => {
          if (idx === activeIndex) {
            link.classList.add("nav-menu__link--current")
            link.setAttribute("aria-current", "page")
          } else {
            link.classList.remove("nav-menu__link--current")
            link.removeAttribute("aria-current")
          }
        })
        lastActiveIndex = activeIndex
        updateIndicator(activeIndex)
      }
    }

    // Create ScrollTriggers for active link highlighting only
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveLink(index),
        onEnterBack: () => setActiveLink(index),
        markers: false
      })
    })

    // Initialize Home as active on first render
    setActiveLink(0)

    // Refresh ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh()
      if (lastActiveIndex >= 0) updateIndicator(lastActiveIndex)
    })
  }

  return (
    <>
      {/* Full-width Navigation Bar */}
      <nav className="full-width-navbar" aria-label="Primary">
        {/* Glass effect layers */}
        <div className="navbar-glass-filter"></div>
        <div className="navbar-glass-overlay"></div>
        <div className="navbar-glass-specular"></div>
        
        {/* Content */}
        <div className="navbar-content">
          {/* Left side - Logo */}
          <div className="navbar-left">
            <img 
              src="/CERTI_logo.png" 
              alt="CERTI Logo" 
              className="navbar-logo"
            />
          </div>

          {/* Center - Navigation Menu */}
          <div className="navbar-center">
            <span id="nav-indicator" className="nav-indicator" aria-hidden="true" />
            <a href="#home" className="nav-menu__link nav-menu__link--current" data-section="home" onClick={(e) => { e.preventDefault(); onSectionChange('home'); }}>
              <div className="nav-menu__number">01</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.home')}</span>
                </div>
              </div>
            </a>

            <a href="#overview" className="nav-menu__link" data-section="overview" onClick={(e) => { e.preventDefault(); onSectionChange('overview'); }}>
              <div className="nav-menu__number">02</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.overview')}</span>
                </div>
              </div>
            </a>

            <a href="#modules" className="nav-menu__link" data-section="modules" onClick={(e) => { e.preventDefault(); onSectionChange('modules'); }}>
              <div className="nav-menu__number">03</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.modules')}</span>
                </div>
              </div>
            </a>

            <a href="#case-studies" className="nav-menu__link" data-section="case-studies" onClick={(e) => { e.preventDefault(); onSectionChange('case-studies'); }}>
              <div className="nav-menu__number">04</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.caseStudies')}</span>
                </div>
              </div>
            </a>

            <a href="#pricing" className="nav-menu__link" data-section="pricing" onClick={(e) => { e.preventDefault(); onSectionChange('pricing'); }}>
              <div className="nav-menu__number">05</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.pricing')}</span>
                </div>
              </div>
            </a>

            <a href="#demo" className="nav-menu__link" data-section="demo" onClick={(e) => { e.preventDefault(); onSectionChange('demo'); }}>
              <div className="nav-menu__number">06</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">{t('nav.demo')}</span>
                </div>
              </div>
            </a>
          </div>

          {/* Right side - Language Toggle */}
          <div className="navbar-right">
            <button
              onClick={toggleLanguage}
              className="language-toggle"
              aria-label={lang === 'en' ? 'Switch to Turkish' : 'İngilizceye geç'}
            >
              <span className={`language-option ${lang === 'en' ? 'active' : ''}`}>EN</span>
              <span className="language-separator">/</span>
              <span className={`language-option ${lang === 'tr' ? 'active' : ''}`}>TR</span>
            </button>
          </div>
        </div>
      </nav>

      {/* SVG Filter for liquid glass effect */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceAlpha" result="alpha">
            <feFuncA type="identity" />
          </feComponentTransfer>

          <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />

          <feDisplacementMap in="SourceGraphic" in2="blur" scale="50" xChannelSelector="A" yChannelSelector="A" />
        </filter>
      </svg>

      <style jsx global>{`
        /* Full-width Navigation Bar */
        .full-width-navbar {
          position: fixed;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          width: calc(100% - 2rem);
          height: 55px;
          background: transparent;
          border-radius: 16px;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          overflow: hidden;
        }

        /* Glass effect layers */
        .navbar-glass-filter {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 0;
          backdrop-filter: blur(4px);
          filter: url(#lensFilter) saturate(120%) brightness(1.15);
        }

        .navbar-glass-overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 1;
          background: rgba(255, 255, 255, 0.85);
        }

        .navbar-glass-specular {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 2;
          box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.75),
            inset 0 0 5px rgba(255, 255, 255, 0.75);
        }

        .navbar-content {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        /* Navbar sections */
        .navbar-left {
          display: flex;
          align-items: center;
        }

        .navbar-center {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        /* Logo styling */
        .navbar-logo {
          height: 35px;
          width: auto;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        /* Navigation Menu Styles */
        .nav-menu__link {
          position: relative;
          text-decoration: none;
          font-family: 'Neue Machina', 'Inter', sans-serif;
          font-size: 0.75rem;
          color: #3e2723;
          padding: 8px 12px;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.9);
          transform: translateY(0);
          white-space: nowrap;
          font-weight: 500;
        }

        .nav-menu__link:hover {
          color: #1a0703;
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 8px rgba(62, 39, 35, 0.15);
        }

        .nav-menu__link--current {
          color: #1a0703;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(62, 39, 35, 0.2);
        }

        .nav-menu__number {
          font-size: 0.65rem;
          margin-right: 5px;
          font-family: 'Inter', monospace;
          opacity: 0.9;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-menu__link:hover .nav-menu__number {
          opacity: 1;
          transform: scale(1.1);
        }

        .nav-menu__word {
          font-size: 0.85rem;
          display: inline-block;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-menu__link:hover .nav-menu__word {
          font-weight: 600;
        }

        /* Language Toggle Styles */
        .language-toggle {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(62, 39, 35, 0.2);
          border-radius: 8px;
          padding: 7px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(62, 39, 35, 0.15);
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.9);
        }

        .language-toggle:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(62, 39, 35, 0.2);
        }

        .language-option {
          color: #3e2723;
          transition: all 0.3s ease;
          cursor: pointer;
          font-weight: 500;
        }

        .language-option.active {
          color: #1a0703;
          font-weight: 700;
        }

        .language-separator {
          margin: 0 8px;
          color: #3e2723;
          opacity: 0.4;
        }

        /* Section minimum heights for proper scroll triggers */
        .section {
          min-height: 100vh;
        }

        /* Mobile responsiveness */
        @media (max-width: 1024px) {
          .full-width-navbar {
            padding: 0 1rem;
            height: 50px;
            top: 0.75rem;
            left: 0.75rem;
            right: 0.75rem;
            width: calc(100% - 1.5rem);
          }

          .navbar-content {
            padding: 0 1rem;
          }

          .navbar-center {
            gap: 0.5rem;
          }

          .nav-menu__link {
            padding: 8px 12px;
            font-size: 0.8rem;
          }

          .nav-menu__word {
            font-size: 0.9rem;
          }

          .nav-menu__number {
            font-size: 0.7rem;
            margin-right: 6px;
          }

          .navbar-logo {
            height: 30px;
          }
        }

        @media (max-width: 768px) {
          .full-width-navbar {
            flex-direction: column;
            height: auto;
            padding: 1rem;
            gap: 1rem;
            top: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            width: calc(100% - 1rem);
            border-radius: 12px;
          }

          .navbar-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .navbar-center {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
          }

          .nav-menu__link {
            font-size: 0.75rem;
            padding: 6px 10px;
          }

          .nav-menu__word {
            font-size: 0.8rem;
          }

          .nav-menu__number {
            font-size: 0.65rem;
            margin-right: 4px;
          }

          .language-toggle {
            font-size: 0.8rem;
            padding: 8px 12px;
          }
        }
      `}</style>
      <style jsx global>{`
        /* Navigation overrides and enhancements */
        .full-width-navbar {
          height: 60px;
          background: rgba(255,255,255,0.6);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          backdrop-filter: saturate(180%) blur(12px);
          border: 1px solid rgba(17,24,39,0.08);
          box-shadow: var(--shadow-1);
          transition: height 200ms ease, box-shadow 200ms ease, background-color 200ms ease;
        }
        .full-width-navbar.navbar--scrolled { height: 52px; background: rgba(255,255,255,0.7); box-shadow: var(--shadow-2); }
        .navbar-center { position: relative; justify-content: center; flex: 1; }
        .nav-indicator {
          position: absolute; left: 0; bottom: 6px; height: 28px; border-radius: 9999px;
          background: rgba(255,255,255,0.9); border: 1px solid rgba(17,24,39,0.08);
          box-shadow: 0 4px 16px rgba(17,24,39,0.12); transform: translateX(0);
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 160ms ease;
          z-index: 0; opacity: 0;
        }
        .nav-menu__link { border-radius: 9999px; font-weight: 600; }
        .nav-menu__link:hover { transform: translateY(-2px); }
      `}</style>
    </>
  )
}
