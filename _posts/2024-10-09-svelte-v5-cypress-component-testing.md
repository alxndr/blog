---
title: Cypress component testing with Svelte v5 (and SvelteKit)
tags: [howto, javascript, code, testing, cypress, svelte]
date: 2024-10-09
---

Version 5 of [Svelte] makes some dramatic changes in its API.
[Cypress] component testing [already doesn't play nicely with SvelteKit](https://github.com/cypress-io/cypress/issues/23618), and Svelte v5 doesn't make things better.

```
We detected that you have versions of dependencies that are not officially supported:

 - `svelte`. Expected ^3.0.0 || ^4.0.0, found 5.0.0-next.262.

If you're experiencing problems, downgrade dependencies and restart Cypress.
```

**To set the stage, here's the problem I saw:** a headless run would throw an error and hang (first it would show some `<svelte:component>` deprecation warnings and then spit out `SvelteKitError: Not found: /__cypress/src/index.html`), and a headed run would show "Your tests are loading..." and then nothing else would happen.

First, [as recommended by GitHub user @lmiller1990](https://github.com/cypress-io/cypress/issues/26064#issuecomment-1475437226), I added this `viteConfig` function to my `cypress.config.ts`'s `component.devServer` so that Cypress's Vite server will know that we're bootstrapping a Svelte project:

```javascript
import {svelte} from '@sveltejs/vite-plugin-svelte'
export default defineConfig({
    component: {
        // ...
        devServer: {
            // ...
            viteConfig: () => {
                return {
                    plugins: [svelte()]
                }
            },
        },
    },
})
```

With this change, a headless run (`npx cypress run --component`) starts up the Cypress reporter properly!
However it throws a new error when trying to mount the component:

```
Svelte error: component_api_invalid_new
Attempted to instantiate src/components/TopNav.svelte with `new TopNav`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working. See https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes for more information
```

As the message notes, Svelte 5 has changed how components are mounted, so we'll need to convince Cypress to mount them the new way.

Looking in the `cypress/support/component.ts` file, I notice that the `mount` command comes from the 'cypress/svelte' dependency:

```javascript
import {mount} from 'cypress/svelte'
```

...then I poked around [the Cypress repo on GitHub](https://github.com/cypress-io/cypress) until I found [the `svelte` package](https://github.com/cypress-io/cypress/tree/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte), and within its `mount.ts` file I see where [it instantiates the component-under-test using `new`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L74).

So let's try to change what it does!

First I opened up the `cypress/support/component.ts` file and removed the `import {mount}` that was there. Then I copied over the `function mount` implementation from [Cypress's `mount.ts`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L60-L93), renamed it to `mountV5`, and used it as the implementation function where `Cypress.Command.add` is called with `'mount'`. Then I also brought over the functions and values that it depends on: [`componentInstance`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L25), [`cleanup`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L27-L29), [`getComponentDisplayName`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L32-L40) (which needs [`DEFAULT_COMP_NAME`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/svelte/src/mount.ts#L8)), and finally [`checkForRemovedStyleOptions`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/mount-utils/src/index.ts#L18-L24), [`getContainerEl`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/mount-utils/src/index.ts#L8-L16), and [`ROOT_SELECTOR`](https://github.com/cypress-io/cypress/blob/8a8015b774dc9ce54b30bce82b6a85172d71a895/npm/mount-utils/src/index.ts#L1) from the `mount-utils` package. (I also removed all the types, just to have fewer in-editor errors to wade through right now.)

Oh but it turns out that Svelte v4 swapped out `.$destroy()` for calling `unmount`, so let's change the import to also pull in `unmount` and use that in the `cleanup` function.

Finally I modified the `function mount` from Cypress's `mount.ts` so that instead of constructing a `new ComponentConstructor({target, ...options})`, it calls `mount(Component, {target, ...options})` as [the Breaking Changes doc](https://svelte-5-preview.vercel.app/docs/breaking-changes#components-are-no-longer-classes) suggests — including bringing over the `mount` function from the `svelte` package, with `import { mount } from 'svelte'`.

Here's the juicy bit of my `component.ts` now:

```typescript
import {mount, unmount} from 'svelte'

function checkForRemovedStyleOptions(mountingOptions) {
  for (const key of ['cssFile', 'cssFiles', 'style', 'styles', 'stylesheet', 'stylesheets']) {
    if (mountingOptions[key]) {
      Cypress.utils.throwErrByPath('mount.removed_style_mounting_options', key)
    }
  }
}
const ROOT_SELECTOR = '[data-cy-root]'
const getContainerEl = () => {
  const el = document.querySelector(ROOT_SELECTOR)
  if (el) {
    return el
  }
  throw Error(`No element found that matches selector ${ROOT_SELECTOR}. Please add a root element with data-cy-root attribute to your "component-index.html" file so that Cypress can attach your component to the DOM.`)
}
let componentInstance
const cleanup = () => {
  if (componentInstance)
    unmount(componentInstance)
}
const DEFAULT_COMP_NAME = 'unknown'
const getComponentDisplayName = (Component) => {
  if (Component.name) {
    const [, match] = /Proxy\<(\w+)\>/.exec(Component.name) || []
    return match || Component.name
  }
  return DEFAULT_COMP_NAME
}
function mountV5(Component, options={}) {
  checkForRemovedStyleOptions(options)
  return cy.then(() => {
    // Remove last mounted component if cy.mount is called more than once in a test
    cleanup()
    const target = getContainerEl()
    const ComponentConstructor = (Component.default || Component)
    componentInstance = mount(ComponentConstructor, {
      target,
      ...options,
    })
    // by waiting, we are delaying test execution for the next tick of event loop
    // and letting hooks and component lifecycle methods to execute mount
    return cy.wait(0, {log: false}).then(() => {
      if (options.log !== false) {
        const mountMessage = `<${getComponentDisplayName(Component)} ... />`
        Cypress.log({
          name: 'mount',
          message: [mountMessage],
        })
      }
    })
    .wrap({component: componentInstance}, {log: false})
  })
}

// Augment the Cypress namespace to include type definitions for your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mountV5
    }
  }
}

Cypress.Commands.add('mount', mountV5)
```

And with that, my Cypress component test is passing! 🙌

Here's [a link to my full `cypress/support/component.ts` file](https://gitlab.com/alxndr/almost-dead-dot-net/-/blob/d1af2a3d567e68a3a93289b3848ad5023a4a48d7/cypress/support/component.ts), and here's [the first commit with the other changes to get a bare-bones component test working](https://gitlab.com/alxndr/almost-dead-dot-net/-/commit/f91dada0c82d04c3e73b6620cd0fd0931c297f56).


[Cypress]: https://cypress.io
[Svelte]: https://svelte.dev


