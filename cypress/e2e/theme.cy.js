describe('theme toggle', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('renders light and dark toggle inputs in the nav', () => {
    cy.get('input[aria-label="Use light theme"]').should('exist')
    cy.get('input[aria-label="Use dark theme"]').should('exist')
  })

  // TODO: Svelte 5's hydration cycle (via astro client:load) briefly removes
  // and re-adds inputs around interactions, causing cy.get() to time out.
  // Clicking labels, dispatching native Events, and using cy.check() all fail
  // for the same reason. Needs a Svelte 5 / Cypress-aware workaround.
  // See: testing TODO in TODO.md
  it.skip('switching to dark adds theme-dark class to html element', () => {
    cy.get('input[aria-label="Use dark theme"]').parent().click()
    cy.get('html').should('have.class', 'theme-dark')
  })

  it.skip('switching back to light removes theme-dark class from html element', () => {
    cy.get('input[aria-label="Use dark theme"]').parent().click()
    cy.get('html').should('have.class', 'theme-dark')
    cy.get('input[aria-label="Use light theme"]').parent().click()
    cy.get('html').should('not.have.class', 'theme-dark')
  })

  it.skip('selected theme persists in localStorage', () => {
    cy.get('input[aria-label="Use dark theme"]').parent().click()
    cy.window().then(win => {
      expect(win.localStorage.getItem('theme')).to.equal('dark')
    })
  })

  it('persisted dark preference is applied on page load', () => {
    cy.visit('/', {
      onBeforeLoad: win => win.localStorage.setItem('theme', 'dark'),
    })
    cy.get('html').should('have.class', 'theme-dark')
  })
})
