describe('Privacy Policy Page', () => {
  beforeEach(() => {
    cy.visit('/privacy.html');
  });

  it('displays privacy policy title', () => {
    cy.get('h1').contains('Privacy Policy').should('be.visible');
  });

  it('contains expected privacy policy sections', () => {
    // Check for main sections of privacy policy
    cy.get('h2').contains('Information Collection').should('be.visible');
    cy.get('h2').contains('Use of Information').should('be.visible');
    cy.get('h2').contains('Cookies').should('be.visible');
    cy.get('h2').contains('Third-Party Services').should('be.visible');
    cy.get('h2').contains('Changes to This Policy').should('be.visible');
    cy.get('h2').contains('Contact Information').should('be.visible');
  });

  it('has obfuscated email address in contact section', () => {
    // The email should be loaded by JavaScript
    cy.get('#email-container').should('exist');
  });

  it('has link to return to homepage', () => {
    cy.contains('Return to homepage').should('be.visible')
      .and('have.attr', 'href', '/');
    
    // Test clicking the link navigates to the home page
    cy.contains('Return to homepage').click();
    cy.url().should('not.include', 'privacy.html');
  });

  it('has appropriate styling for light and dark modes', () => {
    // We'll check for proper CSS properties in both modes
    // First check the default styling
    cy.get('body').should('be.visible');
    
    // Get current styling to compare after theme toggle
    cy.get('body').then(($body) => {
      const initialColor = $body.css('color');
      const initialBg = $body.css('background-color');
      
      // Toggle dark mode via system preference simulation
      cy.visit('/privacy.html?force-dark=true');
      
      // Wait for page to load in dark mode
      cy.get('body').should('be.visible');
      
      // Get dark mode styling
      cy.get('body').then(($darkBody) => {
        const darkColor = $darkBody.css('color');
        const darkBg = $darkBody.css('background-color');
        
        // Styling should be different between modes
        // (actual values will depend on your CSS)
        expect(initialColor).to.not.equal(darkColor);
        expect(initialBg).to.not.equal(darkBg);
      });
    });
  });
}); 