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

// Mock next/script
jest.mock('next/script', () => {
  return {
    __esModule: true,
    default: ({ src, dangerouslySetInnerHTML, id }: any) => {
      // For testing purposes, render a div that contains the script content
      if (dangerouslySetInnerHTML) {
        return <div data-testid={`mock-script-${id}`} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
      }
      return <div data-testid="mock-script-gtag" data-src={src} />
    },
  }
})

describe('GoogleAnalytics', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders Google Analytics scripts', () => {
    const { getByTestId } = render(<GoogleAnalytics />)
    
    // Check for gtag script
    const gtagScript = getByTestId('mock-script-gtag')
    expect(gtagScript).toHaveAttribute('data-src', 'https://www.googletagmanager.com/gtag/js?id=G-QBT0LK6T2W')
    
    // Check for init script
    const initScript = getByTestId('mock-script-gtag-init')
    expect(initScript).toBeInTheDocument()
  })
  
  it('includes measurement ID in init script', () => {
    const { getByTestId } = render(<GoogleAnalytics />)
    const initScript = getByTestId('mock-script-gtag-init')
    expect(initScript).toHaveTextContent('G-QBT0LK6T2W')
  })
  
  it('renders nothing visibly in the DOM except scripts', () => {
    const { container } = render(<GoogleAnalytics />)
    const nonScriptElements = Array.from(container.children).filter(
      child => !(child as HTMLElement).getAttribute('data-testid')?.startsWith('mock-script-')
    )
    expect(nonScriptElements.length).toBe(0)
  })
}) 