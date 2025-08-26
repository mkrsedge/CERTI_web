'use client'

import { useEffect, useState, useRef } from 'react'

interface OptimizedVideoProps {
  src: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  onLoad?: () => void
}

export function OptimizedVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  onLoad
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observerRef.current?.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const handleVideoLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleVideoError = () => {
    console.warn('Video failed to load, showing fallback')
    setIsLoaded(true) // Show fallback immediately
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 animate-pulse" />
      )}
      
      {/* Video element */}
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Fallback for video errors */}
      {isLoaded && !videoRef.current?.readyState && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <div className="text-blue-600 text-center">
            <div className="text-2xl mb-2">🎥</div>
            <div className="text-sm">Video loading...</div>
          </div>
        </div>
      )}
    </div>
  )
}
