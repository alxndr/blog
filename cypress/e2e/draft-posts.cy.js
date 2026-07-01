// Uses the real draft post `github-key-change` which has slug `drafts/github-key-change`.
const DRAFT_POST = {
  slug: 'drafts/github-key-change',
  title: 'github key change',
}

describe('draft posts in production', { tags: '@requires-build' }, () => {
  it('draft post URL returns 404', () => {
    cy.request({ url: `/${DRAFT_POST.slug}/`, failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
  })

  it('homepage does not list the draft post', () => {
    cy.visit('/')
    cy.get('.post-list').should('not.contain.text', DRAFT_POST.title)
  })

  it('RSS feed does not include the draft post', () => {
    cy.request('/feed.xml').then(response => {
      expect(response.body).to.not.include(DRAFT_POST.slug)
    })
  })
})

describe('draft posts in dev', { tags: '@requires-dev' }, () => {
  it('draft post URL resolves and shows the post', () => {
    cy.visit(`/${DRAFT_POST.slug}/`)
    cy.get('h1').should('exist')
    cy.get('article.content').should('exist').and('not.be.empty')
  })

  it('homepage lists the draft post', () => {
    cy.visit('/')
    cy.get('.post-list').should('contain.text', DRAFT_POST.title)
  })
})
