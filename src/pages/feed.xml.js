import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allPosts = await getCollection('posts');
  const publishedPosts = allPosts
    .filter(p => !p.data.draft)
    .sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));

  return rss({
    title: "Alexander's blog",
    description: 'mostly notes to myself',
    site: context.site,
    items: publishedPosts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      link: `/${post.data.slug}/`,
      ...(post.data.description ? { description: post.data.description } : {}),
    })),
    customData: `<language>en-us</language>`,
  });
}
