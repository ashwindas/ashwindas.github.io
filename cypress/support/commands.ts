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
      navigateToHackathons(): Chainable<void>
      verifyHackathonCard(options: {
        title: string,
        date: string,
        badge: string,
        link: string,
        bannerAlt: string
      }): Chainable<void>
      inViewport(): Chainable<JQuery<HTMLElement>>
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

// Custom command to navigate to hackathons section
Cypress.Commands.add('navigateToHackathons', () => {
  cy.get('button').contains('Hackathons').click()
  cy.url().should('include', '#hackathons')
  cy.get('section#hackathons').should('be.visible')
})

// Custom command to verify hackathon card
Cypress.Commands.add('verifyHackathonCard', (options: {
  title: string,
  date: string,
  badge: string,
  link: string,
  bannerAlt: string
}) => {
  cy.get(`a[href*="${options.link}"]`).within(() => {
    cy.get(`img[alt="${options.bannerAlt}"]`).should('be.visible')
    cy.get('h3').contains(options.title).should('be.visible')
    cy.get('.badge').contains(options.badge).should('be.visible')
    cy.get('p').contains(options.date).should('be.visible')
  })
})

// Theme-related commands
Cypress.Commands.add('toggleTheme', () => {
  cy.get('button[aria-label="Toggle theme"]').click()
})

Cypress.Commands.add('shouldBeInDarkMode', (isDark = true) => {
  cy.get('html').should(isDark ? 'have.class' : 'not.have.class', 'dark')
})

// Add custom command to check if element is in viewport
Cypress.Commands.add('inViewport', { prevSubject: true }, (subject) => {
  const element = subject[0]
  const rect = element.getBoundingClientRect()
  
  expect(rect.top).to.be.within(-1, Cypress.config('viewportHeight'))
  expect(rect.bottom).to.be.within(0, Cypress.config('viewportHeight') + 1)
  
  return subject
}) 