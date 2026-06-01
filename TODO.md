# TODOs

* [x] rebuild Lipu Nasin Pona into separate site
    * […]then redirect all `/lipu-nasin-pona*` URLs to it

* [ ] investigate astro v6 upgrade...

* testing...
    * [ ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`

* [ ] add tag support for pages

* [ ] support date-based directory listings, so going to `/2024/` shows all (blog) posts published in 2024
