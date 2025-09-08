import type { MetadataRoute } from 'next'

// Ensure static generation for export mode
export const dynamic = 'force-static'
export const revalidate = 86400

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.certi.example.com'
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
  }
}
