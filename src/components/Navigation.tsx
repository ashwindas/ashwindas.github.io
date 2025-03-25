'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ScrollButton } from './ScrollButton'

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()

  // Fix for hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Log initial theme state when component mounts
    const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const dataTheme = document.documentElement.getAttribute('data-theme');
    const storedTheme = localStorage.getItem('theme-preference');
    console.log('Initial theme state:', {
      cssClass: initialTheme,
      dataTheme: dataTheme,
      localStorage: storedTheme,
      resolvedTheme: resolvedTheme,
      nextThemes: theme
    });
  }, [resolvedTheme, theme])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest('nav')) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  // Log theme changes for debugging
  useEffect(() => {
    if (mounted && resolvedTheme) {
      console.log('Theme changed to:', resolvedTheme, 'Raw theme value:', theme)
    }
  }, [resolvedTheme, theme, mounted])

  // Fix for handling section navigation
  const handleSectionNav = () => {
    // Close mobile menu after navigation
    setMobileMenuOpen(false)
  }

  // Toggle theme function with improved implementation
  const toggleTheme = () => {
    try {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
      console.log('Changing theme from', resolvedTheme, 'to', newTheme)
      
      // Set theme with the next-themes provider
      setTheme(newTheme)
      
      // Use localStorage directly as a backup mechanism
      localStorage.setItem('theme-preference', newTheme)
      
      // Apply class directly for immediate visual feedback
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
        document.documentElement.setAttribute('data-theme', 'dark')
        
        // Explicitly update text colors for dark mode
        document.querySelectorAll('.text-base-content').forEach(el => {
          el.classList.add('text-gray-100')
        })
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        document.documentElement.setAttribute('data-theme', 'light')
        
        // Explicitly update text colors for light mode
        document.querySelectorAll('.text-gray-100').forEach(el => {
          el.classList.remove('text-gray-100')
        })
      }
    } catch (error) {
      console.error('Error toggling theme:', error)
    }
  }

  // Show a loading placeholder instead of null during hydration
  if (!mounted) {
    return (
      <div className="navbar bg-base-100 shadow-md fixed z-50">
        <div className="flex-1">
          <span className="text-xl font-bold">ADG</span>
        </div>
      </div>
    )
  }

  // Determine the current theme for displaying the correct icon
  const currentTheme = resolvedTheme || 'system'
  const isDark = currentTheme === 'dark'

  return (
    <nav className="navbar bg-base-100 shadow-md fixed z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Navigation menu">
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
          <ul className={`menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <li>
              <ScrollButton
                targetId="about"
                className="text-base-content"
                onClick={() => handleSectionNav()}
              >
                About
              </ScrollButton>
            </li>
            <li>
              <ScrollButton
                targetId="experience"
                className="text-base-content"
                onClick={() => handleSectionNav()}
              >
                Work & Education
              </ScrollButton>
            </li>
            <li>
              <ScrollButton
                targetId="photography"
                className="text-base-content"
                onClick={() => handleSectionNav()}
              >
                Photography
              </ScrollButton>
            </li>
            <li>
              <ScrollButton
                targetId="contact"
                className="text-base-content"
                onClick={() => handleSectionNav()}
              >
                Contact
              </ScrollButton>
            </li>
          </ul>
        </div>
        <ScrollButton targetId="home" className="btn btn-ghost text-xl font-bold">
          ADG
        </ScrollButton>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ScrollButton
              targetId="about"
              className="text-base-content"
            >
              About
            </ScrollButton>
          </li>
          <li>
            <ScrollButton
              targetId="experience"
              className="text-base-content"
            >
              Work & Education
            </ScrollButton>
          </li>
          <li>
            <ScrollButton
              targetId="photography"
              className="text-base-content"
            >
              Photography
            </ScrollButton>
          </li>
          <li>
            <ScrollButton
              targetId="contact"
              className="text-base-content"
            >
              Contact
            </ScrollButton>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  )
} 