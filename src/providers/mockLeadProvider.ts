import type { Lead, LeadProvider, LeadSearchRequest } from '../types';

const sampleCompanyWords = [
  'Central Valley',
  'Golden State',
  'Sierra',
  'Valley Pro',
  'Pacific',
  'Premier',
  'Local',
  'Reliable',
];

function makePhone(index: number): string {
  const suffix = String(1000 + index).slice(-4);
  return `(559) 555-${suffix}`;
}

export const mockLeadProvider: LeadProvider = {
  name: 'Mock Lead Provider',
  async search(request: LeadSearchRequest): Promise<Lead[]> {
    const leads: Lead[] = [];

    for (const city of request.cities) {
      for (const niche of request.niches) {
        for (const word of sampleCompanyWords) {
          if (leads.length >= request.limit) return leads;

          const companySlug = `${word} ${niche}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const citySlug = city.toLowerCase();

          leads.push({
            id: `${city}-${niche}-${leads.length}`,
            companyName: `${word} ${niche}`,
            businessNiche: niche,
            city,
            phone: makePhone(leads.length),
            websiteLink: leads.length % 3 === 0 ? '' : `https://${companySlug}-${citySlug}.example.com`,
            source: this.name,
            notes: leads.length % 3 === 0 ? 'No website found in source data.' : undefined,
          });
        }
      }
    }

    return leads;
  },
};
