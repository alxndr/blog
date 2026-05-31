const PAGES = [
  { path: '/colophon/', heading: /colophon/i },
  { path: '/tapes/', heading: /tapes/i },
  { path: '/tags/toki-pona/', heading: /toki.?pona/i },
  { path: '/ante-kulupu-so/', heading: /ante kulupu so/i },
]

describe('standalone pages', () => {
  for (const { path, heading } of PAGES) {
    describe(path, () => {
      beforeEach(() => cy.visit(path))

      it('returns a page with a matching heading', () => {
        cy.get('h1').invoke('text').should('match', heading)
      })

      it('has main navigation', () => {
        cy.get('nav[aria-label="Main navigation"]').should('exist')
      })
    })
  }
})

describe('colophon page', () => {
  beforeEach(() => cy.visit('/colophon/'))

  it('renders all three design-history screenshots', () => {
    cy.get('figure.colophon-screenshot').should('have.length', 3)
  })

  it('each screenshot has an image with a src', () => {
    cy.get('figure.colophon-screenshot img').each($img => {
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
    })
  })
})
