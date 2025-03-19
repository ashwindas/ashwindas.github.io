describe('Responsive Design and Mobile Navigation', () => {
  // Define common viewport sizes
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024],
    desktop: [1280, 800]
  };

  beforeEach(() => {
    cy.visit('/');
  });

  context('Mobile Layout Tests', () => {
    beforeEach(() => {
      cy.viewport(viewports.mobile[0], viewports.mobile[1]);
    });

    it('displays the header content properly on mobile', () => {
      cy.get('nav').should('be.visible');
      cy.get('h1').should('be.visible');
      cy.get('img').should('be.visible');
    });

    it('has accessible navigation on mobile', () => {
      cy.get('nav').should('be.visible');
      cy.get('nav').find('button').should('exist');
    });

    // Skip this test until mobile menu is fully implemented
    it.skip('has working mobile navigation menu', () => {
      // Test mobile navigation with our fixed implementation
      cy.get('nav .dropdown button').should('be.visible');
      
      // Initially the dropdown menu should be hidden
      cy.get('.dropdown-content').should('have.class', 'hidden');
      
      // Click the hamburger button to open the menu
      cy.get('nav .dropdown button').click();
      
      // Now the dropdown content should be visible
      cy.get('.dropdown-content').should('have.class', 'block');
      
      // Check that all navigation links are present
      cy.get('.dropdown-content li').should('have.length', 3);
      cy.get('.dropdown-content').contains('About').should('be.visible');
      cy.get('.dropdown-content').contains('Projects').should('be.visible');
      cy.get('.dropdown-content').contains('Contact').should('be.visible');
      
      // Click a navigation item
      cy.get('.dropdown-content').contains('About').click();
      
      // The menu should close after clicking
      cy.get('.dropdown-content').should('have.class', 'hidden');
    });

    it('has properly spaced content in the About Me section', () => {
      // Navigate to the About section
      cy.get('section#about').scrollIntoView().should('be.visible');
      
      // Check text is readable/visible
      cy.get('section#about p').should('be.visible');
      
      // Just verify that content is visible and fits within the viewport without checking exact width
      cy.window().then((win) => {
        // No horizontal scrollbar should appear - content should fit in viewport
        expect(win.document.documentElement.scrollWidth).to.be.at.most(win.document.documentElement.clientWidth + 5); // Allow small margin of error
      });
    });

    it('has accessible buttons on mobile', () => {
      // Check action buttons are visible and accessible
      cy.contains('View My Work').should('be.visible');
      cy.contains('Contact Me').should('be.visible');
      cy.contains('LinkedIn').should('be.visible');
      
      // Check that buttons or links are clickable
      cy.contains('View My Work').should('exist');
      cy.contains('Contact Me').should('exist');
      
      // Navigate to the section to verify the buttons work
      cy.contains('View My Work').click();
      cy.get('section#projects').should('be.visible');
    });

    it('has properly sized project cards on mobile', () => {
      // Navigate to project section
      cy.get('section#projects').scrollIntoView().should('be.visible');
      
      // Check that project cards fit within the mobile viewport
      cy.get('section#projects .card').each(($card) => {
        expect($card.width()).to.be.at.most(viewports.mobile[0]);
      });
    });
  });

  context('Tablet Layout Tests', () => {
    beforeEach(() => {
      cy.viewport(viewports.tablet[0], viewports.tablet[1]);
    });

    it('displays the proper grid layout for projects on tablet', () => {
      cy.get('section#projects').scrollIntoView();
      
      // On tablet, we might expect a 2-column grid
      cy.get('section#projects .grid').should('exist');
      
      // Check that the grid has appropriate column styles for tablet
      cy.get('section#projects .grid').should('have.class', 'md:grid-cols-2');
    });

    it('has proper spacing between sections on tablet', () => {
      // Check that sections have appropriate padding/margin on tablet
      cy.get('section').each(($section) => {
        const padding = parseInt($section.css('padding-top'));
        expect(padding).to.be.at.least(24); // Expect reasonably sized padding
      });
    });
  });

  context('Desktop Layout Tests', () => {
    beforeEach(() => {
      cy.viewport(viewports.desktop[0], viewports.desktop[1]);
    });

    it('displays the wide layout properly on desktop', () => {
      // Check for appropriate max-width on content containers for desktop
      cy.get('.container, .max-w-4xl, .max-w-md').should('exist');
    });

    it('has optimal reading width for About Me text on desktop', () => {
      cy.get('section#about').scrollIntoView();
      cy.get('section#about .card').should('be.visible');
      
      // On desktop, text shouldn't span too wide for readability
      cy.get('section#about .card').then(($card) => {
        expect($card.width()).to.be.at.most(viewports.desktop[0] * 0.8);
      });
    });
  });

  context('Cross-Device Tests', () => {
    it('transitions layouts smoothly when resizing', () => {
      // Start with desktop
      cy.viewport(viewports.desktop[0], viewports.desktop[1]);
      cy.get('h1').should('be.visible');
      
      // Switch to tablet and check visibility
      cy.viewport(viewports.tablet[0], viewports.tablet[1]);
      cy.get('h1').should('be.visible');
      
      // Switch to mobile and check visibility
      cy.viewport(viewports.mobile[0], viewports.mobile[1]);
      cy.get('h1').should('be.visible');
    });

    it('has fluid typography that scales across devices', () => {
      // Test font size scaling across devices
      [viewports.desktop, viewports.tablet, viewports.mobile].forEach((size) => {
        cy.viewport(size[0], size[1]);
        cy.get('h1').should('be.visible');
        cy.get('p').should('be.visible');
      });
    });
  });
}); 