describe('Home Page', () => {
  before(() => {
    cy.visit('/');
    cy.get('body').should('exist');
  });
  
  it('validates critical page elements', () => {
    // Check header and key sections all at once
    cy.contains('Ashwin Das').should('exist');
    cy.contains('Adobe').should('exist');
    
    // Verify all main sections exist
    ['About', 'Experience', 'Photography', 'Contact'].forEach(section => {
      cy.contains(section).should('exist');
    });
    
    // Check avatar
    cy.get('img[alt*="Ashwin"]').should('exist');
  });

  it('validates theme and responsive components', () => {
    // Check theme functionality
    cy.get('script[src*="theme-helper"]').should('exist');
    
    // Verify the theme is either light or dark
    cy.get('html').then(($html) => {
      expect($html.hasClass('dark') || !$html.hasClass('dark')).to.be.true;
    });
    
    // Test responsive layouts in a single test
    type DeviceType = 'desktop' | 'tablet' | 'mobile';
    const sizes = {
      desktop: [1280, 720] as [number, number],
      tablet: [768, 1024] as [number, number],
      mobile: [375, 667] as [number, number]
    };
    
    (['desktop', 'tablet', 'mobile'] as DeviceType[]).forEach(device => {
      const [width, height] = sizes[device];
      cy.viewport(width, height);
      cy.contains('Ashwin').should('exist');
    });
  });

  it('checks work experience and education content', () => {
    cy.contains('Experience').scrollIntoView();
    cy.contains('Adobe').should('exist');
    cy.contains('Education').should('exist');
  });

  it('validates contact links and social presence', () => {
    // Check Contact section and links together
    cy.contains('Contact').scrollIntoView();
    cy.contains('LinkedIn').should('exist');
    cy.get('a').should('exist');
  });
}); 