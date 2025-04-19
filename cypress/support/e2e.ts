// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import Testing Library commands
import '@testing-library/cypress/add-commands';

// Fix for dark mode testing
beforeEach(() => {
  // Reset local storage to ensure dark mode is the default
  // or handle theme setting as needed for tests
  cy.clearLocalStorage()
})

// Ignore specific uncaught exceptions from the application
Cypress.on('uncaught:exception', (err, runnable) => {
  // We expect a 'Connection closed.' error originating from the app code
  // during initial hydration in the static export test environment.
  // Return false to prevent Cypress from failing the test if this specific error occurs.
  if (err.message.includes('Connection closed.')) {
    // Log that we are ignoring the error for debugging purposes
    console.log('Cypress detected and ignored uncaught exception:', err);
    return false
  }
  // Let other uncaught exceptions fail the test
  return true
})

// Add custom commands
Cypress.Commands.add('toggleTheme', () => {
  cy.get('button[aria-label="Toggle theme"]').click();
});

// Add assertion for checking theme
Cypress.Commands.add('shouldBeInDarkMode', (isDark = true) => {
  if (isDark) {
    cy.get('html').should('have.class', 'dark');
  } else {
    cy.get('html').should('not.have.class', 'dark');
  }
}); 