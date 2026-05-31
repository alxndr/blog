// TODO (Phase 4.5): once the homepage shows the post listing, add assertions:
//   - at least 50 posts visible
//   - each post item has a link with href starting with a 4-digit year
//   - most-recent post title matches first item in /feed.xml

describe('homepage', () => {
  beforeEach(() => cy.visit('/'))

  it('loads and has the correct title', () => {
    cy.title().should('contain', "Alexander's blog")
  })

  it('has main navigation', () => {
    cy.get('nav[aria-label="Main navigation"]').should('exist')
  })

  it('has a skip-nav link', () => {
    cy.get('a[href="#main-content"]').should('exist')
  })
})
