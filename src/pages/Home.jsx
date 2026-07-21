import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { LangSwitch, Footer } from "../components/Shared.jsx";

const BIRTH_DATE = new Date("2005-04-10T14:44:00");

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const calcAge = () => ((Date.now() - BIRTH_DATE.getTime()) / YEAR_MS).toFixed(9);

function LiveAge() {
  const [age, setAge] = useState(calcAge);
  useEffect(() => {
    const id = setInterval(() => setAge(calcAge()), 50);
    return () => clearInterval(id);
  }, []);
  return <span className="age">{age}</span>;
}

function HeroOrbs() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (ref.current) {
          const fade = Math.max(1 - y / 500, 0);
          ref.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) rotate(${y * 0.04}deg)`;
          ref.current.style.opacity = fade;
        }
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hero-orbs" ref={ref} aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
    </div>
  );
}

export default function Home() {
  const { t } = useLang();

  return (
    <div id="top">
      <div className="container">
        <header className="topbar">
          <a href="/" className="logo">
            eden monday
          </a>
          <LangSwitch />
        </header>

        <div className="hero">
          <HeroOrbs />
          <h1>{t("hero_hello")}</h1>
          <p>
            {t("hero_intro_pre")}
            <LiveAge />
            {t("hero_intro_post")}
          </p>
          <div className="cta-row">
            <a href="#cv" className="btn primary">
              {t("nav_cv")}
            </a>
            <a
              href="https://github.com/edenmonday"
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <section id="projects">
          <h2 className="section-title">{t("projects_title")}</h2>

          <div className="project">
            <span className="project-name">{t("p_vs_title")}</span>
            <span className="project-period">{t("p_vs_period")}</span>
            <span className="project-tag">{t("p_vs_tag")}</span>
            <p className="project-desc">{t("p_vs_desc")}</p>
            <span className="project-links">
              <a href="https://vaersikret.edenmonday.no">
                {t("view_project")} →
              </a>
              <a
                href="https://github.com/edenmonday/team-31"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")}
              </a>
            </span>
          </div>

        </section>

        <section id="cv">
          <h2 className="section-title">{t("cv_title")}</h2>

          <div className="cv-block">
            <h3>{t("cv_education")}</h3>
            
            <div className="cv-item">
              <div>
                <strong>{t("cv_edu1_title")}</strong>
                <span>{t("cv_edu1_place")}</span>
              </div>
              <span className="period">{t("cv_edu1_period")}</span>
            </div>

            <div className="cv-item"> 
              <div>
                <strong>{t("cv_edu2_title")}</strong>
                <span>{t("cv_edu2_place")}</span>
              </div>
              <span className="period">{t("cv_edu2_period")}</span>
            </div>
          </div>

          <div className="cv-block">
            <h3>{t("cv_experience")}</h3>
            <div className="cv-item">
              <div>
                <strong>{t("cv_exp1_title")}</strong>
                <span>{t("cv_exp1_place")}</span>

              </div>
              <span className="period">{t("cv_exp1_period")}</span>
            </div>
          </div>

          <div className="cv-block">
            <h3>{t("cv_volunteer")}</h3>
            <div className="cv-item">
              <div>
                <strong>{t("cv_volu1_title")}</strong>
                <span>{t("cv_volu1_place")}</span>
              </div>
              <span className="period">{t("cv_volu1_period")}</span>
            </div>
          </div>



          <div className="cv-block">
            <h3>{t("cv_skills")}</h3>
            <ul className="skills">
              {[
                "Kotlin",
                "Jetpack Compose",
                "Java",
                "Python",
                "React",
                "Git",
                "REST APIs",
                "HTML, CSS",
                "Git & GitHub",
                

                // TODO: legg til mer her baka
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="cv-block">
            <h3>{t("cv_contact")}</h3>
            <div className="cv-item">
              <div>
                <a href="mailto:eden.mo@icloud.com" className="pill-link">
                  eden.mo@icloud.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}