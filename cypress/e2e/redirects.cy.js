// Spot-checks the 4 redirect_from entries defined in astro.config.mjs
const REDIRECTS = [
  {
    from: '/2023/04/24/toki-pona-li-pona-a.html',
    to: '/2023/04/24/mi-kama-sona-toki-e-toki-pona/',
  },
  {
    from: '/2023/03/30/hot-wings-challenge-standup.html',
    to: '/2023/03/30/hot-ones-standup/',
  },
  {
    from: '/2015/04/15/watch-some-files-and-run-something-whenever-they-change.html',
    to: '/2026/05/28/entr-watch-files-and-trigger-commands/',
  },
  {
    from: '/2023/05/23/nasin-ku.html',
    to: '/2023/05/23/nasin-pi-lipu-nimi/',
  },
]

describe('redirects', () => {
  for (const { from, to } of REDIRECTS) {
    it(`${from} → ${to}`, () => {
      cy.visit(from)
      cy.url().should('include', to)
    })
  }
})
