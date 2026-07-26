import { useEffect, useRef, useState } from "react";
import { useLang } from "./i18n.jsx";
import { LangSwitch, Footer } from "./components/Shared.jsx";

/*
  Skjermbilder ligger i public/screenshots/:
    screen1.png, screen2.png   enkeltskjermer i toppen
    flow1.png, flow2.png       brede gjennomgangsbilder lenger ned
  Mangler en fil, hoppes den over (enkeltskjermene viser en plassholder).
*/
function Shot({ src, label, icon }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="shot">
      {failed ? (
        <div className="placeholder">
          <span className="icon">{icon}</span>
          <span>{label}</span>
        </div>
      ) : (
        <img src={src} alt={label} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

/*
  Karusell med native scroll-snap: sveiping på mobil og touchpad kommer gratis,
  pilene og prikkene styrer den samme scrollingen.
*/
function FlowSection() {
  const { t } = useLang();
  const trackRef = useRef(null);
  const [failed, setFailed] = useState({});
  const [index, setIndex] = useState(0);

  const slides = [
    { src: "/screenshots/flow1.png", caption: t("vs_flow1_cap") },
    { src: "/screenshots/flow2.png", caption: t("vs_flow2_cap") },
    { src: "/screenshots/screen3.png", caption: t("vs_flow3_cap") },
  ].filter((s) => !failed[s.src]);

  // Holder prikkene i takt med hvor brukeren har sveipet
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setIndex(Math.min(Math.max(i, 0), slides.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(i, 0), slides.length - 1);
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  if (slides.length === 0) return null;

  return (
    <section>
      <h2 className="section-title">{t("vs_flow_title")}</h2>

      <div className="carousel">
        <div className="carousel-track" ref={trackRef}>
          {slides.map((s) => (
            <figure className="carousel-slide" key={s.src}>
              <div className="carousel-frame">
                <img
                  src={s.src}
                  alt={s.caption}
                  onError={() => setFailed((f) => ({ ...f, [s.src]: true }))}
                />
              </div>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow prev"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label={t("prev")}
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-arrow next"
              onClick={() => goTo(index + 1)}
              disabled={index === slides.length - 1}
              aria-label={t("next")}
            >
              ›
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="carousel-dots">
          {slides.map((s, i) => (
            <button
              type="button"
              key={s.src}
              className={i === index ? "active" : ""}
              onClick={() => goTo(i)}
              aria-label={`${t("vs_flow_title")} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const { t } = useLang();

  const features = [
    { icon: "🗺️", title: t("vs_f1_title"), desc: t("vs_f1_desc") },
    { icon: "💨", title: t("vs_f2_title"), desc: t("vs_f2_desc") },
    { icon: "🌧️", title: t("vs_f3_title"), desc: t("vs_f3_desc") },
    { icon: "🛠️", title: t("vs_f4_title"), desc: t("vs_f4_desc") },
  ];

  return (
    <div className="vs-page" id="top">
      <div className="container">
        <header className="topbar">
          <a href="https://edenmonday.no" className="logo">
            {t("vs_back")}
          </a>
          <LangSwitch />
        </header>

        <div className="vs-hero">
          <div>
            <h1>VærSikret</h1>
            <p className="tagline">{t("vs_tagline")}</p>
            <p className="lead">{t("vs_lead")}</p>
            <div className="cta-row">
              <a
                href="https://github.com/edenmonday/team-31"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                {t("vs_get_github")}
              </a>
            </div>
          </div>
          <div className="shots">
            <Shot
              src="/screenshots/screen2.png"
              label="screenshots/screen2.png"
              icon="💨"
            />
          </div>
        </div>

        <section>
          <h2 className="section-title">{t("vs_features_title")}</h2>
          <div className="features">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <span className="icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FlowSection />

        <section>
          <div className="vs-meta">
            <div className="feature">
              <h3>{t("vs_tech_title")}</h3>
              <p>{t("vs_tech_desc")}</p>
              <ul className="tech-pills">
                {[
                  "Kotlin",
                  "Jetpack Compose",
                  "MVVM",
                  "Ktor",
                  "Mapbox SDK",
                  "Vico",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="feature">
              <h3>{t("vs_data_title")}</h3>
              <p>{t("vs_data_desc")}</p>
            </div>
            <div className="feature">
              <h3>{t("vs_team_title")}</h3>
              <p>{t("vs_team_desc")}</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
