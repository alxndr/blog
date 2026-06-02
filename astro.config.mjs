import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'
import { readdirSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// For every published post, redirect /slug.html → /slug/ so that
// old links with .html suffixes (e.g. from feed readers or old bookmarks)
// continue to work. Specific redirects defined later override these.
function buildBlogPostHtmlRedirects() {
  const postsDir = join(__dirname, 'src/data/blog-posts')
  const redirects = {}
  for (const file of readdirSync(postsDir)) {
    if (!/\.(md|mdx)$/.test(file)) continue
    const content = readFileSync(join(postsDir, file), 'utf-8')
    if (/^draft:\s*true/m.test(content)) continue
    const slugMatch = content.match(/^slug:\s+(.+)$/m)
    if (!slugMatch) continue
    const slug = slugMatch[1].trim()
    redirects[`/${slug}.html`] = `/${slug}/`
  }
  return redirects
}

const lipuNasinPonaNewBase = 'https://alxndr.github.io/lipu-nasin-pona'
const lipuNasinPonaRedirects = Object.fromEntries([
  ['/lipu-nasin-pona/', `${lipuNasinPonaNewBase}/`],
  ...Array.from({length: 81}, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return [`/lipu-nasin-pona/${n}/`, `${lipuNasinPonaNewBase}/${n}/`]
  }),
])

// https://astro.build/config
export default defineConfig({
  devToolbar: {enabled: false},
  site: 'https://alxndr.blog',
  integrations: [mdx(), svelte(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
  redirects: {
    ...buildBlogPostHtmlRedirects(),
    ...lipuNasinPonaRedirects,
    '/toki-pona/': '/tags/toki-pona/',
    '/2015/04/15/watch-some-files-and-run-something-whenever-they-change.html': '/2026/05/28/entr-watch-files-and-trigger-commands/',
    '/2023/03/30/hot-wings-challenge-standup.html': '/2023/03/30/hot-ones-standup/',
    '/2023/04/24/toki-pona-li-pona-a.html': '/2023/04/24/mi-kama-sona-toki-e-toki-pona/',
    '/2023/05/23/nasin-ku.html': '/2023/05/23/nasin-pi-lipu-nimi/',
  },
})
