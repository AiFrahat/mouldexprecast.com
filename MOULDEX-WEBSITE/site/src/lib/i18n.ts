/** Small bilingual routing helpers. Both locales are prefixed: /en/… and /ar/… */
import type { Lang, Localized } from './types';

export const LANGS = ['en', 'ar'] as const;
export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (LANGS as readonly string[]).includes(value);

export const isRtl = (lang: Lang): boolean => lang === 'ar';

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ar' : 'en');

/** Human label used in the language switch control. */
export const langLabel = (lang: Lang): string => (lang === 'ar' ? 'العربية' : 'English');

/** Pick a localized string, falling back to English while a translation is pending. */
export function pick(value: Localized | undefined | null, lang: Lang): string {
  if (!value) return '';
  const current = value[lang];
  return current && current.trim().length > 0 ? current : value.en ?? '';
}

/** Pick a localized list, falling back to the English list. */
export function pickList(value: { en: string[]; ar: string[] } | undefined, lang: Lang): string[] {
  if (!value) return [];
  const current = value[lang];
  return current && current.length > 0 && current.some((item) => item.trim().length > 0)
    ? current
    : value.en ?? [];
}

/** Build a path for a locale: localizedPath('en', 'services/foo') -> '/en/services/foo/'. */
export function localizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Take the current pathname and point it at the other locale. */
export function switchLangPath(pathname: string, target: Lang): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && isLang(parts[0])) {
    parts[0] = target;
    return `/${parts.join('/')}/`;
  }
  return `/${target}/`;
}

export function langFromPathname(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLang(first) ? first : DEFAULT_LANG;
}
