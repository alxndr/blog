---
title: Setting up SvelteKit to use SQLite and prerender a static site to be hosted on GitLab Pages
tags: [howto, javascript, code]
---

I started with `npm init vite` and picked a SvelteKit project (using TypeScript).

First change-up you've gotta make is to use [the `@sveltejs/adapter-static` adapter](https://kit.svelte.dev/docs/adapter-static). For Svelte(Kit?) reasons it needs to be one of the `devDependencies`:

```shell
$ npm install -D @sveltejs/adapter-static
```

…then [use it in the `svelte.config.js`](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/932ef981b7e689ea5e70057390b0e1ed6e42e1af/svelte.config.js) to set `strict: false` and specify the `public` directory as the source for `pages` and `assets`:

```js
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
export default {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: 'public',
      assets: 'public',
      fallback: undefined,
      precompress: false,
      strict: false, // https://kit.svelte.dev/docs/adapter-static#options-strict
    }),
  },
}
```

[Here's](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/932ef981b7e689ea5e70057390b0e1ed6e42e1af/.gitlab-ci.yml) how I initially got the static site prerendering on GitLab pipeline...

```yml
# .gitlab-ci.yml

image: node:latest
pages:
  stage: deploy
  script:
    - npm ci
    - npm run build # even though this appears to create things in `.svelte-kit/output/{client,server}/*`, @sveltejs/adapter-static puts things into the `public/` dir...
  artifacts:
    paths:
    - public
  publish: public # this might be the default
  only:
  - main
```

Okay so at this point GitLab is building the static site and hosting it on GitLab Pages; now for adding SQLite...

First install `better-sqlite3` as one of the `devDependencies` (and if you're using TypeScript, `@types/better-sqlite3` too)...

```shell
$ npm install -D better-sqlite3 @types/better-sqlite3
```

Then pick [a `+page.svelte` file](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/9f8ab5b21fe9329b63892a7e4d0458c3e2a33c8c/src/routes/show/%5Bslug%5D/+page.svelte) which you want to get some data from the database, and open (or create) [its corresponding `+page.server.ts` file](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/9f8ab5b21fe9329b63892a7e4d0458c3e2a33c8c/src/routes/show/%5Bslug%5D/+page.server.ts).
In this file you're gonna import `better-sqlite3`, use it to read the `.db` SQLite file, and run a query to extract some data...

```ts
import {error} from '@sveltejs/kit'
import type {ReqestHandler} from './$types'
import Database from 'better-sqlite3'
import fs from 'node:fs'

const db = new Database(fs.readFileSync('src/path-to-sqlite-data.db'))

export const load: RequestHandler = ({ params }) => {
  const showNum = Number(params.slug)
  const stmt = db.prepare('select * from shows where id like ? limit 1')
  const result = stmt.all(`%${showNum}%`)
  if (result?.length) {
    const [showData] = result
    return showData
  }

  error(404, 'Not found')
}
```

Now [the `+page.svelte`](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/9f8ab5b21fe9329b63892a7e4d0458c3e2a33c8c/src/routes/show/%5Bslug%5D/+page.svelte) will be passed that `showData` object as the `PageLoad` `data`!

```svelte
<script lang="ts">
  import type { PageLoad } from './$types'
  export let data: PageLoad
</script>

<h1 class="show__title">
  Show #{data.id}: {data.tagline}
</h1>

{#if data.notes}
  <p class="show__notes">{data.notes}</p>
{/if}
```

**Ta-daa! It works! 🙌 🥂**


## Acknowledgements

[`npm init vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite) does a lot of the backend-for-frontend setup, without which I'd be totally unable to do any of this. Chapeau, [Vite](https://vitejs.dev)!

[The SvelteKit docs](https://kit.svelte.dev/docs/load) are quite nice, helpful for a brand-new-beginner like me. Thanks Svelters!

[Kisaragi Hiu's blog](https://kisaragi-hiu.com/kemdict-sveltekit-sqlite) shepherded me gently through all of the SQLite stuff! Thank you!
