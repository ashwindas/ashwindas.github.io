'use client'

import React from 'react'

export const EmailButton = () => {
  const handleEmailClick = () => {
    const user = "ashwindascg";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  }

  return (
    <button
      onClick={handleEmailClick}
      className="btn btn-primary w-full"
    >
      Send me an email
    </button>
  )
} 