'use client'

import Script from 'next/script'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

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

// Analytics event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: GA_MEASUREMENT_ID,
    })
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

  // Track scroll depth
  useEffect(() => {
    let scrollDepthTracked = {
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
        if (scrollPercent >= percent && !scrollDepthTracked[percent]) {
          scrollDepthTracked[percent] = true
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
  }, [])

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()
    let timeTracked = {
      30: false,  // 30 seconds
      60: false,  // 1 minute
      180: false, // 3 minutes
      300: false  // 5 minutes
    }

    const interval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
      
      Object.keys(timeTracked).forEach(milestone => {
        const seconds = parseInt(milestone)
        if (timeOnPage >= seconds && !timeTracked[seconds]) {
          timeTracked[seconds] = true
          trackTimeOnPage(seconds)
        }
      })
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [pathname])

  // Track page views
  useEffect(() => {
    if (pathname && window.gtag) {
      // Send pageview with updated path
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams?.toString() || ''),
      })
    }
  }, [pathname, searchParams])

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
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search,
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