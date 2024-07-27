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


## Svelte gotchas

Once I got more of my site built, I found that linking from a `+page.svelte` template with slug A to the same template with slug B would result in the URL being changed, but the content on the page not changing... I initially assumed this was due to me breaking Svelte's reactivity in some way, but it turns out to be a common SvelteKit footgun:

* [bug #1075: Navigating between same slug does not change page content](https://github.com/sveltejs/kit/issues/1075)
* [bug #1497: Component variables aren't re-initiated when navigating to a different slug](https://github.com/sveltejs/kit/issues/1497)
* [discussion: Resetting components on navigation](https://github.com/sveltejs/kit/discussions/5007)

...so it's both "a feature not a bug" and also due to me not declaring things as "this needs to be reactive"; this is how I modified my `+page.svelte`'s `<script>` tag to specify the parts of the incoming `data` which needs to be reactive when the URL/slug changes:

```typescript
  export let data: PageLoad
  $: showData = data.showData
  $: guestsData = data.guestsData
  $: tracksData = data.tracksData
  $: priorShowData = data.priorShowData
  $: nextShowData = data.nextShowData
```


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
