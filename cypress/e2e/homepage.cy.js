describe('homepage', () => {
  beforeEach(() => cy.visit('/'))

  it('loads and has the correct title', () => {
    cy.title().should('contain', "Alexander's blog")
  })

  it('has main navigation with a tags link', () => {
    cy.get('nav[aria-label="Main navigation"]').should('exist')
    cy.get('nav[aria-label="Main navigation"] a[href="/tags/"]').should('exist')
  })

  it('has a skip-nav link', () => {
    cy.get('a[href="#main-content"]').should('exist')
  })

  it('shows a pinned posts section with 3 entries', () => {
    cy.get('section[aria-label="Pinned posts"] .post-list li').should('have.length', 3)
  })

  it('shows at least 50 posts in the all-posts section', () => {
    cy.get('section[aria-label="All posts"] .post-list li').should('have.length.gte', 50)
  })

  it('each post item links to a dated URL', () => {
    cy.get('section[aria-label="All posts"] .post-list li a').first()
      .should('have.attr', 'href')
      .and('match', /^\/\d{4}\/\d{2}\/\d{2}\//)
  })

  it('most recent post matches first item in the RSS feed', () => {
    cy.request('/feed.xml').then(response => {
      const xml = new DOMParser().parseFromString(response.body, 'text/xml')
      const firstFeedTitle = xml.querySelector('item > title').textContent.trim()
      cy.get('section[aria-label="All posts"] .post-list li a').first()
        .should('contain.text', firstFeedTitle)
    })
  })
})
