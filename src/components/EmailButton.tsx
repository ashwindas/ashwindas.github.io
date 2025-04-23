'use client'

import React from 'react'

export const EmailButton = () => {
  const handleEmailClick = () => {
    // Split email into parts to avoid scraping
    const parts = ['ashwindas', 'cg', 'gmail.com'];
    window.location.href = `mailto:${parts[0]}${parts[1]}@${parts[2]}`;
  }

  return (
    <button
      onClick={handleEmailClick}
      className="btn bg-primary hover:bg-primary-focus text-white border-none flex items-center gap-2"
      aria-label="Email me"
    >
      <svg 
        className="w-4 h-4" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
      Email
    </button>
  )
} 