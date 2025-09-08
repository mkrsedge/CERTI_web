import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { LanguageProvider } from '@/components/language-context'
import { inter } from './fonts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'CERTI - AI-Native Quality & Compliance',
    template: '%s - CERTI',
  },
  description:
    'CERTI - AI-Native Quality & Compliance platform for manufacturers - document control, audits, CAPA, supplier quality, and training in one system.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.certi.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'CERTI - AI-Native Quality & Compliance',
    description:
      'Agentic AI for document control, audits, CAPA, supplier quality, and training. Always audit-ready.',
    url: '/',
    siteName: 'CERTI',
    images: [
      {
        url: '/CERTI_logo.png',
        width: 1200,
        height: 630,
        alt: 'CERTI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CERTI - AI-Native Quality & Compliance',
    description:
      'Agentic AI for document control, audits, CAPA, supplier quality, and training. Always audit-ready.',
    images: ['/CERTI_logo.png'],
  },
  icons: {
    icon: '/CERTI_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured Data: SoftwareApplication */}
        <meta charSet=" utf-8\ />
        <Script id="ld-software" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CERTI',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: (process as any).env.NEXT_PUBLIC_SITE_URL || 'https://www.certi.example.com',
              description:
                'AI-native Quality & Compliance platform for manufacturers. Document control, audits, CAPA, supplier quality, and training.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Contact sales for pricing',
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Skip link for a11y */}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">
          Skip to content
        </a>
        <LanguageProvider>
          <SmoothScrollProvider>
            {children}
            <CookieConsent />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
