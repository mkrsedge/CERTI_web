'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'

export type BlogArticle = {
  title: string
  url: string
  category: string
  excerpt: string
  readTime: string
  publishDate: string
  cta: string
  image: string
}

type BlogArticleBrowserProps = {
  articles: BlogArticle[]
  latestArticles: BlogArticle[]
  bookingUrl: string
}

const ARTICLES_PER_PAGE = 9
function isUnpublishedArticle(article: BlogArticle) {
  return Boolean(article.publishDate)
}

export function BlogArticleBrowser({ articles, latestArticles, bookingUrl }: BlogArticleBrowserProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const featuredArticle = articles[0]
  const sideArticles = articles.slice(1, 5)
  const pageCount = Math.max(1, Math.ceil(latestArticles.length / ARTICLES_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const paginatedArticles = latestArticles.slice(
    (safeCurrentPage - 1) * ARTICLES_PER_PAGE,
    safeCurrentPage * ARTICLES_PER_PAGE
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
    document.getElementById('recent-articles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="blog-container">
          <div className="hero-top">
            <div>
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-current="page">Blog</li>
                </ol>
              </nav>
              <h1 id="blog-title">The CERTI Blog</h1>
              <p>Articles to help quality teams keep regulated manufacturing running smoothly.</p>
            </div>
          </div>

          <div className="hero-feature-grid">
            <article className="lead-card">
              <LinkOrSpan
                href={featuredArticle.url}
                disabled={isUnpublishedArticle(featuredArticle)}
                className="lead-image"
                ariaLabel={featuredArticle.title}
              >
                <img src={featuredArticle.image} alt="" />
              </LinkOrSpan>
              <span>{featuredArticle.category}</span>
              <h2>
                <LinkOrSpan
                  href={featuredArticle.url}
                  disabled={isUnpublishedArticle(featuredArticle)}
                  className="article-title-text"
                >
                  {featuredArticle.title}
                </LinkOrSpan>
              </h2>
              <p>{featuredArticle.excerpt}</p>
            </article>

            <div className="side-list" aria-label="Featured blog articles">
              {sideArticles.map((article) => (
                <article className="side-article" key={article.title}>
                  <LinkOrSpan
                    href={article.url}
                    disabled={isUnpublishedArticle(article)}
                    className="side-thumb"
                    ariaLabel={article.title}
                  >
                    <img src={article.image} alt="" />
                  </LinkOrSpan>
                  <div>
                    <span>{article.category}</span>
                    <h2>
                      <LinkOrSpan
                        href={article.url}
                        disabled={isUnpublishedArticle(article)}
                        className="article-title-text"
                      >
                        {article.title}
                      </LinkOrSpan>
                    </h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recent-section" id="recent-articles" aria-labelledby="recent-heading">
        <div className="blog-container">
          <div className="recent-heading-row">
            <h2 id="recent-heading">Recent Articles</h2>
            <p aria-live="polite">
              {latestArticles.length} {latestArticles.length === 1 ? 'article' : 'articles'}
              {latestArticles.length > ARTICLES_PER_PAGE ? ` - page ${safeCurrentPage} of ${pageCount}` : ''}
            </p>
          </div>
          {latestArticles.length > 0 ? (
            <div className="article-grid">
              {paginatedArticles.map((article) => (
                <ArticleCard article={article} key={article.title} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No articles found</h3>
              <p>Check back soon for new articles.</p>
            </div>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Article pagination">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  aria-current={page === safeCurrentPage ? 'page' : undefined}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={safeCurrentPage === pageCount}
                onClick={() => goToPage(Math.min(safeCurrentPage + 1, pageCount))}
              >
                -&gt;
              </button>
            </nav>
          )}
        </div>
      </section>

      <section className="subscribe-section" aria-labelledby="subscribe-heading">
        <div className="blog-container subscribe-card">
          <div>
            <h2 id="subscribe-heading">Get quality articles in your inbox</h2>
            <p>Subscribe for practical QMS, audit, CAPA, document control, and supplier quality posts.</p>
          </div>
          <form aria-label="Subscribe to CERTI blog">
            <input type="email" placeholder="Email" aria-label="Email address" />
            <button type="button">Subscribe</button>
          </form>
        </div>
      </section>

      <section className="demo-section" aria-labelledby="demo-heading">
        <div className="blog-container demo-inner">
          <div>
            <h2 id="demo-heading">Build a stronger quality system today</h2>
            <p>
              See how CERTI helps regulated manufacturers centralize document control, audits,
              CAPA, and supplier quality in one AI-native QMS.
            </p>
            <div className="demo-actions">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a Demo
              </a>
              <span>Cloud-native QMS for regulated manufacturers.</span>
            </div>
          </div>
          <div className="demo-visual" aria-hidden="true">
            <img src="/CERTI_logo.png" alt="" />
            <div className="screen">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ArticleCard({ article }: { article: BlogArticle }) {
  const isUnpublished = isUnpublishedArticle(article)

  return (
    <article className="article-card">
      <LinkOrSpan href={article.url} disabled={isUnpublished} className="article-image" ariaLabel={article.title}>
        {article.image.endsWith('.mp4') ? (
          <video src={article.image} muted playsInline loop autoPlay aria-hidden="true" />
        ) : (
          <img src={article.image} alt="" />
        )}
      </LinkOrSpan>
      <div className="article-meta-row">
        <span className="category">{article.category}</span>
        {article.publishDate ? <time>{article.publishDate}</time> : null}
      </div>
      <h2>
        <LinkOrSpan href={article.url} disabled={isUnpublished} className="article-title-text">
          {article.title}
        </LinkOrSpan>
      </h2>
      <p>{article.excerpt}</p>
      {isUnpublished ? (
        <span className="read-link">Article coming soon</span>
      ) : (
        <Link href={article.url} className="read-link">
          {article.cta} -&gt;
        </Link>
      )}
    </article>
  )
}

function LinkOrSpan({
  href,
  disabled,
  className,
  ariaLabel,
  children,
}: {
  href: string
  disabled: boolean
  className?: string
  ariaLabel?: string
  children: ReactNode
}) {
  if (disabled) {
    return (
      <span className={className} aria-label={ariaLabel}>
        {children}
      </span>
    )
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
