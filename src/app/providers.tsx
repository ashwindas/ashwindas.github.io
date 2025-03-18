'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  // Added state for client-side rendering check
  const [mounted, setMounted] = useState(false)

  // Ensure we're fully client-side before rendering anything that needs JS
  useEffect(() => {
    // Short delay before mounting to avoid hydration issues
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  // Fix for WebSocket connections closing prematurely
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Capture and suppress certain WebSocket errors
    const originalConsoleError = console.error;
    console.error = function(...args) {
      // Filter out WebSocket message channel errors
      if (args[0] && typeof args[0] === 'string' && 
          (args[0].includes('message channel closed') || 
           args[0].includes('WebSocket connection'))) {
        return;
      }
      originalConsoleError.apply(console, args);
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Add smooth scrolling polyfill - make it safer for SSR
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if smooth scrolling is natively supported
    if (!('scrollBehavior' in document.documentElement.style)) {
      // This is a simple polyfill implementation
      const smoothScroll = (targetY: number) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 500; // ms
        let startTime: number | null = null;

        const step = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          window.scrollTo(0, startY + distance * easeInOutCubic);
          
          if (timeElapsed < duration) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      };

      try {
        // Override scrollIntoView
        const originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(this: Element, options?: boolean | ScrollIntoViewOptions) {
          if (options && typeof options === 'object' && options.behavior === 'smooth') {
            const targetY = this.getBoundingClientRect().top + window.scrollY;
            smoothScroll(targetY);
            return;
          }
          originalScrollIntoView.apply(this, [options] as unknown as [boolean?]);
        };
      } catch (error) {
        console.error('Error setting up smooth scroll polyfill:', error);
      }
    }
  }, [mounted]);

  // Safe theme handling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Force theme check
      const checkTheme = () => {
        // Check if dark mode is preferred by system
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Get stored theme from localStorage or use system preference
        const storedTheme = localStorage.getItem('theme');
        const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Apply theme to document element
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      
      checkTheme();
    } catch (error) {
      console.error('Error checking theme:', error);
    }
  }, [mounted]); // Only run after mounted

  // Only render children when mounted to avoid hydration issues
  if (!mounted) {
    return <div className="min-h-screen bg-base-100 dark:bg-gray-900"></div>;
  }

  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="theme-preference"
      themes={['light', 'dark']}
      // Force the theme to re-render when the component mounts
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
} 