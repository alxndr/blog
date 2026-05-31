const KNOWN_POST = {
  slug: '2017/02/01/how-to-find-the-merge-where-your-code-disappeared',
  title: 'how to find the merge where your code disappeared',
  tags: ['git', 'versioning'],
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
})
