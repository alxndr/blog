describe('tags index', () => {
  beforeEach(() => cy.visit('/tags/'))

  it('loads with the Tags heading', () => {
    cy.get('h1').should('contain.text', 'Tags')
  })

  it('shows a link to the git tag', () => {
    cy.get('a[href="/tags/git/"]').should('exist')
  })

  it('shows post counts next to each tag', () => {
    cy.get('.tag-list .count').first().invoke('text').should('match', /^\d+$/)
  })
})

describe('tag listing page', () => {
  beforeEach(() => cy.visit('/tags/git/'))

  it('loads with a heading containing the tag name', () => {
    cy.get('h1').should('contain.text', 'git')
  })

  it('lists at least one post', () => {
    cy.get('.post-list li').should('have.length.gte', 1)
  })

  it('each post item links to a post URL', () => {
    cy.get('.post-list li a').each($link => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^\/\d{4}\/\d{2}\/\d{2}\//)
    })
  })
})
