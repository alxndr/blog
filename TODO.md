# TODOs

* search page
    * [ ] add search string to URL (as anchor?) so it can be linked to
    * [ ] adjust how query works so tags don't get strung together
    * [ ] fix noisy Pagefind warnings during build: Astro creates `.html`-named directories for the `/{slug}.html` → `/{slug}/` redirects built in `astro.config.mjs`; Pagefind trips over them because they look like HTML files. Fix: pass `--glob "**/index.html"` to pagefind in the `build` script so it never tries to open those directories.

* testing...
    * [ ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`
