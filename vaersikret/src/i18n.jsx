import { createContext, useContext, useState } from "react";

export const translations = {
  no: {
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "Til toppen ↑",
    made_by: "Laget av Eden",
    github: "GitHub",
    copy_email: "Kopier e-postadresse",

    vs_back: "← eden monday",
    vs_tagline: "Hvor utsatt er eiendommen din for vind og regn?",
    vs_lead:
      "VærSikret slår opp eiendommen i kartet, henter observasjonshistorikken fra nærmeste målestasjon hos Meteorologisk institutt, og regner ut hvor uvanlig vinden og nedbøren er akkurat der. Deretter foreslår appen tiltak du faktisk kan gjøre noe med.",
    vs_get_github: "Se koden på GitHub",
    vs_features_title: "Hva appen gjør",
    vs_f1_title: "Adresse eller punkt i kartet",
    vs_f1_desc:
      "Søk opp en adresse, eller trykk rett i kartet. Geokodingen går begge veier, så du får bekreftet hvilken eiendom tallene gjelder for før du går videre.",
    vs_f2_title: "Vind målt mot stedets egen historikk",
    vs_f2_desc:
      "Vindkast og middelvind fra nærmeste målestasjon. Grensen for «uvanlig» regnes ut fra persentiler i stedets egne observasjoner — 95, 99 og 99,9 — så et vindkast vurderes mot hva som faktisk er mye der, ikke mot en nasjonal grenseverdi. Fordelingen vises også på Beaufort-skalaen.",
    vs_f3_title: "Nedbør som IDF-tall",
    vs_f3_desc:
      "Regnobservasjonene sammenstilles som intensitet–varighet–frekvens: hvor mye som faller på ti minutter eller seks timer, og hvor ofte det gjentar seg. Det er tallene man trenger for å vurdere drenering og takrenner.",
    vs_f4_title: "Fjorten tiltak, filtrerbare",
    vs_f4_desc:
      "Tiltakskatalogen kan filtreres på vind eller regn, kostnad, tidsperspektiv og nytteverdi — og på om du kan gjøre jobben selv eller bør hente inn fagfolk. Hvert tiltak har egen side med begrunnelse, vedlikehold og fallgruver.",
    vs_flow_title: "Slik fungerer det",
    prev: "Forrige",
    next: "Neste",
    vs_flow1_cap:
      "Fra velkomstskjerm til valgt adresse: søk eller trykk i kartet, og velg hva du vil se på eiendommen.",
    vs_flow2_cap:
      "Fra historisk vinddata til et konkret tiltak: filtrer på det som er relevant, og gå i dybden på ett av dem.",
    vs_tech_title: "Teknologi",
    vs_tech_desc:
      "Kotlin og Jetpack Compose med Material 3. MVVM med ViewModel og StateFlow, Ktor Client og kotlinx.serialization mot API-ene, Navigation Compose mellom skjermene og Vico til grafene. Enhetstester i JUnit og Robolectric, UI-tester i Espresso.",
    vs_data_title: "Datakilder",
    vs_data_desc:
      "Frost API fra Meteorologisk institutt gir observasjonene. Appen finner nærmeste målestasjon ut fra koordinatene og analyserer rådataene selv — døgnmaksimum, persentiler og Beaufort-fordeling regnes ut i appen. Mapbox står for kart og geokoding.",
    vs_team_title: "Om prosjektet",
    vs_team_desc:
      "Gruppeprosjekt i IN2000 Software Engineering ved Universitetet i Oslo, våren 2026. Appen er bygget fra bunnen av: API-integrasjon, dataanalyse, arkitektur og brukergrensesnitt.",
  },
  en: {
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "To the top ↑",
    made_by: "Made by Eden",
    github: "GitHub",
    copy_email: "Copy email address",

    vs_back: "← eden monday",
    vs_tagline: "How exposed is your property to wind and rain?",
    vs_lead:
      "VærSikret finds your property on the map, pulls the observation history from the nearest weather station at the Norwegian Meteorological Institute, and works out how unusual the wind and rainfall actually are at that spot. Then it suggests measures you can do something about.",
    vs_get_github: "View the code on GitHub",
    vs_features_title: "What the app does",
    vs_f1_title: "An address, or a point on the map",
    vs_f1_desc:
      "Search for an address or tap the map directly. Geocoding runs both ways, so you can confirm which property the numbers belong to before going further.",
    vs_f2_title: "Wind measured against the local record",
    vs_f2_desc:
      "Gusts and mean wind from the nearest station. The threshold for “unusual” comes from percentiles in that station's own history — 95th, 99th and 99.9th — so a gust is judged against what is genuinely a lot there, not against a national limit. The distribution is also shown on the Beaufort scale.",
    vs_f3_title: "Rainfall as IDF figures",
    vs_f3_desc:
      "Rain observations compiled as intensity–duration–frequency: how much falls in ten minutes or six hours, and how often it repeats. These are the numbers you need to assess drainage and gutters.",
    vs_f4_title: "Fourteen measures, filterable",
    vs_f4_desc:
      "The catalogue filters by wind or rain, cost, time frame and benefit — and by whether it is a job you can do yourself or one for a professional. Each measure has its own page with reasoning, maintenance and pitfalls.",
    vs_flow_title: "How it works",
    prev: "Previous",
    next: "Next",
    vs_flow1_cap:
      "From the welcome screen to a chosen address: search or tap the map, then pick what you want to see for the property.",
    vs_flow2_cap:
      "From historical wind data to a specific measure: filter for what matters, then dig into one of them.",
    vs_tech_title: "Technology",
    vs_tech_desc:
      "Kotlin and Jetpack Compose with Material 3. MVVM with ViewModel and StateFlow, Ktor Client and kotlinx.serialization against the APIs, Navigation Compose between screens and Vico for the charts. Unit tests in JUnit and Robolectric, UI tests in Espresso.",
    vs_data_title: "Data sources",
    vs_data_desc:
      "The Frost API from the Norwegian Meteorological Institute provides the observations. The app locates the nearest station from the coordinates and analyses the raw data itself — daily maxima, percentiles and Beaufort distribution are all computed in the app. Mapbox handles maps and geocoding.",
    vs_team_title: "About the project",
    vs_team_desc:
      "A group project in IN2000 Software Engineering at the University of Oslo, spring 2026. The app was built from scratch: API integration, data analysis, architecture and user interface.",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || "no"
  );
  const choose = (l) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };
  const t = (key) => translations[lang][key] ?? key;
  return (
    <LangContext.Provider value={{ lang, setLang: choose, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
