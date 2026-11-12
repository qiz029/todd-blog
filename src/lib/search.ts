interface Searchable { title: string; description?: string; tags?: string[] }

export function matchesSearch(item: Searchable, query: string): boolean {
  const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean).map((term) => term.replace(/^#/, ''));
  const text = normalize([item.title, item.description ?? '', ...(item.tags ?? [])].join(' '));
  return terms.every((term) => text.includes(term));
}
