# MediaFeatures Component

This component displays a "Features in Media" section on your website, showcasing publications and media outlets where you've been featured.

## How to Customize

### 1. Update the Media Features Data

Edit the `defaultFeatures` array in `src/components/MediaFeatures.tsx` to include your actual media features:

```typescript
const defaultFeatures: MediaFeature[] = [
  {
    id: 'unique-id',
    title: 'Publication Name',
    publication: 'Publication Name',
    description: "Brief description of your feature or the article.",
    logoSrc: '/images/logos/publication-logo.png',
    url: 'https://link-to-article.com',
    date: '2024'
  },
  // Add more features...
]
```

### 2. Add Media Outlet Logos

Add logo images for each media outlet to `public/images/logos/`:
- `publication-logo.png`
- `another-publication-logo.png`
- etc.

**Logo Requirements:**
- Format: PNG, SVG, or JPG
- Size: Recommend 200x200px or larger
- Transparent background preferred for PNG files
- Keep file sizes under 50KB for optimal loading

### 3. Fallback for Missing Logos

If a logo doesn't exist, the component will automatically show a text-based fallback using the first letters of the publication name.

### 4. Passing Custom Data

You can also pass custom features data to the component:

```typescript
import { MediaFeatures } from '../components/MediaFeatures'

const customFeatures = [
  // your custom data
]

// In your component:
<MediaFeatures features={customFeatures} />
```

### 5. Styling

The component uses DaisyUI classes and follows the same design pattern as other sections on your website. It automatically adapts to light/dark themes.

## Component Features

- **Responsive Grid**: Displays 1 column on mobile, 2 on tablet, 3 on desktop
- **Dark Mode Support**: Automatically adapts to your site's theme
- **Image Error Handling**: Shows text fallback if logos fail to load
- **External Links**: Opens article links in new tabs
- **Hover Effects**: Cards have subtle hover animations

## File Structure

```
src/components/
├── MediaFeatures.tsx           # Main component
└── README-MediaFeatures.md     # This documentation

public/images/logos/
├── your-publication-logo.png   # Add your logos here
└── another-logo.png
```

## Example Usage

The component is already integrated into your main page (`src/app/page.tsx`) and appears in the navigation. Users can click the "Media" button in the hero section to scroll directly to this section. 