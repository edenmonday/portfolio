# VærSikret — nettside

Landingsside for VærSikret, gruppeprosjektet vårt i IN2000 ved UiO
(Android-app for klimatilpasning). Selve appen er skrevet i Kotlin og ligger
i [team-31](https://github.com/edenmonday/team-31) — dette er bare den
lille nettsiden som viser den frem.

Live på https://vaersikret.edenmonday.no

## Kjøre lokalt

```bash
npm install
npm run dev
```

Åpner på http://localhost:5173.

## Stack

Vite + React, vanlig CSS. Ingen router, ingen backend — det er én side.

- `src/App.jsx` — selve innholdet
- `src/i18n.jsx` — tekstene, norsk og engelsk
- `public/screenshots/` — skjermbildene av appen (bytt ut `screen1.png` / `screen2.png` for å oppdatere)
