import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'

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
    ...lipuNasinPonaRedirects,
    '/toki-pona/': '/tags/toki-pona/',
    '/2015/04/15/watch-some-files-and-run-something-whenever-they-change.html': '/2026/05/28/entr-watch-files-and-trigger-commands/',
    '/2023/03/30/hot-wings-challenge-standup.html': '/2023/03/30/hot-ones-standup/',
    '/2023/04/24/toki-pona-li-pona-a.html': '/2023/04/24/mi-kama-sona-toki-e-toki-pona/',
    '/2023/05/23/nasin-ku.html': '/2023/05/23/nasin-pi-lipu-nimi/',
  },
})
