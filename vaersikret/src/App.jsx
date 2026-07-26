import { useState } from "react";
import { useLang } from "./i18n.jsx";
import { LangSwitch, Footer } from "./components/Shared.jsx";

/*
  Skjermbilder: legg PNG-filer i public/screenshots/ med navnene
  screen1.png, screen2.png (og evt. flere), uten filer vises en plassholder.
*/
function Phone({ src, label, icon }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="phone">
      {!failed && (
        <img src={src} alt={label} onError={() => setFailed(true)} />
      )}
      {failed && (
        <div className="placeholder">
          <span className="icon">{icon}</span>
          <span>{label}</span>
        </div>
      )}
    </div>
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
          <div className="phones">
            <Phone
              src="/screenshots/screen1.png"
              label="screenshots/screen1.png"
              icon="🗺️"
            />
            <Phone
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
