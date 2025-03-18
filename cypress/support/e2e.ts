// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import Testing Library commands
import '@testing-library/cypress/add-commands';

// Ignore uncaught exceptions related to React hydration
Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test
  if (err.message.includes('Minified React error #418') || 
      err.message.includes('hydration') || 
      err.message.includes('Hydration')) {
    return false;
  }
  // We still want to fail the test if there are other errors
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