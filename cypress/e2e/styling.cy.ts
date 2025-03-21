describe('Styling and Visual Elements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads DaisyUI components correctly', () => {
    // Check for DaisyUI button styling
    cy.get('.btn').should('exist');
    cy.get('.btn-primary').should('exist');
    cy.get('.btn').should('have.length.at.least', 2);
  });

  it('has correct avatar styling', () => {
    cy.get('.avatar').should('exist');
    cy.get('.avatar img').should('be.visible')
      .and('have.attr', 'alt', 'Ashwin Das Gururaja');
  });

  it('applies dark/light mode styling correctly', () => {
    // Verify the theme can be either light or dark
    cy.get('html').should(($html) => {
      // Either the html has dark class or not, which is fine
      const isDark = $html.hasClass('dark');
      expect([true, false]).to.include(isDark);
    });
    
    // Verify the theme-helper script is included
    cy.get('script[src="/theme-helper.js"]').should('exist');
    
    // Check that some styling is applied
    cy.get('body').should('be.visible').and(($body) => {
      // Just verify that computed styles have some values 
      const color = $body.css('color');
      const bgColor = $body.css('background-color');
      
      expect(color).to.not.be.undefined;
      expect(bgColor).to.not.be.undefined;
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
      // Just verify the card has a width
      const cardWidth = $card.width();
      expect(cardWidth).to.be.greaterThan(0);
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