'use client'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Simple wrapper that just passes through children
  // Basic scroll functionality is handled by CSS
  return <>{children}</>
}
