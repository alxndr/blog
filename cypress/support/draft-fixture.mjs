// Shared definition of the draft post that the draft-visibility specs assert against.
//
// This is deliberately plain data with no Node imports: it is read both by the
// Cypress spec (bundled for the browser) and by scripts/with-draft-fixture.mjs
// (plain Node). Keep it that way so the spec can import it.
//
// The post is written to disk only for the duration of a test run, so the specs
// never depend on a draft being permanently committed to the repo. See
// scripts/with-draft-fixture.mjs.

export const DRAFT_FIXTURE = {
  // Distinctive so it can never collide with a real post's slug.
  slug: 'drafts/cypress-draft-fixture',
  title: 'cypress draft fixture',
  filename: 'cypress-draft-fixture.md',
}

export const DRAFT_FIXTURE_PATH = `src/data/blog-posts/${DRAFT_FIXTURE.filename}`

// `draft: true` with no `publishDate` is a valid combination: the content schema
// only requires publishDate for non-drafts, and the undated post sorts last
// (epoch fallback), so it cannot perturb the "newest post" specs.
export const DRAFT_FIXTURE_CONTENT = `---
title: ${DRAFT_FIXTURE.title}
slug: ${DRAFT_FIXTURE.slug}
draft: true
---

This post is generated at test time to verify draft visibility. It should not
be committed to the repository.
`
