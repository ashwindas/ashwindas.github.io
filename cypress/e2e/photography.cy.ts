describe('Photography Section', () => {
  before(() => {
    cy.visit('/');
    // Wait for the page to be fully loaded
    cy.window().should('have.property', 'document').should('have.property', 'readyState').should('eq', 'complete');
  });

  it('validates photography section content and links', () => {
    cy.get('section#photography').scrollIntoView().should('be.visible');
    cy.get('iframe').should('exist');
    cy.get('a[href*="500px.com"]').should('exist')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer');
  });

  it('checks responsive design across viewports', () => {
    cy.get('section#photography').scrollIntoView().should('be.visible');
    
    // Test different viewport sizes
    const viewports = {
      mobile: [375, 667],
      tablet: [768, 1024],
      desktop: [1280, 720]
    };

    Object.entries(viewports).forEach(([device, [width, height]]) => {
      cy.viewport(width, height);
      cy.get('section#photography').should('be.visible');
      cy.get('iframe').should('be.visible');
    });
  });
}); 