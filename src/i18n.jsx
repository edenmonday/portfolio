import { createContext, useContext, useEffect, useState } from "react";

export const translations = {
  no: {
    // Nav / felles
    nav_about: "Om meg",
    nav_projects: "Prosjekter",
    nav_cv: "CV",
    nav_contact: "Kontakt",
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "Til toppen ↑",
    made_by: "Laget av Eden",
    copy_email: "Kopier e-postadresse",

    // Forside
    hero_eyebrow: "Informatikk × markedsføring",
    hero_hello: "Hei, jeg er ",
    hero_intro_pre: "Jeg er en ",
    hero_intro_post:
      " år gammel informatikkstudent ved Universitetet i Oslo, med hjertet i markedsføring og branding.",
    hero_cta: "Ta kontakt",
    photo_alt: "Portrett av Eden Monday",

    // Om meg
    about_title: "Om meg",
    about_p1:
      "Jeg studerer informatikk ved Universitetet i Oslo, men det jeg virkelig brenner for er hvordan merkevarer bygges, og hvordan de når ut til folk. Koding har gitt meg god forståelse for hvordan nettsider, apper og plattformer fungerer bak kulissene. Nå vil jeg bruke det på markedsføring, innhold og branding.",
    about_p2:
      "Jeg er strukturert, lærer fort og liker å se ting gå fra idé til ferdig resultat. Denne nettsiden har jeg laget selv, fra design til kode. Nå ser jeg etter muligheter til å lære av folk som bygger merkevarer i praksis.",
    about_focus: "Det jeg vil jobbe med",
    focus: [
      "Branding",
      "Sosiale medier",
      "Innholdsproduksjon",
      "Digital markedsføring",
      "Nettsider",
    ],

    // Bli kjent med meg
    nav_life: "Livet mitt",
    life_title: "Bli kjent med meg",
    life_intro:
      "Utenom studiene er jeg veldig glad i interiør, gode venner, planter, musikk og vin, aller helst alt på én gang! Her er litt fra livet mitt<3",
    life_all: "Alt",
    life_cats: { venner: "Venner", interior: "Interiør", planter: "Planter", ikebana: "Ikebana", vin: "Vin & mat", kunst: "Kunst", musikk: "Musikk", vibes: "Vibes" },
    life_more: "Vis alle",
    life_less: "Vis færre",
    life_close: "Lukk",
    life_prev: "Forrige bilde",
    life_next: "Neste bilde",

    projects_title: "Prosjekter",
    view_project: "Se prosjekt",
    github: "GitHub",

    // Prosjektbeskrivelser
    p_vs_title: "VærSikret",
    p_vs_tag: "Android-app for klimatilpasning",
    p_vs_period: "feb. 2026 – mai 2026",
    p_vs_desc:
      "Gruppeprosjekt i IN2000 ved UiO. Android-app som henter observasjonshistorikken for en valgt eiendom fra Meteorologisk institutts Frost API, regner ut hvor uvanlig vinden og nedbøren er akkurat der, og foreslår konkrete klimatiltak. Laget også en egen landingsside for appen. Kotlin, Jetpack Compose, MVVM.",

    p_pf_title: "edenmonday.no",
    p_pf_tag: "Min personlige merkevare på nett",
    p_pf_period: "juli 2026 – nå",
    p_pf_desc:
      "Designet og kodet fra bunnen av med React og Vite, på norsk og engelsk. Jeg har valgt farger, typografi og tone selv, slik at siden skal kjennes som meg.",

    // CV seksjon
    cv_title: "CV",
    cv_all: "Alt",
    cv_education: "Utdanning",
    cv_experience: "Erfaring",
    cv_right_now: "Akkurat nå",
    cv_right_now_text: "Studerer informatikk ved UiO, jobber på Åpent Bakeri på Torshov og er privatlærer hos Realfagshjelpen.",
    cv_volunteer: "Frivillig",
    cv_now: "Nå",
    cv_ongoing: "Pågår",
    cv_years: (n) => `${n} år`,
    cv_months: (n) => `${n} mnd`,
    months: ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."],

    cv_cafe_title: "Kafémedarbeider",
    cv_cafe_place: "Åpent Bakeri, Torshov",
    cv_tutor_title: "Privatlærer",
    cv_tutor_place: "Realfagshjelpen AS",
    cv_volu1_title: "Arrangementsjef",
    cv_volu1_place: "Cybernetisk Selskab, studentforening ved UiO",
    cv_edu1_title: "Bachelor i informatikk: Programmering og systemarkitektur",
    cv_edu1_place: "Universitetet i Oslo",
    cv_edu2_title: "Videregående skole, studiespesialisering",
    cv_edu2_place: "Jessheim videregående skole",

    cv_skills: "Ferdigheter",

    // Kontakt
    contact_title: "Skal vi jobbe sammen?",
    contact_text:
      "Jeg er alltid klar for nye prosjekter og å lære mer. Send meg en e-post, så svarer jeg raskt.",
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_cv: "CV",
    nav_contact: "Contact",
    lang_no: "Norsk",
    lang_en: "English",
    to_top: "Back to top ↑",
    made_by: "Made by Eden",
    copy_email: "Copy email address",

    hero_eyebrow: "Computer science × marketing",
    hero_hello: "Hi, I'm ",
    hero_intro_pre: "I'm a ",
    hero_intro_post:
      " year old computer science student at the University of Oslo, with a heart for marketing and branding.",
    hero_cta: "Get in touch",
    photo_alt: "Portrait of Eden Monday",

    about_title: "About me",
    about_p1:
      "I study computer science at the University of Oslo, but what I'm truly passionate about is how brands are built and how they reach people. Coding has given me a solid understanding of how websites, apps and platforms work behind the scenes. Now I want to put that to use in marketing, content and branding.",
    about_p2:
      "I'm organised, a quick learner, and I love seeing things go from idea to finished result. I designed and built this website myself, from layout to code. I'm now looking for opportunities to learn from people who build brands in practice.",
    about_focus: "What I want to work with",
    focus: [
      "Branding",
      "Social media",
      "Content creation",
      "Digital marketing",
      "Websites",
    ],

    nav_life: "My life",
    life_title: "Get to know me",
    life_intro:
      "Outside of my studies I love interiors, good friends, plants, music and wine, ideally all at once! Here's a little bit of my life<3",
    life_all: "All",
    life_cats: { venner: "Friends", interior: "Interiors", planter: "Plants", ikebana: "Ikebana", vin: "Wine & food", kunst: "Art", musikk: "Music", vibes: "Vibes" },
    life_more: "Show all",
    life_less: "Show fewer",
    life_close: "Close",
    life_prev: "Previous photo",
    life_next: "Next photo",

    projects_title: "Projects",
    view_project: "View project",
    github: "GitHub",

    p_vs_title: "VærSikret",
    p_vs_tag: "Android app for climate adaptation",
    p_vs_period: "Feb 2026 – May 2026",
    p_vs_desc:
      "Group project in IN2000 Software Engineering at UiO. Android app that pulls the observation history for a chosen property from the Norwegian Meteorological Institute's Frost API, works out how unusual the wind and rainfall are at that exact spot, and suggests concrete climate adaptation measures. Also built a landing page for the app. Kotlin, Jetpack Compose, MVVM.",

    p_pf_title: "edenmonday.no",
    p_pf_tag: "My personal brand online",
    p_pf_period: "July 2026 – present",
    p_pf_desc:
      "Designed and built from scratch with React and Vite, in Norwegian and English. I chose the colours, typography and tone myself, so the site feels like me.",

    cv_title: "CV",
    cv_all: "All",
    cv_education: "Education",
    cv_experience: "Experience",
    cv_right_now: "Right now",
    cv_right_now_text: "Studying computer science at UiO, working at Åpent Bakeri in Torshov and tutoring with Realfagshjelpen.",
    cv_volunteer: "Volunteering",
    cv_now: "Now",
    cv_ongoing: "Ongoing",
    cv_years: (n) => `${n} yr${n === 1 ? "" : "s"}`,
    cv_months: (n) => `${n} mo`,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    cv_cafe_title: "Café worker",
    cv_cafe_place: "Åpent Bakeri, Torshov",
    cv_tutor_title: "Private tutor",
    cv_tutor_place: "Realfagshjelpen AS",
    cv_volu1_title: "Events manager",
    cv_volu1_place: "Cybernetisk Selskab, student association at UiO",
    cv_edu1_title: "BSc in Informatics: Programming and System Architecture",
    cv_edu1_place: "University of Oslo",
    cv_edu2_title: "Upper secondary school, university preparatory programme",
    cv_edu2_place: "Jessheim Upper Secondary School",

    cv_skills: "Skills",

    contact_title: "Let's work together?",
    contact_text:
      "I'm always up for new projects and learning more. Send me an email and I'll get back to you quickly.",
  },
};

const LangContext = createContext(null);

const readLang = () => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "no" || saved === "en") return saved;
  } catch {}
  return "no";
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const choose = (l) => {
    setLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
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
