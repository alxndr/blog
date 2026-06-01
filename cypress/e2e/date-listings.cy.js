describe('year listing page', () => {
  beforeEach(() => cy.visit('/2024/'))

  it('has a heading mentioning the year', () => {
    cy.get('h1').should('contain.text', '2024')
  })

  it('has main navigation', () => {
    cy.get('nav[aria-label="Main navigation"]').should('exist')
  })

  it('lists at least one post', () => {
    cy.get('.post-list li').should('have.length.gte', 1)
  })

  it('each post link is from that year', () => {
    cy.get('.post-list li .post-content > a').each($link => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^\/2024\//)
    })
  })
})

describe('month listing page', () => {
  beforeEach(() => cy.visit('/2024/07/'))

  it('has a heading mentioning the year and month', () => {
    cy.get('h1').should('contain.text', '2024').and('contain.text', '07')
  })

  it('has main navigation', () => {
    cy.get('nav[aria-label="Main navigation"]').should('exist')
  })

  it('lists at least one post', () => {
    cy.get('.post-list li').should('have.length.gte', 1)
  })

  it('each post link is from that year and month', () => {
    cy.get('.post-list li .post-content > a').each($link => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^\/2024\/07\//)
    })
  })
})
