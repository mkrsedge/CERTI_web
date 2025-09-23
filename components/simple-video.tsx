'use client'

import { useState, useRef, useEffect } from 'react'

interface SimpleVideoProps {
  src: string
  className?: string
}

export function SimpleVideo({ src, className = '' }: SimpleVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      console.log('Video loaded successfully:', src)
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = (e: Event) => {
      console.error('Video loading error:', e, 'Source:', src)
      setHasError(true)
      setIsLoaded(true)
    }

    const handleCanPlay = () => {
      console.log('Video can play:', src)
      
      // Check if we're on mobile and handle autoplay restrictions
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       window.innerWidth <= 768
      
      if (isMobile) {
        // On mobile, try to play but don't fail if autoplay is blocked
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playing successfully on mobile')
              setIsPlaying(true)
            })
            .catch((error) => {
              console.warn('Mobile autoplay failed (this is normal):', error)
              // Video is loaded but not playing - this is expected on mobile
              setIsLoaded(true)
            })
        }
      } else {
        // On desktop, try to play the video
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playing successfully on desktop')
              setIsPlaying(true)
            })
            .catch((error) => {
              console.warn('Desktop autoplay failed:', error)
            })
        }
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Load the video
    video.load()

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [src])

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Fallback background */}
      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 animate-shimmer" />
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#3e2723] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-[#3e2723]">
            <p className="text-sm opacity-75">Video unavailable</p>
          </div>
        </div>
      )}

      {/* Mobile play button (when video is loaded but not playing) */}
      {isLoaded && !isPlaying && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              const video = videoRef.current
              if (video) {
                video.play().then(() => {
                  setIsPlaying(true)
                }).catch((error) => {
                  console.warn('Manual play failed:', error)
                })
              }
            }}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-200"
            aria-label="Play video"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover hero-video transition-opacity duration-1000 ${
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectPosition: 'center' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
