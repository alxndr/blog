// `import.meta.env.DEV` is true during `astro dev` and false during `astro build`,
// so draft posts are visible locally but excluded from the production site.
export function isVisible(post: { data: { draft?: boolean } }): boolean {
  return import.meta.env.DEV || !post.data.draft
}
