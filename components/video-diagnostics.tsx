'use client'

import { useState, useEffect } from 'react'

interface VideoDiagnosticsProps {
  src: string
  enabled?: boolean
}

export function VideoDiagnostics({ src, enabled = false }: VideoDiagnosticsProps) {
  const [diagnostics, setDiagnostics] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const runDiagnostics = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt
        } : null,
        videoSupport: {
          mp4: document.createElement('video').canPlayType('video/mp4'),
          webm: document.createElement('video').canPlayType('video/webm'),
          ogg: document.createElement('video').canPlayType('video/ogg')
        },
        autoplay: 'unknown',
        videoLoad: 'pending'
      }

      // Test video loading
      const testVideo = document.createElement('video')
      testVideo.preload = 'metadata'
      testVideo.muted = true
      testVideo.src = src

      const loadPromise = new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve('timeout')
        }, 10000)

        testVideo.addEventListener('loadeddata', () => {
          clearTimeout(timeout)
          resolve('success')
        }, { once: true })

        testVideo.addEventListener('error', (e) => {
          clearTimeout(timeout)
          resolve('error')
        }, { once: true })
      })

      results.videoLoad = await loadPromise

      // Test autoplay
      try {
        testVideo.muted = true
        const playPromise = testVideo.play()
        if (playPromise) {
          await playPromise
          results.autoplay = 'allowed'
        }
      } catch (error) {
        results.autoplay = 'blocked'
      }

      setDiagnostics(results)
    }

    runDiagnostics()
  }, [src, enabled])

  if (!enabled || !diagnostics) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="w-full text-left font-bold mb-2"
      >
        Video Diagnostics {isVisible ? '▼' : '▶'}
      </button>
      
      {isVisible && (
        <div className="space-y-2">
          <div><strong>Browser:</strong> {diagnostics.userAgent.split(' ')[0]}</div>
          <div><strong>Connection:</strong> {diagnostics.connection?.effectiveType || 'unknown'}</div>
          <div><strong>MP4 Support:</strong> {diagnostics.videoSupport.mp4 || 'no'}</div>
          <div><strong>Video Load:</strong> {diagnostics.videoLoad}</div>
          <div><strong>Autoplay:</strong> {diagnostics.autoplay}</div>
          <div className="text-xs opacity-70 mt-2">
            {diagnostics.timestamp}
          </div>
        </div>
      )}
    </div>
  )
}
