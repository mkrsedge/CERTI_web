'use client'

import { useEffect, useState } from 'react'

interface VideoPreloaderProps {
  src: string
  onPreloadComplete?: () => void
}

export function VideoPreloader({ src, onPreloadComplete }: VideoPreloaderProps) {
  const [preloadStatus, setPreloadStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const preloadVideo = () => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.muted = true
      video.src = src
      
      const handleCanPlay = () => {
        setPreloadStatus('ready')
        onPreloadComplete?.()
      }
      
      const handleError = () => {
        setPreloadStatus('error')
      }
      
      video.addEventListener('canplay', handleCanPlay, { once: true })
      video.addEventListener('error', handleError, { once: true })
      
      // Start preloading
      video.load()
    }

    preloadVideo()
  }, [src, onPreloadComplete])

  return null // This component doesn't render anything
}

// Hook to check if video is preloaded
export function useVideoPreload(src: string) {
  const [isPreloaded, setIsPreloaded] = useState(false)

  useEffect(() => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.src = src

    const handleCanPlay = () => {
      setIsPreloaded(true)
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [src])

  return isPreloaded
}
