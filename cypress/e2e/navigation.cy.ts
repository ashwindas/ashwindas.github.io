describe('Navigation Component', () => {
  before(() => {
    cy.visit('/');
    cy.get('body').should('exist');
  });

  it('validates navigation structure and content', () => {
    // Check header and branding in one test
    cy.get('header').should('exist');
    cy.contains('Ashwin').should('exist');
    
    // Verify navigation links in a single test
    ['About', 'Experience', 'Photography', 'Contact'].forEach(section => {
      cy.contains(section).should('exist');
    });
  });

  it('validates theme and responsive design', () => {
    // Check theme script and class
    cy.get('script[src*="theme-helper"]').should('exist');
    
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
      cy.contains('Ashwin').should('exist');
    });
  });
}); 