import { test, expect } from '@playwright/test';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

/**
 * Privacy / publication-rights guard rails.
 * The company pre-qualification PDF contains internal employee registers and
 * signed submittal documents (pages 8-9, 15-24). None of that material may be
 * published by the website.
 *
 * The explicit list of internal names is NOT committed to the repository: it
 * lives in `tests/fixtures/internal-names.local.txt`, which is git-ignored
 * (see the repository .gitignore). When that file is absent the name scan is
 * skipped and only the structural patterns below are enforced.
 */
const FORBIDDEN_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'employee ID format', pattern: /MDX-\d{3,}/i },
  { label: 'submittal transmittal', pattern: /submittal\s*(transmittal)?/i },
  { label: 'signature/stamp block', pattern: /signature\s*&\s*stamp/i },
  { label: 'employee register header', pattern: /EMPLOYE\s*NAME/i },
  { label: 'internal organisation chart', pattern: /organization\s*chart/i },
  { label: 'personal mobile of an employee register row', pattern: /ID\s*NO\s*CATEGORY/i },
];

function walkHtml(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry);
    if (statSync(full).isDirectory()) files.push(...walkHtml(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const distDir = path.join(process.cwd(), 'dist');
const namesFixture = path.join(process.cwd(), 'tests', 'fixtures', 'internal-names.local.txt');
const internalNames = existsSync(namesFixture)
  ? readFileSync(namesFixture, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 2)
  : [];

test.describe('publication rights and privacy', () => {
  test('built site does not contain internal employee or submittal data', async () => {
    const files = walkHtml(distDir);
    expect(files.length).toBeGreaterThan(30);
    const violations: string[] = [];
    for (const file of files) {
      const html = readFileSync(file, 'utf8');
      for (const { label, pattern } of FORBIDDEN_PATTERNS) {
        if (pattern.test(html)) violations.push(`${path.basename(file)}: ${label}`);
      }
      for (const name of internalNames) {
        if (html.includes(name)) violations.push(`${path.basename(file)}: internal name`);
      }
    }
    expect(violations).toEqual([]);
    if (internalNames.length === 0) {
      test.info().annotations.push({
        type: 'note',
        description:
          'internal-names.local.txt not present; only structural privacy patterns were scanned',
      });
    }
  });

  test('contact details published are limited to the company profile lines', async ({ request }) => {
    const html = await (await request.get('/en/contact/')).text();
    expect(html).toContain('info@mouldexprecast.com');
    expect(html).toContain('+971 4 436 4243');
    // no personal social handles and no invented street address or registration number
    expect(html).not.toMatch(/instagram|facebook|linkedin|twitter\/x\.com/i);
    expect(html).not.toMatch(/\d{1,4}\s+(?:street|st\.|road|rd\.|avenue|ave\.)\b/i);
  });

  test('content model passes the integrity check', () => {
    const result = execFileSync('node', ['scripts/verify-content.mjs'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    expect(result).toContain('Content check passed');
  });
});
