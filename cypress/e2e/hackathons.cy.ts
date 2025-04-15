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
            cy.get('img[alt="PayPal Hack-a-thon Banner"]').should('be.visible')
          })
      })
  })

  it('displays AmpliCode Hackathon 2025 card', () => {
    // First ensure section is visible
    cy.get('#hackathons')
      .should('be.visible')
      .within(() => {
        // Find and verify the AmpliCode Hackathon 2025 card
        cy.contains('.card', 'AmpliCode Hackathon 2025')
          .should('be.visible')
          .within(() => {
            // Verify card content
            cy.get('h3')
              .should('be.visible')
              .should('contain', 'AmpliCode Hackathon 2025')
            cy.get('.badge')
              .should('be.visible')
              .should('contain', 'Judge')
            cy.get('p')
              .should('be.visible')
              .should('contain', 'Apr 30 – May 30, 2025')
            cy.get('img')
              .should('be.visible')
              .should('have.attr', 'alt', 'AmpliCode Hackathon 2025 Banner')
          })
      })
  })

  it('displays AI Valley Hackathon card', () => {
    // First ensure section is visible
    cy.get('#hackathons')
      .should('be.visible')
      .within(() => {
        // Find and verify the AI Valley Hackathon card
        cy.contains('.card', 'AI Valley Hackathon')
          .should('be.visible')
          .within(() => {
            // Verify card content
            cy.get('h3')
              .should('be.visible')
              .should('contain', 'AI Valley Hackathon - By Carnegie Mellon University Students')
            cy.get('.badge')
              .should('be.visible')
              .should('contain', 'Judge')
            cy.get('p')
              .should('be.visible')
              .should('contain', 'April 19 - 20, 2025')
            cy.get('img')
              .should('be.visible')
              .should('have.attr', 'alt', 'AI Valley Hackathon Banner')
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

        // Check AmpliCode link
        cy.get('a[href="https://amplicode.devpost.com/"]')
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer')

        // Check AI Valley link
        cy.get('a[href="https://ai-valley-hackathon.devpost.com/"]')
          .should('be.visible')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noopener noreferrer')
      })
  })
}) 