'use client'

import { useEffect } from 'react'
import { trackNavigation } from './GoogleAnalytics'

type ScrollButtonProps = {
  targetId: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  onClick?: () => void
}

export function ScrollButton({ targetId, className, style, children, onClick }: ScrollButtonProps) {
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault()
    
    console.log(`Attempting to scroll to ${targetId}`)
    
    // Track navigation click
    trackNavigation(targetId)
    
    // Run additional onClick handler if provided
    if (onClick) {
      onClick()
    }
    
    // Get the target element
    const element = document.getElementById(targetId)
    
    if (element) {
      console.log(`Found element #${targetId}, scrolling to it`)
      // Add a small delay to ensure all elements are properly loaded
      setTimeout(() => {
        try {
          // Calculate position with offset for fixed header (4rem = 64px)
          const headerOffset = 64
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerOffset
          
          console.log(`Scrolling to offsetPosition: ${offsetPosition}`)
          
          // Try different methods of scrolling to ensure it works across browsers
          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (e) {
            console.warn('Smooth scrolling failed, trying alternative', e)
            // Fallback for older browsers
            window.scrollTo(0, offsetPosition)
          }
        } catch (error) {
          console.error('Error during scrolling:', error)
          // Last resort fallback
          try {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } catch (e2) {
            console.error('Final fallback failed:', e2)
            // Absolute last resort
            window.location.hash = `#${targetId}`
          }
        }
      }, 100)
    } else {
      console.warn(`Element with id #${targetId} not found`)
      // Fallback to using hash if element not found
      window.location.hash = `#${targetId}`
    }
  }

  // Ensure navigation works for initial hash in URL
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === `#${targetId}`) {
      const element = document.getElementById(targetId)
      if (element) {
        setTimeout(() => {
          try {
            const headerOffset = 64
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - headerOffset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (error) {
            console.error('Error during initial hash scrolling:', error)
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 300)
      }
    }
  }, [targetId])

  return (
    <button 
      onClick={scrollToSection} 
      className={className} 
      style={style}
      role="link"
      aria-label={`Scroll to ${targetId} section`}
    >
      {children}
    </button>
  )
} 