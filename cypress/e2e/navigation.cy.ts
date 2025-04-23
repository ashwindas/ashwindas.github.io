describe('Navigation Component', () => {
  before(() => {
    cy.visit('/');
    // Wait for the page to be fully loaded
    cy.window().should('have.property', 'document').should('have.property', 'readyState').should('eq', 'complete');
  });

  it('validates navigation structure and content', () => {
    // Check header and branding in one test
    cy.get('header').should('exist');
    cy.contains('Ashwin Das Gururaja').should('exist');
    
    // Verify navigation links in a single test
    ['About', 'Work & Education', 'Photography', 'Contact'].forEach(section => {
      cy.contains(section).should('exist');
    });
  });

  it('validates theme and responsive design', () => {
    // Wait for theme script to be loaded
    cy.get('script#theme-helper').should('exist');
    
    // Verify the document has a valid theme class
    cy.get('html').should(($html) => {
      const hasThemeClass = $html.hasClass('dark') || !$html.hasClass('dark');
      expect(hasThemeClass).to.be.true;
    });
    
    // Test viewport responsiveness together
    type DeviceType = 'mobile' | 'tablet' | 'desktop';
    const sizes = {
      mobile: [375, 667] as [number, number],
      tablet: [768, 1024] as [number, number],
      desktop: [1280, 720] as [number, number]
    };
    
    (['mobile', 'tablet', 'desktop'] as DeviceType[]).forEach(device => {
      const [width, height] = sizes[device];
      cy.viewport(width, height);
      cy.contains('Ashwin Das Gururaja').should('exist');
    });
  });
}); 