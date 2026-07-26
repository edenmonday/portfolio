# edenmonday.no

Porteføljesiden min, og landingssiden for VærSikret. To små Vite/React-apper
i samme repo:

```
.            edenmonday.no       — portefølje og CV
vaersikret/  vaersikret.edenmonday.no — landingsside for VærSikret
```

De deler ingen kode, bare repo. Hver mappe har sin egen `package.json` og
bygges for seg.

## Kjøre lokalt

Porteføljen:

```bash
npm install
npm run dev
```

VærSikret-siden:

```bash
cd vaersikret
npm install
npm run dev
```

Begge starter på http://localhost:5173 (Vite tar neste ledige port hvis den
første er i bruk).

## Hvor ting ligger

| Hva | Hvor |
|---|---|
| Innhold og seksjoner | `src/pages/Home.jsx` |
| All tekst, norsk og engelsk | `src/i18n.jsx` |
| Stiler | `src/index.css` |
| Footer og språkvelger | `src/components/Shared.jsx` |

Samme oppsett i `vaersikret/`, bortsett fra at siden der ligger i `src/App.jsx`.

Alderen i heroen regnes ut fra `BIRTH_DATE` i `Home.jsx` og oppdateres hvert
50. ms — derav desimalene.

## Deploy

Vercel bygger begge sidene fra dette repoet, som to prosjekter mot samme
GitHub-remote. Forskjellen er Root Directory:

| Prosjekt | Root Directory | Domene |
|---|---|---|
| portefølje | *(tom)* | edenmonday.no |
| vaersikret | `vaersikret` | vaersikret.edenmonday.no |

Framework Preset skal være Vite på begge, slik at output havner i `dist/`.
Push til `main` deployer.

`vercel.json` i roten sender alle ruter til `index.html`, siden porteføljen
er en SPA.
