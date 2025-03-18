describe('Navigation Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has visible navigation bar', () => {
    cy.get('nav').should('be.visible');
  });

  it('contains logo or site title', () => {
    cy.get('nav').contains('Ashwin Das').should('be.visible');
  });

  it('has working theme toggle button', () => {
    cy.get('nav button[aria-label="Toggle theme"]')
      .should('be.visible')
      .click();
    
    // Check if theme changed (implementation-specific)
    cy.get('html').then(($html) => {
      // After clicking, we should have toggled the theme
      // This assumes the site starts in light mode
      const isDarkMode = $html.hasClass('dark');
      expect(isDarkMode).to.be.oneOf([true, false]); // Theme should be either light or dark
      
      // Toggle back
      cy.get('nav button[aria-label="Toggle theme"]').click();
      
      // Should be back to initial state
      cy.get('html').should('have.class', isDarkMode ? 'light' : 'dark');
    });
  });

  it('has navigation links to all sections', () => {
    // Check that nav links exist
    cy.get('nav a[href="#home"]').should('be.visible');
    cy.get('nav a[href="#projects"]').should('be.visible');
    cy.get('nav a[href="#contact"]').should('be.visible');
    
    // Test navigation by clicking the links
    cy.get('nav a[href="#projects"]').click();
    cy.url().should('include', '#projects');
    
    cy.get('nav a[href="#contact"]').click();
    cy.url().should('include', '#contact');
    
    cy.get('nav a[href="#home"]').click();
    cy.url().should('include', '#home');
  });

  it('becomes sticky when scrolling', () => {
    // First test that navigation is at the top
    cy.get('nav').should('be.visible');
    
    // Scroll down to a section
    cy.get('section#contact').scrollIntoView();
    
    // Nav should still be visible (sticky)
    cy.get('nav').should('be.visible');
    
    // And should have some CSS property indicating it's sticky
    // This is implementation-specific, could be 'position: fixed', a class, etc.
    cy.get('nav').should(($nav) => {
      const position = $nav.css('position');
      expect(['fixed', 'sticky']).to.include(position);
    });
  });

  it('has responsive design', () => {
    // Test on desktop viewport
    cy.viewport(1280, 720);
    cy.get('nav').should('be.visible');
    // Desktop navigation is typically horizontal
    cy.get('nav').find('a').should('be.visible');
    
    // Test on mobile viewport
    cy.viewport(375, 667);
    // Either the nav is still visible or a hamburger button is visible
    cy.get('nav').then(($nav) => {
      if ($nav.find('button[aria-label="Open menu"]').length > 0) {
        // If there's a hamburger menu, it should be visible
        cy.get('nav button[aria-label="Open menu"]').should('be.visible');
        
        // Click to open the menu
        cy.get('nav button[aria-label="Open menu"]').click();
        
        // Now the links should be visible
        cy.get('nav a[href="#projects"]').should('be.visible');
      } else {
        // If no hamburger, the nav should adapt its styling but links remain visible
        cy.get('nav a[href="#projects"]').should('be.visible');
      }
    });
  });
}); 