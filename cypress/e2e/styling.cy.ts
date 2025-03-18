describe('Styling and Visual Elements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads DaisyUI components correctly', () => {
    // Check for DaisyUI button styling
    cy.get('.btn').should('exist');
    cy.get('.btn-primary').should('exist');
    cy.get('.btn-outline').should('exist');
  });

  it('has correct avatar styling', () => {
    cy.get('.avatar').should('exist');
    cy.get('.avatar img').should('be.visible')
      .and('have.attr', 'class', 'object-cover');
  });

  it('applies dark/light mode styling correctly', () => {
    // Check for dark mode toggle functionality
    cy.get('html').then(($html) => {
      const initialIsDark = $html.hasClass('dark');
      
      // Get some base element colors for comparison
      cy.get('section#home').then(($section) => {
        const initialBgColor = $section.css('background-color');
        const initialTextColor = $section.css('color');
        
        // Toggle theme
        cy.toggleTheme();
        
        // Should have toggled the theme
        cy.shouldBeInDarkMode(!initialIsDark);
        
        // Check that colors have changed
        cy.get('section#home').should(($newSection) => {
          const newBgColor = $newSection.css('background-color');
          const newTextColor = $newSection.css('color');
          
          // Colors should be different in different modes
          expect(newBgColor).not.to.equal(initialBgColor);
          expect(newTextColor).not.to.equal(initialTextColor);
        });
        
        // Toggle back to original theme
        cy.toggleTheme();
        cy.shouldBeInDarkMode(initialIsDark);
      });
    });
  });

  it('has responsive card layouts', () => {
    // Test on desktop
    cy.viewport(1280, 720);
    cy.get('.card').should('be.visible');
    
    // Test on tablet
    cy.viewport(768, 1024);
    cy.get('.card').should('be.visible');
    
    // Test on mobile
    cy.viewport(375, 667);
    cy.get('.card').should('be.visible');
    
    // Card width should adapt to screen size
    cy.get('.card').then(($card) => {
      // On mobile, card width should be close to viewport width
      const cardWidth = $card.width();
      const windowWidth = Cypress.config('viewportWidth');
      
      // For mobile view, the card should take up most of the viewport
      if (windowWidth <= 375) {
        expect(cardWidth).to.be.closeTo(windowWidth - 40, 50); // Allow some margin
      }
    });
  });

  it('has consistent font usage', () => {
    // Check that the font family is consistent
    const fontElements = ['h1', 'p', '.btn', 'nav'];
    
    // Collect all font families used
    const fontFamilies: string[] = [];
    
    // Check each element's computed font family
    fontElements.forEach((element) => {
      cy.get(element).first().then(($el) => {
        const fontFamily = $el.css('font-family');
        fontFamilies.push(fontFamily);
      });
    });
    
    // Compare collected font families
    // They should either be the same or part of the design system
    cy.wrap(fontFamilies).then((fonts) => {
      // Here we're just checking that we don't have wildly different fonts
      // Ideally, there should only be 1-2 font families in use
      const uniqueFonts = new Set(fonts);
      expect(uniqueFonts.size).to.be.lessThan(3); // At most 2 different font families
    });
  });

  it('uses consistent color palette', () => {
    // Check primary, secondary and neutral colors from various elements
    const colorElements = [
      { selector: '.btn-primary', property: 'background-color', type: 'primary' as const },
      { selector: 'a', property: 'color', type: 'link' as const },
      { selector: 'h1', property: 'color', type: 'text' as const },
      { selector: 'section#home', property: 'background-color', type: 'background' as const }
    ];
    
    // Collect all colors used
    const colors: Record<string, string[]> = { 
      primary: [], 
      link: [], 
      text: [], 
      background: [] 
    };
    
    // Check each element's computed color
    colorElements.forEach((element) => {
      cy.get(element.selector).first().then(($el) => {
        const color = $el.css(element.property);
        colors[element.type].push(color);
      });
    });
    
    // Verify color consistency
    cy.wrap(colors).then((colorGroups) => {
      // Each color type should be consistent
      Object.values(colorGroups).forEach(group => {
        const uniqueColors = new Set(group);
        // Each color category should have a limited palette
        expect(uniqueColors.size).to.be.lessThan(3);
      });
    });
  });
}); 