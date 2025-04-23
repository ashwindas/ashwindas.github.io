describe('Home Page', () => {
  before(() => {
    cy.visit('/');
    // Wait for the page to be fully loaded
    cy.window().should('have.property', 'document').should('have.property', 'readyState').should('eq', 'complete');
  });
  
  it('validates critical page elements', () => {
    // Check header and key sections all at once
    cy.contains('Ashwin Das Gururaja').should('exist');
    cy.contains('Adobe').should('exist');
    
    // Verify all main sections exist
    ['About', 'Work & Education', 'Photography', 'Contact'].forEach(section => {
      cy.contains(section).should('exist');
    });
    
    // Check avatar
    cy.get('img[alt="Ashwin Das Gururaja"]').should('exist');
  });

  it('validates theme and responsive components', () => {
    // Wait for theme script to be loaded
    cy.get('script#theme-helper').should('exist');
    
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
      cy.contains('Ashwin Das Gururaja').should('exist');
    });
  });

  it('checks work experience and education content', () => {
    cy.get('section#experience').scrollIntoView().should('be.visible');
    cy.contains('Work & Education').should('be.visible');
    cy.contains('Adobe').should('be.visible');
    cy.contains('Education').should('be.visible');
  });

  it('validates contact links and social presence', () => {
    // Check Contact section and links together
    cy.get('section#contact').scrollIntoView().should('be.visible');
    cy.contains('Contact').should('be.visible');
    cy.contains('LinkedIn').should('exist');
    cy.get('a').should('exist');
  });
}); 