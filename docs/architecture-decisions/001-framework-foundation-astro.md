# 001 — blog content organizational framework and public site hosting

**Date:** 2026-05-30

**Status:** Implemented


## Context

This Blog contains thoughts to myself, silly language ideas/projects, and other content I'd like to make public.

Important features:

* RSS support
* Storage in Markdown
* Support for client-side interactivity
* Tags
* Chronologically-ordered content (traditional blog)
* Undated content (one-off pages)
* Static-site-generator pattern so that the site can be hosted for free via GitHub Pages and served using my custom domain name `alxndr.blog`

Nice-to-have features:

* Client-side search
* Client-side interactivity using TypeScript
* Tag hierarchy?

Unimportant features:

* Commenting


### Decision

Use [Astro](https://astro.build/) to build the static files.
