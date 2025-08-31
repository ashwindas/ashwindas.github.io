'use client'

import Script from 'next/script'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useConsent } from '../hooks/useConsent'

// Enhanced type definition for gtag with all event types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

// Replace G-XXXXXXXXXX with your actual Google Analytics measurement ID
// You can find this in your GA4 property settings under "Data Streams" > "Web"
const GA_MEASUREMENT_ID = 'G-QBT0LK6T2W'

// Analytics event tracking functions - only tracks if consent is given
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  try {
    // Check if user has consented to analytics
    const consentData = localStorage.getItem('analytics-consent')
    let hasAnalyticsConsent = false
    
    if (consentData) {
      try {
        const parsed = JSON.parse(consentData)
        hasAnalyticsConsent = parsed.analytics === true
      } catch {
        console.warn('Failed to parse consent data')
      }
    }

    if (typeof window !== 'undefined' && window.gtag && hasAnalyticsConsent) {
      window.gtag('event', eventName, {
        ...parameters,
        send_to: GA_MEASUREMENT_ID,
      })
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

// Predefined tracking functions for common events
export const trackNavigation = (sectionName: string) => {
  trackEvent('navigation_click', {
    section_name: sectionName,
    event_category: 'navigation',
  })
}

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('click', {
    link_url: url,
    link_text: linkText,
    event_category: 'external_link',
    outbound: true,
  })
}

export const trackEmailClick = () => {
  trackEvent('contact_email', {
    event_category: 'contact',
    contact_method: 'email',
  })
}

export const trackThemeToggle = (newTheme: string) => {
  trackEvent('theme_change', {
    new_theme: newTheme,
    event_category: 'user_preference',
  })
}

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    scroll_depth: percentage,
    event_category: 'engagement',
  })
}

export const trackTimeOnPage = (seconds: number) => {
  trackEvent('page_engagement', {
    engagement_time_msec: seconds * 1000,
    event_category: 'engagement',
  })
}

export const trackPortfolioInteraction = (action: string, itemName?: string) => {
  trackEvent('portfolio_interaction', {
    action,
    item_name: itemName,
    event_category: 'portfolio',
  })
}

// Inner component that uses client hooks
function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { consent } = useConsent()

  // Track scroll depth - only if analytics consent is given
  useEffect(() => {
    if (!consent.analytics) return

    const scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    }

    const trackScrollDepthThrottled = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      // Track milestone percentages
      Object.keys(scrollDepthTracked).forEach(milestone => {
        const percent = parseInt(milestone)
        if (scrollPercent >= percent && !scrollDepthTracked[percent as keyof typeof scrollDepthTracked]) {
          scrollDepthTracked[percent as keyof typeof scrollDepthTracked] = true
          trackScrollDepth(percent)
        }
      })
    }

    // Throttle scroll events
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScrollDepthThrottled()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [consent.analytics])

  // Track time on page - only if analytics consent is given
  useEffect(() => {
    if (!consent.analytics) return

    const startTime = Date.now()
    const timeTracked = {
      30: false,  // 30 seconds
      60: false,  // 1 minute
      180: false, // 3 minutes
      300: false  // 5 minutes
    }

    const interval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
      
      Object.keys(timeTracked).forEach(milestone => {
        const seconds = parseInt(milestone)
        if (timeOnPage >= seconds && !timeTracked[seconds as keyof typeof timeTracked]) {
          timeTracked[seconds as keyof typeof timeTracked] = true
          trackTimeOnPage(seconds)
        }
      })
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [pathname, consent.analytics])

  // Track page views - only if analytics consent is given
  useEffect(() => {
    if (pathname && window.gtag && consent.analytics) {
      // Send pageview with updated path
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams?.toString() || ''),
        anonymize_ip: true, // IP anonymization for privacy
      })
    }
  }, [pathname, searchParams, consent.analytics])

  return null
}

export default function GoogleAnalytics() {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Set default consent to denied
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  )
} 