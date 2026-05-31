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
- [x] Create new GitHub repo (`alxndr/lipu-nasin-pona`) — repo exists at `../lipu-nasin-pona`
- [ ] Push extracted history to GitHub remote:
  ```sh
  cd /Users/alxndr/workspace/lipu-nasin-pona
  git remote add origin git@github.com:alxndr/lipu-nasin-pona.git
  git push -u origin main
  ```
- [x] Remove `lipu-nasin-pona/` and Jekyll-only files from the blog repo:
  - Deleted `lipu-nasin-pona/` (81 chapters + index)
  - Deleted `_layouts/lipu-nasin-pona.html`
  - Deleted `_includes/kasi-nav.html`, `sitelen-sitelen-renderer.html`, `sitelen-sitelen.js`
  - Deleted `_includes/dough-ratio-calculator.js`, `analytics.html`, `footer/custom.html`
  - Kept `assets/sitelen-sitelen-renderer.min.js` — still needed by `ante-kulupu-so.md`
  - Committed as b62b801
- Note: copied layout, includes, renderer JS, and extracted font CSS to
  `/Users/alxndr/workspace/lipu-nasin-pona/assets/` for future site generator use

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

- [x] Scaffold from the Charca template:
  ```sh
  npm create astro@latest -- --template Charca/astro-blog-template
  ```
- [x] Commit the baseline scaffold before any customization
- [x] **Routing change**: delete `src/pages/blog/[slug].astro`, create
  `src/pages/[...slug].astro` at the repo root level (see Phase 3 for why)
- [x] **No `/blog/` index page** — the site's TLD is `.blog`, making `/blog/` redundant.
  Post listing will live at `/` (the homepage).
- [x] Extend `astro.config.mjs`:
  - `site`: `https://alxndr.blog`
  - Add integrations: `@astrojs/rss`, `@astrojs/sitemap`
  - Add `redirects` map (see Phase 3)
- [x] Extend content collection schema in `src/content.config.js`:
  - Keep: `title`, `slug`, `publishDate`
  - Make `description` optional (Jekyll posts don't have it)
  - Add: `tags` (optional `z.array(z.string())`), `draft` (optional boolean)
- [x] Update site metadata throughout components:
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
- `ante-kulupu-so.md` ⚠️ **deferred** — uses Kramdown IAL (Inline Attribute Lists) syntax
  70 times (`_name_{:attr-ref}`), which Astro's remark pipeline does not support.
  Options: install a remark-attributes plugin, or run a script to rewrite the 70
  occurrences as inline HTML. The page is still served from the Jekyll source for now.
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

## Phase 3.5 — Tags

Tags are stored in post frontmatter and validated by the content collection schema, but
there is no browsing UI yet.

- [x] **Per-tag listing page** — `src/pages/tags/[tag].astro`:
  - `getStaticPaths()` collects all unique tags across published posts
  - Each tag page lists posts with that tag, sorted by date (newest first)
  - URL scheme: `/tags/toki-pona/`, `/tags/git/`, etc. (slugify the tag)
- [x] **Tag display on individual posts** — update `src/pages/[...slug].astro`:
  - Show the post's tags below the title/date line
  - Each tag links to its `/tags/[tag]/` listing page
- [x] **Tag index** — `src/pages/tags/index.astro` (optional, evaluate after above):
  - Lists all tags with post counts; the old `tags.md` is superseded by this

---

## Phase 4 — RSS, sitemap, analytics

The Charca template does **not** include RSS or sitemap support despite what the README
implies — these need to be added manually.

- [x] Add `@astrojs/rss` — create `src/pages/feed.xml.js` endpoint.
  Feed lives at `/feed.xml`, matching Jekyll's default. 53 posts, sorted newest first.
- [x] Add `@astrojs/sitemap` integration to `astro.config.mjs` — generates `sitemap-index.xml`
  automatically at build time. (Done in Phase 1.)
- [x] Add Google Analytics (`G-RS6J6JRB3C`) in `src/components/BaseHead.astro`. (Done in Phase 1.)

---

## Phase 4.5 — Homepage, About page, and template cleanup

### Homepage (`src/pages/index.astro`)

Currently: Charca placeholder ("Welcome to your new Astro Blog") with stock illustrations.

Replace with a real post listing — the PLAN has always said `/` is where posts live (no `/blog/`
prefix, since the domain ends in `.blog`). Rough shape:

- [ ] Show all published posts, newest first (title + date + tags, no excerpts unless added later)
- [ ] Optional "pinned" / evergreen section at top (hand-curated list of slugs in the page itself)
- [ ] Link to `/tags/` index and standalone pages (`/colophon`, `/tapes`, `/toki-pona`)
- [ ] Remove template hero illustration and placeholder copy

### About page (`src/pages/about.astro`)

Currently: Lorem Ipsum placeholder text + stock notebook illustration.

- [ ] Replace with real bio content (Alexander to supply)
- [ ] Remove `about-illustration.webp` once replaced

### Boilerplate / template content cleanup

These Charca template artifacts should be removed:

- [ ] Delete `src/data/blog-posts/hello-world.md` and `markdown-test.md` (sample posts)
- [ ] Delete unused template images from `public/assets/`:
  - `logo.webp` (replaced by text in Logo.astro)
  - `profile-pic.webp` (replaced by `alexander-120x120.png` in Bio.astro)
  - `social.png` (replaced by `alexander-120x120.png` in BaseHead.astro)
  - `home-illustration.webp` and `home-illustration-small.webp` (removed with homepage redo)
  - `about-illustration.webp` (removed with About redo)
  - `blog/casual-life-3d-*.webp` (only referenced in the sample posts being deleted)

### Full content audit

- [ ] Crawl all on-disk files for leftover default values and placeholder content from either
  the Charca `astro-blog-template` or the Astro starter scaffolding. Things to grep for:
  - Package name: `zapping-zero` (the auto-generated project name from `npm create astro`)
  - Template author references: `Maxi`, `Charca`, `Maxi Ferreira`, `maxiferreira.com`
  - Placeholder URLs: `astro-blog-template.netlify.app`, `netlify.app`
  - Placeholder copy: `Your Blog`, `perfect blog`, `perfect starter`, `Jeffsum`
  - Icons8 illustration credits (appear in `about.astro` and `index.astro`)
  - Any `TODO` comments inherited from the template (distinct from our own TODOs)
  - `sandbox.config.json` if still present (CodeSandbox config, not needed)
  - `screenshot.png` if still present (template repo screenshot)

---

## Phase 5 — Deployment

- [ ] Add GitHub Actions workflow for Astro build + GitHub Pages deploy.
  Astro provides a standard workflow using `withastro/action` — see
  https://docs.astro.build/en/guides/deploy/github/
- [ ] Ensure `public/CNAME` contains `alxndr.blog` so GitHub Pages preserves the custom domain
- [ ] Test locally: `npm run dev` then `npm run build && npm run preview`
- [ ] Smoke-test a sample of old post URLs to confirm they resolve correctly
- [ ] Open PR: `spike/rebuild-quartz` → `main`
