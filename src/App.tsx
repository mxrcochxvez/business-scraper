import { useMemo, useState } from 'react';
import { leadsToCsv, leadsToJson, downloadTextFile } from './exporters';
import { DEFAULT_CITIES, DEFAULT_LEAD_LIMIT, DEFAULT_NICHES, buildSearchPhrases } from './searchConfig';
import { mockLeadProvider } from './providers/mockLeadProvider';
import type { BusinessNiche, Lead, SearchCity } from './types';
import './styles.css';

export default function App() {
  const [selectedCities, setSelectedCities] = useState<SearchCity[]>(DEFAULT_CITIES);
  const [selectedNiches, setSelectedNiches] = useState<BusinessNiche[]>(DEFAULT_NICHES);
  const [limit, setLimit] = useState(DEFAULT_LEAD_LIMIT);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const phrases = useMemo(
    () => buildSearchPhrases(selectedCities, selectedNiches),
    [selectedCities, selectedNiches],
  );

  function toggleCity(city: SearchCity) {
    setSelectedCities((current) =>
      current.includes(city) ? current.filter((item) => item !== city) : [...current, city],
    );
  }

  function toggleNiche(niche: BusinessNiche) {
    setSelectedNiches((current) =>
      current.includes(niche) ? current.filter((item) => item !== niche) : [...current, niche],
    );
  }

  async function runSearch() {
    setIsSearching(true);
    try {
      const results = await mockLeadProvider.search({
        cities: selectedCities,
        niches: selectedNiches,
        limit,
      });
      setLeads(results);
    } finally {
      setIsSearching(false);
    }
  }

  function exportCsv() {
    downloadTextFile('babbage-leads.csv', leadsToCsv(leads), 'text/csv');
  }

  function exportJson() {
    downloadTextFile('babbage-leads.json', leadsToJson(leads), 'application/json');
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Babbage LLC</p>
        <h1>Central Valley Lead Scraper</h1>
        <p>
          Build targeted lead reports for restaurants, landscapers, HVAC companies,
          electricians, doctor offices, dentists, and lawyers across Fresno, Madera,
          Clovis, Modesto, Sacramento, and Bakersfield.
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Search Settings</h2>
            <p>{phrases.length} search combinations selected</p>
          </div>
          <label className="limit-field">
            Lead goal
            <input
              type="number"
              min="1"
              max="1000"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="grid two-columns">
          <fieldset>
            <legend>Cities</legend>
            {DEFAULT_CITIES.map((city) => (
              <label key={city} className="check-row">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={() => toggleCity(city)}
                />
                {city}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Business niches</legend>
            {DEFAULT_NICHES.map((niche) => (
              <label key={niche} className="check-row">
                <input
                  type="checkbox"
                  checked={selectedNiches.includes(niche)}
                  onChange={() => toggleNiche(niche)}
                />
                {niche}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="actions">
          <button onClick={runSearch} disabled={isSearching || !selectedCities.length || !selectedNiches.length}>
            {isSearching ? 'Searching...' : 'Generate Leads'}
          </button>
          <button onClick={exportCsv} disabled={!leads.length} className="secondary">
            Export CSV
          </button>
          <button onClick={exportJson} disabled={!leads.length} className="secondary">
            Export JSON
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Report Preview</h2>
            <p>{leads.length} leads ready</p>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Business Niche</th>
                <th>City</th>
                <th>Phone</th>
                <th>Website Link</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.companyName}</td>
                  <td>{lead.businessNiche}</td>
                  <td>{lead.city}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.websiteLink || 'No website found'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
