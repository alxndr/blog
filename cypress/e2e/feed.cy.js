describe('RSS feed', () => {
  it('returns valid XML with the correct channel title', () => {
    cy.request('/feed.xml').then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include('<rss')
      const xml = new DOMParser().parseFromString(response.body, 'text/xml')
      expect(xml.querySelector('channel > title').textContent).to.eq("Alexander's blog")
    })
  })

  it('contains at least 50 items', () => {
    cy.request('/feed.xml').then(response => {
      const xml = new DOMParser().parseFromString(response.body, 'text/xml')
      expect(xml.querySelectorAll('item').length).to.be.gte(50)
    })
  })

  it('first item link resolves to a page whose h1 matches the feed title', () => {
    cy.request('/feed.xml').then(response => {
      const xml = new DOMParser().parseFromString(response.body, 'text/xml')
      const firstItem = xml.querySelector('item')
      const feedItemTitle = firstItem.querySelector('title').textContent.trim()
      const feedItemLink = firstItem.querySelector('link').textContent.trim()
      const postPath = new URL(feedItemLink).pathname

      cy.visit(postPath)
      cy.get('h1').should('contain.text', feedItemTitle)
    })
  })
})
