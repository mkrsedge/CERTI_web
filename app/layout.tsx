import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { LanguageProvider } from '@/components/language-context'
import { inter } from './fonts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'CERTI QMS - AI-Native Quality Management System | Get CERTI',
    template: '%s - CERTI QMS',
  },
  description:
    'CERTI QMS - The leading AI-native Quality Management System for manufacturers. Streamline document control, audits, CAPA, supplier quality, and training with our comprehensive QMS software. Get CERTI today.',
  keywords: [
    'CERTI QMS',
    'Quality Management System',
    'QMS software',
    'certi quality management',
    'get certi',
    'certi compliance software',
    'certi audit management',
    'certi document control',
    'CAPA management',
    'supplier quality management',
    'ISO 9001 software',
    'FDA compliance software',
    'manufacturing quality software',
    'AI quality management',
    'audit ready software'
  ],
  authors: [{ name: 'CERTI Team' }],
  creator: 'CERTI',
  publisher: 'CERTI',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getcerti.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: 'CERTI QMS - AI-Native Quality Management System | Get CERTI',
    description:
      'CERTI QMS - The leading AI-native Quality Management System for manufacturers. Streamline document control, audits, CAPA, supplier quality, and training with our comprehensive QMS software.',
    url: '/',
    siteName: 'CERTI QMS',
    locale: 'en_US',
    images: [
      {
        url: '/CERTI_logo.png',
        width: 1200,
        height: 630,
        alt: 'CERTI QMS - AI-Native Quality Management System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CERTI QMS - AI-Native Quality Management System | Get CERTI',
    description:
      'CERTI QMS - The leading AI-native Quality Management System for manufacturers. Streamline document control, audits, CAPA, supplier quality, and training.',
    images: ['/CERTI_logo.png'],
    creator: '@CERTI',
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
        <Script
          id="gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
              "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
              "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
              "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
              "})(window,document,'script','dataLayer','GTM-NJGW9WK9');",
          }}
        />
        {/* Essential viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#3e2723" />
        <meta name="msapplication-TileColor" content="#3e2723" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CERTI QMS" />
        <meta name="application-name" content="CERTI QMS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data: SoftwareApplication */}
        <meta charSet="utf-8" />
        <Script id="ld-software" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CERTI QMS',
              alternateName: ['CERTI Quality Management System', 'CERTI QMS Software'],
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: (process as any).env.NEXT_PUBLIC_SITE_URL || 'https://getcerti.com',
              description:
                'CERTI QMS is an AI-native Quality Management System for manufacturers. Streamline document control, audits, CAPA, supplier quality, and training with our comprehensive QMS software.',
              featureList: [
                'Document Control',
                'Audit Management',
                'CAPA Management',
                'Supplier Quality Management',
                'Training & Certification',
                'Risk Assessment',
                'Reporting Dashboard'
              ],
              screenshot: '/CERTI_logo.png',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Contact sales for pricing',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'CERTI',
                  url: 'https://getcerti.com'
                }
              },
              publisher: {
                '@type': 'Organization',
                name: 'CERTI',
                url: 'https://getcerti.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://getcerti.com/CERTI_logo.png'
                }
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '150',
                bestRating: '5',
                worstRating: '1'
              },
              applicationSubCategory: 'Quality Management Software'
            }),
          }}
        />
        <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CERTI',
              url: 'https://getcerti.com',
              logo: 'https://getcerti.com/CERTI_logo.png',
              description: 'CERTI provides AI-native Quality Management System solutions for manufacturers in regulated industries.',
              foundingDate: '2024',
              industry: 'Quality Management Software',
              knowsAbout: [
                'Quality Management Systems',
                'ISO 9001',
                'FDA Compliance',
                'Audit Management',
                'Document Control',
                'CAPA Management',
                'Manufacturing Quality'
              ],
              makesOffer: {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'SoftwareApplication',
                  name: 'CERTI QMS'
                }
              }
            }),
          }}
        />
        {/* EmailJS browser SDK for client-side email sending */}
        <Script
          id="emailjs-sdk"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="afterInteractive"
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`
            (function(){
              try {
                // Initialize EmailJS if the library is present and a public key is provided
                var pub = ${JSON.stringify(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')};
                if (typeof window !== 'undefined' && window.emailjs && pub) {
                  window.emailjs.init(pub);
                }
              } catch (e) { /* noop */ }
            })();
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJGW9WK9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
