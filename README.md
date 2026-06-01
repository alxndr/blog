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

### Search

The `/search/` page uses [Pagefind](https://pagefind.app/), which indexes the site as a post-build step (`pagefind --site dist`). The `/pagefind/` assets only exist after a build, so:

- **`npm run dev`**: search is non-functional (404s for pagefind assets, silently suppressed)
- **`npm test`** or **`npm run build && npm run preview`**: search works as expected

Cypress search tests must be run via `npm test` — they will fail against the dev server.

[alxndr.blog]: https://alxndr.blog
