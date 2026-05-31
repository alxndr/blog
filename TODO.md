# TODOs

* [ x ] favicon — make a tiny version of my avatar image `alexander-120x120.png`

* [ x ] `/tags/toki-pona` individual-tag page, fold the Toki Pona page into this

* style check...
    * homepage
        * [ x ] styling the post list layout: maybe turn it into a grid-like, with the date on the left a little bit smaller, and the title line-wrapped and text-align left? add tags back but underneath and aligned with the title?
        * [ x ] pinned posts: add a 📌 emoji as list-item bulletpoint
    * blog post
        * [ x ] the blog post title's `header` is full-width (?); the content in `div.container` is limited to 42em width. That kinda looks odd even on my laptop when font-size is 16px and my screen is 3100px+ wide... even wider screens it probably looks awful. Should we constrain the header as well? is 42em based on a readability guideline? (dare we automatically create columns for the content??)
    * restyle custom stuff...
        * [   ] [dough calculator](http://localhost:4321/2023/07/28/sourdough-pizza-dough-ratio-calculator)
        * [   ] mapping table on [the Oghamic Toki Pona post](http://localhost:4321/2024/01/18/sitelen-oken-pi-toki-pona/)

* [ x ] add support for: metadata on a post can include a thumbnail image ... url?

* [ x ] evaluate how to add assets (images; one-off CSS; client-side JS) to content (blog posts, pages)

* [   ] investigate astro v6 upgrade...

* [ x ] fold the `HISTORY.md` contents into the Colophon page

* [ x ] add [`cslx`](https://github.com/lukeed/clsx) for making HTML class names (e.g. in `Nav.astro`)

* testing...
    * [   ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`
    * [ x ] fix skipped theme toggle interaction tests in `cypress/e2e/theme.cy.js` — resolved by rewriting ThemeToggleButton as a plain Astro component (no Svelte hydration)

* [   ] research TypeScript-in-Astro options

* [   ] create a real About (Me) page, and link to Colophon from it

* [   ] add tag support for pages
