# VærSikret — landingsside

Landingsside for VærSikret, en Android-app for klimatilpasning (gruppeprosjekt
i IN2000 Software Engineering ved UiO). Skilt ut fra
[eden monday-portfolioen](https://github.com/edenmonday/portfolio) som et eget
repo/prosjekt slik at den kan leve på sitt eget subdomene
(`vaersikret.edenmonday.no`), på samme måte som en landingsside for et
enkeltprosjekt gjerne skilles fra hovedsiden.

**Live:** https://vaersikret.edenmonday.no (når subdomenet er satt opp — se
«Publisere på nett»)

**App-koden:** https://github.com/edenmonday/team-31

## Teknisk stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev) — ren SPA, ingen backend
- Vanlig CSS (`src/index.css`), ingen CSS-rammeverk
- Samme lille i18n-løsning som hovedportfolioen (`src/i18n.jsx`)

## Prosjektstruktur

```
src/
  App.jsx              hele siden (hero, funksjoner, teknologi/data/team)
  main.jsx              monterer React, wrapper i LangProvider
  i18n.jsx               tekst på norsk og engelsk + språk-context
  index.css              alle stiler
  components/
    Shared.jsx            LangSwitch og Footer
public/
  favicon.png               app-logoen, brukt som favicon
  screenshots/
    screen1.png              venstre telefonskjermbilde
    screen2.png              høyre telefonskjermbilde
```

## Kjøre lokalt

```bash
cd ~/Documents/vaersikret
npm install     # kun første gang / på ny maskin
npm run dev
```

Åpne http://localhost:5173.

Andre kommandoer:

```bash
npm run build      # bygger produksjonsversjon til dist/
npm run preview    # forhåndsviser dist/ lokalt
```

## Hvor endrer jeg hva?

| Hva | Hvor |
|---|---|
| All tekst, begge språk | `src/i18n.jsx` |
| Innhold/seksjoner | `src/App.jsx` |
| Farger/stil | `src/index.css`, `--vs-*`-variablene øverst |
| Skjermbilder av appen | Bytt ut `public/screenshots/screen1.png` og `screen2.png` (samme filnavn — uten dem vises en plassholder automatisk) |
| Favicon | `public/favicon.png` |
| Footer (e-post, GitHub, LinkedIn, «Laget av...») | `src/components/Shared.jsx` |

## Publisere på nett

### Første gang

1. **GitHub:** lag et nytt tomt repo (f.eks. `vaersikret`), så:

   ```bash
   cd ~/Documents/vaersikret
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/edenmonday/vaersikret.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel:** [vercel.com](https://vercel.com) → logg inn med GitHub →
   «Add New → Project» → velg repoet → **Deploy**. Du får en gratis
   `*.vercel.app`-adresse med det samme.

3. **Subdomene:** i Vercel: Settings → Domains → skriv inn
   `vaersikret.edenmonday.no` → legg inn DNS-oppføringen Vercel viser deg hos
   registraren (samme sted som du setter opp `edenmonday.no` for
   hovedportfolioen).

Prosjektkortet på hovedportfolioen lenker allerede til
`https://vaersikret.edenmonday.no` — bytt lenken i den andre repoets
`src/pages/Home.jsx` hvis du ender opp med en annen URL.

### Hver gang etterpå

```bash
git add .
git commit -m "beskriv endringen"
git push
```

## Notater

- `node_modules/` og `dist/` er maskingenererte og skal aldri commites
  (`.gitignore` ordner det).
- Ingen tester er satt opp ennå.
