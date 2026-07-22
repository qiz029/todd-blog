// Build-time GitHub data (the site is fully static, so this runs once per build).
// If the request fails, the projects page falls back to showing featured projects only.

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
}

const USERNAME = 'qiz029';
// Not really "projects": forks, archived repos, and the blog itself.
const EXCLUDED = new Set(['todd-blog']);

export async function getRecentRepos(limit = 5): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=50&type=owner`,
      {
        headers: {
          'User-Agent': 'todd-blog-build',
          Accept: 'application/vnd.github+json',
        },
      }
    );
    if (!res.ok) {
      console.warn(`GitHub API responded ${res.status}; skipping repo list.`);
      return [];
    }
    const repos: any[] = await res.json();
    return repos
      .filter((r) => !r.fork && !r.archived && !EXCLUDED.has(r.name))
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        pushedAt: r.pushed_at,
      }));
  } catch (e) {
    console.warn('Failed to fetch GitHub repos; skipping repo list.', e);
    return [];
  }
}
