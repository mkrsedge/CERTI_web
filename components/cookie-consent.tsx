'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from './language-context'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('cc:consent') : 'accepted'
    if (!stored) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl m-4 rounded-xl border border-gray-200 bg-white shadow-xl p-4 sm:flex sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700 pr-4">{t('cookie.message')}</div>
        <div className="mt-3 sm:mt-0 flex gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => {
              localStorage.setItem('cc:consent', 'dismissed')
              setVisible(false)
            }}
          >
            {t('cookie.dismiss')}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => {
              localStorage.setItem('cc:consent', 'accepted')
              setVisible(false)
            }}
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
