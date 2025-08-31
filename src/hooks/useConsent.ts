'use client'

import { useState, useEffect } from 'react'

export interface ConsentState {
  analytics: boolean
  functional: boolean
  hasConsented: boolean
  showBanner: boolean
}

const CONSENT_KEY = 'analytics-consent'
const CONSENT_VERSION = '1.0'

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentState>({
    analytics: false,
    functional: true, // Always allow functional cookies
    hasConsented: false,
    showBanner: true
  })

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY)
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent)
        if (parsed.version === CONSENT_VERSION) {
          setConsentState({
            analytics: parsed.analytics || false,
            functional: true,
            hasConsented: true,
            showBanner: false
          })
        }
      } catch (error) {
        console.warn('Failed to parse saved consent:', error)
      }
    }
  }, [])

  const updateConsent = (newConsent: Partial<Pick<ConsentState, 'analytics' | 'functional'>>) => {
    const updatedConsent: ConsentState = {
      analytics: newConsent.analytics ?? false,
      functional: true, // Always allow functional
      hasConsented: true,
      showBanner: false
    }

    setConsentState(updatedConsent)

    // Save to localStorage
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...updatedConsent,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString()
    }))

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: 'denied', // We don't use ads
        functionality_storage: 'granted',
        security_storage: 'granted'
      })
    }
  }

  const acceptAll = () => {
    updateConsent({ analytics: true, functional: true })
  }

  const acceptNecessary = () => {
    updateConsent({ analytics: false, functional: true })
  }

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_KEY)
    setConsentState({
      analytics: false,
      functional: true,
      hasConsented: false,
      showBanner: true
    })
  }

  return {
    consent,
    updateConsent,
    acceptAll,
    acceptNecessary,
    resetConsent
  }
}
