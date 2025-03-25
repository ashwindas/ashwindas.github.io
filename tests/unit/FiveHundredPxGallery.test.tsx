import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FiveHundredPxGallery } from '../../src/components/FiveHundredPxGallery'

// Mock the specific useState call for isLoading
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn().mockImplementation((initialValue) => {
      return [initialValue, jest.fn()];
    })
  };
});

describe('FiveHundredPxGallery', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it('renders loading spinner initially', () => {
    // Force loading state to be true for this test
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()])
    
    const { container } = render(<FiveHundredPxGallery username="TestUser" />)
    
    // Check for loading spinner by class name
    const loadingElement = container.querySelector('.loading.loading-spinner')
    expect(loadingElement).toBeInTheDocument()
  })

  it('renders with default props', () => {
    const { container } = render(<FiveHundredPxGallery />)
    
    // Check that title is rendered
    expect(screen.getByText('My 500px Gallery')).toBeInTheDocument()
    
    // Check that "View full portfolio" link is rendered with correct URL
    const portfolioLink = screen.getByText(/View full portfolio/i)
    expect(portfolioLink).toBeInTheDocument()
    expect(portfolioLink.getAttribute('href')).toBe('https://500px.com/p/AshwinDas')
    
    // Check iframe is created with correct src
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe?.getAttribute('src')).toBe('https://500px.com/p/AshwinDas/galleries/ashwin-s-photography')
  })

  it('renders with custom username', () => {
    const { container } = render(<FiveHundredPxGallery username="CustomUser" />)
    
    // Check portfolio link has custom username
    const portfolioLink = screen.getByText(/View full portfolio/i)
    expect(portfolioLink.getAttribute('href')).toBe('https://500px.com/p/CustomUser')
    
    // Check iframe src has custom username
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe('https://500px.com/p/CustomUser/galleries/ashwin-s-photography')
  })

  it('renders with custom gallery URL', () => {
    const customGalleryUrl = 'https://500px.com/p/CustomUser/galleries/custom-gallery'
    const { container } = render(
      <FiveHundredPxGallery 
        username="TestUser" 
        galleryUrl={customGalleryUrl} 
      />
    )
    
    // Check iframe src uses custom gallery URL
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('src')).toBe(customGalleryUrl)
  })

  it('renders with custom height and width', () => {
    const { container } = render(
      <FiveHundredPxGallery 
        username="TestUser" 
        height={800} 
        width="90%" 
      />
    )
    
    // Check iframe has custom dimensions
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('height')).toBe('800')
    expect(iframe?.getAttribute('width')).toBe('90%')
  })

  it('hides title when showTitle is false', () => {
    render(<FiveHundredPxGallery username="TestUser" showTitle={false} />)
    
    // Title should not be rendered
    expect(screen.queryByText('My 500px Gallery')).not.toBeInTheDocument()
    expect(screen.queryByText(/View full portfolio/i)).not.toBeInTheDocument()
  })

  it('includes attribution to 500px', () => {
    render(<FiveHundredPxGallery username="TestUser" />)
    
    // Check for 500px attribution
    const attribution = screen.getByText('Powered by')
    expect(attribution).toBeInTheDocument()
    
    const link = screen.getByText('500px')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('https://500px.com')
  })
}) 