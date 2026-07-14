# TODOs

# DX
    * [x] suppress Astro server output when running Cypress tests — added `dev:quiet` / `preview:quiet` scripts using `astro dev --silent` / `astro preview --silent`; third-party plugin output (vite-plugin-svelte etc.) bypasses Astro's logger and still appears
    * [x] suppress `Failed to read [path] after retries: Is a directory (os error 21)` Pagefind warnings — fixed by passing `--glob '**/index.html'` to pagefind in the `build` script

* search page
    * [ ] add search string to URL (as anchor?) so it can be linked to
    * [ ] adjust how query works so tags don't get strung together

* testing...
    * [ ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`
