import type { BusinessNiche, SearchCity } from './types';

export const DEFAULT_CITIES: SearchCity[] = [
  'Fresno',
  'Madera',
  'Clovis',
  'Modesto',
  'Sacramento',
  'Bakersfield',
];

export const DEFAULT_NICHES: BusinessNiche[] = [
  'Restaurant',
  'Landscaper',
  'HVAC',
  'Electrician',
  'Doctor Office',
  'Dentist',
  'Lawyer',
];

export const DEFAULT_LEAD_LIMIT = 250;

export function buildSearchPhrases(cities = DEFAULT_CITIES, niches = DEFAULT_NICHES): string[] {
  return cities.flatMap((city) => niches.map((niche) => `${niche} in ${city} California`));
}
