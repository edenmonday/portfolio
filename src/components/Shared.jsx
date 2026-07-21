import { useState } from "react";
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
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("eden.mo@icloud.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-controls">
          <div className="footer-row">
            <a href="mailto:eden.mo@icloud.com" className="pill-link footer-pill">
              eden.mo@icloud.com
            </a>
            <button
              type="button"
              className="pill-link footer-pill icon-btn"
              onClick={copyEmail}
              aria-label="Kopier e-postadresse"
            >
              {copied ? "✓" : "⧉"}
            </button>
          </div>

          <div className="footer-row">
            <a
              href="https://github.com/edenmonday"
              className="pill-link footer-pill"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://no.linkedin.com/in/eden-o-monday-b31974325"
              className="pill-link footer-pill"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="footer-row">
            <LangSwitch />
            <a href="#top" className="pill-link footer-pill">
              {t("to_top")}
            </a>
          </div>
        </div>

        <div className="footer-brand">
          <span className="footer-heart" aria-hidden="true">♥</span>
          <span>{t("made_by")}</span>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <span>{line + line}</span>
      </div>
    </footer>
  );
}
