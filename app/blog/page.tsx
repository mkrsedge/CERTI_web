import type { Metadata } from 'next'
import { BlogArticleBrowser } from '@/components/blog-article-browser'
import { BlogNavigation } from '@/components/blog-navigation'
import { Footer } from '@/components/footer'
import { getBookingUrl } from '@/lib/booking'

const canonicalUrl = 'https://www.getcerti.com/blog/'
const metaTitle = 'CERTI Blog | Quality Management Articles for Manufacturers'
const metaDescription =
  'Read CERTI blog articles on QMS, food safety audits, CAPA, document control, supplier quality, and AI-powered quality management for manufacturers.'
const featuredImage = 'https://www.getcerti.com/CERTI_logo.png'

type ArticleCard = {
  title: string
  url: string
  category: string
  excerpt: string
  readTime: string
  publishDate: string
  cta: string
  image: string
}

const articles: ArticleCard[] = [
  {
    title: 'What is a QMS? A Complete Guide for Food & Packaging Manufacturers',
    url: '/blog/what-is-qms-food-manufacturing/',
    category: 'QMS Awareness',
    excerpt:
      'Learn what a QMS means, why food and packaging manufacturers need one, and how it supports audits, CAPA, document control, and supplier quality.',
    readTime: 'Keyword: what is QMS',
    publishDate: '',
    cta: 'Request Demo',
    image: '/journey-2.jpg',
  },
  {
    title: 'How CERTI Solves the Core QMS Challenges for Food & Packaging Manufacturers',
    url: '/blog/certi-qms-challenges-food-packaging-manufacturers/',
    category: 'Food & Packaging QMS',
    excerpt:
      'See how QMS software helps food and packaging manufacturers centralize quality workflows, reduce repeat issues, and stay audit-ready.',
    readTime: 'Keyword: QMS software food manufacturing',
    publishDate: 'Coming soon',
    cta: 'Book a free CERTI demo',
    image: '/journey-1.jpg',
  },
  {
    title: 'SQF Edition 10: What Changes and How to Prepare',
    url: '/blog/sqf-edition-10-changes/',
    category: 'Trending',
    excerpt:
      'A practical overview of SQF Edition 10 changes and what food manufacturers can do now to prepare.',
    readTime: 'Keyword: SQF edition 10 changes',
    publishDate: 'Coming soon',
    cta: 'Read article',
    image: '/journey-3.jpg',
  },
  {
    title: 'ISO 9001:2026: What Food Manufacturers Need to Know',
    url: '/blog/iso-9001-2026-food-manufacturers/',
    category: 'Trending',
    excerpt:
      'What quality teams should know about the ISO 9001:2026 update and how to prepare their quality system.',
    readTime: 'Keyword: ISO 9001 2026 update',
    publishDate: 'Coming soon',
    cta: 'Read article',
    image: '/journey-4.jpg',
  },
  {
    title: 'ISO 9001 Compliance Checklist for Food Manufacturers',
    url: '/blog/iso-9001-compliance-checklist-food-manufacturers/',
    category: 'Audit & Compliance',
    excerpt:
      'A checklist-style guide for food manufacturers preparing for ISO 9001 compliance and stronger audit evidence.',
    readTime: 'Keyword: ISO 9001 checklist food',
    publishDate: 'Coming soon',
    cta: 'Download PDF',
    image: '/journey-5.jpg',
  },
  {
    title: 'The BRCGS Criteria That Fail Most Manufacturers',
    url: '/blog/brcgs-criteria-that-fail-most-manufacturers/',
    category: 'Audit & Compliance',
    excerpt:
      'Understand common BRCGS failure points and how manufacturers can improve documentation, traceability, and follow-through.',
    readTime: 'Keyword: food safety audit checklist',
    publishDate: 'Started',
    cta: 'Request Demo',
    image: '/gitness-spline-test.mp4',
  },
  {
    title: 'Why Spreadsheets Fall Short for Quality Management',
    url: '/blog/qms-vs-spreadsheets/',
    category: 'QMS Awareness',
    excerpt:
      'See where spreadsheets break down for document control, CAPA, audits, supplier quality, and quality trend visibility.',
    readTime: 'Keyword: QMS vs spreadsheets',
    publishDate: 'Coming soon',
    cta: 'Start Free Trial',
    image: '/journey-1.jpg',
  },
  {
    title: 'CAPA Management: Using Software for Root Cause Analysis',
    url: '/blog/capa-management-software-root-cause-analysis/',
    category: 'CAPA & Doc Control',
    excerpt:
      'How CAPA management software can help teams investigate root causes, assign actions, verify effectiveness, and reduce repeat issues.',
    readTime: 'Keyword: CAPA management software',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-4.jpg',
  },
  {
    title: 'SQF Certification Guide for Food Manufacturers',
    url: '/blog/sqf-certification-guide-food-manufacturers/',
    category: 'Audit & Compliance',
    excerpt:
      'A practical guide to SQF certification for food manufacturers, including preparation, evidence, and follow-up workflows.',
    readTime: 'Keyword: SQF certification guide',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-3.jpg',
  },
  {
    title: 'Non-Conformance Report Template & Best Practices',
    url: '/blog/non-conformance-report-template/',
    category: 'CAPA & Doc Control',
    excerpt:
      'Best practices for non-conformance reporting, including what to capture, how to route issues, and when to trigger CAPA.',
    readTime: 'Keyword: non-conformance report template',
    publishDate: 'Coming soon',
    cta: 'Download Template',
    image: '/journey-5.jpg',
  },
  {
    title: 'BRCGS Compliance Guide for Packaging Companies',
    url: '/blog/brcgs-compliance-packaging-companies/',
    category: 'Audit & Compliance',
    excerpt:
      'A packaging-focused BRCGS compliance guide covering documentation, controls, audit readiness, and quality follow-through.',
    readTime: 'Keyword: BRCGS compliance packaging',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-1.jpg',
  },
  {
    title: 'How to Implement a QMS in Under 30 Days',
    url: '/blog/qms-implementation-under-30-days/',
    category: 'Food & Packaging QMS',
    excerpt:
      'A practical implementation timeline for moving from fragmented quality tracking into a connected QMS.',
    readTime: 'Keyword: QMS implementation timeline',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-2.jpg',
  },
  {
    title: 'Best QMS Software for Small Manufacturers',
    url: '/blog/best-qms-software-small-manufacturers/',
    category: 'QMS Software Buyer',
    excerpt:
      'What small manufacturers should look for when comparing QMS software for document control, audits, CAPA, and supplier quality.',
    readTime: 'Keyword: best QMS software small business',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-4.jpg',
  },
  {
    title: 'AI-Native vs. Legacy QMS: What Manufacturers Should Know',
    url: '/blog/ai-native-vs-legacy-qms/',
    category: 'AI & Quality',
    excerpt:
      'A practical comparison of AI-native and legacy QMS platforms for manufacturers modernizing quality operations.',
    readTime: 'Keyword: AI quality management',
    publishDate: 'Coming soon',
    cta: 'Request Demo',
    image: '/journey-3.jpg',
  },
]

const latestArticles = articles
const publishedArticles = articles.filter((article) => !article.publishDate)

export const metadata: Metadata = {
  title: {
    absolute: metaTitle,
  },
  description: metaDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: canonicalUrl,
    title: metaTitle,
    description: metaDescription,
    siteName: 'CERTI',
    locale: 'en_US',
    images: [
      {
        url: featuredImage,
        width: 1200,
        height: 630,
        alt: 'CERTI blog for quality management articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: [featuredImage],
  },
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'CERTI Blog',
  url: canonicalUrl,
  description: metaDescription,
  publisher: {
    '@type': 'Organization',
    name: 'CERTI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.getcerti.com/CERTI_logo.png',
    },
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.getcerti.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: canonicalUrl,
    },
  ],
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'CERTI quality management blog articles',
  itemListElement: publishedArticles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `https://www.getcerti.com${article.url}`,
    name: article.title,
    description: article.excerpt,
  })),
}

export default function BlogHubPage() {
  const bookingUrl = getBookingUrl()

  return (
    <>
      <script
        id="blog-collection-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        id="blog-breadcrumb-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="blog-item-list-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <BlogNavigation />

      <main id="main" className="blog-page">
        <BlogArticleBrowser articles={articles} latestArticles={latestArticles} bookingUrl={bookingUrl} />
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-page {
              --paper: #f7f1ea;
              --ink: #171717;
              --muted: #6f6760;
              --line: #f05a1a;
              --card: #fff9f3;
              background: var(--paper);
              color: var(--ink);
              font-family: inherit;
            }

            .blog-container {
              width: min(1050px, calc(100% - 48px));
              margin: 0 auto;
            }

            .blog-hero {
              padding: 112px 0 92px;
              border-bottom: 1px solid rgba(240, 90, 26, 0.65);
              background:
                radial-gradient(circle at 18% 38%, rgba(255, 237, 172, 0.55), transparent 22rem),
                linear-gradient(180deg, #fbf5ee 0%, #f7f1ea 100%);
            }

            .hero-top {
              display: flex;
              align-items: end;
              justify-content: space-between;
              gap: 24px;
              padding-bottom: 28px;
              border-bottom: 1px solid rgba(240, 90, 26, 0.65);
            }

            .breadcrumbs ol {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              list-style: none;
              padding: 0;
              margin: 0 0 16px;
              color: var(--muted);
              font-size: 13px;
            }

            .breadcrumbs li:not(:last-child)::after {
              content: '/';
              margin-left: 8px;
              color: rgba(23, 23, 23, 0.38);
            }

            .breadcrumbs a {
              color: var(--ink);
              text-decoration: none;
              font-weight: 700;
            }

            h1 {
              margin: 0;
              font-family: inherit;
              font-size: clamp(2.4rem, 5vw, 4rem);
              font-weight: 400;
              line-height: 1.05;
              letter-spacing: 0;
            }

            .hero-top p {
              margin: 10px 0 0;
              color: var(--muted);
              font-size: 17px;
            }

            .hero-feature-grid {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(320px, 0.95fr);
              gap: 64px;
              align-items: center;
              padding-top: 72px;
            }

            .lead-card {
              max-width: 480px;
            }

            .lead-image,
            .article-image {
              display: block;
              overflow: hidden;
              border-radius: 8px;
              background: #fffaf5;
            }

            a.lead-image,
            a.side-thumb,
            a.article-image,
            .lead-card h2 a,
            .side-article h2 a,
            .article-card h2 a,
            .read-link,
            .pagination button,
            .subscribe-card button,
            .demo-actions a {
              cursor: pointer;
            }

            .lead-image {
              aspect-ratio: 1.55;
              margin-bottom: 28px;
              box-shadow: 0 22px 60px rgba(62, 39, 35, 0.08);
            }

            .lead-image img,
            .article-image img,
            .article-image video,
            .side-thumb img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              filter: saturate(0.85) contrast(1.02);
              transition: transform 180ms ease, filter 180ms ease;
            }

            a.lead-image:hover img,
            a.article-image:hover img,
            a.article-image:hover video,
            a.side-thumb:hover img {
              transform: scale(1.035);
              filter: saturate(0.98) contrast(1.04);
            }

            .lead-card h2 a:hover,
            .side-article h2 a:hover,
            .article-card h2 a:hover,
            .read-link:hover {
              color: #f05a1a;
              text-decoration: underline;
              text-underline-offset: 4px;
            }

            .lead-card span,
            .side-article span,
            .article-card span.category {
              display: inline-block;
              color: #f05a1a;
              font-size: 12px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0;
              margin-bottom: 8px;
            }

            .lead-card h2,
            .side-article h2,
            .article-card h2 {
              margin: 0;
              line-height: 1.16;
              font-weight: 500;
              letter-spacing: 0;
            }

            .lead-card h2 {
              font-size: clamp(1.9rem, 3vw, 2.45rem);
              max-width: 520px;
            }

            .lead-card h2 a,
            .side-article h2 a,
            .article-card h2 a,
            .article-title-text {
              color: inherit;
              text-decoration: none;
            }

            .article-title-text {
              display: inline;
              color: inherit;
              cursor: default;
              font-size: inherit;
              font-weight: inherit;
              line-height: inherit;
              letter-spacing: 0;
              margin: 0;
              text-transform: none;
            }

            .lead-card h2 .article-title-text,
            .side-article h2 .article-title-text,
            .article-card h2 .article-title-text {
              color: inherit;
              font-size: inherit;
              font-weight: inherit;
              line-height: inherit;
              letter-spacing: 0;
              margin: 0;
              text-transform: none;
            }

            span.lead-image,
            span.side-thumb,
            span.article-image {
              cursor: default;
            }

            .lead-card p {
              margin: 14px 0 0;
              max-width: 460px;
              color: var(--muted);
              line-height: 1.55;
            }

            .side-list {
              display: grid;
              gap: 18px;
            }

            .side-article {
              display: grid;
              grid-template-columns: 120px 1fr;
              gap: 18px;
              align-items: center;
              min-height: 146px;
              padding: 18px;
              border-radius: 8px;
              background: #fbf5ee;
              box-shadow: 0 18px 44px rgba(62, 39, 35, 0.06);
            }

            .side-thumb {
              display: block;
              overflow: hidden;
              aspect-ratio: 1.2;
              border-radius: 8px;
              background: #fffaf5;
            }

            .side-article h2 {
              font-size: 18px;
            }

            .recent-section {
              padding: 86px 0 72px;
              background: #ffffff;
            }

            .recent-heading-row {
              display: flex;
              align-items: end;
              justify-content: space-between;
              gap: 24px;
              margin-bottom: 44px;
            }

            .recent-heading-row h2 {
              margin: 0;
              text-align: center;
              font-family: inherit;
              font-size: clamp(2rem, 4vw, 3rem);
              font-weight: 400;
              letter-spacing: 0;
            }

            .recent-heading-row p {
              color: var(--muted);
              margin: 0;
              font-size: 14px;
            }

            .empty-state {
              text-align: center;
              border-radius: 12px;
              background: #fbf5ee;
              padding: 52px 24px;
            }

            .empty-state h3 {
              margin: 0 0 8px;
              font-size: 24px;
            }

            .empty-state p {
              color: var(--muted);
              margin: 0 0 18px;
            }

            .empty-state button {
              min-height: 40px;
              border: 0;
              border-radius: 999px;
              background: #f05a1a;
              color: #ffffff;
              padding: 0 18px;
              font: inherit;
              font-weight: 800;
            }

            .article-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 32px;
            }

            .article-card {
              min-height: 348px;
              display: flex;
              flex-direction: column;
              padding: 22px;
              border-radius: 8px;
              background: #fbf5ee;
              box-shadow: 0 18px 44px rgba(62, 39, 35, 0.06);
              transition: transform 180ms ease, box-shadow 180ms ease;
            }

            .article-card:has(a:hover) {
              transform: translateY(-3px);
              box-shadow: 0 24px 54px rgba(62, 39, 35, 0.1);
            }

            .article-image {
              aspect-ratio: 1.9;
              margin-bottom: 20px;
            }

            .article-meta-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              margin-bottom: 8px;
            }

            .article-meta-row time {
              color: #8a8178;
              font-size: 12px;
            }

            .article-card h2 {
              font-size: 19px;
              margin-bottom: 12px;
            }

            .article-card p {
              color: var(--muted);
              line-height: 1.5;
              margin: 0 0 18px;
            }

            .article-card .read-link {
              margin-top: auto;
              color: #f05a1a;
              font-size: 13px;
              font-weight: 800;
              text-decoration: none;
            }

            .pagination {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              margin-top: 76px;
            }

            .pagination button {
              width: 28px;
              height: 28px;
              border: 0;
              border-radius: 999px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: var(--ink);
              background: #f2f2f0;
              font-size: 12px;
              font-family: inherit;
              text-decoration: none;
              cursor: pointer;
            }

            .pagination button[aria-current='page'] {
              color: #ffffff;
              background: #f05a1a;
            }

            .pagination button:not(:disabled):hover,
            .subscribe-card button:hover,
            .demo-actions a:hover {
              transform: translateY(-1px);
              box-shadow: 0 10px 24px rgba(240, 90, 26, 0.18);
            }

            .pagination button:disabled {
              cursor: not-allowed;
              opacity: 0.35;
            }

            .subscribe-section {
              padding: 0 0 82px;
              background: #ffffff;
            }

            .subscribe-card {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
              gap: 32px;
              align-items: center;
              padding: 34px;
              border-radius: 12px;
              background:
                radial-gradient(circle at 78% 8%, rgba(255, 237, 172, 0.9), transparent 18rem),
                #fbf5ee;
            }

            .subscribe-card h2,
            .demo-inner h2 {
              margin: 0 0 12px;
              font-family: inherit;
              font-size: clamp(1.8rem, 3vw, 2.7rem);
              line-height: 1.15;
              font-weight: 400;
              letter-spacing: 0;
            }

            .subscribe-card p,
            .demo-inner p {
              color: var(--muted);
              line-height: 1.55;
              margin: 0;
            }

            .subscribe-card form {
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto;
              gap: 14px;
            }

            .subscribe-card input {
              min-height: 44px;
              border-radius: 8px;
              border: 1px solid rgba(23, 23, 23, 0.18);
              padding: 0 16px;
              background: #fff;
              font: inherit;
            }

            .subscribe-card button,
            .demo-actions a {
              min-height: 44px;
              border: 0;
              border-radius: 8px;
              background: #f05a1a;
              color: #ffffff;
              padding: 0 22px;
              font-weight: 900;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }

            .demo-section {
              padding: 82px 0 88px;
              background: var(--paper);
            }

            .demo-inner {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(280px, 0.65fr);
              gap: 54px;
              align-items: center;
            }

            .demo-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              align-items: center;
              margin-top: 28px;
            }

            .demo-actions span {
              color: var(--muted);
              font-size: 13px;
            }

            .demo-visual {
              min-height: 220px;
              position: relative;
              display: grid;
              place-items: center;
            }

            .demo-visual img {
              width: 120px;
              height: auto;
              opacity: 0.95;
              position: absolute;
              top: 18px;
              left: 18px;
            }

            .screen {
              width: min(280px, 100%);
              aspect-ratio: 1.5;
              border: 6px solid #171717;
              border-radius: 8px;
              background: #fbf5ee;
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              padding: 22px;
            }

            .screen span {
              border-radius: 999px;
              border: 2px solid #171717;
            }

            @media (max-width: 900px) {
              .hero-feature-grid,
              .subscribe-card,
              .demo-inner {
                grid-template-columns: 1fr;
              }

              .article-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 640px) {
              .blog-container {
                width: min(100% - 28px, 1050px);
              }

              .blog-hero {
                padding-top: 76px;
              }

              .hero-top {
                align-items: flex-start;
                flex-direction: column;
              }

              .hero-feature-grid {
                gap: 34px;
                padding-top: 42px;
              }

              .side-article {
                grid-template-columns: 92px 1fr;
              }

              .article-grid {
                grid-template-columns: 1fr;
                gap: 22px;
              }

              .subscribe-card {
                padding: 24px;
              }

              .subscribe-card form {
                grid-template-columns: 1fr;
              }

              .subscribe-card button,
              .demo-actions a {
                width: 100%;
              }
            }
          `,
        }}
      />
    </>
  )
}
