# [alxndr.blog]

Source for [alxndr.blog] — Alexander's blog.

Powered by [Astro](https://astro.build) and deployed to [GitHub Pages](https://pages.github.com/).


## Development

```sh
npm install
npm run dev      # dev server at localhost:4321
npm test         # build + Cypress e2e tests
npm run build    # production build to dist/
npm run preview  # serve dist/ locally
```

### Cypress

```sh
npm run cy:open          # interactive runner (all tests)
npm run cy:run           # headless (all tests)
npm run cy:open:dev      # interactive runner, skips @requires-build tests
npm run cy:run:dev       # headless, skips @requires-build tests
```

Tests tagged `@requires-build` depend on a production build (currently: the search tests, which need the post-build Pagefind index). Use the `:dev` variants when running against `npm run dev`.

### Search

The `/search/` page uses [Pagefind](https://pagefind.app/), which indexes the site as a post-build step (`pagefind --site dist`). The `/pagefind/` assets only exist after a build, so:

- **`npm run dev`**: search is non-functional (404s for pagefind assets, silently suppressed)
- **`npm test`** or **`npm run build && npm run preview`**: search works as expected

[alxndr.blog]: https://alxndr.blog
