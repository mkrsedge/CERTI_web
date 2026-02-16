'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from './language-context'

const PROMO_VIDEO_ID = 'VRzwUWquSxc'

export function PromoVideoSection() {
  const { t, lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const openPromoVideo = () => {
    setIsOpen(true)

    if (typeof window !== 'undefined') {
      const payload = { locale: lang, source: 'promo_section' }
      window.dispatchEvent(new CustomEvent('promo_video_thumbnail_click', { detail: payload }))

      const dataLayer = (window as any).dataLayer
      if (Array.isArray(dataLayer)) {
        dataLayer.push({ event: 'promo_video_thumbnail_click', ...payload })
      }
    }
  }

  return (
    <>
      <section className="relative bg-gradient-to-b from-white to-[#f8f5f0] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-6 w-fit rounded-full border border-[#3e2723]/15 bg-[#ffedac]/50 px-4 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[#3e2723]">
            {t('videoSection.badge')}
          </div>
          <h2 className="mx-auto mb-10 max-w-3xl text-center text-2xl font-medium leading-tight text-[#3e2723] md:text-4xl">
            {t('videoSection.heading')}
          </h2>

          <button
            onClick={openPromoVideo}
            className="group block w-full overflow-hidden rounded-2xl border border-[#3e2723]/10 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#3e2723]/50 focus:ring-offset-2"
            aria-label={t('videoSection.cta')}
          >
            <div className="relative aspect-video w-full">
              <img
                src={`https://img.youtube.com/vi/${PROMO_VIDEO_ID}/maxresdefault.jpg`}
                alt={t('videoSection.heading')}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/35" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                  <svg className="h-6 w-6 text-[#3e2723] md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-6 py-5 text-sm font-medium text-[#3e2723] md:text-base">
              <span>{t('videoSection.cta')}</span>
            </div>
          </button>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[80] bg-black/85 p-4 md:p-8"
          >
            <div
              className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-medium text-white md:text-lg">{t('videoSection.heading')}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-white/40 px-3 py-1 text-sm text-white hover:bg-white/10"
                >
                  {t('videoSection.close')}
                </button>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  title={t('videoSection.heading')}
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${PROMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
