import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';
import { feedContent } from '../../lib/feed';

export async function GET(context) {
	const locale = 'zh';
	const posts = (await getCollection('blog', (entry) => entry.id.startsWith(locale + '/')))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		customData: '<language>zh-cn</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			// Full text, so subscribers can read without leaving their reader.
			content: post.rendered?.html ? feedContent(post.rendered.html, context.site) : undefined,
			link: `/${locale}/blog/${post.id.replace(locale + '/', '')}/`,
		})),
	});
}
