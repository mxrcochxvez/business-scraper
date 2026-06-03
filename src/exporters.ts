import type { Lead } from './types';

const headers = ['Company Name', 'Business Niche', 'City', 'Phone', 'Website Link', 'Source', 'Notes'];

function escapeCsvValue(value: string): string {
  const cleanValue = value ?? '';
  if (cleanValue.includes(',') || cleanValue.includes('"') || cleanValue.includes('\n')) {
    return `"${cleanValue.replace(/"/g, '""')}"`;
  }

  return cleanValue;
}

export function leadsToCsv(leads: Lead[]): string {
  const rows = leads.map((lead) => [
    lead.companyName,
    lead.businessNiche,
    lead.city,
    lead.phone,
    lead.websiteLink,
    lead.source,
    lead.notes ?? '',
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(String(value))).join(','))
    .join('\n');
}

export function leadsToJson(leads: Lead[]): string {
  return JSON.stringify(leads, null, 2);
}

export function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
