/** Shared shapes for the JSON content model in `src/data/`. */

export type Lang = 'en' | 'ar';

export interface Localized {
  en: string;
  ar: string;
}

export interface LocalizedList {
  en: string[];
  ar: string[];
}

export interface CopyBlock {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface ServiceCopy {
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  capabilities: string[];
  applications: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ServiceItem {
  slug: string;
  number: string;
  image: string;
  imageAlt: Localized;
  sourcePages: number[];
  relatedProjects: string[];
  en: ServiceCopy;
  ar: ServiceCopy;
}

export interface ReferenceProject {
  id: string;
  no: number;
  category: 'claddings' | 'boundary-walls' | 'staircases' | 'villas' | 'hollow-core' | 'other';
  service: string | null;
  status: 'completed' | 'ongoing' | 'awarded' | 'awarded-ongoing';
  sourcePage: number;
  name: Localized;
  client: string;
  consultant: string;
  contractor: string;
}

export interface ShowcaseFacts {
  client: string | null;
  consultant: string | null;
  contractor: string | null;
  status: ReferenceProject['status'] | null;
  location: Localized;
}

export interface ShowcaseCopy {
  title: string;
  category: string;
  summary: string;
  body: string[];
  scope: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ShowcaseProject {
  slug: string;
  refId: string | null;
  service: string;
  image: string;
  imageAlt: Localized;
  sourcePages: number[];
  facts: ShowcaseFacts;
  en: ShowcaseCopy;
  ar: ShowcaseCopy;
}

export interface ValueItem {
  id: string;
  title: Localized;
  text: Localized;
}

export interface ImageVariant {
  file: string;
  width: number;
  height: number;
  bytes: number;
}

export interface WebImage {
  name: string;
  source: string;
  sourceSize: [number, number];
  variants: ImageVariant[];
}
