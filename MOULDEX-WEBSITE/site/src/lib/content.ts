/** Typed access to the JSON content model. */
import siteData from '../data/site.json';
import servicesData from '../data/services.json';
import projectsData from '../data/projects.json';
import pagesData from '../data/pages.json';
import valuesData from '../data/values.json';
import imagesData from '../data/images.json';
import type {
  Lang,
  ServiceItem,
  ReferenceProject,
  ShowcaseProject,
  ValueItem,
  WebImage,
} from './types';
import { localizedPath, pick } from './i18n';

export const site = siteData;
export const services = servicesData as unknown as {
  page: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    lead: { en: string; ar: string };
    intro: { en: string; ar: string };
    referenceTitle: { en: string; ar: string };
    capabilitiesTitle: { en: string; ar: string };
    metaTitle: { en: string; ar: string };
    metaDescription: { en: string; ar: string };
  };
  items: ServiceItem[];
};

export const values = valuesData as unknown as {
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  lead: { en: string; ar: string };
  items: ValueItem[];
};

export const projects = projectsData as unknown as {
  page: {
    eyebrow: { en: string; ar: string };
    title: { en: string; ar: string };
    lead: { en: string; ar: string };
    featuredTitle: { en: string; ar: string };
    featuredLead: { en: string; ar: string };
    referenceTitle: { en: string; ar: string };
    referenceNote: { en: string; ar: string };
    metaTitle: { en: string; ar: string };
    metaDescription: { en: string; ar: string };
    categories: { id: string; label: { en: string; ar: string } }[];
  };
  statuses: Record<string, { en: string; ar: string }>;
  reference: ReferenceProject[];
  showcase: ShowcaseProject[];
};

export const pages = pagesData as unknown as {
  home: Record<Lang, any>;
  about: Record<Lang, any>;
  contact: Record<Lang, any>;
};

export const webImages = imagesData as unknown as WebImage[];

export const getService = (slug: string): ServiceItem | undefined =>
  services.items.find((item) => item.slug === slug);

export const getReferenceProject = (id: string): ReferenceProject | undefined =>
  projects.reference.find((item) => item.id === id);

export const getShowcaseProject = (slug: string): ShowcaseProject | undefined =>
  projects.showcase.find((item) => item.slug === slug);

export const getValue = (id: string): ValueItem | undefined =>
  values.items.find((item) => item.id === id);

export const getImage = (name: string): WebImage | undefined =>
  webImages.find((item) => item.name === name);

/* ------------------------------------------------------------------------- *
 * Locale merging
 * The Arabic copy is authored as a translation of the English content model.
 * `localized()` deep-merges the Arabic on top of the English so a partially
 * translated build never renders empty headings; any missing Arabic string
 * simply falls back to its English counterpart.
 * ------------------------------------------------------------------------- */
const isFilled = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.some((entry) => isFilled(entry));
  return true;
};

function mergeLocale<T>(base: T, extra: unknown): T {
  if (Array.isArray(base)) {
    return (isFilled(extra) && Array.isArray(extra) && extra.length === base.length
      ? extra
      : base) as unknown as T;
  }
  if (base !== null && typeof base === 'object') {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(base as Record<string, unknown>)) {
      const baseValue = (base as Record<string, unknown>)[key];
      const extraValue =
        extra !== null && typeof extra === 'object'
          ? (extra as Record<string, unknown>)[key]
          : undefined;
      out[key] = isFilled(extraValue) ? mergeLocale(baseValue, extraValue) : baseValue;
    }
    return out as T;
  }
  return (isFilled(extra) ? extra : base) as T;
}

/** Return the copy block for a locale, with English as the per-field fallback. */
export function localized<T>(pair: { en: T; ar: T }, lang: Lang): T {
  return lang === 'ar' ? mergeLocale(pair.en, pair.ar) : pair.en;
}

/* ------------------------------------------------------------------------- *
 * Page-level copy accessors
 * Some content blocks localise field-by-field (e.g. services.page.eyebrow is a
 * {en, ar} pair) instead of shipping one copy object per language. These
 * helpers flatten such blocks into a plain string object for a locale.
 * ------------------------------------------------------------------------- */
export function servicesPage(lang: Lang) {
  const page = services.page;
  return {
    eyebrow: pick(page.eyebrow, lang),
    title: pick(page.title, lang),
    lead: pick(page.lead, lang),
    intro: pick(page.intro, lang),
    referenceTitle: pick(page.referenceTitle, lang),
    capabilitiesTitle: pick(page.capabilitiesTitle, lang),
    metaTitle: pick(page.metaTitle, lang),
    metaDescription: pick(page.metaDescription, lang),
  };
}

export function projectsPage(lang: Lang) {
  const page = projects.page;
  return {
    eyebrow: pick(page.eyebrow, lang),
    title: pick(page.title, lang),
    lead: pick(page.lead, lang),
    featuredTitle: pick(page.featuredTitle, lang),
    featuredLead: pick(page.featuredLead, lang),
    referenceTitle: pick(page.referenceTitle, lang),
    referenceNote: pick(page.referenceNote, lang),
    metaTitle: pick(page.metaTitle, lang),
    metaDescription: pick(page.metaDescription, lang),
    categories: page.categories.map((category) => ({
      id: category.id,
      label: pick(category.label, lang),
    })),
  };
}

export function statusLabels(lang: Lang): Record<string, string> {
  return Object.fromEntries(
    Object.entries(projects.statuses).map(([key, value]) => [key, pick(value, lang)]),
  );
}

export function valuesCopy(lang: Lang) {
  return {
    eyebrow: pick(values.eyebrow, lang),
    title: pick(values.title, lang),
    lead: pick(values.lead, lang),
    items: values.items,
  };
}



/** Resolve the image name for a showcase project card. */
export const showcaseImageName = (project: ShowcaseProject): string => {
  const match = project.image.match(/\/([a-z0-9-]+)-\d+\.jpg$/);
  return match ? match[1] : '';
};

/** Top-level navigation with locale-aware links. */
export interface NavItem {
  key: 'home' | 'about' | 'services' | 'projects' | 'contact';
  label: string;
  href: string;
}

export function getNav(lang: Lang): NavItem[] {
  const labels = site.nav;
  return [
    { key: 'home', label: labels.home[lang] || labels.home.en, href: localizedPath(lang) },
    { key: 'about', label: labels.about[lang] || labels.about.en, href: localizedPath(lang, 'about') },
    {
      key: 'services',
      label: labels.services[lang] || labels.services.en,
      href: localizedPath(lang, 'services'),
    },
    {
      key: 'projects',
      label: labels.projects[lang] || labels.projects.en,
      href: localizedPath(lang, 'projects'),
    },
    {
      key: 'contact',
      label: labels.contact[lang] || labels.contact.en,
      href: localizedPath(lang, 'contact'),
    },
  ];
}

/** True when `href` is the current page or an ancestor of it. */
export function isCurrentPath(pathname: string, href: string): boolean {
  if (href === '/en/' || href === '/ar/') return pathname === href;
  return pathname === href || pathname.startsWith(href.replace(/\/$/, '') + '/');
}

export const serviceHref = (lang: Lang, slug: string): string =>
  localizedPath(lang, `services/${slug}`);

export const projectHref = (lang: Lang, slug: string): string =>
  localizedPath(lang, `projects/${slug}`);
