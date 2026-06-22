# 001 — blog content organizational framework and public site hosting

**Date:** 2026-05-30

**Status:** Implemented


## Context

This Blog contains thoughts to myself, silly language ideas/projects, and other content I'd like to make public.

Important features:

* Static-site-generator pattern so that the site can be hosted for free via GitHub Pages and served using my custom domain name `alxndr.blog`
* Chronologically-ordered content (traditional blog)
* Undated content (one-off pages)
* Content written in Markdown
* Client-side interactivity
* Tags
* RSS feed (with an identifier that is consistent across updating content or even retitling)
  * ...are the "one-off pages" part of the RSS feed?
* Easy to read on mobile as well as Huge screens

Nice-to-have features:

* Client-side search
* Client-side interactivity using TypeScript
* "Updated" timestamp
* Tag hierarchy? Tag cloud?

Unimportant features:

* Commenting


### Decision

**Use [Astro](https://astro.build) as the framework for turning content into static files.** This doesn't dictate the client-side framework, so I can use [Svelte](https://svelte.dev) or whatever else if it feels right for a particular idea/tool/toy.

**Use GitHub Actions to build and publish the content.** This is a low-cost ($0!) way to host content which doesn't need a server-side database, and allows me to edit content using GitHub's web UX and then publish it without running the build on my device, so I can e.g. fix a typo on my phone when I'm not near a laptop.
