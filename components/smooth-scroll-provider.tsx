'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enhanced mobile detection
    const isMobile = () => {
      if (typeof window === 'undefined') return false
      
      // Check user agent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileUA = mobileRegex.test(navigator.userAgent)
      
      // Check screen size
      const isMobileSize = window.innerWidth <= 768
      
      // Check touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      return isMobileUA || isMobileSize || isTouchDevice
    }

    // Only use Lenis on desktop for better mobile performance
    if (!isMobile()) {
      try {
        const lenis = new Lenis({
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      } catch (error) {
        console.warn('Lenis initialization failed:', error)
      }
    }
  }, [])

  return <>{children}</>
}
