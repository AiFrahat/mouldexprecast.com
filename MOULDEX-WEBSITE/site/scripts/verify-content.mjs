#!/usr/bin/env node
/**
 * Content integrity check for the bilingual content model.
 *
 * Verifies that
 *  - every Arabic string in src/data/*.json is filled in (no empty "ar" values)
 *  - localized arrays keep the same length as their English counterpart
 *  - the six services, seventeen reference projects and six showcase projects exist
 *  - slugs, ids and image references resolve
 *  - every image referenced by the content model ships in public/
 *
 * Exit code 1 when a blocking problem is found (missing Arabic, broken references).
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dataDir = path.join(root, 'src', 'data');
const publicDir = path.join(root, 'public');

const read = (name) => JSON.parse(readFileSync(path.join(dataDir, name), 'utf8'));

const files = {
  site: read('site.json'),
  values: read('values.json'),
  services: read('services.json'),
  projects: read('projects.json'),
  pages: read('pages.json'),
  images: read('images.json'),
};

const errors = [];
const warnings = [];
const missingArabic = [];

function walk(node, trail, { skipKeys = new Set() } = {}) {
  if (Array.isArray(node)) {
    node.forEach((entry, index) => walk(entry, `${trail}[${index}]`, { skipKeys }));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (skipKeys.has(key)) continue;
      const next = trail ? `${trail}.${key}` : key;
      if (key === 'ar') {
        if (typeof value === 'string' && value.trim() === '') {
          missingArabic.push(next);
        } else if (Array.isArray(value)) {
          value.forEach((entry, index) => {
            if (typeof entry === 'string' && entry.trim() === '') {
              missingArabic.push(`${next}[${index}]`);
            }
          });
        }
        continue;
      }
      walk(value, next, { skipKeys });
    }
  }
}

for (const [name, data] of Object.entries(files)) {
  if (name === 'images') continue;
  walk(data, name);
}

// ---------------------------------------------------------------- structures
const services = files.services.items;
const reference = files.projects.reference;
const showcase = files.projects.showcase;

if (services.length !== 6) errors.push(`expected 6 services, found ${services.length}`);
if (reference.length !== 17) errors.push(`expected 17 reference projects, found ${reference.length}`);
if (showcase.length !== 6) errors.push(`expected 6 showcase projects, found ${showcase.length}`);
if (files.values.items.length !== 6) errors.push(`expected 6 values, found ${files.values.items.length}`);

// unique slugs / ids
const slugs = new Set();
for (const service of services) {
  if (slugs.has(service.slug)) errors.push(`duplicate service slug: ${service.slug}`);
  slugs.add(service.slug);
  for (const field of ['eyebrow', 'title', 'summary', 'metaTitle', 'metaDescription']) {
    for (const lang of ['en', 'ar']) {
      if (typeof service[lang][field] !== 'string' || !service[lang][field].trim()) {
        errors.push(`service ${service.slug}.${lang}.${field} is empty`);
      }
    }
  }
  if (service.en.body.length !== service.ar.body.length) {
    warnings.push(`service ${service.slug}: body array length differs (en ${service.en.body.length}, ar ${service.ar.body.length})`);
  }
}

const referenceIds = new Set();
for (const project of reference) {
  if (referenceIds.has(project.id)) errors.push(`duplicate reference id: ${project.id}`);
  referenceIds.add(project.id);
  if (!project.client || !project.consultant || !project.contractor) {
    errors.push(`reference ${project.id} is missing a client/consultant/contractor value`);
  }
  if (!files.projects.statuses[project.status]) {
    errors.push(`reference ${project.id} has unknown status ${project.status}`);
  }
}

for (const project of showcase) {
  if (!slugs.has(project.service)) {
    errors.push(`showcase ${project.slug} points to unknown service ${project.service}`);
  }
  if (project.refId && !referenceIds.has(project.refId)) {
    errors.push(`showcase ${project.slug} points to unknown reference ${project.refId}`);
  }
}

for (const service of services) {
  for (const id of service.relatedProjects) {
    if (!referenceIds.has(id)) errors.push(`service ${service.slug} references unknown project ${id}`);
  }
}

// ------------------------------------------------------------------- images
const imageNames = new Set(files.images.map((entry) => entry.name));
const referenced = new Set();
for (const name of imageNames) referenced.add(name);

for (const entry of files.images) {
  for (const variant of entry.variants) {
    const file = path.join(publicDir, variant.file.replace(/^\//, ''));
    if (!existsSync(file)) errors.push(`missing image file: ${variant.file}`);
  }
}

const pattern = /\/([a-z0-9-]+)-\d+\.jpg$/;
const collect = (value) => {
  const pathMatch = String(value).match(pattern);
  if (pathMatch) {
    if (!imageNames.has(pathMatch[1])) errors.push(`image not in manifest: ${value}`);
  }
};
for (const service of services) collect(service.image);
for (const project of showcase) collect(project.image);

// home / about inline image names must exist too
for (const page of ['home', 'about']) {
  const block = files.pages[page].en;
  const serialized = JSON.stringify(block);
  for (const match of serialized.matchAll(/"image":\s*"([^"]+)"/g)) {
    const name = match[1].match(pattern)?.[1];
    if (name && !imageNames.has(name)) errors.push(`pages.${page} references unknown image ${match[1]}`);
  }
}

// ---------------------------------------------------------------- reporting
if (missingArabic.length > 0) {
  errors.push(`missing Arabic strings: ${missingArabic.length}`);
}
if (warnings.length > 0) {
  console.log('Warnings:');
  for (const warning of warnings) console.log(' -', warning);
}
if (missingArabic.length > 0) {
  console.log('\nMissing Arabic (first 40):');
  for (const entry of missingArabic.slice(0, 40)) console.log(' -', entry);
}
if (errors.length > 0) {
  console.log('\nErrors:');
  for (const error of errors) console.log(' -', error);
  console.log(`\nContent check FAILED (${errors.length} error(s)).`);
  process.exit(1);
}
console.log(
  `Content check passed: ${services.length} services, ${reference.length} reference projects, ` +
    `${showcase.length} showcase projects, ${files.values.items.length} values, ` +
    `${files.images.length} images, 0 missing Arabic strings.`,
);
