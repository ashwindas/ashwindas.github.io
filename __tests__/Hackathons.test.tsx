import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

// Mock the required components
jest.mock('../src/components/ScrollButton', () => ({
  ScrollButton: ({ children }: { children: React.ReactNode }) => <button>{children}</button>
}))

jest.mock('../src/components/EmailButton', () => ({
  EmailButton: () => <button>Email</button>
}))

jest.mock('../src/components/LinkedInButton', () => ({
  LinkedInButton: () => <button>LinkedIn</button>
}))

jest.mock('../src/components/FiveHundredPxButton', () => ({
  FiveHundredPxButton: () => <button>500px</button>
}))

jest.mock('../src/components/FiveHundredPxGallery', () => ({
  FiveHundredPxGallery: () => <div>Gallery</div>
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />
}))

describe('Hackathons Section', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders the Hackathons section with correct heading', () => {
    const heading = screen.getByRole('heading', { name: 'Hackathons', level: 2 })
    expect(heading).toBeInTheDocument()
  })

  describe('Judge Section', () => {
    it('renders the Judge subsection with correct heading', () => {
      const heading = screen.getByRole('heading', { name: 'Judge', level: 3 })
      expect(heading).toBeInTheDocument()
    })

    it('renders CODE CRUNCH hackathon card with correct details', () => {
      const codeCrunchLink = screen.getByRole('link', { name: /CODE CRUNCH 305 Hackathon/i })
      expect(codeCrunchLink).toHaveAttribute('href', 'https://code-crunch-tropical-hack25.devpost.com/')
      expect(codeCrunchLink).toHaveAttribute('target', '_blank')
      expect(codeCrunchLink).toHaveAttribute('rel', 'noopener noreferrer')
      
      expect(screen.getByRole('heading', { name: 'CODE CRUNCH 305 Hackathon' })).toBeInTheDocument()
      expect(screen.getByText('Spring 2025 Edition')).toBeInTheDocument()
      const judgeBadge = screen.getByText('Judge', { selector: '.badge' })
      expect(judgeBadge).toBeInTheDocument()
    })

    it('displays CODE CRUNCH banner image', () => {
      const image = screen.getByAltText('CODE CRUNCH 305 Hackathon Banner')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('code-crunch-305-hackathon-banner.png'))
    })
  })

  describe('Winner Section', () => {
    it('renders the Winner subsection with correct heading', () => {
      const heading = screen.getByRole('heading', { name: 'Winner', level: 3 })
      expect(heading).toBeInTheDocument()
    })

    it('renders PayPal hackathon card with correct details', () => {
      const paypalLink = screen.getByRole('link', { name: /PayPal Hack-a-thon/i })
      expect(paypalLink).toHaveAttribute(
        'href', 
        'https://web.archive.org/web/20161121142311/http://www.cmu.edu/silicon-valley/news-events/news/2012/paypal-hackathon.html'
      )
      expect(paypalLink).toHaveAttribute('target', '_blank')
      expect(paypalLink).toHaveAttribute('rel', 'noopener noreferrer')
      
      expect(screen.getByRole('heading', { name: 'PayPal Hack-a-thon' })).toBeInTheDocument()
      expect(screen.getByText('September 2012')).toBeInTheDocument()
      const winnerBadge = screen.getByText('Winner', { selector: '.badge' })
      expect(winnerBadge).toBeInTheDocument()
    })

    it('displays PayPal hackathon banner image', () => {
      const image = screen.getByAltText('PayPal Hack-a-thon Banner')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', expect.stringContaining('paypal-hackathon-banner.png'))
    })
  })
}) 