# TODOs

* [   ] restore the CSS-based color filter on the "root" images in http://localhost:4321/2023/05/23/nasin-pi-lipu-nimi/ so they matched the light/dark theme setting (right now they only match in the dark mode)

* [   ] investigate astro v6 upgrade...

* testing...
    * [   ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`

* [   ] create a real About (Me) page, and link to Colophon from it

* [   ] add tag support for pages

* [   ] support date-based directory listings, so going to `/2024/` shows all (blog) posts published in 2024
