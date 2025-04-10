describe('Hackathons Section', () => {
  beforeEach(() => {
    cy.visit('/')
    // Scroll to hackathons section first to ensure it's loaded
    cy.get('#hackathons').scrollIntoView()
  })

  it('displays hackathon judge card', () => {
    // First ensure section is visible
    cy.get('#hackathons')
      .should('be.visible')
      .within(() => {
        // Find and verify the judge card
        cy.contains('.card', 'CODE CRUNCH 305 Hackathon')
          .should('be.visible')
          .within(() => {
            // Verify card content
            cy.get('h3')
              .should('be.visible')
              .should('contain', 'CODE CRUNCH 305 Hackathon')
            cy.get('.badge')
              .should('be.visible')
              .should('contain', 'Judge')
            cy.get('p')
              .should('be.visible')
              .should('contain', 'Spring 2025 Edition')
            cy.get('img')
              .should('be.visible')
              .should('have.attr', 'alt', 'CODE CRUNCH 305 Hackathon Banner')
          })
      })
  })

  it('displays hackathon winner card', () => {
    // First ensure section is visible
    cy.get('#hackathons')
      .should('be.visible')
      .within(() => {
        // Find and verify the winner card
        cy.contains('.card', 'PayPal Hack-a-thon')
          .should('be.visible')
          .within(() => {
            // Verify card content
            cy.get('h3')
              .should('be.visible')
              .should('contain', 'PayPal Hack-a-thon')
            cy.get('.badge')
              .should('be.visible')
              .should('contain', 'Winner')
            cy.get('p')
              .should('be.visible')
              .should('contain', 'September 2012')
            cy.get('img')
              .should('be.visible')
              .should('have.attr', 'alt', 'PayPal Hack-a-thon Banner')
          })
      })
  })

  it('has correct link attributes', () => {
    // First ensure section is visible
    cy.get('#hackathons')
      .should('be.visible')
      .within(() => {
        // Check CODE CRUNCH link
        cy.get('a[href="https://code-crunch-tropical-hack25.devpost.com/"]')
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer')

        // Check PayPal link
        cy.get('a[href*="paypal-hackathon"]')
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer')
      })
  })
}) 