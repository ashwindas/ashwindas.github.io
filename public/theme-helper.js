// This script runs immediately to avoid theme flicker on page load
(function() {
  try {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine theme based on saved preference or system preference
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply the theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      // Explicitly set light theme classes
      document.documentElement.classList.add('light');
    }
    
    // Store the applied theme to ensure consistency
    localStorage.setItem('theme-preference', theme);
    
    // Make the theme available to the application immediately
    window.__theme = theme;
  } catch (e) {
    // Fallback if localStorage is not available
    console.warn('Theme helper script error:', e);
  }
})(); 