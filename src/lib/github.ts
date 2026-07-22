// Build-time GitHub data (the site is fully static, so this runs once per build).
// If requests fail, the projects page falls back to showing featured projects only.
//
// Ranking: repos with >10 stars first (by star count), then the rest by number
// of commits in the last 7 days, most active first.

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
  weeklyCommits: number;
}

const USERNAME = 'qiz029';
// Not really "projects": forks, archived repos, and the blog itself.
const EXCLUDED = new Set(['todd-blog']);
const STAR_THRESHOLD = 10;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const HEADERS = {
  'User-Agent': 'todd-blog-build',
  Accept: 'application/vnd.github+json',
};

async function getWeeklyCommitCount(repo: string, since: string): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${USERNAME}/${repo}/commits?since=${since}&per_page=100`,
      { headers: HEADERS }
    );
    if (!res.ok) return 0;
    const commits: any = await res.json();
    return Array.isArray(commits) ? commits.length : 0;
  } catch {
    return 0;
  }
}

export async function getRecentRepos(limit = 5): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&direction=desc&per_page=100&type=owner`,
      { headers: HEADERS }
    );
    if (!res.ok) {
      console.warn(`GitHub API responded ${res.status}; skipping repo list.`);
      return [];
    }
    const repos: any[] = (await res.json()).filter(
      (r) => !r.fork && !r.archived && !EXCLUDED.has(r.name)
    );

    // Tier 1: starred repos, most stars first.
    const starred = repos
      .filter((r) => r.stargazers_count > STAR_THRESHOLD)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Tier 2: the rest, ranked by commits in the last week. Only repos pushed
    // during that window can have commits, so skip API calls for the others.
    const rest = repos.filter((r) => r.stargazers_count <= STAR_THRESHOLD);
    const since = new Date(Date.now() - WEEK_MS);
    const active = rest.filter((r) => new Date(r.pushed_at) >= since);
    const counts = await Promise.all(
      active.map((r) => getWeeklyCommitCount(r.name, since.toISOString()))
    );
    const activeRanked = active
      .map((r, i) => ({ r, weeklyCommits: counts[i] }))
      .sort(
        (a, b) =>
          b.weeklyCommits - a.weeklyCommits ||
          new Date(b.r.pushed_at).valueOf() - new Date(a.r.pushed_at).valueOf()
      );
    const inactive = rest
      .filter((r) => new Date(r.pushed_at) < since)
      .map((r) => ({ r, weeklyCommits: 0 }));

    const map = ({ r, weeklyCommits }: { r: any; weeklyCommits: number }): Repo => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      pushedAt: r.pushed_at,
      weeklyCommits,
    });

    return [
      ...starred.map((r) => map({ r, weeklyCommits: 0 })),
      ...activeRanked.map(map),
      ...inactive.map(map),
    ].slice(0, limit);
  } catch (e) {
    console.warn('Failed to fetch GitHub repos; skipping repo list.', e);
    return [];
  }
}
