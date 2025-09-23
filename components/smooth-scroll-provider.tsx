'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Simple mobile scroll fix - disable smooth scroll on mobile for better performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768

    if (!isMobile) {
      // Only apply smooth scroll on desktop
      const style = document.createElement('style')
      style.textContent = `
        html { scroll-behavior: smooth; }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  return <>{children}</>
}
