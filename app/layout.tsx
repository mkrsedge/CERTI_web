import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

export const metadata: Metadata = {
  title: 'CERTI - Advanced Technology Solutions',
  description: 'Comprehensive technology platform for modern businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Video preload optimization */}
        <link 
          rel="preload" 
          href="/gitness-spline-test (1).mp4" 
          as="video" 
          type="video/mp4"
        />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
