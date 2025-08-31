'use client'

import { useConsent } from '../hooks/useConsent'

export function ConsentBanner() {
  const { consent, acceptAll, acceptNecessary } = useConsent()

  if (!consent.showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 dark:bg-gray-800 border-t border-base-300 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 text-sm text-base-content dark:text-gray-200">
            <p className="mb-2">
              <strong>We value your privacy</strong>
            </p>
            <p>
              This website uses Google Analytics to understand how visitors interact with our content. 
              These analytics help improve the site experience. You can choose to accept or decline analytics tracking.
              {' '}
              <a 
                href="/privacy.html" 
                className="link link-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more in our Privacy Policy
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
            <button
              onClick={acceptNecessary}
              className="btn btn-outline btn-sm text-base-content dark:text-gray-200 border-base-300 dark:border-gray-600 hover:bg-base-200 dark:hover:bg-gray-700"
              aria-label="Accept only necessary cookies"
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAll}
              className="btn btn-primary btn-sm"
              aria-label="Accept all cookies including analytics"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
