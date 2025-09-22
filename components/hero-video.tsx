'use client'

import { useState, useRef, useEffect } from 'react'

interface HeroVideoProps {
  src: string
  className?: string
  fallbackClassName?: string
  onLoad?: () => void
  onError?: () => void
}

export function HeroVideo({ 
  src, 
  className = '', 
  fallbackClassName = '',
  onLoad,
  onError 
}: HeroVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

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
      // Video can play, try to play it
      video.play().catch((error) => {
        console.warn('Autoplay failed:', error)
        // Don't show fallback for autoplay failures, just log them
        // The video might still be visible even if it doesn't autoplay
      })
    }

    const handleLoadStart = () => {
      // Reset states when video starts loading
      setVideoLoaded(false)
      setVideoError(false)
      setShowFallback(false)
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)

    // Fallback timeout - if video doesn't load within 8 seconds, show fallback
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
        preload="metadata"
        className={`w-full h-full object-cover hero-video transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ objectPosition: 'center' }}
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
