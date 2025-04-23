describe('Photography Section', () => {
  before(() => {
    cy.visit('/');
    cy.get('body').should('exist');
  });

  it('validates photography section content and links', () => {
    // Check basic photography content
    cy.contains('Photography').scrollIntoView();
    cy.contains('500px').should('exist');
    
    // Check for photography paragraph
    cy.get('section#photography').within(() => {
      cy.get('p').should('exist');
    });
    
    // Check for external link once
    cy.get('section#photography a[href="https://500px.com/p/AshwinDas"]')
      .should('exist')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  it('checks responsive design across viewports', () => {
    // Test viewport responsiveness together
    type DeviceType = 'desktop' | 'tablet' | 'mobile';
    const sizes = {
      desktop: [1280, 720] as [number, number],
      tablet: [768, 1024] as [number, number],
      mobile: [375, 667] as [number, number]
    };
    
    cy.contains('Photography').scrollIntoView();
    
    (['desktop', 'tablet', 'mobile'] as DeviceType[]).forEach(device => {
      const [width, height] = sizes[device];
      cy.viewport(width, height);
      cy.get('section#photography').should('be.visible');
      cy.get('section#photography a').should('exist');
    });
  });
}); 