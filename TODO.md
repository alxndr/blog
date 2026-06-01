# TODOs

* [x] rebuild Lipu Nasin Pona into separate site
    * [x] then redirect all `/lipu-nasin-pona*` URLs to it

* [x] search feature??? Pagefind
    * Pagefind recommends the Component UI (1.5.0+) over Default UI for new integrations — main benefit would be a search modal usable from any page. Default UI is still supported; tabling the migration for now.

* [ ] investigate astro v6 upgrade... https://docs.astro.build/en/guides/upgrade-to/v6/

* testing...
    * [ ] investigate writing a custom lint rule (or Cypress plugin rule) to warn against `cy.reload()` in tests — `cy.reload()` is unreliable for asserting on state that depends on client-side JS hydration (e.g. Svelte `client:load`); the correct pattern is seeding `localStorage` via `onBeforeLoad` in `cy.visit()`

* [x] support date-based directory listings, so going to `/2024/` shows all (blog) posts published in 2024, and `/2024/07/` shows July 2024

```
  1. Create src/pages/[year]/index.astro
  2. getStaticPaths() collects distinct years from the posts collection (same query already used
  everywhere)
  3. The page body filters and renders <PostList> — identical pattern to the tag listing page

  Static file count: Clod counted the distinct years in the post slugs. The filenames span 2015–2026
  but most years have a post or two. Rough total: ~10 year-listing HTML files. Negligible.

  One thing to verify: that adding a src/pages/[year]/ folder doesn't shadow the existing
  [...slug].astro for multi-segment URLs like /2024/07/18/slug/. In Astro's static mode each route
  independently generates its own set of files from getStaticPaths(), so they won't collide — but
  worth a quick npm run build check after adding it.

  If you also want month-level (/2024/07/): another ~25 pages, same pattern in
  [year]/[month]/index.astro. Day-level is probably not worth it (you'd just land on a page with one
  post).
```
