const PAGES = [
  { path: '/colophon/', heading: /colophon/i },
  { path: '/tapes/', heading: /tapes/i },
  { path: '/toki-pona/', heading: /toki.?pona/i },
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
