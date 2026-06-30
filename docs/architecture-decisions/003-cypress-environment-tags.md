# 003 — cypress test tags for environment-specific behavior

**Date:** 2026-06-30

**Status:** Implemented


### Context

Some features behave differently depending on whether the site is running via `astro dev` or built with `astro build`. Two concrete examples:

- **Search** — Pagefind's index is only generated during `astro build`, so search tests always fail against the dev server regardless of feature correctness.
- **Draft posts** — draft posts are intentionally visible in dev and hidden in production (see [ADR-002](./002-draft-posts-dev-only.md)).

Tests for these features need to run against the right environment to produce meaningful signal. Running them in the wrong environment produces false failures, which erodes trust in the test suite.

The alternative approaches considered were:

- **File-based separation** (`cypress/e2e/build/` and `cypress/e2e/dev/` directories, `--spec` in npm scripts) — makes the split visible from structure, but puts related tests in different files and directories.
- **No dev-server test run at all** — always build before testing; drop `cy:run:dev`. Simpler, but slower feedback during development.
- **Skip tagging `@requires-dev` entirely** — leave dev-only behavior without Cypress coverage and rely on manual verification.


### Decision

Use `@cypress/grep` tags on `describe` blocks to declare which environment a test suite requires:

| tag | `cy:run` (prod preview) | `cy:run:dev` (dev server) |
|---|---|---|
| none | ✓ | ✓ |
| `@requires-build` | ✓ | ✗ |
| `@requires-dev` | ✗ | ✓ |

Untagged tests run in both environments and should be written to pass in both. Tests that can only be meaningful in one environment carry the appropriate tag.

This keeps all tests for a feature in a single file while still producing a clean run in each environment. The tradeoff is that the filtering is invisible at the call site — a test written without a tag will silently run in both environments. This convention therefore needs to be documented (here) and understood by anyone adding tests.

The `@requires-dev` tag is expected to stay narrow: draft post visibility is the only known case where behavior is intentionally different in dev. Most future features will be visible in both environments and need no tag.
