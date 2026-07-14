// `import.meta.env.DEV` is true during `astro dev` and false during `astro build`,
// so draft posts are visible locally but excluded from the production site.
export function isVisible(post: { data: { draft?: boolean } }): boolean {
  return import.meta.env.DEV || !post.data.draft
}

// Returns a sortable Date for a post. Draft posts may not have a publishDate yet;
// epoch (0) is used as a fallback so they sort consistently without crashing.
export function sortableDate(post: { data: { publishDate?: string | Date } }): Date {
  return new Date(post.data.publishDate ?? 0)
}
