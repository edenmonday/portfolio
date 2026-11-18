import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { LangSwitch, Footer, SectionHead } from "../components/Shared.jsx";
import Life from "../components/Life.jsx";

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

// start/end: [år, måned 1-12]. end: null = pågår. years: vis bare årstall.
const CV = {
  exp: [
    { id: "cafe", start: [2026, 10], end: null },
    { id: "tutor", start: [2025, 2], end: null },
  ],
  vol: [{ id: "volu1", start: [2025, 8], end: [2025, 10] }],
  edu: [
    { id: "edu1", start: [2024, 8], end: [2027, 6], years: true, ongoing: true },
    { id: "edu2", start: [2021, 8], end: [2024, 6], years: true },
  ],
};

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
        const y = Math.min(window.scrollY, 500); // usynlig etter 500px, så stopp der
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

function formatPeriod(item, t) {
  const m = t("months");
  const fmt = ([y, mo]) => (item.years ? `${y}` : `${m[mo - 1]} ${y}`);
  return `${fmt(item.start)} – ${item.end ? fmt(item.end) : t("cv_now").toLowerCase()}`;
}

function formatDuration(item, t) {
  if (item.years) return null;
  const now = new Date();
  const [ey, em] = item.end ?? [now.getFullYear(), now.getMonth() + 1];
  const total = (ey - item.start[0]) * 12 + (em - item.start[1]) + 1;
  const y = Math.floor(total / 12);
  const mo = total % 12;
  return [y && t("cv_years")(y), mo && t("cv_months")(mo)].filter(Boolean).join(" ");
}

function CvGroup({ type, items }) {
  const { t } = useLang();
  const label = { exp: "cv_experience", vol: "cv_volunteer", edu: "cv_education" }[type];
  return (
    <div className="cv-group">
      <h3 className="cv-group-title">{t(label)}</h3>
      <ul className="cv-list">
        {items.map((item) => {
          const current = !item.end || item.ongoing;
          const duration = formatDuration(item, t);
          return (
            <li key={item.id} className={`cv-row${current ? " current" : ""}`}>
              <span className="cv-when">{formatPeriod(item, t)}</span>
              <div className="cv-what">
                <strong>
                  {t(`cv_${item.id}_title`)}
                  {current && <span className="cv-dot" aria-label={t("cv_now")} />}
                </strong>
                <span>
                  {t(`cv_${item.id}_place`)}
                  {duration && <em> · {duration}</em>}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
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
            <a href="#life">{t("nav_life")}</a>
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
            <h1>
              {t("hero_hello")}
              <span className="nowrap">
                <span className="hero-name">Eden</span>!{" "}
                <span className="heart" aria-hidden="true">
                  ♥
                </span>
              </span>
            </h1>
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
          <SectionHead num="01" title={t("about_title")} />
          <div className="about">
            <div className="about-text">
              <p>{t("about_p1")}</p>
              <p>{t("about_p2")}</p>
            </div>
            <aside className="about-focus">
              <h3>{t("about_focus")}</h3>
              <ul className="focus-list">
                {t("focus").map((f, i) => (
                  <li key={f}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <Life />

        <section id="projects">
          <SectionHead num="03" title={t("projects_title")} />

          <article className="project">
            <div className="project-head">
              <h3 className="project-name">{t("p_pf_title")}</h3>
              <span className="project-period">{t("p_pf_period")}</span>
            </div>
            <p className="project-tag">{t("p_pf_tag")}</p>
            <p className="project-desc">{t("p_pf_desc")}</p>
            <span className="project-links">
              <a
                href="https://github.com/edenmonday/portfolio"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")} ↗
              </a>
            </span>
          </article>

          <article className="project">
            <div className="project-head">
              <h3 className="project-name">{t("p_vs_title")}</h3>
              <span className="project-period">{t("p_vs_period")}</span>
            </div>
            <p className="project-tag">{t("p_vs_tag")}</p>
            <p className="project-desc">{t("p_vs_desc")}</p>
            <span className="project-links">
              <a href="https://vaersikret.edenmonday.no">{t("view_project")} →</a>
              <a
                href="https://github.com/edenmonday/team-31"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")} ↗
              </a>
            </span>
          </article>
        </section>

        <section id="cv">
          <SectionHead num="04" title={t("cv_title")} />

          <div className="cv-now">
            <span className="cv-now-label">{t("cv_right_now")}</span>
            <p>{t("cv_right_now_text")}</p>
          </div>

          <div className="cv-grid">
            <div>
              <CvGroup type="exp" items={CV.exp} />
              <CvGroup type="vol" items={CV.vol} />
            </div>
            <div>
              <CvGroup type="edu" items={CV.edu} />
              <div className="cv-group">
                <h3 className="cv-group-title">{t("cv_skills")}</h3>
                <ul className="chips">
                  {SKILLS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
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
