'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './language-context'

const programs = [
  {
    name: 'Microsoft for Startups',
    src: '/logos/microsoft_startups_badge.png',
    className: 'max-h-14 md:max-h-16'
  },
  {
    name: 'AWS Activate',
    src: '/logos/aws activate badge.png',
    className: 'max-h-12 md:max-h-14'
  },
  {
    name: 'NVIDIA Inception',
    src: '/logos/nvidia-inception-program-badge-rgb-for-screen.png',
    className: 'max-h-14 md:max-h-16'
  }
]

export function StartupProgramsSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#faf7ef] px-6 py-8 md:py-10 border-y border-[#3e2723]/8">
      <div className="content-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center text-sm md:text-base text-[#3e2723]/75"
        >
          {t('startupPrograms.heading')}
        </motion.p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-6 md:gap-10">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex h-20 w-full max-w-64 items-center justify-center rounded-lg border border-[#3e2723]/10 bg-white/70 px-5 py-4 shadow-sm"
            >
              <img
                src={program.src}
                alt={program.name}
                className={`${program.className} w-auto object-contain`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
