'use client'

import { useState, useEffect } from 'react'

interface MobileVideoOptimizerProps {
  children: React.ReactNode
  fallbackComponent?: React.ReactNode
}

export function MobileVideoOptimizer({ children, fallbackComponent }: MobileVideoOptimizerProps) {
  const [shouldShowVideo, setShouldShowVideo] = useState(true)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Check device memory
      const deviceMemory = (navigator as any).deviceMemory
      const hasLowMemory = deviceMemory && deviceMemory <= 2
      
      // Check connection quality
      const connection = (navigator as any).connection
      const hasSlowConnection = connection && 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.effectiveType === '3g')
      
      // Check screen size (very small screens)
      const isVerySmallScreen = window.innerWidth <= 480 || window.innerHeight <= 800
      
      // Check for mobile browser
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Check for low-end device indicators
      const hardwareConcurrency = navigator.hardwareConcurrency
      const hasLowCPUCores = hardwareConcurrency && hardwareConcurrency <= 2
      
      // Determine if device is low-end (more conservative approach)
      const lowEndDevice = isMobile && (
        hasLowMemory || 
        hasSlowConnection || 
        (isVerySmallScreen && hasLowCPUCores) // Only disable on very small screens WITH low CPU
      )
      
      setIsLowEndDevice(lowEndDevice)
      setShouldShowVideo(!lowEndDevice)
      
      console.log('Mobile Video Optimization:', {
        deviceMemory,
        hasLowMemory,
        hasSlowConnection,
        isVerySmallScreen,
        isMobile,
        hardwareConcurrency,
        hasLowCPUCores,
        lowEndDevice,
        shouldShowVideo: !lowEndDevice
      })
    }

    checkDeviceCapabilities()
    
    // Recheck on resize
    const handleResize = () => {
      checkDeviceCapabilities()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Show fallback for low-end devices
  if (!shouldShowVideo && fallbackComponent) {
    return <>{fallbackComponent}</>
  }

  // Show video for capable devices
  return <>{children}</>
}

// Fallback component for low-end devices
export function VideoFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 animate-pulse">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  )
}
