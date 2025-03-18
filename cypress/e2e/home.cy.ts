describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the header with correct name', () => {
    cy.get('h1').contains('Ashwin Das Gururaja').should('be.visible');
    cy.get('p').contains('Engineering Leader @ Adobe').should('be.visible');
  });

  it('displays all main sections', () => {
    // Hero section
    cy.get('section#home').should('be.visible');
    
    // Check for avatar/profile image
    cy.get('div.avatar img').should('be.visible')
      .and('have.attr', 'alt', 'Ashwin Das Gururaja');
    
    // Check that other main sections exist
    cy.get('section#projects').should('exist');
    cy.get('section#contact').should('exist');
  });

  it('has working navigation buttons', () => {
    // Click the "View My Work" button
    cy.contains('View My Work').click();
    
    // We should be scrolled to the projects section
    cy.url().should('include', '#projects');
    
    // Click the "Contact Me" button
    cy.contains('Contact Me').click();
    
    // We should be scrolled to the contact section
    cy.url().should('include', '#contact');
  });

  it('has a working theme toggle', () => {
    // Site should start in light mode by default (system preference dependent)
    // Check initial state
    cy.get('html').then(($html) => {
      const initialIsDark = $html.hasClass('dark');
      
      // Toggle the theme
      cy.toggleTheme();
      
      // Should have toggled the theme
      cy.shouldBeInDarkMode(!initialIsDark);
      
      // Toggle back
      cy.toggleTheme();
      
      // Should be back to initial state
      cy.shouldBeInDarkMode(initialIsDark);
    });
  });

  it('validates email button functionality', () => {
    cy.get('section#contact').within(() => {
      // Find the email button
      cy.contains('Send me an email').should('be.visible');
      
      // Mock window.location.href to prevent actual navigation
      cy.window().then((win) => {
        cy.stub(win.location, 'href').as('hrefSpy');
      });
      
      // Click the button
      cy.contains('Send me an email').click();
      
      // Check that the href would have been set to a mailto link
      cy.get('@hrefSpy').should('be.calledWithMatch', 'mailto:');
    });
  });

  it('has responsive layout', () => {
    // Test desktop layout
    cy.viewport(1280, 720);
    cy.get('h1').should('be.visible');
    
    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get('h1').should('be.visible');
    
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get('h1').should('be.visible');
  });
}); 