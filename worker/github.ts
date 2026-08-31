/** GitHub Contents API — git remains the source of truth. No force-push. */

import { contentPath } from './markdown';

const ACCEPT = 'application/vnd.github+json';
const API = 'https://api.github.com';

export class GitHubError extends Error {
	constructor(
		public status: number,
		message: string,
		public body?: unknown,
	) {
		super(message);
		this.name = 'GitHubError';
	}
}

export interface GitFile {
	path: string;
	sha: string;
	content: string;
}

export interface GitCommitResult {
	sha: string;
	fileSha: string;
}

function repoParts(env: Env): { owner: string; repo: string; branch: string } {
	const spec = env.GITHUB_REPO || 'qiz029/todd-blog';
	const [owner, repo] = spec.split('/');
	if (!owner || !repo) throw new GitHubError(500, `Invalid GITHUB_REPO: ${spec}`);
	return { owner, repo, branch: env.GITHUB_BRANCH || 'main' };
}

function headers(env: Env): Headers {
	const h = new Headers({
		Accept: ACCEPT,
		'User-Agent': 'todd-blog-cms',
		'X-GitHub-Api-Version': '2022-11-28',
	});
	if (env.GITHUB_TOKEN) h.set('Authorization', `Bearer ${env.GITHUB_TOKEN}`);
	return h;
}

async function gh(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
	const url = path.startsWith('http') ? path : `${API}${path}`;
	const merged = new Headers(headers(env));
	new Headers(init.headers).forEach((v, k) => merged.set(k, v));
	return fetch(url, { ...init, headers: merged });
}

export function utf8ToBase64(text: string): string {
	const bytes = new TextEncoder().encode(text);
	let binary = '';
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary);
}

export function base64ToUtf8(b64: string): string {
	const binary = atob(b64.replace(/\s/g, ''));
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return new TextDecoder().decode(bytes);
}

export async function getFile(env: Env, locale: string, slug: string): Promise<GitFile | null> {
	const { owner, repo, branch } = repoParts(env);
	const path = contentPath(locale, slug);
	const res = await gh(env, `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`);
	if (res.status === 404) return null;
	if (!res.ok) {
		throw new GitHubError(res.status, `GitHub GET ${path} failed: ${res.status}`, await safeJson(res));
	}
	const data = (await res.json()) as { type?: string; sha: string; content?: string; encoding?: string; path: string };
	if (data.type !== 'file' || !data.content) return null;
	return { path: data.path, sha: data.sha, content: base64ToUtf8(data.content) };
}

export async function listPosts(env: Env, locale: string): Promise<Array<{ name: string; path: string; sha: string }>> {
	const { owner, repo, branch } = repoParts(env);
	const dir = `src/content/blog/${locale}`;
	const res = await gh(env, `/repos/${owner}/${repo}/contents/${dir}?ref=${encodeURIComponent(branch)}`);
	if (res.status === 404) return [];
	if (!res.ok) {
		throw new GitHubError(res.status, `GitHub list ${dir} failed: ${res.status}`, await safeJson(res));
	}
	const data = (await res.json()) as Array<{ type: string; name: string; path: string; sha: string }>;
	if (!Array.isArray(data)) return [];
	return data.filter((item) => item.type === 'file' && item.name.endsWith('.md'));
}

export async function putFile(
	env: Env,
	locale: string,
	slug: string,
	markdown: string,
	message: string,
	sha?: string,
): Promise<GitCommitResult> {
	const { owner, repo, branch } = repoParts(env);
	const path = contentPath(locale, slug);
	const body: Record<string, unknown> = {
		message,
		content: utf8ToBase64(markdown),
		branch,
	};
	if (sha) body.sha = sha;
	const res = await gh(env, `/repos/${owner}/${repo}/contents/${path}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (res.status === 409 || res.status === 422) {
		throw new GitHubError(409, `Conflict writing ${path}`, await safeJson(res));
	}
	if (!res.ok) {
		throw new GitHubError(res.status, `GitHub PUT ${path} failed: ${res.status}`, await safeJson(res));
	}
	const data = (await res.json()) as { content?: { sha?: string }; commit?: { sha?: string } };
	return {
		sha: data.commit?.sha ?? '',
		fileSha: data.content?.sha ?? '',
	};
}

async function safeJson(res: Response): Promise<unknown> {
	try {
		return await res.json();
	} catch {
		return await res.text();
	}
}
