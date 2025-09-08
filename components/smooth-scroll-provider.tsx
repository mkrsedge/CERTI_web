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
    // Use loose typing to satisfy TS DOM overloads while preserving behavior
    const w = window as unknown as { scrollTo: any }
    const originalScrollTo = w.scrollTo
    w.scrollTo = (...args: any[]) => {
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
      w.scrollTo = originalScrollTo
    }
  }, [])

  return <>{children}</>
}
