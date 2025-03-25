describe('Photography Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the photography section', () => {
    // Check that the photography section exists and is visible
    cy.get('section#photography').should('exist');
    cy.get('section#photography').scrollIntoView().should('be.visible');
    
    // Check for the section heading
    cy.get('section#photography h2').should('contain', 'Photography').and('be.visible');
  });

  it('contains descriptive text about photography', () => {
    cy.get('section#photography').within(() => {
      cy.get('p').should('contain', 'Photography is my');
      cy.get('p').should('exist');
    });
  });

  it('has a properly styled 500px button with icon', () => {
    // Find the 500px button
    cy.get('section#photography a[href="https://500px.com/p/AshwinDas"]')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('contain', 'View My Photos');
    
    // Check that it has the correct styling
    cy.get('section#photography a[href="https://500px.com/p/AshwinDas"]')
      .should('have.class', 'btn')
      .and('have.css', 'background-color')
      
    // Ensure the 500px icon is present
    cy.get('section#photography a[href="https://500px.com/p/AshwinDas"] svg')
      .should('exist');
  });

  it('is accessible via navigation', () => {
    // Set desktop viewport to see the navigation links
    cy.viewport(1280, 720);
    
    // Check for Photography link in desktop navigation
    cy.get('nav .navbar-center').should('exist').and('be.visible');
    cy.get('nav .navbar-center').contains('Photography').should('exist').and('be.visible');
  });

  it('has a link from hero section', () => {
    // Check for Photography button in hero section
    cy.get('section#home').contains('Photography').should('exist');
    
    // ScrollButton component has the targetId prop, but we can't check it directly in the DOM
    // So we'll verify the button exists and has the correct styling
    cy.get('section#home').contains('Photography')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'btn-primary');
  });

  it('maintains appearance across different viewports', () => {
    // Test desktop layout
    cy.viewport(1280, 720);
    cy.get('section#photography').scrollIntoView().should('be.visible');
    cy.get('section#photography a').should('be.visible');
    
    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get('section#photography').scrollIntoView().should('be.visible');
    cy.get('section#photography a').should('be.visible');
    
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get('section#photography').scrollIntoView().should('be.visible');
    cy.get('section#photography a').should('be.visible');
  });
}); 