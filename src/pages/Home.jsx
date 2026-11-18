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

// start/end: [år, måned 1-12]. end: null = pågår. years: vis bare årstall.
const CV = [
  { id: "cafe", type: "exp", start: [2026, 10], end: null },
  { id: "volu1", type: "vol", start: [2025, 8], end: [2025, 10] },
  { id: "tutor", type: "exp", start: [2025, 2], end: null },
  { id: "edu1", type: "edu", start: [2024, 8], end: [2027, 6], years: true, ongoing: true },
  { id: "edu2", type: "edu", start: [2021, 8], end: [2024, 6], years: true },
];

const TYPE_LABEL = { exp: "cv_experience", vol: "cv_volunteer", edu: "cv_education" };
const FILTERS = ["all", "exp", "edu", "vol"];

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

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    el.querySelectorAll(".tl-item").forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return ref;
}

function CvTimeline() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const ref = useReveal();
  const items = CV.filter((i) => filter === "all" || i.type === filter);

  return (
    <>
      <div className="cv-filters" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {t(f === "all" ? "cv_all" : TYPE_LABEL[f])}
            <span className="count">
              {f === "all" ? CV.length : CV.filter((i) => i.type === f).length}
            </span>
          </button>
        ))}
      </div>

      <ol className="timeline" ref={ref}>
        {items.map((item, i) => {
          const current = !item.end || item.ongoing;
          const duration = formatDuration(item, t);
          return (
            <li
              key={item.id}
              className={`tl-item type-${item.type}${current ? " current" : ""}`}
              style={{ "--delay": `${i * 70}ms` }}
            >
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <div className="tl-top">
                  <span className="tl-type">{t(TYPE_LABEL[item.type])}</span>
                  {current && (
                    <span className="tl-now">
                      {t(item.ongoing ? "cv_ongoing" : "cv_now")}
                    </span>
                  )}
                </div>
                <strong className="tl-title">{t(`cv_${item.id}_title`)}</strong>
                <span className="tl-place">{t(`cv_${item.id}_place`)}</span>
                <span className="tl-period">
                  {formatPeriod(item, t)}
                  {duration && <span className="tl-duration"> · {duration}</span>}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </>
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

          <CvTimeline />

          <div className="cv-block skills-block">
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
