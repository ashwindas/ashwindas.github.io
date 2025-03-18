// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Declare the custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      toggleTheme(): Chainable<JQuery<HTMLElement>>;
      shouldBeInDarkMode(isDark?: boolean): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// For more comprehensive examples of custom commands please read more here:
// https://on.cypress.io/custom-commands

export {}; 