// The draft post under test is generated at test time by
// scripts/with-draft-fixture.mjs rather than being committed to the repo, so
// these specs never depend on a real draft post continuing to exist.
import { DRAFT_FIXTURE } from '../support/draft-fixture.mjs'

const DRAFT_POST = {
  slug: DRAFT_FIXTURE.slug,
  title: DRAFT_FIXTURE.title,
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
