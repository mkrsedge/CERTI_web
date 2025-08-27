'use client'

import { useEffect, useState } from 'react'

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [language, setLanguage] = useState('EN')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'TR' : 'EN')
  }

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

  const initializeNavigation = () => {
    const { gsap, ScrollTrigger } = window as any

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Select all sections and corresponding nav links
    const sections = document.querySelectorAll(".section[data-section]")
    const navLinks = document.querySelectorAll(".nav-menu__link")
    
    console.log(`Found ${sections.length} sections and ${navLinks.length} nav links`)
    
    let lastActiveIndex = -1

    // Function to set the active navigation link
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

    // Refresh ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh()
    })
  }

  return (
    <>
      {/* Full-width Navigation Bar */}
      <nav className="full-width-navbar">
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
            <a href="#home" className="nav-menu__link nav-menu__link--current" data-section="home" onClick={() => onSectionChange('home')}>
              <div className="nav-menu__number">01</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Home</span>
                </div>
              </div>
            </a>

            <a href="#overview" className="nav-menu__link" data-section="overview" onClick={() => onSectionChange('overview')}>
              <div className="nav-menu__number">02</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Overview</span>
                </div>
              </div>
            </a>

            <a href="#modules" className="nav-menu__link" data-section="modules" onClick={() => onSectionChange('modules')}>
              <div className="nav-menu__number">03</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Use Cases</span>
                </div>
              </div>
            </a>

            <a href="#case-studies" className="nav-menu__link" data-section="case-studies" onClick={() => onSectionChange('case-studies')}>
              <div className="nav-menu__number">04</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Modules</span>
                </div>
              </div>
            </a>

            <a href="#pricing" className="nav-menu__link" data-section="pricing" onClick={() => onSectionChange('pricing')}>
              <div className="nav-menu__number">05</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Pricing</span>
                </div>
              </div>
            </a>

            <a href="#demo" className="nav-menu__link" data-section="demo" onClick={() => onSectionChange('demo')}>
              <div className="nav-menu__number">06</div>
              <div className="nav-menu__text-wrap">
                <div className="nav-menu__text">
                  <span className="nav-menu__word">Book a Demo</span>
                </div>
              </div>
            </a>
          </div>

          {/* Right side - Language Toggle */}
          <div className="navbar-right">
            <button
              onClick={toggleLanguage}
              className="language-toggle"
              aria-label={`Switch to ${language === 'EN' ? 'Turkish' : 'English'}`}
            >
              <span className={`language-option ${language === 'EN' ? 'active' : ''}`}>EN</span>
              <span className="language-separator">|</span>
              <span className={`language-option ${language === 'TR' ? 'active' : ''}`}>TR</span>
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
          background: rgba(187, 187, 190, 0.25);
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
          color: rgba(0, 0, 0, 0.8);
          padding: 8px 12px;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          transform: translateY(0);
          white-space: nowrap;
        }

        .nav-menu__link:hover {
          color: rgba(0, 0, 0, 1);
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.5);
        }

        .nav-menu__link--current {
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
          background: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 7px 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .language-toggle:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .language-option {
          color: rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .language-option.active {
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
        }

        .language-separator {
          margin: 0 8px;
          color: rgba(0, 0, 0, 0.3);
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
    </>
  )
}
