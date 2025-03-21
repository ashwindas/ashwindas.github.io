// This script runs immediately to avoid theme flicker on page load
(function() {
  try {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme-preference');
    
    // Default to dark mode if no preference is saved
    const theme = savedTheme || 'dark';
    
    // Apply the theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      
      // Set a custom property for text colors
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark, #f9fafb)');
      document.documentElement.style.setProperty('--text-color-secondary', 'var(--text-color-dark-secondary, #e5e7eb)');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      // Explicitly set light theme classes
      document.documentElement.classList.add('light');
      
      // Set a custom property for text colors
      document.documentElement.style.setProperty('--text-color', 'var(--text-color-light, #1f2937)');
      document.documentElement.style.setProperty('--text-color-secondary', 'var(--text-color-light-secondary, #4b5563)');
    }
    
    // Store the applied theme to ensure consistency
    localStorage.setItem('theme-preference', theme);
    
    // Make the theme available to the application immediately
    window.__theme = theme;
    
    // Define CSS variables for text colors
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --text-color-light: #1f2937;
        --text-color-light-secondary: #4b5563;
        --text-color-dark: #f9fafb;
        --text-color-dark-secondary: #e5e7eb;
      }
      
      .force-text-visible {
        color: var(--text-color) !important;
      }
    `;
    document.head.appendChild(style);
    
    // Apply to all text elements with a short delay to ensure proper application
    setTimeout(() => {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, button, label');
      textElements.forEach(el => {
        if (window.getComputedStyle(el).color === 'rgba(0, 0, 0, 0)' || 
            window.getComputedStyle(el).color === 'transparent') {
          el.classList.add('force-text-visible');
        }
      });
    }, 0);
  } catch (e) {
    // Fallback if localStorage is not available
    console.warn('Theme helper script error:', e);
  }
})(); 