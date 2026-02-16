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
    <section className="bg-[#faf7ef] px-6 py-10 md:py-12 border-y border-[#3e2723]/8">
      <div className="content-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center text-sm md:text-base text-[#3e2723]/80"
        >
          {t('socialProof.heading')}
        </motion.p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-12 md:h-14 flex items-center justify-center"
            >
              {!failedLogos[logo.name] ? (
                <img
                  src={logo.srcCandidates[candidateIndex[logo.name] ?? 0]}
                  alt={logo.name}
                  className="max-h-10 md:max-h-12 w-auto object-contain transition duration-300"
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

        <ul className="mt-6 mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          <li className="rounded-lg bg-white/70 border border-[#3e2723]/10 px-3 py-2 text-sm text-[#3e2723]/85">
            {t('socialProof.point1')}
          </li>
          <li className="rounded-lg bg-white/70 border border-[#3e2723]/10 px-3 py-2 text-sm text-[#3e2723]/85">
            {t('socialProof.point2')}
          </li>
          <li className="rounded-lg bg-white/70 border border-[#3e2723]/10 px-3 py-2 text-sm text-[#3e2723]/85">
            {t('socialProof.point3')}
          </li>
        </ul>
      </div>
    </section>
  )
}
