# Babbage Lead Scraper

Electron app for building local business lead reports for Babbage LLC.

## Lead fields

- Company Name
- Business Niche
- City
- Phone
- Website Link, when available
- Source
- Notes

## Target areas

- Fresno
- Madera
- Clovis
- Modesto
- Sacramento
- Bakersfield

## Target business niches

- Restaurants
- Landscapers
- HVAC
- Electricians
- Doctor Offices
- Dentists
- Lawyers

## Current status

This first version includes the Electron app foundation, search settings, report preview, and CSV/JSON exports. It uses a mock provider so the app can be tested before connecting approved public data sources.

## Data source approach

Use provider modules for each approved source instead of placing source logic in the UI. Good source types include business directories that permit automated access, chamber directories, city association directories, user-provided URLs, and paid data APIs.

Do not use sources that prohibit automated access, require login, or contain private personal data. Add rate limiting, duplicate detection, and source attribution for every provider.

## Development

```bash
npm install
npm run dev
```

## Next steps

1. Add the first approved public data provider.
2. Add rate limiting and duplicate detection.
3. Move exports into Electron native save dialogs.
4. Add report metadata, including date generated and selected filters.
5. Package the app with Electron Builder.
