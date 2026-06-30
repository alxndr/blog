# 002 — draft posts are visible in dev, hidden in production

**Date:** 2026-06-30

**Status:** Proposed


### Context

Blog posts are sometimes work-in-progress — started but not ready for public consumption. The repo already has a `draft: boolean` field in the content schema and two existing posts use `draft: true`, but the current implementation filters drafts uniformly in both the dev server and the production build.

Being able to view a draft post in the local dev server is important for the authoring workflow: see the rendered output while writing, check formatting, preview how it sits alongside navigation, etc.


### Decision

Use Astro/Vite's built-in `import.meta.env.DEV` boolean to gate draft visibility:

- **`astro dev`** — `import.meta.env.DEV` is `true` → draft posts appear in all listings and their URLs resolve normally
- **`astro build`** — `import.meta.env.DEV` is `false` → draft posts are excluded from all listings and their URLs return 404

Rather than updating all 8 call sites individually, a helper function `isVisible(post)` in `src/utils/postVisibility.ts` encapsulates the logic. Call sites become `.filter(isVisible)`, and the `import.meta.env.DEV` condition lives in exactly one place.

This requires no CLI flags, no environment variables, and no extra configuration — the behavior follows automatically from which Astro command is run.

A companion `@requires-dev` Cypress tag marks tests that assert the dev-only visibility behavior, mirroring the existing `@requires-build` pattern. The `cy:run` and `cy:open` scripts (which run against the production preview) exclude `@requires-dev` tests; the `cy:run:dev` and `cy:open:dev` scripts (which run against the dev server) include them.
