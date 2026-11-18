import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { LangSwitch, Footer } from "../components/Shared.jsx";

const BIRTH_DATE = new Date("2005-04-10T14:44:00");
const EMAIL = "eden.mo@icloud.com";

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const calcAge = () => ((Date.now() - BIRTH_DATE.getTime()) / YEAR_MS).toFixed(9);

const SKILLS = [
  "Kotlin",
  "Jetpack Compose",
  "Java",
  "Python",
  "React",
  "HTML & CSS",
  "REST APIs",
  "Git & GitHub",
];

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

function CvItem({ title, place, period }) {
  return (
    <div className="cv-item">
      <div>
        <strong>{title}</strong>
        <span>{place}</span>
      </div>
      <span className="period">{period}</span>
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
          <nav className="topnav">
            <a href="#about">{t("nav_about")}</a>
            <a href="#projects">{t("nav_projects")}</a>
            <a href="#cv">{t("nav_cv")}</a>
            <a href="#contact">{t("nav_contact")}</a>
          </nav>
          <LangSwitch />
        </header>

        <div className="hero">
          <HeroOrbs />
          <div className="hero-text">
            <p className="eyebrow">{t("hero_eyebrow")}</p>
            <h1>{t("hero_hello")}</h1>
            <p className="hero-intro">
              {t("hero_intro_pre")}
              <LiveAge />
              {t("hero_intro_post")}
            </p>
            <div className="cta-row">
              <a href={`mailto:${EMAIL}`} className="btn primary">
                {t("hero_cta")}
              </a>
              <a href="#about" className="btn">
                {t("nav_about")}
              </a>
              <a href="#cv" className="btn">
                {t("nav_cv")}
              </a>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src="/eden.jpg"
              alt={t("photo_alt")}
              width="825"
              height="1100"
              fetchpriority="high"
            />
          </figure>
        </div>

        <section id="about">
          <h2 className="section-title">{t("about_title")}</h2>
          <div className="about">
            <div className="about-text">
              <p>{t("about_p1")}</p>
              <p>{t("about_p2")}</p>
            </div>
            <div className="about-focus">
              <h3>{t("about_focus")}</h3>
              <ul className="chips accent">
                {t("focus").map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="projects">
          <h2 className="section-title">{t("projects_title")}</h2>

          <div className="project">
            <span className="project-name">{t("p_pf_title")}</span>
            <span className="project-period">{t("p_pf_period")}</span>
            <span className="project-tag">{t("p_pf_tag")}</span>
            <p className="project-desc">{t("p_pf_desc")}</p>
            <span className="project-links">
              <a
                href="https://github.com/edenmonday/portfolio"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")}
              </a>
            </span>
          </div>

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
            <h3>{t("cv_experience")}</h3>
            <CvItem
              title={t("cv_exp1_title")}
              place={t("cv_exp1_place")}
              period={t("cv_exp1_period")}
            />
          </div>

          <div className="cv-block">
            <h3>{t("cv_volunteer")}</h3>
            <CvItem
              title={t("cv_volu1_title")}
              place={t("cv_volu1_place")}
              period={t("cv_volu1_period")}
            />
          </div>

          <div className="cv-block">
            <h3>{t("cv_education")}</h3>
            <CvItem
              title={t("cv_edu1_title")}
              place={t("cv_edu1_place")}
              period={t("cv_edu1_period")}
            />
            <CvItem
              title={t("cv_edu2_title")}
              place={t("cv_edu2_place")}
              period={t("cv_edu2_period")}
            />
          </div>

          <div className="cv-block">
            <h3>{t("cv_skills")}</h3>
            <ul className="chips">
              {SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>{t("contact_title")}</h2>
          <p>{t("contact_text")}</p>
          <a href={`mailto:${EMAIL}`} className="btn primary big">
            {EMAIL}
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}
