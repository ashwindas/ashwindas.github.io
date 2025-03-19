import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import GoogleAnalytics from '../../src/components/GoogleAnalytics'
import { usePathname, useSearchParams } from 'next/navigation'

// Mock window.gtag
const mockGtag = jest.fn()
window.gtag = mockGtag
window.dataLayer = []

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    toString: jest.fn(() => ''),
  })),
}))

describe('GoogleAnalytics', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders Google Analytics script tags', () => {
    const { container } = render(<GoogleAnalytics />)
    const scripts = container.querySelectorAll('script')
    expect(scripts.length).toBeGreaterThan(1)
  })
  
  it('includes measurement ID in scripts', () => {
    const { container } = render(<GoogleAnalytics />)
    
    // Get all scripts HTML
    const scripts = container.querySelectorAll('script')
    const scriptWithId = Array.from(scripts).find(script => 
      script.innerHTML && script.innerHTML.includes('G-QBT0LK6T2W')
    )
    
    // At least one script should contain the measurement ID
    expect(scriptWithId).toBeTruthy()
  })
  
  it('renders nothing visibly in the DOM', () => {
    const { container } = render(<GoogleAnalytics />)
    
    // There might not be a firstChild if everything is rendered as scripts
    // or is inside a suspense boundary with null fallback
    if (container.firstChild) {
      expect(container.firstChild).not.toBeVisible()
    }
  })
}) 