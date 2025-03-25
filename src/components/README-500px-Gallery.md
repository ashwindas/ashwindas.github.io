# 500px Gallery Integration

This document describes how to integrate a 500px gallery into your website using the iframe approach.

## FiveHundredPxGallery Component

A simple iframe-based approach that embeds a 500px gallery directly.

```tsx
import { FiveHundredPxGallery } from '@/components/FiveHundredPxGallery'

// Basic usage with username (will use default gallery)
<FiveHundredPxGallery username="AshwinDas" />

// With specific gallery URL
<FiveHundredPxGallery 
  username="AshwinDas"
  galleryUrl="https://500px.com/p/AshwinDas/galleries/ashwin-s-photography" 
/>

// With custom height and width
<FiveHundredPxGallery 
  username="AshwinDas"
  galleryUrl="https://500px.com/p/AshwinDas/galleries/ashwin-s-photography"
  height={800}
  width="100%" 
  showTitle={false}
/>
```

## Configuration Requirements

For this to work, you need to update your CSP (Content Security Policy) in `layout.tsx` to allow loading content from 500px.com:

```tsx
const cspContent = `...; frame-src 'self' https://500px.com; ...`;
```

## Pros of the Iframe Approach

- Simple implementation with minimal code
- No API keys or credentials required
- Zero API usage costs
- Automatically stays in sync with your 500px gallery
- Managed by 500px, so design updates happen automatically

## Usage in Your Site

The component is already implemented in your site's photography section:

```tsx
// In page.tsx
<section id="photography" className="py-24 bg-base-100 dark:bg-base-200">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center text-base-content dark:text-gray-100">Photography</h2>
    <div className="card bg-base-200 dark:bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <p className="text-lg mb-6 text-base-content dark:text-gray-200">
          Photography is my occasional creative outlet. Explore some of my work below:
        </p>
        <FiveHundredPxGallery 
          username="AshwinDas" 
          galleryUrl="https://500px.com/p/AshwinDas/galleries/ashwin-s-photography"
          height={600} 
        />
        <div className="flex justify-center mt-6">
          <FiveHundredPxButton />
        </div>
      </div>
    </div>
  </div>
</section>
```

## Resources

- [500px Portfolios Information](https://iso.500px.com/new-500px-portfolios-build-a-professional-photography-website-in-minutes/) 