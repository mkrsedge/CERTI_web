'use client'

import { motion } from 'framer-motion'
import { AnimatedBackground } from './animated-background'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hero-video"
          style={{ objectPosition: 'center' }}
        >
          <source src="/gitness-spline-test (1).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light text-[#afdbf5] mb-6 leading-tight drop-shadow-lg">
            AI-Native
            <br />
            Quality & Compliance
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#afdbf5] mb-12 leading-relaxed drop-shadow-md"
          >
            A new era in Quality Management for manufacturers.
            <br />
            Agentic AI technologies tailored for heavily regulated industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.smoothScrollToSection) {
                  window.smoothScrollToSection('demo')
                } else {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="border border-[#3e2723] hover:border-[#3e2723]/70 text-[#3e2723] font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg bg-[#ffedac] hover:bg-[#f0e0a0] relative z-20"
            >
              Book a Demo
            </button>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.smoothScrollToSection) {
                  window.smoothScrollToSection('overview')
                } else {
                  const overviewSection = document.getElementById('overview');
                  if (overviewSection) {
                    overviewSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="border border-[#3e2723] hover:border-[#3e2723]/70 text-[#3e2723] font-medium px-8 py-4 rounded-lg transition-colors duration-200 text-lg bg-[#ffedac] hover:bg-[#f0e0a0]"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Quality & Compliance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
                      <div className="text-3xl font-bold text-[#afdbf5] mb-2 drop-shadow-lg">99%</div>
          <div className="text-[#afdbf5] drop-shadow-md">Compliance</div>
          </div>
          <div className="text-center">
                      <div className="text-3xl font-bold text-[#afdbf5] mb-2 drop-shadow-lg">80%</div>
          <div className="text-[#ffedac] drop-shadow-md">Faster Audits</div>
          </div>
          <div className="text-center">
                                              <div className="text-3xl font-bold text-[#afdbf5] mb-2 drop-shadow-lg">50%</div>
                      <div className="text-[#ffedac] drop-shadow-md">Lower Costs</div>
          </div>
        </motion.div>
      </div>


    </section>
  )
}
