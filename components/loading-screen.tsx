'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  children: React.ReactNode
  minimumLoadingTime?: number // Minimum loading time in ms
}

export function LoadingScreen({ children, minimumLoadingTime = 1500 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading')

    // Ensure minimum loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minimumLoadingTime)

    // Also check if all critical resources are loaded
    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false)
        }, 500) // Small delay to ensure everything is rendered
      }
    }

    if (document.readyState === 'complete') {
      checkResourcesLoaded()
    } else {
      window.addEventListener('load', checkResourcesLoaded)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', checkResourcesLoaded)
      // Remove loading class when component unmounts
      document.body.classList.remove('loading')
    }
  }, [minimumLoadingTime])

  // Handle visibility after loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-32 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src="/CERTI_logo.png" 
                    alt="CERTI Logo" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
              </motion.div>

              {/* Loading Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-2xl font-light text-[#3e2723] mb-2">
                  CERTI
                </h1>
                <p className="text-sm text-gray-600">
                  Yapay Zeka ile Kalite ve Uyumluluk
                </p>
              </motion.div>

              {/* Loading Spinner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-[#ffedac] border-t-[#3e2723] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-[#3e2723] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
              </motion.div>

              {/* Loading Progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="w-full max-w-xs mx-auto mt-6"
              >
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3e2723] to-[#ffedac] rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={isVisible ? 'block' : 'hidden'}
      >
        {children}
      </motion.div>
    </>
  )
}

// Alternative minimal loading screen
export function MinimalLoadingScreen({ children, minimumLoadingTime = 1000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minimumLoadingTime)

    const checkResourcesLoaded = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      }
    }

    if (document.readyState === 'complete') {
      checkResourcesLoaded()
    } else {
      window.addEventListener('load', checkResourcesLoaded)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', checkResourcesLoaded)
    }
  }, [minimumLoadingTime])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-20 h-10 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src="/CERTI_logo.png" 
                  alt="CERTI Logo" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="w-8 h-8 border-2 border-[#3e2723] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Yükleniyor...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && children}
    </>
  )
}
