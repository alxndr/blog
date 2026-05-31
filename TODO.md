# TODOs

* [   ] favicon — make a tiny version of my avatar image `alexander-120x120.png`

* [   ] `/tags/toki-pona` individual-tag page, fold the Toki Pona page into this

* style check...
    * [   ] the `header` is full-width (?); the content in `div.container` is limited to 42em width. That kinda looks odd even on my laptop when font-size is 16px and my screen is 3100px+ wide... even wider screens it probably looks awful. Should we constrain the header as well? is 42em based on a readability guideline? (dare we automatically create columns for the content??)
    * [ x ] why is the default font bumped up to 1.3rem? that's wacky. let's put it at 1.1rem at the most. line-height could be bumped to 1.85rem tho
    * [   ] `pre` / `code` elements — in dark mode they are dark gray on a darker gray bg, the text should be a little lighter gray... in light mode they are the same, it should be a lighter color scheme
    * [ x ] on post pages, the tag hover state is unreadable (blue text on blue background)
        * added global `.tag-link` chip class — teal border/text, fills teal on hover
    * [   ] pinned posts on homepage... add a 📌 emoji or whatev
    * [   ] homepage big list of posts... maybe `ul.post-list` turns into a grid, with the date on the left a little bit smaller, and the title given more room to breathe? add tags back but underneath and aligned with the title?
    * restyle custom stuff...
        * [   ] [dough calculator](http://localhost:4321/2023/07/28/sourdough-pizza-dough-ratio-calculator)
        * [   ] [lipu Ante Kulupu So](http://localhost:4321/ante-kulupu-so)

* [   ] add support for: metadata on a post can include a thumbnail image ... url?

* [   ] evaluate how to add assets (images; one-off CSS; client-side JS) in the new Astro world

* [   ] investigate astro v6 upgrade...

* [   ] fold the `HISTORY.md` contents into the Colophon page

* [   ] add tag support for pages

* testing...
    * [   ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`
