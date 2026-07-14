const KNOWN_POST = {
  slug: '2017/02/01/how-to-find-the-merge-where-your-code-disappeared',
  title: 'how to find the merge where your code disappeared',
  tags: ['git', 'code-archaeology', 'cli'],
}

describe('individual post page', () => {
  beforeEach(() => cy.visit(`/${KNOWN_POST.slug}/`))

  it('shows the post title in an h1', () => {
    cy.get('h1').should('contain.text', KNOWN_POST.title)
  })

  it('renders post body content', () => {
    cy.get('article.content').should('exist').and('not.be.empty')
  })

  it('shows tags that link to their tag pages', () => {
    cy.get('.tags').should('exist')
    for (const tag of KNOWN_POST.tags) {
      cy.get(`.tags a[href="/tags/${tag}/"]`).should('exist')
    }
  })

  it('has a page title matching the post title', () => {
    cy.title().should('contain', KNOWN_POST.title)
  })

  it('has a post navigation landmark', () => {
    cy.get('nav[aria-label="Post navigation"]').should('exist')
  })

  it('has both prev and next links pointing to dated post URLs', () => {
    cy.get('a[rel="prev"]').should('have.attr', 'href').and('match', /^\/\d{4}\/\d{2}\/\d{2}\//)
    cy.get('a[rel="next"]').should('have.attr', 'href').and('match', /^\/\d{4}\/\d{2}\/\d{2}\//)
  })
})

describe('newest post page', () => {
  it('has a prev link but no next link', () => {
    cy.visit('/')
    cy.get('section[aria-label="All posts"] .post-list li .post-content > a')
      .first()
      .invoke('attr', 'href')
      .then(href => cy.visit(href))
    cy.get('a[rel="prev"]').should('exist')
    cy.get('a[rel="next"]').should('not.exist')
  })
})
