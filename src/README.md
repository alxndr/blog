# Content authoring guide

## Blog posts — `src/data/blog-posts/`

Each file is a Markdown (`.md`) or MDX (`.mdx`) file. The filename is only used as a unique ID by Astro's content loader — it is **not** the URL. Convention is `YYYY-MM-DD-slug.md`.

### Frontmatter fields

None of these fields are built into Astro; they are all defined in `src/content.config.ts`.

| Field | Required? | Type | Purpose |
|---|---|---|---|
| `title` | **yes** | string | Page `<title>`, `<h1>`, and og:title |
| `publishDate` | **yes** | string (`YYYY-MM-DD`) or Date | Shown in post header; controls sort order, year/month listing pages (`/2024/`, `/2024/07/`), and the RSS feed |
| `slug` | **yes** | string | URL path, e.g. `2024/07/18/my-post` → served at `/2024/07/18/my-post/` |
| `tags` | no | string[] | Shows tag links in the post header; creates entries on `/tags/` index and `/tags/{tag}/` listing pages |
| `description` | no | string | `<meta name="description">` and og:description for SEO/social sharing; falls back to the site description if omitted |
| `draft` | no | boolean | `true` hides the post from all listings, the RSS feed, and the search index — the URL is also not generated |
| `thumbnail` | no | local image path | Processed by Astro's image pipeline and used as og:image / twitter:image; omit to fall back to the site avatar |

Minimal valid post:

```yaml
---
title: My post title
publishDate: '2024-07-18'
slug: 2024/07/18/my-post
---
```

#### Notes

- **`slug` is the URL**, not the filename. The `YYYY/MM/DD/` prefix in the slug is what makes it appear under the year and month listing pages.
- **`thumbnail`** references a local file relative to the post (Astro resolves it at build time). It is distinct from the tag-page `thumbnail`, which is a remote URL.
- An `updated` field appears in a couple of older posts but is not in the schema and is not used anywhere.

---

## Tag pages — `src/data/tag-pages/`

Tag listing pages are generated automatically for every tag that appears across posts. To add a description or custom heading to a tag's page, create a Markdown file whose name matches the tag's URL slug (e.g. `toki-pona.md` for the `toki pona` tag).

### Frontmatter fields

| Field | Required? | Type | Purpose |
|---|---|---|---|
| `title` | no | string | Custom `<h1>` and page title; defaults to `posts tagged: {tag}` |
| `thumbnail` | no | URL string | Remote image URL used as og:image / twitter:image for that tag's page |

The body of the file is rendered as Markdown above the post list on the tag page.
