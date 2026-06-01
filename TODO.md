# TODOs

* [x] rebuild Lipu Nasin Pona into separate site
    * [x] then redirect all `/lipu-nasin-pona*` URLs to it

* [ ] search feature???

* [ ] investigate astro v6 upgrade...

* testing...
    * [ ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`

* [ ] support date-based directory listings, so going to `/2024/` shows all (blog) posts published in 2024
