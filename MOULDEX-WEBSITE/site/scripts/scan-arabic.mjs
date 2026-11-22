/** Lists Arabic strings that still contain English words outside the proper-noun allow list. */
import { readFileSync } from 'node:fs';

const files = ['services.json', 'projects.json', 'pages.json', 'values.json', 'site.json'];

const allowed = new Set([
  'MOULDEX', 'PRECAST', 'CONTRACTING', 'L.L.C', 'EMAAR', 'MEARAS', 'MEERAS', 'ALDAR', 'GRC',
  'Madinat', 'Jumeirah', 'Living', 'Bulgari', 'Ocean', 'Villas', 'Lamborghini', 'Beachgate',
  'Address', 'Palmiera', 'Emaar', 'Dubai', 'Hills', 'Vista', 'Sheikh', 'Zayed', 'National',
  'Museum', 'Water', 'Body', 'Facility', 'Sahel', 'Innovo', 'Fibrex', 'Dutco', 'Beam', 'Next',
  'Engineering', 'Consultants', 'Khatib', 'Alami', 'Parsons', 'Atkins', 'Realis', 'Architects',
  'Mirage', 'Conin', 'Gurg', 'Stantec', 'Arif', 'Bintoak', 'Enmaa', 'Aqar', 'Landscape', 'French',
  'International', 'Private', 'School', 'Hamdan', 'Rashid', 'Cancer', 'Hospital', 'HBRCH',
  'Lusaily', 'Meaisem', 'Second', 'Tilal', 'Ghaf', 'Elysian', 'Mansions', 'Kharafi', 'Health',
  'Majid', 'Futtaim', 'Holding', 'Real', 'Estate', 'PO', 'Box', 'Emirates', 'Arab', 'United',
  'Al', 'Technical', 'Services', 'Mouldex', 'MDX', 'APP', 'PDF', 'Tel', 'Fax', 'Mob',
]);

const allowedRe = new RegExp(`\\b(${[...allowed].map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');

const findings = [];
function walk(node, trail) {
  if (Array.isArray(node)) {
    node.forEach((entry, index) => walk(entry, `${trail}[${index}]`));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key === 'ar') {
        const values = Array.isArray(value) ? value : [value];
        values.forEach((entry, index) => {
          if (typeof entry !== 'string') return;
          const stripped = entry.replace(allowedRe, ' ');
          const words = [...stripped.matchAll(/[A-Za-z][A-Za-z-]{2,}/g)].map((match) => match[0]);
          if (words.length > 0) {
            findings.push({ path: `${trail}${Array.isArray(value) ? `[${index}]` : ''}`, words: [...new Set(words)], text: entry });
          }
        });
      } else {
        walk(value, `${trail}.${key}`);
      }
    }
  }
}

for (const file of files) {
  const data = JSON.parse(readFileSync(`src/data/${file}`, 'utf8'));
  walk(data, file.replace('.json', ''));
}

console.log(`suspect strings: ${findings.length}`);
for (const finding of findings.slice(0, 60)) {
  console.log(`- ${finding.path} [${finding.words.join(', ')}]`);
  console.log(`    ${finding.text}`);
}
