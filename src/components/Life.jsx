import { useCallback, useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";
import { SectionHead } from "./Shared.jsx";

// Bildene ligger i public/life. Kategorien er første del av filnavnet.
const PHOTOS = [
  { src: "vin-1", w: 1400, h: 1050, alt: { no: "Tapasbord med vin og levende lys", en: "Tapas spread with wine and candles" } },
  { src: "venner-1", w: 1400, h: 1050, alt: { no: "Speilselfie med en venn", en: "Mirror selfie with a friend" } },
  { src: "planter-2", w: 1050, h: 1400, alt: { no: "Monstera i vinduet", en: "Monstera by the window" } },
  { src: "ikebana-1", w: 1050, h: 1400, alt: { no: "Ikebana-oppsats i en gyllen skål", en: "Ikebana arrangement in a golden bowl" } },
  { src: "kunst-2", w: 1400, h: 1050, alt: { no: "Grafikk på en mørkegrønn museumsvegg", en: "Print on a dark green museum wall" } },
  { src: "venner-6", w: 1050, h: 1400, alt: { no: "Venner i en gammel trappeoppgang med takmaleri", en: "Friends in an old staircase with a painted ceiling" } },
  { src: "interior-1", w: 1400, h: 1050, alt: { no: "Tiffanylampe og grønne planter", en: "Tiffany lamp and green plants" } },
  { src: "planter-4", w: 1050, h: 1400, alt: { no: "Syngonium i sollys", en: "Syngonium in the sunlight" } },
  { src: "vin-2", w: 1050, h: 1400, alt: { no: "Vinflasker og planter i vinduskarmen", en: "Wine bottles and plants on the windowsill" } },
  { src: "venner-5", w: 1050, h: 1400, alt: { no: "Speilselfie med en venninne", en: "Mirror selfie with a friend" } },
  { src: "musikk-1", w: 1400, h: 1050, alt: { no: "Konsert i lilla lys", en: "Concert in purple light" } },
  { src: "kunst-3", w: 1050, h: 1400, alt: { no: "Fargerik gatekunst", en: "Colourful street art" } },
  { src: "interior-4", w: 787, h: 1400, alt: { no: "Koselig rom med lys og lysslynge", en: "Cosy room with candles and fairy lights" } },
  { src: "vibes-3", w: 1400, h: 1050, alt: { no: "Utsikt over byen en vindfull dag", en: "View over the city on a windy day" } },
  { src: "planter-1", w: 1117, h: 1400, alt: { no: "Stor potteplante på stuegulvet", en: "Big potted plant on the living room floor" } },
  { src: "venner-2", w: 1400, h: 1050, alt: { no: "Venner ute en kveld i byen", en: "Friends out on a night in town" } },
  { src: "ikebana-2", w: 787, h: 1400, alt: { no: "Blomster og levende lys", en: "Flowers and a candle" } },
  { src: "vin-3", w: 1400, h: 1050, alt: { no: "Middag med venner og vin", en: "Dinner with friends and wine" } },
  { src: "kunst-1", w: 1400, h: 1050, alt: { no: "Gatekunst i en murvegg", en: "Street art in a wall" } },
  { src: "planter-3", w: 1050, h: 1400, alt: { no: "Monstera og gitar ved vinduet", en: "Monstera and guitar by the window" } },
  { src: "venner-3", w: 787, h: 1400, alt: { no: "Venner som slapper av på balkongen", en: "Friends relaxing on the balcony" } },
  { src: "venner-4", w: 1400, h: 934, alt: { no: "Piknik i parken", en: "Picnic in the park" } },
  { src: "vibes-2", w: 1400, h: 1050, alt: { no: "Handletur i byen", en: "Shopping trip in town" } },
].map((p) => ({ ...p, cat: p.src.split("-")[0] }));

const CATS = ["all", "venner", "interior", "planter", "ikebana", "vin", "kunst", "musikk", "vibes"];
const PREVIEW = 12;

export default function Life() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(null); // indeks i `shown`

  const filtered = PHOTOS.filter((p) => cat === "all" || p.cat === cat);
  const shown = cat === "all" && !expanded ? filtered.slice(0, PREVIEW) : filtered;
  const label = (c) => (c === "all" ? t("life_all") : t("life_cats")[c]);

  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <section id="life">
      <SectionHead num="03" title={t("life_title")} />
      <p className="lead">{t("life_intro")}</p>

      <div className="filters" role="tablist">
        {CATS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            className={cat === c ? "active" : ""}
            onClick={() => setCat(c)}
          >
            {label(c)}
          </button>
        ))}
      </div>

      <div className="life-grid">
        {shown.map((p, i) => (
          <button
            key={p.src}
            className="life-tile"
            onClick={() => setOpen(i)}
            style={{ "--delay": `${(i % 6) * 60}ms` }}
          >
            <img
              src={`/life/${p.src}.jpg`}
              alt={p.alt[lang]}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
            />
            <span className="life-tag">{label(p.cat)}</span>
          </button>
        ))}
      </div>

      {cat === "all" && filtered.length > PREVIEW && (
        <div className="life-more">
          <button className="btn" onClick={() => setExpanded((x) => !x)}>
            {expanded ? t("life_less") : `${t("life_more")} (${filtered.length})`}
          </button>
        </div>
      )}

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt[lang]}
          onClick={() => setOpen(null)}
        >
          <button className="lb-close" aria-label={t("life_close")} onClick={() => setOpen(null)}>
            ×
          </button>
          <button
            className="lb-nav lb-prev"
            aria-label={t("life_prev")}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={`/life/${current.src}.jpg`} alt={current.alt[lang]} />
            <figcaption>
              <span className="life-tag static">{label(current.cat)}</span>
              {current.alt[lang]}
            </figcaption>
          </figure>
          <button
            className="lb-nav lb-next"
            aria-label={t("life_next")}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
