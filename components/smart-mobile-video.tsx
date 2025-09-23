'use client'

import { useState, useRef, useEffect } from 'react'
import { useVideoPreload } from './video-preloader'

interface SmartMobileVideoProps {
  src: string
  className?: string
  fallbackClassName?: string
  onLoad?: () => void
  onError?: () => void
}

export function SmartMobileVideo({ 
  src, 
  className = '', 
  fallbackClassName = '',
  onLoad,
  onError 
}: SmartMobileVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [performanceMode, setPerformanceMode] = useState<'auto' | 'high' | 'low'>('auto')
  const [frameDropCount, setFrameDropCount] = useState(0)
  const [lastFrameTime, setLastFrameTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const performanceCheckRef = useRef<NodeJS.Timeout | undefined>(undefined)
  
  // Preload the video for smoother playback
  const isPreloaded = useVideoPreload(src)

  // Performance monitoring
  useEffect(() => {
    const monitorPerformance = () => {
      const video = videoRef.current
      if (!video || !videoLoaded) return

      const currentTime = video.currentTime
      const timeDiff = currentTime - lastFrameTime
      
      // If video is stuck or dropping frames significantly
      if (timeDiff < 0.016) { // Less than 60fps
        setFrameDropCount(prev => prev + 1)
      }
      
      setLastFrameTime(currentTime)
      
      // If we're dropping too many frames, switch to performance mode
      if (frameDropCount > 10 && performanceMode === 'auto') {
        console.log('Switching to performance mode due to frame drops')
        setPerformanceMode('low')
        
        // Apply performance optimizations
        if (video) {
          video.playbackRate = 0.9 // Slightly slower for stability
          video.style.filter = 'contrast(1.1) saturate(0.9)' // Reduce processing
        }
      }
    }

    if (performanceMode === 'auto') {
      performanceCheckRef.current = setInterval(monitorPerformance, 1000)
    }

    return () => {
      if (performanceCheckRef.current) {
        clearInterval(performanceCheckRef.current)
      }
    }
  }, [videoLoaded, frameDropCount, performanceMode, lastFrameTime])

  // Handle video loading states
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setVideoLoaded(true)
      setVideoError(false)
      onLoad?.()
    }

    const handleError = (e: Event) => {
      console.warn('Background video failed to load:', e)
      setVideoError(true)
      setShowFallback(true)
      onError?.()
    }

    const handleCanPlay = () => {
      // Apply smart mobile optimizations
      if (video) {
        // Always apply hardware acceleration
        video.style.transform = 'translate3d(0,0,0)'
        video.style.backfaceVisibility = 'hidden'
        
        // Smart quality adjustment based on device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                        window.innerWidth <= 768
        
        if (isMobile) {
          // Start with normal playback, monitor performance
          video.playbackRate = 1.0
          setPerformanceMode('auto')
          
          // Add subtle optimizations that don't break playback
          video.style.imageRendering = 'optimizeSpeed'
          video.style.imageRendering = '-webkit-optimize-contrast'
          
          // Optimize for mobile GPUs
          video.style.filter = 'contrast(1.05) saturate(1.02)' // Minimal processing
          
          // Set optimal buffer settings for mobile
          if ('webkitVideoDecodedByteCount' in video) {
            console.log('WebKit video optimizations available')
          }
        }
      }
      
      // Try to play the video
      video.play().catch((error) => {
        console.warn('Autoplay failed:', error)
      })
    }

    const handleLoadStart = () => {
      setVideoLoaded(false)
      setVideoError(false)
      setShowFallback(false)
      setFrameDropCount(0)
      setPerformanceMode('auto')
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)

    // Fallback timeout
    fallbackTimeoutRef.current = setTimeout(() => {
      if (!videoLoaded && !videoError) {
        console.warn('Video loading timeout, showing fallback')
        setShowFallback(true)
        onError?.()
      }
    }, 8000)

    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)
      }
    }
  }, [videoLoaded, videoError, onLoad, onError])

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload={isPreloaded ? "auto" : "metadata"}
        className={`w-full h-full object-cover hero-video transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ 
          objectPosition: 'center',
          // Smart mobile optimizations
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          willChange: 'transform, opacity',
          // Reduce rendering complexity for mobile
          imageRendering: 'optimizeSpeed',
          WebkitImageRendering: 'optimizeSpeed'
        }}
        // Mobile-specific attributes for better performance
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Background - Static gradient when video fails */}
      {(showFallback || videoError) && (
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${fallbackClassName}`} />
      )}

      {/* Loading State */}
      {!videoLoaded && !videoError && !showFallback && (
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${fallbackClassName}`} />
      )}
    </div>
  )
}
