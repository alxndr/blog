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
    cy.get('.post-list li .post-content > a').each($link => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^\/\d{4}\/\d{2}\/\d{2}\//)
    })
  })

  it('uses the default site image for og:image when no thumbnail is set', () => {
    cy.get('meta[property="og:image"]')
      .should('have.attr', 'content', 'https://alxndr.blog/assets/images/alexander-120x120.png')
  })
})

describe('tag page with thumbnail in frontmatter', () => {
  beforeEach(() => cy.visit('/tags/toki-pona/'))

  it('uses the thumbnail URL as og:image', () => {
    cy.get('meta[property="og:image"]')
      .should('have.attr', 'content', 'https://static.wikitide.net/sonaponawiki/d/d9/Toki_Pona_logo_%28official_colors%29.svg')
  })

  it('uses the thumbnail URL as twitter:image', () => {
    cy.get('meta[property="twitter:image"]')
      .should('have.attr', 'content', 'https://static.wikitide.net/sonaponawiki/d/d9/Toki_Pona_logo_%28official_colors%29.svg')
  })
})
