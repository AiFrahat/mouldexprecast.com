import type { Page } from '@playwright/test';

export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

export const SERVICES = [
  'precast-claddings',
  'load-bearing-structures',
  'villas',
  'hollow-core-slabs',
  'precast-boundary-walls',
  'precast-joints-sealant-works',
];

export const PROJECTS = [
  'madinat-jumeirah-living-phase-4',
  'bulgari-ocean-villas',
  'lamborghini-villas',
  'beachgate-by-address',
  'palmiera-the-oasis',
  'al-kharafi',
];

export interface RouteSpec {
  lang: Lang;
  path: string;
  kind: 'home' | 'about' | 'services' | 'service' | 'projects' | 'project' | 'contact';
}

export const routes: RouteSpec[] = LANGS.flatMap((lang) => {
  const prefix = `/${lang}/`;
  return [
    { lang, path: prefix, kind: 'home' as const },
    { lang, path: `${prefix}about/`, kind: 'about' as const },
    { lang, path: `${prefix}services/`, kind: 'services' as const },
    ...SERVICES.map((slug) => ({
      lang,
      path: `${prefix}services/${slug}/`,
      kind: 'service' as const,
    })),
    { lang, path: `${prefix}projects/`, kind: 'projects' as const },
    ...PROJECTS.map((slug) => ({
      lang,
      path: `${prefix}projects/${slug}/`,
      kind: 'project' as const,
    })),
    { lang, path: `${prefix}contact/`, kind: 'contact' as const },
  ];
});

export const arabicRe = /[\u0600-\u06FF]/;

/** Collects console errors and failed requests for the current page. */
export function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) => {
    const url = request.url();
    if (url.startsWith('mailto:') || url.startsWith('tel:')) return;
    errors.push(`requestfailed: ${url} (${request.failure()?.errorText ?? 'unknown'})`);
  });
  return errors;
}

/** Fails when the document is wider than the viewport (horizontal overflow). */
export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    return { documentWidth, viewportWidth };
  });
  if (overflow.documentWidth > overflow.viewportWidth + 1) {
    throw new Error(
      `horizontal overflow: document ${overflow.documentWidth}px > viewport ${overflow.viewportWidth}px`,
    );
  }
}

/** Waits until every image on the page has decoded. */
export async function waitForImages(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
  });
}
