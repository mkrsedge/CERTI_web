'use client'

import { Navigation } from './navigation'

export function BlogNavigation() {
  return (
    <header aria-label="Site header">
      <Navigation activeSection="blog" onSectionChange={() => {}} />
    </header>
  )
}
