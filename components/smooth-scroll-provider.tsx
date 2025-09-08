'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    // Disable Lenis when GSAP ScrollTo is active
    const originalScrollTo = window.scrollTo
    window.scrollTo = function(...args) {
      if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        // This is likely GSAP ScrollToPlugin calling scrollTo
        lenis.stop()
        originalScrollTo.apply(window, args)
        setTimeout(() => lenis.start(), 100)
      } else {
        originalScrollTo.apply(window, args)
      }
    }

    return () => {
      lenis.destroy()
      window.scrollTo = originalScrollTo
    }
  }, [])

  return <>{children}</>
}
