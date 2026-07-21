# eden monday — portfolio

Personlig portfolio-/CV-nettside. Norsk/engelsk språkvelger oppe til høyre,
live alderteller, og en prosjektliste som lenker videre til egne
prosjektsider (se [VærSikret](https://github.com/edenmonday/vaersikret), som
ligger i et eget repo og på et eget subdomene).

**Live:** https://edenmonday.no (når domenet er satt opp — se «Publisere på nett»)

## Teknisk stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev) — ren SPA, ingen backend
- Vanlig CSS (`src/index.css`), ingen CSS-rammeverk
- Egen liten i18n-løsning i `src/i18n.jsx` (React Context), ingen ekstern i18n-lib
- All tekst/innhold er hardkodet i kildekoden — ingen database eller CMS

## Prosjektstruktur

```
src/
  App.jsx              inngangspunkt, rendrer Home
  main.jsx              monterer React, wrapper i LangProvider
  i18n.jsx               tekst på norsk og engelsk + språk-context
  index.css              alle stiler
  components/
    Shared.jsx            LangSwitch og Footer, delt på tvers av sider
  pages/
    Home.jsx                selve forsiden (hero, prosjekter, CV)
public/
  favicon.svg               hjerte-favicon i samme farge som --accent
  screenshots/               skjermbilder til prosjektkortene
```

## Kjøre lokalt

```bash
cd ~/Documents/portfolio
npm install     # kun første gang / på ny maskin
npm run dev
```

Åpne http://localhost:5173 — siden oppdaterer seg automatisk når du lagrer en fil.

Andre kommandoer:

```bash
npm run build      # bygger produksjonsversjon til dist/
npm run preview    # forhåndsviser dist/ lokalt
```

## Hvor endrer jeg hva?

| Hva | Hvor |
|---|---|
| All tekst, begge språk | `src/i18n.jsx` — én `no:`-blokk og én `en:`-blokk. Endre alltid begge. |
| Fødselsdato (alderstelleren) | `src/pages/Home.jsx`, `BIRTH_DATE`. Format: `"ÅÅÅÅ-MM-DDTHH:MM:SS"` |
| Farger | `src/index.css`, øverst i `:root`. `--accent` er hovedfargen (rød) |
| Ferdighetslisten | `src/pages/Home.jsx` — søk etter `skills`, rediger listen |
| Footer (e-post, GitHub, LinkedIn, «Laget av...») | `src/components/Shared.jsx` |
| Favicon | `public/favicon.svg` |
| Sidetittel i nettleserfanen | `index.html` (`<title>`) |

### Legge til et nytt prosjekt i prosjektlisten

1. `src/i18n.jsx`: legg til nøkler i **både** `no:` og `en:`, f.eks.
   `p_minapp_title`, `p_minapp_tag`, `p_minapp_period`, `p_minapp_desc`
2. `src/pages/Home.jsx`: kopier hele `<div className="project">...</div>`-blokken
   under `<section id="projects">` og bytt nøkkelnavnene til de nye
3. Hvis prosjektet skal ha sin egen landingsside (som VærSikret): lag det som
   et eget Vite-prosjekt i en egen mappe/eget repo, og lenk til det med en
   vanlig `<a href="https://...">` i prosjektkortet

## Publisere på nett

### Første gang

1. **GitHub:** lag et nytt tomt repo på github.com (f.eks. `portfolio`), så:

   ```bash
   cd ~/Documents/portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/edenmonday/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel:** gå til [vercel.com](https://vercel.com) → logg inn med GitHub →
   «Add New → Project» → velg repoet → **Deploy**. Vercel kjenner igjen
   Vite automatisk. Du får en gratis `*.vercel.app`-adresse med det samme.

3. **Eget domene (valgfritt):** kjøp domenet (f.eks. hos
   [Domeneshop](https://domene.shop)). I Vercel: Settings → Domains → skriv
   inn domenet → legg inn DNS-oppføringene Vercel viser deg hos registraren.
   HTTPS ordnes automatisk.

### Hver gang etterpå

```bash
git add .
git commit -m "beskriv endringen"
git push
```

Vercel bygger og publiserer automatisk ved hver push til `main` (tar ~1 min).

## Notater

- `vercel.json` sender alle URL-er til `index.html`. Siden er i praksis
  én enkelt side (ingen klient-side ruter), så dette er bare en safety-net
  for direktelenker til f.eks. `#cv`.
- `node_modules/` og `dist/` er maskingenererte og skal aldri commites
  (`.gitignore` ordner det).
- Ingen tester er satt opp ennå.
