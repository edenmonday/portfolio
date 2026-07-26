import { useLang } from "../i18n.jsx";

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="langswitch">
      <button
        className={lang === "no" ? "active" : ""}
        onClick={() => setLang("no")}
      >
        {t("lang_no")}
      </button>
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
      >
        {t("lang_en")}
      </button>
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  const line = "edenmonday.no  ·  ".repeat(20);
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <a href="mailto:eden.mo@icloud.com" className="pill-link">
            eden.mo@icloud.com
          </a>
          <a
            href="https://github.com/edenmonday/team-31"
            className="pill-link"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#top" className="pill-link">
            {t("to_top")}
          </a>
        </div>
        <div className="footer-credit">{t("made_by")} ♥</div>
      </div>
      <div className="marquee" aria-hidden="true">
        <span>{line + line}</span>
      </div>
    </footer>
  );
}
