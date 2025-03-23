'use client'

import React, { useState } from 'react'

type FiveHundredPxGalleryProps = {
  username: string
  height?: number
  width?: string
  showTitle?: boolean
}

export const FiveHundredPxGallery = ({
  username = 'AshwinDas',
  height = 600,
  width = '100%',
  showTitle = true
}: FiveHundredPxGalleryProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const profileUrl = `https://500px.com/p/${username}`
  
  // The iframe URL to embed the photographer's profile page
  const embedUrl = `https://500px.com/${username}`
  
  return (
    <div className="gallery-container">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-base-content dark:text-gray-200">
            My 500px Gallery
          </h3>
          <a 
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View full portfolio →
          </a>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center h-48">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      )}
      
      <div className={`relative ${isLoading ? 'h-0 overflow-hidden' : ''}`}>
        <iframe 
          src={embedUrl}
          title="500px Photography Gallery"
          width={width}
          height={height}
          className="border-0 rounded-lg shadow-lg"
          onLoad={() => setIsLoading(false)}
          style={{
            backgroundColor: 'transparent',
            minHeight: '400px'
          }}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
        Powered by <a 
          href="https://500px.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          500px
        </a>
      </div>
    </div>
  )
} 