import { describe, expect, it } from 'vitest';
import { matchesSearch } from './search';

describe('article search', () => {
  const article = { title: 'Building tools', description: 'Version control for agents', tags: ['MCP', '软件工程'] };
  it('matches summaries and tags, including mixed fields and Unicode normalization', () => {
    expect(matchesSearch(article, 'version')).toBe(true);
    expect(matchesSearch(article, '#mcp')).toBe(true);
    expect(matchesSearch(article, '软件工程')).toBe(true);
    expect(matchesSearch(article, 'ＴＯＯＬＳ mcp')).toBe(true);
    expect(matchesSearch(article, 'version absent')).toBe(false);
  });
  it('keeps navigation entries searchable without article metadata', () => {
    expect(matchesSearch({ title: 'About' }, 'about')).toBe(true);
    expect(matchesSearch({ title: 'About' }, '  ')).toBe(true);
    expect(matchesSearch({ title: 'About' }, 'mcp')).toBe(false);
  });
});
