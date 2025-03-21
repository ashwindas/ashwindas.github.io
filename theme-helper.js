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