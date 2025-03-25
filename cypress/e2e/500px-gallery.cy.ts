describe('500px Gallery Component', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/')
    
    // Scroll to the photography section
    cy.get('section#photography').scrollIntoView()
    
    // Wait for content to be visible
    cy.get('.gallery-container').should('be.visible')
  })

  it('renders the gallery in the photography section', () => {
    // Check that the gallery container exists
    cy.get('.gallery-container').should('exist')
    
    // Check for gallery title
    cy.get('.gallery-container h3').should('contain.text', 'My 500px Gallery')
    
    // Check for "View full portfolio" link
    cy.get('.gallery-container a[href*="500px.com"]')
      .contains('View full portfolio')
      .should('have.attr', 'href', 'https://500px.com/p/AshwinDas')
      .should('have.attr', 'target', '_blank')
  })

  it('renders the iframe with correct attributes', () => {
    // Check that iframe exists with correct URL
    cy.get('.gallery-container iframe').should('exist')
      .and(($iframe) => {
        // Verify src attribute
        const src = $iframe.attr('src')
        expect(src).to.equal('https://500px.com/p/AshwinDas/galleries/ashwin-s-photography')
        
        // Verify height
        expect($iframe.attr('height')).to.equal('600')
        
        // Verify width
        expect($iframe.attr('width')).to.equal('100%')
      })
  })

  it('contains proper iframe attributes for accessibility', () => {
    cy.get('.gallery-container iframe')
      .should('have.attr', 'title', '500px Photography Gallery')
      .should('have.class', 'border-0')
      .should('have.class', 'rounded-lg')
  })

  it('shows loading state initially', () => {
    // Intercept all requests to 500px.com to simulate slow loading
    cy.intercept('https://500px.com/**', (req) => {
      req.on('response', (res) => {
        // Delay the response to ensure we can see the loading state
        res.setDelay(1000)
      })
    }).as('500pxRequests')
    
    // Reload the page
    cy.reload()
    
    // Scroll to photography section
    cy.get('section#photography').scrollIntoView()
    
    // Loading spinner should be visible initially
    cy.get('.gallery-container .loading').should('be.visible')
    
    // Wait for requests to complete and loading spinner to disappear
    cy.wait('@500pxRequests', { timeout: 10000 }).its('response.statusCode').should('be.oneOf', [200, 304])
    
    // Check that iframe becomes visible
    cy.get('.gallery-container iframe').should('exist')
  })

  it('includes 500px attribution', () => {
    // Check for attribution text and link
    cy.get('.gallery-container').contains('Powered by')
    cy.get('.gallery-container a').contains('500px')
      .should('have.attr', 'href', 'https://500px.com')
      .should('have.attr', 'target', '_blank')
  })

  it('has a standalone button to view the full 500px profile', () => {
    // Check for the standalone button below the gallery
    cy.get('section#photography .flex.justify-center')
      .find('a[href*="500px.com"]')
      .should('exist')
      .should('have.attr', 'target', '_blank')
  })
}) 