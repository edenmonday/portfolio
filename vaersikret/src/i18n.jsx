import { createContext, useContext, useState } from "react";

export const translations = {
  no: {
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "Til toppen ↑",
    made_by: "Laget av Eden",
    github: "GitHub",

    vs_back: "← eden monday",
    vs_tagline: "Er boligen din rustet for klimaet?",
    vs_lead:
      "VærSikret viser deg historisk vind- og regndata for eiendommen din, og anbefaler konkrete klimatiltak basert på data fra Meteorologisk institutt.",
    vs_get_github: "Se koden på GitHub",
    vs_features_title: "Hva appen gjør",
    vs_f1_title: "Velg eiendom på kartet",
    vs_f1_desc:
      "Søk på adresse eller trykk i kartet. Mapbox-basert kart med geokoding frem og tilbake.",
    vs_f2_title: "Historisk vinddata",
    vs_f2_desc:
      "Vindkast og middelvind fra nærmeste målestasjon, klassifisert etter Beaufort-skalaen — med varsling om uvanlig kraftige målinger.",
    vs_f3_title: "Regn og IDF-analyse",
    vs_f3_desc:
      "Historiske regnobservasjoner og IDF-beregninger (intensitet-varighet-frekvens) fra Frost API.",
    vs_f4_title: "Anbefalte klimatiltak",
    vs_f4_desc:
      "Filtrerbar liste over tiltak tilpasset værutfordringene på din eiendom, med detaljert veiledning.",
    vs_tech_title: "Teknologi",
    vs_tech_desc:
      "Bygget med Kotlin og Jetpack Compose etter MVVM-arkitektur med unidirectional data flow. Testet med JUnit, Robolectric og Espresso.",
    vs_data_title: "Datakilder",
    vs_data_desc:
      "Frost API fra Meteorologisk institutt (vind- og regnobservasjoner) og Mapbox (kart og geokoding).",
    vs_team_title: "Om prosjektet",
    vs_team_desc:
      "Utviklet som gruppeprosjekt i emnet IN2000 Software Engineering med prosjektarbeid ved Universitetet i Oslo, våren 2026.",
  },
  en: {
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "To the top ↑",
    made_by: "Made by Eden",
    github: "GitHub",

    vs_back: "← eden monday",
    vs_tagline: "Is your home ready for the climate?",
    vs_lead:
      "VærSikret shows you historical wind and rain data for your property and recommends concrete climate adaptation measures — powered by data from the Norwegian Meteorological Institute.",
    vs_get_github: "View the code on GitHub",
    vs_features_title: "What the app does",
    vs_f1_title: "Pick a property on the map",
    vs_f1_desc:
      "Search for an address or tap the map. Mapbox-based map with forward and reverse geocoding.",
    vs_f2_title: "Historical wind data",
    vs_f2_desc:
      "Wind gusts and mean wind from the nearest weather station, classified on the Beaufort scale — flagging unusually strong measurements.",
    vs_f3_title: "Rain and IDF analysis",
    vs_f3_desc:
      "Historical rain observations and IDF (intensity - duration - frequency) calculations from the Frost API.",
    vs_f4_title: "Recommended measures",
    vs_f4_desc:
      "Filterable list of climate adaptation measures tailored to your property's weather challenges, with detailed guidance.",
    vs_tech_title: "Technology",
    vs_tech_desc:
      "Built with Kotlin and Jetpack Compose using MVVM architecture with unidirectional data flow. Tested with JUnit, Robolectric and Espresso.",
    vs_data_title: "Data sources",
    vs_data_desc:
      "The Frost API from the Norwegian Meteorological Institute (wind and rain observations) and Mapbox (maps and geocoding).",
    vs_team_title: "About the project",
    vs_team_desc:
      "Developed as a group project in IN2000 Software Engineering at the University of Oslo, spring 2026.",
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
