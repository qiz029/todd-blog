/** R2 media upload/get. Keys are a single sanitized path segment. */

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
};

export class MediaError extends Error {
	constructor(
		public code: 'invalid' | 'not_found',
		message: string,
	) {
		super(message);
		this.name = 'MediaError';
	}
}

export function sniffType(bytes: Uint8Array, hinted?: string | null): string | null {
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
	if (
		bytes.length >= 8 &&
		bytes[0] === 0x89 &&
		bytes[1] === 0x50 &&
		bytes[2] === 0x4e &&
		bytes[3] === 0x47
	)
		return 'image/png';
	if (
		bytes.length >= 6 &&
		bytes[0] === 0x47 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x38
	)
		return 'image/gif';
	if (
		bytes.length >= 12 &&
		bytes[0] === 0x52 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x46 &&
		bytes[8] === 0x57 &&
		bytes[9] === 0x45 &&
		bytes[10] === 0x42 &&
		bytes[11] === 0x50
	)
		return 'image/webp';
	if (hinted && hinted in TYPES) return hinted;
	return null;
}

export function sanitizeKey(name: string, ext: string): string {
	const base = name.split(/[/\\]/).pop() || 'image';
	const stem = base.replace(/\.[a-zA-Z0-9]+$/, '');
	let cleaned = stem
		.toLowerCase()
		.replace(/[^a-z0-9._-]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^[.-]+|[.-]+$/g, '');
	if (!cleaned) cleaned = 'image';
	if (cleaned.includes('..')) throw new MediaError('invalid', 'Invalid media key');
	cleaned = cleaned.slice(0, 60);
	const id = crypto.randomUUID().slice(0, 8);
	return `${cleaned}-${id}.${ext}`;
}

export function parseKey(pathname: string): string | null {
	if (!pathname.startsWith('/media/')) return null;
	const key = decodeURIComponent(pathname.slice('/media/'.length));
	if (!key || key.includes('/') || key.includes('..') || key.includes('\\')) return null;
	if (!/^[a-zA-Z0-9._-]+$/.test(key)) return null;
	return key;
}

export async function readUpload(request: Request): Promise<{ bytes: Uint8Array; filename: string; type: string }> {
	const contentType = request.headers.get('Content-Type') || '';
	let bytes: Uint8Array;
	let filename = 'image';
	let hinted: string | null = null;

	if (contentType.toLowerCase().includes('multipart/form-data')) {
		const form = await request.formData();
		const file = form.get('file') || form.get('image') || form.get('media');
		if (!(file instanceof Blob)) {
			throw new MediaError('invalid', 'multipart body must include a file, image, or media field');
		}
		if ('name' in file && typeof (file as File).name === 'string') filename = (file as File).name;
		hinted = file.type || null;
		bytes = new Uint8Array(await file.arrayBuffer());
	} else {
		bytes = new Uint8Array(await request.arrayBuffer());
		hinted = contentType.split(';')[0].trim() || null;
		const cd = request.headers.get('Content-Disposition');
		const match = cd?.match(/filename\*?=(?:UTF-8''|"?)([^";]+)/i);
		if (match) filename = decodeURIComponent(match[1].replace(/"/g, ''));
	}

	if (!bytes.byteLength) throw new MediaError('invalid', 'Empty upload');
	if (bytes.byteLength > MAX_BYTES) {
		throw new MediaError('invalid', `Image exceeds ${MAX_BYTES} byte limit`);
	}
	const type = sniffType(bytes, hinted);
	if (!type || !(type in TYPES)) {
		throw new MediaError('invalid', 'Only jpeg, png, webp, and gif images are accepted');
	}
	return { bytes, filename, type };
}

export async function putMedia(
	env: Env,
	bytes: Uint8Array,
	filename: string,
	type: string,
): Promise<{ key: string; url: string }> {
	const ext = TYPES[type];
	const key = sanitizeKey(filename, ext);
	await env.MEDIA.put(key, bytes, { httpMetadata: { contentType: type } });
	return { key, url: `/media/${key}` };
}

export async function getMedia(env: Env, key: string): Promise<Response | null> {
	const obj = await env.MEDIA.get(key);
	if (!obj) return null;
	const headers = new Headers();
	const ct = obj.httpMetadata?.contentType || 'application/octet-stream';
	headers.set('Content-Type', ct);
	headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	return new Response(obj.body, { headers });
}
