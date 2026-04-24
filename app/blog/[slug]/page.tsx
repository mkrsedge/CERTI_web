import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogNavigation } from '@/components/blog-navigation'
import { Footer } from '@/components/footer'

type ComingSoonPageProps = {
  params: Promise<{
    slug: string
  }>
}

const articleTitles: Record<string, string> = {
  'certi-qms-challenges-food-packaging-manufacturers':
    'How CERTI Solves the Core QMS Challenges for Food & Packaging Manufacturers',
  'sqf-edition-10-changes': 'SQF Edition 10: What Changes and How to Prepare',
  'iso-9001-2026-food-manufacturers': 'ISO 9001:2026: What Food Manufacturers Need to Know',
  'iso-9001-compliance-checklist-food-manufacturers': 'ISO 9001 Compliance Checklist for Food Manufacturers',
  'brcgs-criteria-that-fail-most-manufacturers': 'The BRCGS Criteria That Fail Most Manufacturers',
  'qms-vs-spreadsheets': 'Why Spreadsheets Fall Short for Quality Management',
  'capa-management-software-root-cause-analysis': 'CAPA Management: Using Software for Root Cause Analysis',
  'sqf-certification-guide-food-manufacturers': 'SQF Certification Guide for Food Manufacturers',
  'non-conformance-report-template': 'Non-Conformance Report Template & Best Practices',
  'brcgs-compliance-packaging-companies': 'BRCGS Compliance Guide for Packaging Companies',
  'qms-implementation-under-30-days': 'How to Implement a QMS in Under 30 Days',
  'best-qms-software-small-manufacturers': 'Best QMS Software for Small Manufacturers',
  'ai-native-vs-legacy-qms': 'AI-Native vs. Legacy QMS: What Manufacturers Should Know',
}
const siteUrl = 'https://www.getcerti.com'

export function generateStaticParams() {
  return Object.keys(articleTitles).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = articleTitles[slug] ?? 'CERTI Blog Article'

  return {
    title: {
      absolute: `${title} | Coming Soon | CERTI`,
    },
    description: 'This CERTI blog article is coming soon.',
    alternates: {
      canonical: `${siteUrl}/blog/${slug}/`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function ComingSoonArticlePage({ params }: ComingSoonPageProps) {
  const { slug } = await params
  const title = articleTitles[slug] ?? 'CERTI blog article'

  return (
    <>
      <BlogNavigation />
      <main id="main" className="coming-soon-page">
        <section className="coming-soon-hero" aria-labelledby="coming-soon-title">
          <div className="coming-soon-inner">
            <Link href="/blog/" className="back-link">
              Back to Blog
            </Link>
            <img src="/CERTI_logo.png" alt="CERTI" />
            <span>Article coming soon</span>
            <h1 id="coming-soon-title">{title}</h1>
            <p>
              This article is being prepared by the CERTI team. Check back soon for practical quality
              management guidance for regulated manufacturers.
            </p>
            <Link href="/blog/" className="primary-link">
              View all articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .coming-soon-page {
              min-height: 72vh;
              background:
                radial-gradient(circle at 18% 34%, rgba(255, 237, 172, 0.62), transparent 24rem),
                linear-gradient(180deg, #fbf5ee 0%, #f7f1ea 100%);
              color: #171717;
              font-family: inherit;
            }

            .coming-soon-hero {
              display: grid;
              place-items: center;
              min-height: 72vh;
              padding: 128px 20px 88px;
              border-bottom: 1px solid rgba(240, 90, 26, 0.5);
            }

            .coming-soon-inner {
              width: min(760px, 100%);
              text-align: center;
            }

            .coming-soon-inner img {
              width: 118px;
              height: auto;
              margin: 0 auto 28px;
            }

            .coming-soon-inner span {
              display: inline-block;
              color: #f05a1a;
              font-size: 13px;
              font-weight: 900;
              letter-spacing: 0;
              text-transform: uppercase;
            }

            .coming-soon-inner h1 {
              margin: 18px 0 18px;
              color: #230f0b;
              font-size: clamp(2.25rem, 6vw, 4.75rem);
              font-weight: 400;
              line-height: 1.02;
              letter-spacing: 0;
            }

            .coming-soon-inner p {
              max-width: 640px;
              margin: 0 auto 30px;
              color: #6f6760;
              font-size: 18px;
              line-height: 1.65;
            }

            .back-link,
            .primary-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              font-weight: 900;
            }

            .back-link {
              margin-bottom: 36px;
              color: #3e2723;
            }

            .primary-link {
              min-height: 46px;
              padding: 0 20px;
              border-radius: 8px;
              background: #3e2723;
              color: #ffedac;
            }
          `,
        }}
      />
    </>
  )
}
