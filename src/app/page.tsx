'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Root() {
  const router = useRouter()
  useEffect(() => {
    // Restore path encoded by public/404.html for GitHub Pages SPA routing
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('p')
    if (redirect && redirect !== '') {
      const query = params.get('q')
      router.replace('/' + redirect + (query ? '?' + query : ''))
    } else {
      router.replace('/inicio')
    }
  }, [router])
  return null
}
