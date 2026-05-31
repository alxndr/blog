# Blog Migration Plan: Jekyll → Astro

## Context

- Current site: Jekyll with `mmistakes/minimal-mistakes` theme, deployed to `alxndr.blog`
- Target: [Astro](https://astro.build) using [astro-blog-template](https://github.com/Charca/astro-blog-template) as a starting point (Astro 5.5.2, MDX + Svelte integrations, dark mode)
- Same repo (`alxndr/blog`), same URL (`alxndr.blog`), same hosting (GitHub Actions → GitHub Pages)
- Work branch: `spike/rebuild-quartz` → eventually PR to `main`
- 53 posts, 18 drafts, several standalone pages

---

## Phase 0 — Extract `lipu-nasin-pona/` to its own repo

The `lipu-nasin-pona/` directory (81 chapters + index, 17 commits of history) becomes a
separate repo. For now just the markdown files; generator/site is TBD.

**Tool:** `git filter-repo` (modern replacement for `git filter-branch`)

- [x] Install: `brew install git-filter-repo`
- [x] Clone blog repo fresh — filter-repo rewrites in-place, never run on a working copy:
  ```sh
  git clone --no-local /path/to/blog /tmp/lipu-nasin-pona-extract
  ```
- [x] Rewrite history to only include commits touching `lipu-nasin-pona/`, with paths
  rewritten as if that directory were always the repo root:
  ```sh
  cd /tmp/lipu-nasin-pona-extract
  git filter-repo --subdirectory-filter lipu-nasin-pona
  ```
  Result: 82 files (01.md–81.md + index.md) at repo root, 17 commits preserved.
  Extracted clone is at `/tmp/lipu-nasin-pona-extract` and ready to push.
- [ ] Create new GitHub repo (e.g. `alxndr/lipu-nasin-pona`)
- [ ] Point remote and push:
  ```sh
  cd /tmp/lipu-nasin-pona-extract
  git remote add origin git@github.com:alxndr/lipu-nasin-pona.git
  git push -u origin main
  ```
- [ ] Remove `lipu-nasin-pona/` from the blog repo (on `spike/rebuild-quartz` branch):
  - Delete the `lipu-nasin-pona/` directory
  - Remove `_layouts/lipu-nasin-pona.html`
  - Remove lipu-nasin-pona-related files from `_includes/`:
    `lipu-nasin-pona.html`, `kasi-nav.html`, `sitelen-sitelen-renderer.html`, `sitelen-sitelen.js`
  - Commit

---

## Phase 1 — Astro initialization (in this repo, on `spike/rebuild-quartz`)

### Charca template notes (researched 2026-05-30)

The template is a lean starting point, not batteries-included. What it ships:
- MDX + Svelte integrations
- Dark mode toggle (Svelte component)
- `remarkGfm`, `remarkSmartypants`, `rehypeExternalLinks`
- Posts at `src/data/blog-posts/*.md`
- Individual post route: `src/pages/blog/[slug].astro`
- Blog listing route: `src/pages/blog/index.astro`
- Content collection config: `src/content.config.js`

What it does **not** ship: RSS, sitemap, tags, draft support.

Template frontmatter schema (all required by default):
```
title        string
description  string
slug         string
publishDate  string | date
```

### Setup steps

- [ ] Scaffold from the Charca template:
  ```sh
  npm create astro@latest -- --template Charca/astro-blog-template
  ```
- [ ] Commit the baseline scaffold before any customization
- [ ] **Routing change**: delete `src/pages/blog/[slug].astro`, create
  `src/pages/[...slug].astro` at the repo root level (see Phase 3 for why)
- [ ] **No `/blog/` index page** — the site's TLD is `.blog`, making `/blog/` redundant.
  Post listing will live at `/` (the homepage).
- [ ] Extend `astro.config.mjs`:
  - `site`: `https://alxndr.blog`
  - Add integrations: `@astrojs/rss`, `@astrojs/sitemap`
  - Add `redirects` map (see Phase 3)
- [ ] Extend content collection schema in `src/content.config.js`:
  - Keep: `title`, `slug`, `publishDate`
  - Make `description` optional (Jekyll posts don't have it)
  - Add: `tags` (optional `z.array(z.string())`), `draft` (optional boolean)
- [ ] Update site metadata throughout components:
  - Title: `Alexander's blog`
  - Masthead: `://alxndr.blog — Alexander's blog`
  - Description: `mostly notes to myself`
  - Author bio: `` a.k.a. `@alxndr` / a.k.a. `@drwxrxrx` ``
  - Logo/OG image: `assets/images/alexander-120x120.png`
  - Analytics: Google tag `G-RS6J6JRB3C`
  - Footer links: resume, GitHub, GitLab, Instagram/photos

---

## Phase 2 — Content migration

### Posts (`_posts/` → `src/data/blog-posts/`)

Jekyll filenames encode the date: `YYYY-MM-DD-slug.md`.
A migration script should process each post:

- Extract date from filename → add `publishDate: YYYY-MM-DD` to frontmatter
- Derive `slug: YYYY/MM/DD/original-title` from filename (see Phase 3)
- Remove Jekyll-specific frontmatter keys: `layout`, `author_profile`, `show_date`
- Drop `pin: true` (no equivalent planned)
- Keep: `title`, `tags`
- Leave `description` absent (schema will be made optional)
- Strip `redirect_from` frontmatter (those go in `astro.config.mjs` — see Phase 3)

### Drafts (`_drafts/` → `src/data/blog-posts/` with `draft: true`)

Add `draft: true` to frontmatter of each draft file. Astro excludes `draft: true` entries
from production builds when the content collection schema defines the field.

### Standalone pages

Move to `src/pages/` as `.astro` or `.md` files. The Charca template has an `about.astro`
as an example of a non-post page:
- `colophon.md`
- `tapes.md`
- `toki-pona.md`
- `ante-kulupu-so.md`
- `tags.md` — evaluate once tags are wired up; may be superseded by a generated listing

### Assets

Move `assets/` into `public/assets/` (Astro's static asset directory, served verbatim).
The Charca template already has a `public/assets/` folder — reconcile any conflicts.

### Special case: sourdough pizza dough calculator post

`_posts/2023-07-28-sourdough-pizza-dough-ratio-calculator.md` uses a Jekyll Liquid include
(`{% include dough-ratio-calculator.js %}`) to inject a `<script type="module">` block
that mounts an interactive [ArrowJS](https://www.arrow-js.com/) widget.

This is the **only** post with Liquid template tags.

**Better approach in Astro:**
1. Install `@arrow-js/core` as a local dep instead of fetching from the `esm.sh` CDN
2. Create `src/components/DoughRatioCalculator.astro` with:
   - The `<div id="dough-ratio-calculator">` mount point
   - A `<script>` tag containing the ArrowJS reactive logic
3. Convert the post to `.mdx` (rename to `...sourdough-pizza-dough-ratio-calculator.mdx`)
4. Import and place the component in the MDX:
   ```mdx
   import DoughRatioCalculator from '../../components/DoughRatioCalculator.astro';

   <DoughRatioCalculator />
   ```

Astro handles `<script>` bundling in `.astro` components cleanly — no CDN dependency,
no raw script injection into page HTML.

---

## Phase 3 — URL preservation

### Post URLs — decided approach

Jekyll URL scheme: `/:year/:month/:day/:title/`

Example: `_posts/2017-02-01-how-to-find-the-merge-where-your-code-disappeared.md`
→ `alxndr.blog/2017/02/01/how-to-find-the-merge-where-your-code-disappeared/`

**Decision**: use a root-level `src/pages/[...slug].astro` route (Astro rest-parameter
syntax). This matches Jekyll's URL scheme exactly with no redirects needed for existing posts.

- Astro route priority means static pages (`colophon.astro`, `tapes.astro`, etc.) always
  win over the catch-all — no conflict risk.
- For a static build (GitHub Pages), `[...slug].astro` only generates pages returned by
  `getStaticPaths()` — unknown URLs 404 at the host level, same as any static site.
- The template's `src/pages/blog/[slug].astro` is deleted; `src/pages/blog/` folder
  and its index page are not needed (see Phase 1 note on TLD).

Each post gets a `slug` frontmatter field derived from its filename (scriptable):
```yaml
slug: 2017/02/01/how-to-find-the-merge-where-your-code-disappeared
```

### `redirect_from` — 4 redirects total

These go in the `redirects` object in `astro.config.mjs` (permanent 301 by default):

| Old URL | New URL |
|---------|---------|
| `/2023/04/24/toki-pona-li-pona-a.html` | `/2023/04/24/mi-kama-sona-toki-e-toki-pona/` |
| `/2023/03/30/hot-wings-challenge-standup.html` | `/2023/03/30/hot-ones-standup/` |
| `/2015/04/15/watch-some-files-and-run-something-whenever-they-change.html` | `/2026/05/28/entr-watch-files-and-trigger-commands/` |
| `/2023/05/23/nasin-ku.html` | `/2023/05/23/nasin-pi-lipu-nimi/` |

---

## Phase 4 — RSS, sitemap, analytics

The Charca template does **not** include RSS or sitemap support despite what the README
implies — these need to be added manually.

- [ ] Add `@astrojs/rss` — create `src/pages/rss.xml.js` endpoint.
  Verify the feed URL matches what Jekyll published (Jekyll feed plugin defaults to `/feed.xml`).
- [ ] Add `@astrojs/sitemap` integration to `astro.config.mjs` — generates `sitemap-index.xml`
  automatically at build time.
- [ ] Add Google Analytics (`G-RS6J6JRB3C`) in `src/components/BaseHead.astro` or equivalent
  layout component. The Charca template uses `BaseHead.astro` for `<head>` content.

---

## Phase 5 — Deployment

- [ ] Add GitHub Actions workflow for Astro build + GitHub Pages deploy.
  Astro provides a standard workflow using `withastro/action` — see
  https://docs.astro.build/en/guides/deploy/github/
- [ ] Ensure `public/CNAME` contains `alxndr.blog` so GitHub Pages preserves the custom domain
- [ ] Test locally: `npm run dev` then `npm run build && npm run preview`
- [ ] Smoke-test a sample of old post URLs to confirm they resolve correctly
- [ ] Open PR: `spike/rebuild-quartz` → `main`
