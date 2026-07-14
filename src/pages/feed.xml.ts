import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { isVisible, sortableDate } from '../utils/postVisibility.js';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('posts');
  const publishedPosts = allPosts
    .filter(isVisible)
    .filter(p => p.data.publishDate !== undefined)
    .sort((a, b) => sortableDate(b).getTime() - sortableDate(a).getTime());

  return rss({
    title: "Alexander's blog",
    description: 'mostly notes to myself',
    site: context.site!,
    items: publishedPosts.map(post => ({
      title: post.data.title,
      pubDate: sortableDate(post),
      link: `/${post.data.slug}/`,
      ...(post.data.description ? { description: post.data.description } : {}),
    })),
    customData: `<language>en-us</language>`,
  });
}
