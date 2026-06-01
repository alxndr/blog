describe('search page', () => {
  beforeEach(() => cy.visit('/search/'))

  it('loads with a Search heading', () => {
    cy.get('h1').should('contain.text', 'Search')
  })

  it('has a pagefind search input', () => {
    // pagefind-ui.js loads async; wait for it to render the input into #search
    cy.get('.pagefind-ui__search-input', { timeout: 8000 }).should('exist')
  })

  it('has a pagefind results container after typing a query', () => {
    cy.get('.pagefind-ui__search-input', { timeout: 8000 }).type('the')
    cy.get('.pagefind-ui__results-area', { timeout: 8000 }).should('exist')
  })

  it('returns results for a known post keyword', () => {
    cy.get('.pagefind-ui__search-input', { timeout: 8000 }).type('svelte')
    cy.get('.pagefind-ui__result-link', { timeout: 8000 }).should('have.length.gte', 1)
  })

  it('returns results for the toki pona tag page content', () => {
    cy.get('.pagefind-ui__search-input', { timeout: 8000 }).type('omekosa')
    cy.get('.pagefind-ui__result-link', { timeout: 8000 }).should('have.length.gte', 1)
  })
})
