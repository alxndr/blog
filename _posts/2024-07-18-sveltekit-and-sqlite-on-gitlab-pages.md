---
title: Setting up SvelteKit to use SQLite and prerender a static site to be hosted on GitLab Pages
tags: [howto, javascript, code]
---

I started with `npm init vite` and picked a [SvelteKit] project (using [TypeScript]).

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


## Testing with [Playwright]

I have lots of experience with [Cypress](https://cypress.io), so to try something new I decided to check out [Playwright].

To add Playwright to my existing app, I used the [`https://www.npmjs.com/package/create-playwright`](https://www.npmjs.com/package/create-playwright) CLI tool: `pnpm dlx create-playwright`

It scaffolds a test subdirectory, a (GitHub) CI actions `yaml` file, and installs browsers to test with (chromium, firefox, webkit). Once it's done, it recommends running `pnpm exec playwright test` to set up some starter tests, and then `pnpm exec playwright show-report` to start a local webserver showing the results of the test.

[The Playwright site has suggestions on setup for GitLab CI](https://playwright.dev/docs/ci#gitlab-ci), namely to use their `mcr.microsoft.com/playwright:v1.45.1-jammy` Docker image:

```yml
tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.45.1-jammy
  script:
      # ...
```

I [added that to my existing `gitlab-ci.yml` file](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/c42658d22d0cf642eae148712005f7899955c1c4/.gitlab-ci.yml) and the default example tests are passing on GitLab CI! (Note that I used the `stages` section to specify that the `test` stage runs first, and if it succeeds then the `deploy` stage runs. I'll work on a `build` stage after I write some tests...)

To start testing my app, I've gotta tell Playwright what URL to visit to find the app. In [Playwright >=1.13.x](https://stackoverflow.com/a/68212980/303896), the `playwright.config.ts` file has a `use` section wherein we can specify the `baseURL` to use what `npm run dev` defaults to:

```javascript
export default defineConfig({
  // ...
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
  },
  // ...
})
```

To get this working on GitLab, traditionally I'd look for a way to override the `baseURL` in the CI environment... However the bottom of `playwright.config.ts` has a `webServer` section which lets us specify a command for starting the server plus the URL to look for it — and we can use the `$CI` environment variable to modify this behavior for running on CI vs local/dev:

```javascript
export default defineConfig({
  // ...
  webServer: {
    command: process.env.CI
      ? 'npm run build && npm run preview -- --port 5173 --strictPort'
      : 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  // ...
})
```

...and with that, on GitLab it will `build` and then `preview` the built files, wait for the `url` to be responsive, but on local/dev it will hit the `url` and only run the `command` if there is not something running there!



## Svelte gotchas

Once I got more of my site built, I found that linking from a `+page.svelte` template with slug A to the same template with slug B would result in the URL being changed, but some of the content on the page is not changing... I initially assumed this was due to me breaking Svelte's reactivity in some way, but it turns out to be a common SvelteKit footgun:

* [bug #1075: Navigating between same slug does not change page content](https://github.com/sveltejs/kit/issues/1075)
* [bug #1497: Component variables aren't re-initiated when navigating to a different slug](https://github.com/sveltejs/kit/issues/1497)
* [discussion: Resetting components on navigation](https://github.com/sveltejs/kit/discussions/5007)

...so it's _both_ "a feature not a bug" and _also_ due to me not declaring the template's input as "this needs to be reactive". Great.

The Svelte 4 solution might be something like this:

```typescript
  export let data: PageLoad
  $: showData = data.showData
  $: guestsData = data.guestsData
  $: tracksData = data.tracksData
  $: priorShowData = data.priorShowData
  $: nextShowData = data.nextShowData
```

..._except_ if one of those is an array, the reactive system won't notice if its contents are swapped out. Uh oh.

But I'm using Svelte 5 anyway, which means figuring out how to use `$state()` and `$derived()`.


## Debugging a deploy...

At one point I was happily hacking away and running the site locally with `npm run dev`, but when I pushed up to GitLab the Pipeline failed with this:

```text
$ npm ci
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm error Exit handler never called!
npm error This is an error with npm itself. Please report this error at:
npm error   <https://github.com/npm/cli/issues>
npm error A complete log of this run can be found in: /root/.npm/_logs/2024-07-18T22_10_54_897Z-debug-0.log
$ npm run build
> almost-dead-dot-net@0.0.1 build
> vite build
sh: 1: vite: not found
```

Ruh roh. First I [enabled debug logging with the `CI_DEBUG_TRACE` variable](https://docs.gitlab.com/ee/ci/variables/#enable-debug-logging), but that seems to be like the shell `setopt -o VERBOSE` and was not helpful with the actual error...

Instead, change up [the CI script](https://gitlab.com/alxndr/almost-dead-dot-net/-/commit/177565417a893d86f47158adb0051a8c3a774e0a#587d266bb27a4dc3022bbed44dfa19849df3044c) to `npm install --cache=.npm` so that error logs will be saved in the current working directory, and then have GitLab capture them as artifacts:

```yml
pages:
  stage: deploy
  script:
    - npm install --cache=.npm && npm run build
  artifacts:
    paths:
    - public
    - .npm/_logs/*
    when: always
  publish: public
  only:
  - main
```

Then even if the job fails, any `npm` logs will be made available as artifacts and can be downloaded and inspected.

In my case, there was no new info about _why_ the Exit handler is never called...

Noticing that I specified the `node:latest` image to build, I tried setting it to use the version of Node I'm using locally: `node:20.9.0`. This changed the error message shown in the Pipeline, giving me a proper stack trace! 🎉

```text
npm ERR! code 1
npm ERR! path /builds/alxndr/almost-dead-dot-net/node_modules/@sveltejs/kit
npm ERR! command failed
npm ERR! command sh -c node postinstall.js
npm ERR! Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```

Dutifully I locally removed the `package-lock.json` and `node_modules/` and reinstalled and committed, and happily GitLab CI was able to build the app!


## Acknowledgements

[`npm init vite`](https://github.com/vitejs/vite/tree/main/packages/create-vite) does a lot of the backend-for-frontend setup, without which I'd be totally unable to do any of this. Chapeau, [Vite](https://vitejs.dev)!

[The SvelteKit docs](https://kit.svelte.dev/docs/load) are quite nice, helpful for a brand-new-beginner like me. Thanks Svelters!

[Kisaragi Hiu's blog](https://kisaragi-hiu.com/kemdict-sveltekit-sqlite) shepherded me gently through all of the SQLite stuff! Thank you!

https://www.okupter.com/blog/e2e-testing-with-sveltekit-and-playwright


-------

[Playwright]: https://playwright.dev
[Svelte]: https://svelte.dev
[SvelteKit]: https://kit.svelte.dev
[TypeScript]: https://www.typescriptlang.org
