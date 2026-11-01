import { getCollection, type CollectionEntry } from 'astro:content';
import { sections, type Section } from './site';

export type Project = CollectionEntry<'projects'>;

export const sectionOf = (p: Project) => p.id.split('/')[0];
export const projectHref = (p: Project) => `/${p.id}/`;
export const isLinkable = (s: Section) => s.type === 'projects';

export async function projectsBySection() {
  const all = (await getCollection('projects', p => !p.data.draft)).sort((a, b) => a.data.order - b.data.order);
  return sections.map(s => ({ section: s, projects: all.filter(p => sectionOf(p) === s.id) }));
}

// Проекты со своей страницей — в порядке разделов, для ссылки «Следующий проект»
export async function linkableProjects() {
  return (await projectsBySection()).filter(g => isLinkable(g.section)).flatMap(g => g.projects.map(p => ({ project: p, section: g.section })));
}
