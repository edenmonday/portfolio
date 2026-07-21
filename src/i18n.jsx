import { createContext, useContext, useState } from "react";

export const translations = {
  no: {
    // Navg / felles
    nav_cv: "CV",
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "Til toppen ↑",
    made_by: "Laget av Eden",

    // Forside
    hero_hello: "Hei!",
    hero_intro_pre: "Jeg er en ",
    hero_intro_post:
      " år gammel utvikler og informatikkstudent ved Universitetet i Oslo.",
    projects_title: "Prosjekter",
    view_project: "Se prosjekt",
    github: "GitHub",

    // Prosjektbeskrivelser
    p_vs_title: "VærSikret",
    p_vs_tag: "Android-app for klimatilpasning",
    p_vs_period: "feb. 2026 - mai 2026",
    p_vs_desc:
      "Gruppeprosjekt i IN2000 ved UiO. App som viser historisk vind- og regndata for en valgt eiendom og anbefaler klimatiltak. Kotlin, Jetpack Compose, MVVM.",

    // CV seksjon
    cv_title: "CV",
    cv_education: "Utdanning",
    cv_edu1_title: "Bachelor i informatikk: Programmering og systemarkitektur",
    cv_edu1_place: "Universitetet i Oslo",
    cv_edu1_period: "2024 - 2027",
    cv_edu2_title: "Vidergående skole, studiespesialisering",
    cv_edu2_place: "Jessheim VGS",
    cv_edu2_period: "2021 - 2024",

    cv_experience: "Erfaring",
    cv_exp1_title: "Privat lærer", 
    cv_exp1_place: "Realfagshjelpen AS", 
    cv_exp1_period: "feb. 2025 - mai 2025",

    cv_volunteer: "Frivillig",
    cv_volu1_title: "Arrangementsjef", 
    cv_volu1_place: "Cybernetiske selskap, studentforening ved UiO", 
    cv_volu1_period: "aug. 2025 - okt. 2025",

    cv_skills: "Ferdigheter",
    cv_contact: "Kontakt",
  },
  en: {
    nav_home: "Home",
    nav_cv: "CV",
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "To the top ↑",
    made_by: "Made by Eden",

    hero_hello: "Hello!",
    hero_intro_pre: "I am a ",
    hero_intro_post:
      " year old developer and computer science student at the University of Oslo.", 
    projects_title: "Projects",
    view_project: "View project",
    github: "GitHub",

    p_vs_title: "VærSikret",
    p_vs_tag: "Android app for climate adaptation",
    p_vs_period: "feb. 2026 - may 2026",
    p_vs_desc:
      "Group project in subject IN2000 Software Engineering at UiO. App showing historical wind and rain data for a selected property, recommending climate adaptation measures. Kotlin, Jetpack Compose, MVVM.",

    cv_title: "CV",
    cv_education: "Education",
    cv_edu1_title: "BSc in Informatics: Programming and systemarchitecture", 
    cv_edu1_place: "University of Oslo",
    cv_edu1_period: "2024 - 2027",
    cv_edu2_title: "Upper secondary school",
    cv_edu2_place: "Jessheim secondary school, university preparatory programme",
    cv_edu2_period: "2021 - 2024", 
    
    cv_experience: "Experience",
    cv_exp1_title: "Private tutor", 
    cv_exp1_place: "Realfagshjelpen AS", 
    cv_exp1_period: "feb. 2025 - may 2025",

    cv_volunteer: "Volunteer",
    cv_volu1_title: "Events manager", 
    cv_volu1_place: "Cybernetic company, student association at UiO", 
    cv_volu1_period: "aug. 2025 - oct. 2025",

    cv_skills: "Skills",
    cv_contact: "Contact",
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
