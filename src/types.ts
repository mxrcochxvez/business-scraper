export type BusinessNiche =
  | 'Restaurant'
  | 'Landscaper'
  | 'HVAC'
  | 'Electrician'
  | 'Doctor Office'
  | 'Dentist'
  | 'Lawyer';

export type SearchCity =
  | 'Fresno'
  | 'Madera'
  | 'Clovis'
  | 'Modesto'
  | 'Sacramento'
  | 'Bakersfield';

export interface Lead {
  id: string;
  companyName: string;
  businessNiche: BusinessNiche;
  city: SearchCity | string;
  phone: string;
  websiteLink: string;
  source: string;
  notes?: string;
}

export interface LeadSearchRequest {
  companyName?: string;
  niches: BusinessNiche[];
  cities: SearchCity[];
  limit: number;
}

export interface LeadProvider {
  name: string;
  search(request: LeadSearchRequest): Promise<Lead[]>;
}
