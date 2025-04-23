describe('Conferences Section', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for page load
    cy.get('body').should('be.visible');
    // More reliable scroll with wait
    cy.get('#conferences').scrollIntoView().should('be.visible');
  });

  it('validates conference section content', () => {
    // Check basic section structure with better assertions
    cy.get('#conferences')
      .should('be.visible')
      .within(() => {
        cy.contains('h2', 'Conferences').should('be.visible');
        cy.contains('h3', 'Speaker').should('be.visible');
        cy.contains('h3', 'Session Chair / Judge').should('be.visible');
      });
  });

  it('validates speaker section cards', () => {
    cy.get('#conferences').within(() => {
      // Check CVR 2025 card with better assertions
      cy.contains('.card', 'Computer Vision and Robotics (CVR 2025)')
        .should('be.visible')
        .and('have.attr', 'href', 'https://scrs.in/conference/CVR2025')
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer')
        .within(() => {
          cy.get('.badge').contains('Speaker').should('be.visible');
          cy.contains('📍 NIT Goa, India').should('be.visible');
          cy.contains('📅 April 25-26, 2025').should('be.visible');
        });

      // Check other conference cards with better assertions
      cy.contains('.card', 'Future of Chatbots and Conversational AI Summit 2025')
        .should('be.visible')
        .within(() => {
          cy.get('.badge').contains('Speaker').should('be.visible');
          cy.contains('📍 San Francisco').should('be.visible');
        });

      cy.contains('.card', 'Payment & Fraud Leaders Summit 2025')
        .should('be.visible')
        .within(() => {
          cy.get('.badge').contains('Speaker').should('be.visible');
          cy.contains('📍 Miami').should('be.visible');
        });

      cy.contains('.card', 'IEEE World Conference on Applied Intelligence and Computing')
        .should('be.visible')
        .within(() => {
          cy.get('.badge').contains('Speaker').should('be.visible');
          cy.contains('📍 Delhi, India').should('be.visible');
        });
    });
  });

  it('validates session chair section cards', () => {
    cy.get('#conferences').within(() => {
      cy.contains('.card', 'Business Intelligence and Data Analytics (BIDA 2025)')
        .should('be.visible')
        .and('have.attr', 'href', 'https://scrs.in/public/conference/bida2025')
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer')
        .within(() => {
          cy.get('.badge').contains('Session Chair').should('be.visible');
          cy.contains('📍 Bangalore, India').should('be.visible');
        });
    });
  });
}); 