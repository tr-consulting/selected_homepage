"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Cloud,
  Leaf,
  LockKeyhole,
  Moon,
  Printer,
  Server,
  ShieldCheck,
  Sun,
  Users,
} from "lucide-react";

type Lang = "sv" | "en" | "no" | "da" | "fi" | "is";
const languageNames: Record<Lang, string> = { sv: "Svenska", en: "English", no: "Norsk", da: "Dansk", fi: "Suomi", is: "Íslenska" };
const paperUi: Record<Lang, { nav: string[]; back: string; title: string; accent: string; lead: string; talk: string; compare: string; users: string; orgs: string; countries: string; benefit: string; choice: string; local: string; book: string }> = {
  sv: { nav: ["Varför PaperCut?", "MF eller Hive", "Selectec"], back: "Till Selectec", title: "Utskrifter som bara", accent: "fungerar.", lead: "PaperCut hjälper organisationer att göra utskrifter säkrare, enklare och billigare – oavsett skrivarmärke, kontor eller arbetssätt.", talk: "Prata PaperCut med oss", compare: "Jämför MF och Hive", users: "användare", orgs: "organisationer", countries: "länder", benefit: "Kontroll utan att göra utskriften krånglig.", choice: "Båda ger säker utskrift och kontroll. Skillnaden är främst hur lösningen driftas och hur mycket den ska anpassas.", local: "Programvaran är global. Kompetensen finns nära.", book: "Boka en första genomgång" },
  en: { nav: ["Why PaperCut?", "MF or Hive", "Selectec"], back: "Back to Selectec", title: "Printing that simply", accent: "works.", lead: "PaperCut makes printing safer, easier and more cost-effective – regardless of printer brand, office or way of working.", talk: "Talk PaperCut with us", compare: "Compare MF and Hive", users: "users", orgs: "organisations", countries: "countries", benefit: "Control without making printing complicated.", choice: "Both provide secure printing and control. The main difference is how the solution is operated and customised.", local: "Global software. Local expertise.", book: "Book an initial review" },
  no: { nav: ["Hvorfor PaperCut?", "MF eller Hive", "Selectec"], back: "Til Selectec", title: "Utskrift som bare", accent: "fungerer.", lead: "PaperCut gjør utskrift sikrere, enklere og rimeligere – uansett skrivermerke, kontor eller arbeidsmåte.", talk: "Snakk PaperCut med oss", compare: "Sammenlign MF og Hive", users: "brukere", orgs: "organisasjoner", countries: "land", benefit: "Kontroll uten å gjøre utskrift komplisert.", choice: "Begge gir sikker utskrift og kontroll. Forskjellen er primært drift og tilpasning.", local: "Global programvare. Lokal kompetanse.", book: "Book en gjennomgang" },
  da: { nav: ["Hvorfor PaperCut?", "MF eller Hive", "Selectec"], back: "Til Selectec", title: "Print der bare", accent: "virker.", lead: "PaperCut gør print sikrere, enklere og billigere – uanset printermærke, kontor eller arbejdsmåde.", talk: "Tal PaperCut med os", compare: "Sammenlign MF og Hive", users: "brugere", orgs: "organisationer", countries: "lande", benefit: "Kontrol uden at gøre print besværligt.", choice: "Begge giver sikkert print og kontrol. Forskellen er især drift og tilpasning.", local: "Global software. Lokal ekspertise.", book: "Book en gennemgang" },
  fi: { nav: ["Miksi PaperCut?", "MF vai Hive", "Selectec"], back: "Selecteciin", title: "Tulostus, joka vain", accent: "toimii.", lead: "PaperCut tekee tulostamisesta turvallisempaa, helpompaa ja edullisempaa tulostinmerkistä, toimistosta tai työtavasta riippumatta.", talk: "Keskustele PaperCutista", compare: "Vertaa MF:ää ja Hiveä", users: "käyttäjää", orgs: "organisaatiota", countries: "maata", benefit: "Hallintaa ilman monimutkaista tulostusta.", choice: "Molemmat tarjoavat turvallisen tulostuksen ja hallinnan. Ero on etenkin käytössä ja mukautuksessa.", local: "Globaali ohjelmisto. Paikallinen osaaminen.", book: "Varaa kartoitus" },
  is: { nav: ["Af hverju PaperCut?", "MF eða Hive", "Selectec"], back: "Til Selectec", title: "Prentun sem einfaldlega", accent: "virkar.", lead: "PaperCut gerir prentun öruggari, einfaldari og hagkvæmari – óháð prentaramerki, skrifstofu eða vinnulagi.", talk: "Ræðum PaperCut", compare: "Berðu saman MF og Hive", users: "notendur", orgs: "fyrirtæki", countries: "lönd", benefit: "Stjórn án þess að flækja prentun.", choice: "Báðar lausnir veita örugga prentun og stjórn. Munurinn liggur helst í rekstri og aðlögun.", local: "Alþjóðlegur hugbúnaður. Staðbundin þekking.", book: "Bóka yfirferð" },
};

const benefits = [
  {
    icon: LockKeyhole,
    title: "Säkra dokumenten",
    text: "Användaren identifierar sig vid skrivaren innan dokumentet lämnar enheten.",
  },
  {
    icon: BarChart3,
    title: "Se och styr kostnaden",
    text: "Följ utskrifter per användare, avdelning och enhet. Sätt regler där de gör nytta.",
  },
  {
    icon: Printer,
    title: "Fungerar med blandade miljöer",
    text: "Behåll valfriheten när organisationen använder skrivare från flera tillverkare.",
  },
  {
    icon: Leaf,
    title: "Minska onödiga utskrifter",
    text: "Find-Me-utskrift, kvoter och tydlig uppföljning hjälper er minska svinnet.",
  },
];

export default function PaperCutPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Lang>("sv");
  const [langOpen, setLangOpen] = useState(false);
  const [kpis, setKpis] = useState([0, 0, 0]);
  const ui = paperUi[lang];
  useEffect(() => {
    const saved = localStorage.getItem("selectec-theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("selectec-theme", theme);
  }, [theme]);
  useEffect(() => {
    const saved = localStorage.getItem("selectec-lang") as Lang | null;
    if (saved && languageNames[saved]) setLang(saved);
  }, []);
  useEffect(() => localStorage.setItem("selectec-lang", lang), [lang]);
  useEffect(() => {
    const element = document.querySelector(".papercut-proof");
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setKpis([100, 100, 195]);
      } else {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1250, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setKpis([Math.round(100 * eased), Math.round(100 * eased), Math.round(195 * eased)]);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return (
    <main className="papercut-page">
      <header className="dpp-header">
        <a className="brand" href="/">
          <img
            className="logo-color"
            src="/selectec-nordic-logo-hq.png"
            alt="Selectec Nordic"
          />
          <img
            className="logo-mono"
            src="/selectec-nordic-logo-mono.png"
            alt=""
            aria-hidden="true"
          />
        </a>
        <nav aria-label="PaperCut menu">{ui.nav.map((label, index) => <a key={label} href={["#varfor", "#valj", "#selectec"][index]}>{label}</a>)}</nav>
        <div>
          <div className="lang-wrap"><button className="language" onClick={() => setLangOpen(!langOpen)} aria-expanded={langOpen}>{lang.toUpperCase()} <ChevronDown size={14} /></button>{langOpen && <div className="lang-menu">{(Object.keys(languageNames) as Lang[]).map(code => <button key={code} className={lang === code ? "active" : ""} onClick={() => { setLang(code); setLangOpen(false); }}>{languageNames[code]}</button>)}</div>}</div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Aktivera ljust tema" : "Aktivera mörkt tema"
            }
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="dpp-back" href="/">
            <ArrowLeft size={15} /> {ui.back}
          </a>
        </div>
      </header>
      <section className="papercut-hero">
        <div className="papercut-hero-copy">
          <span className="section-index">PAPERCUT / PRINT MANAGEMENT</span>
          <img src="/brands/papercut.png" alt="PaperCut" />
          <h1>
            {ui.title}
            <br />
                       <strong>{ui.accent}</strong>
          </h1>
          <p>{ui.lead}</p>
          <div>
            <a
              className="primary-button"
              href="mailto:info@selectecnordic.com?subject=Vi%20vill%20prata%20PaperCut"
            >
              {ui.talk} <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#valj">
              {ui.compare} <span>↓</span>
            </a>
          </div>
        </div>
        <div
          className="papercut-console"
          aria-label="Illustration av ett säkert utskriftsflöde"
        >
          <div className="console-top">
            <span>PRINT FLOW / NORDIC HQ</span>
            <i>LIVE</i>
          </div>
          <div className="console-flow">
            <div>
              <Users />
              <b>Användare</b>
              <small>Skickar utskrift</small>
            </div>
            <ArrowRight />
            <div className="active">
              <ShieldCheck />
              <b>PaperCut</b>
              <small>Kontrollerar & håller</small>
            </div>
            <ArrowRight />
            <div>
              <Printer />
              <b>Valfri skrivare</b>
              <small>Släpp säkert</small>
            </div>
          </div>
          <div className="console-status">
            <span>
              <i />
              Dokument väntar säkert
            </span>
            <b>12</b>
          </div>
        </div>
      </section>
      <section className="papercut-proof" data-reveal>
        <div>
          <strong>{kpis[0]} miljoner</strong>
          <span>{ui.users}</span>
        </div>
        <div>
          <strong>{kpis[1]} 000</strong>
          <span>{ui.orgs}</span>
        </div>
        <div>
          <strong>{kpis[2]}</strong>
          <span>{ui.countries}</span>
        </div>
        <p>
          PaperCut har utvecklat print management sedan 1998 och används från
          mindre verksamheter till globala organisationer.
        </p>
      </section>
      <section className="papercut-benefits" id="varfor">
        <div className="section-intro" data-reveal>
          <div>
            <span className="section-index">01 / VAD NI VINNER</span>
            <h2>{ui.benefit}</h2>
          </div>
          <p>
            Användaren ska kunna skriva ut som vanligt. IT ska få säkerhet,
            överblick och färre problem.
          </p>
        </div>
        <div className="papercut-benefit-grid">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article key={title} data-reveal>
              <Icon />
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="papercut-choice" id="valj">
        <div className="choice-heading" data-reveal>
          <span className="section-index">02 / VÄLJ RÄTT PLATTFORM</span>
          <h2>
            PaperCut MF eller
            <br />
            PaperCut Hive?
          </h2>
          <p>{ui.choice}</p>
        </div>
        <div className="papercut-choice-grid">
          <article data-reveal>
            <Server />
            <small>SJÄLVHOSTAD / HYBRID</small>
            <h3>PaperCut MF</h3>
            <p>
              För organisationer som vill ha djup kontroll, avancerade regler
              och integration direkt i multifunktionsskrivaren.
            </p>
            <ul>
              <li>
                <Check />
                Stora eller komplexa miljöer
              </li>
              <li>
                <Check />
                Avancerad rapportering och kostnadsstyrning
              </li>
              <li>
                <Check />
                Integrerad skanning och embedded-appar
              </li>
            </ul>
            <a
              href="https://www.papercut.com/products/mf/"
              target="_blank"
              rel="noreferrer"
            >
              Läs om PaperCut MF ↗
            </a>
          </article>
          <article data-reveal>
            <Cloud />
            <small>MOLNBASERAD</small>
            <h3>PaperCut Hive</h3>
            <p>
              För organisationer som vill minska lokal infrastruktur och få
              modern, molnbaserad print management.
            </p>
            <ul>
              <li>
                <Check />
                Ingen traditionell printserver
              </li>
              <li>
                <Check />
                Enkel utrullning för kontor och hybrida team
              </li>
              <li>
                <Check />
                Säker utskrift från flera enheter
              </li>
            </ul>
            <a
              href="https://www.papercut.com/products/hive/"
              target="_blank"
              rel="noreferrer"
            >
              Läs om PaperCut Hive ↗
            </a>
          </article>
        </div>
      </section>
      <section className="papercut-selectec" id="selectec" data-reveal>
        <span className="section-index">03 / SELECTEC NORDIC</span>
        <h2>{ui.local}</h2>
        <p>
          Vi hjälper er välja rätt PaperCut-plattform, verifiera miljön,
          installera, konfigurera och utbilda. När lösningen är i drift finns
          vårt nordiska team kvar för support och vidareutveckling.
        </p>
        <div>
          <span>Analys</span>
          <ArrowRight />
          <span>Design</span>
          <ArrowRight />
          <span>Installation</span>
          <ArrowRight />
          <span>Utbildning</span>
          <ArrowRight />
          <span>Support</span>
        </div>
        <a
          className="primary-button"
          href="mailto:info@selectecnordic.com?subject=PaperCut%20rådgivning"
        >
          {ui.book} <ArrowRight size={17} />
        </a>
      </section>
      <footer>
        <a className="brand footer-brand" href="/">
          <img src="/selectec-nordic-logo-mono.png" alt="Selectec Nordic" />
        </a>
        <p>
          Certifierad nordisk kompetens inom säker utskrift och dokumentflöden.
        </p>
        <div>
          <a href="/">Selectec Nordic</a>
          <a href="https://www.papercut.com/" target="_blank" rel="noreferrer">
            PaperCut
          </a>
        </div>
        <small>© 2026 Selectec Nordic</small>
      </footer>
    </main>
  );
}
