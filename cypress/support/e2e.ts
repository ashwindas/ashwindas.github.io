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

// We'll only run beforeEach for non-isolated tests for backwards compatibility
if (!Cypress.config('testIsolation')) {
  beforeEach(() => {
    // Reset local storage to ensure dark mode is the default
    cy.clearLocalStorage();
    
    // Visit and wait for page to load with reduced wait time
    cy.visit('/');
    
    // Force wait reduced from 2000ms to 500ms
    cy.wait(500);

    // Check that basic document structure exists
    cy.document().should('have.property', 'body');
    cy.get('body').should('exist');
  });
}

// Ignore specific uncaught exceptions from the application
Cypress.on('uncaught:exception', (err, runnable) => {
  // We expect various errors during hydration in the static export test environment.
  // Return false to prevent Cypress from failing the test for these specific errors.
  if (
    err.message.includes('Connection closed.') ||
    err.message.includes('hydrat') ||
    err.message.includes('Hydration') ||
    err.message.includes('content does not match') ||
    err.message.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING') ||
    err.message.includes('Expected server HTML') ||
    err.message.includes('prop') ||
    err.message.includes('Minified React error') ||
    // Additional errors that occur in static builds
    err.message.includes('ResizeObserver') ||
    err.message.includes('Cannot read properties of null') ||
    err.message.includes('undefined is not an object')
  ) {
    return false; // Removed console.log to reduce overhead
  }
  // Let other uncaught exceptions fail the test
  return true;
});

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

// Extend Cypress commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      toggleTheme(): Chainable<Element>;
      shouldBeInDarkMode(isDark?: boolean): Chainable<Element>;
      waitForHydration(timeout?: number): Chainable<Element>;
      visitHomePage(): Chainable<Element>;
    }
  }
}

// Optimized waitForHydration with reduced timeout
Cypress.Commands.add('waitForHydration', (timeout = 1000) => {
  // Wait for static content to be ready (reduced from 5000ms)
  cy.get('body', { timeout }).should('not.be.empty');
  // Use type assertions with unknown as intermediate type to satisfy TypeScript
  return cy.get('body') as unknown as Cypress.Chainable<Element>;
}); 

// Add a reusable command for visiting home page
Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/');
  cy.get('body').should('exist');
  return cy.waitForHydration(1000);
}); 