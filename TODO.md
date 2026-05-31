# TODOs

* [   ] favicon — make a tiny version of my avatar image `alexander-120x120.png`

* [ x ] `/tags/toki-pona` individual-tag page, fold the Toki Pona page into this

* style check...
    * homepage
        * [   ] styling the post list layout: maybe turn it into a grid-like, with the date on the left a little bit smaller, and the title line-wrapped and text-align left? add tags back but underneath and aligned with the title?
        * [   ] pinned posts: add a 📌 emoji as list-item bulletpoint
    * blog post
        * [   ] the `header` is full-width (?); the content in `div.container` is limited to 42em width. That kinda looks odd even on my laptop when font-size is 16px and my screen is 3100px+ wide... even wider screens it probably looks awful. Should we constrain the header as well? is 42em based on a readability guideline? (dare we automatically create columns for the content??)
    * restyle custom stuff...
        * [   ] [dough calculator](http://localhost:4321/2023/07/28/sourdough-pizza-dough-ratio-calculator)

* [   ] add support for: metadata on a post can include a thumbnail image ... url?

* [   ] evaluate how to add assets (images; one-off CSS; client-side JS) to content (blog posts, pages)

* [   ] investigate astro v6 upgrade...

* [   ] fold the `HISTORY.md` contents into the Colophon page

* [   ] add tag support for pages

* [   ] add [`cslx`](https://github.com/lukeed/clsx) for making HTML class names (e.g. in `Nav.astro`)

* testing...
    * [   ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`
    * [   ] fix skipped theme toggle interaction tests in `cypress/e2e/theme.cy.js` — Svelte 5's hydration cycle (via `client:load`) briefly removes and re-adds inputs around interactions, causing `cy.get()` to time out regardless of whether the label or input is targeted, or whether `.click()`, `.check()`, or `dispatchEvent` is used
        * ...or is this misplaced flakiness? check after fixing the Theme Toggle Disappearing issue...

* [   ] research TypeScript-in-Astro options
