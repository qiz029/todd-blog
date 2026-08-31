/** Parse and serialize the blog's YAML-ish frontmatter (quoted titles, tags array). */

export interface PostFields {
	title: string;
	description: string;
	pubDate: string;
	updatedDate?: string;
	heroImage?: string;
	tags: string[];
	draft: boolean;
	body: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidDate(value: string): boolean {
	if (!DATE_RE.test(value)) return false;
	const d = new Date(value + 'T00:00:00Z');
	return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function todayUTC(): string {
	return new Date().toISOString().slice(0, 10);
}

export function isValidSlug(slug: string): boolean {
	return SLUG_RE.test(slug) && slug.length <= 80;
}

export function slugify(title: string): string {
	return title
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 80);
}

export function parseMarkdown(raw: string): PostFields {
	const trimmed = raw.replace(/^\uFEFF/, '');
	if (!trimmed.startsWith('---')) {
		return {
			title: '',
			description: '',
			pubDate: '',
			tags: [],
			draft: false,
			body: trimmed,
		};
	}
	const rest = trimmed.slice(3).replace(/^\r?\n/, '');
	const end = rest.search(/\r?\n---[ \t]*\r?\n/);
	let fm = '';
	let body = '';
	if (end === -1) {
		fm = rest;
		body = '';
	} else {
		fm = rest.slice(0, end);
		body = rest.slice(end).replace(/^\r?\n---[ \t]*\r?\n/, '');
	}

	const data: Record<string, unknown> = {};
	for (const line of fm.split(/\r?\n/)) {
		if (!line.trim() || line.trimStart().startsWith('#')) continue;
		const colon = line.indexOf(':');
		if (colon <= 0) continue;
		const key = line.slice(0, colon).trim();
		const rawVal = line.slice(colon + 1).trim();
		data[key] = parseScalar(rawVal);
	}

	const tags = Array.isArray(data.tags)
		? (data.tags as unknown[]).map(String)
		: typeof data.tags === 'string' && data.tags
			? [String(data.tags)]
			: [];

	return {
		title: String(data.title ?? ''),
		description: String(data.description ?? ''),
		pubDate: String(data.pubDate ?? ''),
		updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
		heroImage: data.heroImage ? String(data.heroImage) : undefined,
		tags,
		draft: data.draft === true || data.draft === 'true',
		body: body.replace(/^\r?\n/, ''),
	};
}

function parseScalar(rawVal: string): unknown {
	if (rawVal === '') return '';
	if (rawVal === 'true') return true;
	if (rawVal === 'false') return false;
	if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
		try {
			return JSON.parse(rawVal.replace(/'/g, '"'));
		} catch {
			return rawVal;
		}
	}
	if (
		(rawVal.startsWith('"') && rawVal.endsWith('"')) ||
		(rawVal.startsWith("'") && rawVal.endsWith("'"))
	) {
		return unquote(rawVal);
	}
	return rawVal;
}

function unquote(s: string): string {
	try {
		if (s.startsWith('"')) return JSON.parse(s);
	} catch {
		/* fall through */
	}
	return s.slice(1, -1);
}

export function serializeMarkdown(fields: PostFields): string {
	const lines = ['---'];
	lines.push('title: ' + yamlQuote(fields.title));
	lines.push('description: ' + yamlQuote(fields.description));
	lines.push('pubDate: ' + fields.pubDate);
	if (fields.updatedDate) lines.push('updatedDate: ' + fields.updatedDate);
	if (fields.heroImage) lines.push('heroImage: ' + yamlQuote(fields.heroImage));
	lines.push('tags: [' + fields.tags.map((t) => JSON.stringify(t)).join(', ') + ']');
	if (fields.draft) lines.push('draft: true');
	lines.push('---');
	lines.push('');
	const body = fields.body.replace(/^\n+/, '').replace(/\s+$/, '');
	return lines.join('\n') + (body ? '\n' + body + '\n' : '\n');
}

function yamlQuote(value: string): string {
	return JSON.stringify(value);
}

export function contentPath(locale: string, slug: string): string {
	return 'src/content/blog/' + locale + '/' + slug + '.md';
}
