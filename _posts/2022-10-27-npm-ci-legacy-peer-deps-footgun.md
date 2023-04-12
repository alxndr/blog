---
title: npm ci with legacy-peer-deps is a thing
tags: [javascript, npm, dependencies, continuous integration, lockfile, mystery]
---

So you've got a JavaScript project in the wild, and real life happens so you've been `npm install`ing with the `--legacy-peer-deps` for a little while now. No judgement, we've all been there.

Then you upgrade something, and all your tests run fine locally, but in the CI environment the entire test suite is faceplanting immediately... What gives??

Turns out that the `npm ci` command (which iirc exists in order to use the exact versions laid out in the `package-lock.json` file 😒 ) will also need to be passed the `--legacy-peer-deps` flag if you've used that flag to create the lockfile.

This is written down (if not explained) in the docs for the `ci` command: [source](https://docs.npmjs.com/cli/v8/commands/npm-ci), emphasis in the original...

> NOTE: If you create your `package-lock.json` file by running `npm install` with flags that can affect the shape of your dependency tree, such as `--legacy-peer-deps` or `--install-links`, you _must_ provide the same flags to `npm ci` or you are likely to encounter errors.

This appears to have been introduced in NPM v8.6 according to [this bug report](https://github.com/npm/cli/issues/4998).
