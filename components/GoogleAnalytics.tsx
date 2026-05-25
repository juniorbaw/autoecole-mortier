'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push(arguments)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [measurementId])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  )
}

// Fonction utilitaire pour tracker des événements
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}