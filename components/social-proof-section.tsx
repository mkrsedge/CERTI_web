'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

const logos = [
  {
    name: 'EKOS Electric',
    srcCandidates: [
      '/logos/ekos-electric.png',
      '/logos/ekos-electric.webp',
      '/logos/ekos-electric.jpg',
      '/ekos-electric.png',
      '/ekos-electric.webp',
      '/EKOS-electric.png'
    ]
  },
  {
    name: 'TARAZI',
    srcCandidates: [
      '/logos/tarazi.png',
      '/logos/tarazi.webp',
      '/logos/tarazi.jpg',
      '/tarazi.png',
      '/tarazi.webp',
      '/TARAZI.png'
    ]
  }
]

export function SocialProofSection() {
  const { t } = useLanguage()
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({})
  const [candidateIndex, setCandidateIndex] = useState<Record<string, number>>({})

  return (
    <section className="bg-[#faf7ef] px-6 py-10 md:py-14 border-y border-[#3e2723]/8">
      <div className="content-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center text-sm md:text-base text-[#3e2723]/80"
        >
          {t('socialProof.tagline')}
        </motion.p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 max-w-3xl mx-auto">
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-24 md:h-28 rounded-xl border border-[#3e2723]/10 bg-white/70 backdrop-blur-sm flex items-center justify-center px-5"
            >
              {!failedLogos[logo.name] ? (
                <img
                  src={logo.srcCandidates[candidateIndex[logo.name] ?? 0]}
                  alt={logo.name}
                  className="max-h-14 md:max-h-16 w-auto object-contain transition duration-300"
                  loading="lazy"
                  onError={() => {
                    const current = candidateIndex[logo.name] ?? 0
                    const next = current + 1
                    if (next < logo.srcCandidates.length) {
                      setCandidateIndex((prev) => ({ ...prev, [logo.name]: next }))
                    } else {
                      setFailedLogos((prev) => ({ ...prev, [logo.name]: true }))
                    }
                  }}
                />
              ) : (
                <span className="text-[#3e2723] font-semibold tracking-wide">{logo.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
