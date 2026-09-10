"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Boxes,
  Car,
  ChevronDown,
  Database,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  Moon,
  QrCode,
  Radio,
  Shirt,
  Sun,
  Wrench,
} from "lucide-react";

type Lang = "sv" | "en" | "no" | "da" | "fi" | "is";
const languageNames: Record<Lang, string> = {
  sv: "Svenska",
  en: "English",
  no: "Norsk",
  da: "Dansk",
  fi: "Suomi",
  is: "Íslenska",
};
const dppUi: Record<
  Lang,
  {
    nav: string[];
    back: string;
    kicker: string;
    titleA: string;
    titleB: string;
    lead: string;
    examples: string;
    law: string;
    exampleTitle: string;
    exampleLead: string;
    showcase: string;
    showcaseTitle: string;
    builder: string;
    builderTitle: string;
    builderLead: string;
    product: string;
    model: string;
    serial: string;
    buttons: string;
    simulation: string;
  }
> = {
  sv: {
    nav: ["Vad är DPP?", "Regelverk", "Blippa", "IoT"],
    back: "Till Selectec",
    kicker: "DPP / DIGITALT PRODUKTPASS",
    titleA: "En QR-kod.",
    titleB: "Rätt information direkt.",
    lead: "Sätt en QR-kod på plagget, maskinen eller bilen. Den som skannar kan få produktinformation, skötselråd, service, support eller ett erbjudande – utan att installera en app.",
    examples: "Se tre konkreta exempel",
    law: "Vad kräver lagen?",
    exampleTitle: "Tre QR-koder. Tre olika upplevelser.",
    exampleLead:
      "Blippa behöver inte se likadant ut för alla. Varje sida kan få kundens färger, innehåll och funktioner – från en enkel produktsida till support med en digital assistent.",
    showcase: "RIKTIGA EXEMPEL FRÅN BLIPPA",
    showcaseTitle: "Samma plattform. Helt olika sidor.",
    builder: "PROVA PRINCIPEN / SIMULERING",
    builderTitle: "Bygg en enkel QR-sida på en minut.",
    builderLead:
      "Använd Blippas No-code-plattform för att bygga unika QR-webbplatser på några få minuter. De fungerar på alla mobila enheter. Ingen app eller kodkunskap krävs.",
    product: "Produktnamn",
    model: "Modell",
    serial: "Serienummer",
    buttons: "Lägg till knappar",
    simulation:
      "Detta är en förenklad demonstration, inte Blippas riktiga editor.",
  },
  en: {
    nav: ["What is DPP?", "Regulations", "Blippa", "IoT"],
    back: "Back to Selectec",
    kicker: "DPP / DIGITAL PRODUCT PASSPORT",
    titleA: "One QR code.",
    titleB: "The right information instantly.",
    lead: "Put a QR code on a garment, machine or vehicle. A scan can open product information, care instructions, service, support or an offer – without installing an app.",
    examples: "See three real examples",
    law: "What does the law require?",
    exampleTitle: "Three QR codes. Three different experiences.",
    exampleLead:
      "A Blippa page can match each brand, product and task – from simple product information to support with an AI assistant.",
    showcase: "REAL EXAMPLES FROM BLIPPA",
    showcaseTitle: "One platform. Completely different pages.",
    builder: "TRY THE IDEA / SIMULATION",
    builderTitle: "Build a simple QR page in one minute.",
    builderLead:
      "Use Blippa’s no-code platform to build unique QR websites in minutes. They work on every mobile device. No app or coding skills required.",
    product: "Product name",
    model: "Model",
    serial: "Serial number",
    buttons: "Add buttons",
    simulation:
      "This is a simplified demonstration, not the actual Blippa editor.",
  },
  no: {
    nav: ["Hva er DPP?", "Regelverk", "Blippa", "IoT"],
    back: "Til Selectec",
    kicker: "DPP / DIGITALT PRODUKTPASS",
    titleA: "Én QR-kode.",
    titleB: "Riktig informasjon med én gang.",
    lead: "Sett en QR-kode på plagget, maskinen eller bilen. En skanning kan åpne produktinformasjon, vedlikehold, service, support eller et tilbud – uten app.",
    examples: "Se tre konkrete eksempler",
    law: "Hva krever regelverket?",
    exampleTitle: "Tre QR-koder. Tre ulike opplevelser.",
    exampleLead:
      "En Blippa-side kan tilpasses hvert varemerke, produkt og behov – fra enkel produktinformasjon til support med en AI-assistent.",
    showcase: "EKSEMPLER FRA BLIPPA",
    showcaseTitle: "Samme plattform. Helt ulike sider.",
    builder: "PRØV PRINSIPPET / SIMULERING",
    builderTitle: "Bygg en enkel QR-side på ett minutt.",
    builderLead:
      "Bruk Blippas no-code-plattform til å bygge unike QR-nettsteder på få minutter. De fungerer på alle mobilenheter. Ingen app eller kodekunnskap kreves.",
    product: "Produktnavn",
    model: "Modell",
    serial: "Serienummer",
    buttons: "Legg til knapper",
    simulation:
      "Dette er en forenklet demonstrasjon, ikke Blippas faktiske editor.",
  },
  da: {
    nav: ["Hvad er DPP?", "Regler", "Blippa", "IoT"],
    back: "Til Selectec",
    kicker: "DPP / DIGITALT PRODUKTPAS",
    titleA: "Én QR-kode.",
    titleB: "Den rigtige information med det samme.",
    lead: "Sæt en QR-kode på tøjet, maskinen eller bilen. En scanning kan åbne produktinformation, pleje, service, support eller et tilbud – uden en app.",
    examples: "Se tre konkrete eksempler",
    law: "Hvad kræver reglerne?",
    exampleTitle: "Tre QR-koder. Tre forskellige oplevelser.",
    exampleLead:
      "En Blippa-side kan tilpasses hvert brand, produkt og behov – fra enkel produktinformation til support med en AI-assistent.",
    showcase: "EKSEMPLER FRA BLIPPA",
    showcaseTitle: "Samme platform. Helt forskellige sider.",
    builder: "PRØV PRINCIPPET / SIMULERING",
    builderTitle: "Byg en enkel QR-side på ét minut.",
    builderLead:
      "Brug Blippas no-code-platform til at bygge unikke QR-websteder på få minutter. De virker på alle mobile enheder. Ingen app eller kodekundskaber kræves.",
    product: "Produktnavn",
    model: "Model",
    serial: "Serienummer",
    buttons: "Tilføj knapper",
    simulation:
      "Dette er en forenklet demonstration, ikke Blippas rigtige editor.",
  },
  fi: {
    nav: ["Mikä DPP on?", "Sääntely", "Blippa", "IoT"],
    back: "Selecteciin",
    kicker: "DPP / DIGITAALINEN TUOTEPASSI",
    titleA: "Yksi QR-koodi.",
    titleB: "Oikea tieto heti.",
    lead: "Lisää QR-koodi vaatteeseen, koneeseen tai autoon. Skannaus avaa tuotetiedot, hoito-ohjeet, huollon, tuen tai tarjouksen – ilman sovellusta.",
    examples: "Katso kolme esimerkkiä",
    law: "Mitä laki vaatii?",
    exampleTitle: "Kolme QR-koodia. Kolme erilaista kokemusta.",
    exampleLead:
      "Blippa-sivu voidaan mukauttaa jokaiseen brändiin, tuotteeseen ja tarpeeseen – tuotetiedoista AI-avustettuun tukeen.",
    showcase: "ESIMERKKEJÄ BLIPPASTA",
    showcaseTitle: "Sama alusta. Täysin erilaiset sivut.",
    builder: "KOKEILE PERIAATETTA / SIMULAATIO",
    builderTitle: "Rakenna yksinkertainen QR-sivu minuutissa.",
    builderLead:
      "Blippan no-code-alustalla rakennat yksilöllisiä QR-verkkosivuja muutamassa minuutissa. Ne toimivat kaikilla mobiililaitteilla. Sovellusta tai koodaustaitoja ei tarvita.",
    product: "Tuotteen nimi",
    model: "Malli",
    serial: "Sarjanumero",
    buttons: "Lisää painikkeita",
    simulation:
      "Tämä on yksinkertaistettu esittely, ei Blippan varsinainen editori.",
  },
  is: {
    nav: ["Hvað er DPP?", "Regluverk", "Blippa", "IoT"],
    back: "Til Selectec",
    kicker: "DPP / STAFRÆNT VÖRUVOTTORÐ",
    titleA: "Einn QR-kóði.",
    titleB: "Réttar upplýsingar strax.",
    lead: "Settu QR-kóða á flíkina, vélina eða bílinn. Skönnun opnar vöruupplýsingar, umhirðu, þjónustu, aðstoð eða tilboð – án apps.",
    examples: "Sjá þrjú dæmi",
    law: "Hvað krefjast lögin?",
    exampleTitle: "Þrír QR-kóðar. Þrjár ólíkar upplifanir.",
    exampleLead:
      "Blippa-síða getur lagað sig að hverju vörumerki, vöru og verkefni – frá einföldum upplýsingum til aðstoðar með AI-aðstoðarmanni.",
    showcase: "DÆMI FRÁ BLIPPA",
    showcaseTitle: "Sami vettvangur. Gjörólíkar síður.",
    builder: "PRÓFAÐU HUGMYNDINA / HERMUN",
    builderTitle: "Búðu til einfalda QR-síðu á mínútu.",
    builderLead:
      "Notaðu no-code-vettvang Blippa til að byggja einstakar QR-vefsíður á örfáum mínútum. Þær virka í öllum snjalltækjum. Ekkert app eða forritun þarf.",
    product: "Vöruheiti",
    model: "Gerð",
    serial: "Raðnúmer",
    buttons: "Bæta við hnöppum",
    simulation: "Þetta er einfölduð sýning, ekki raunverulegur ritill Blippa.",
  },
};

const passportData = [
  ["Produktidentitet", "Modell, batch eller unik produkt"],
  ["Material & innehåll", "Komposition, återvunnet innehåll och ämnen"],
  ["Livscykel", "Tillverkning, service, reparation och återvinning"],
  ["Dokumentation", "Manualer, certifikat, garanti och reservdelar"],
];

const connections = [
  {
    icon: Lightbulb,
    title: "Lampor & armaturer",
    text: "Produktdata, energiinformation, installation och servicehistorik följer varje enhet.",
  },
  {
    icon: LockKeyhole,
    title: "Lås & access",
    text: "Koppla identitet, behörig dokumentation, garanti och felanmälan till rätt produkt.",
  },
  {
    icon: Radio,
    title: "Sensorer & IoT",
    text: "Låt sensordata och status uppdatera produktens digitala livscykel i realtid.",
  },
  {
    icon: Wrench,
    title: "Maskiner & service",
    text: "Rätt reservdel, instruktion och serviceärende blir tillgängligt direkt vid produkten.",
  },
  {
    icon: Database,
    title: "ERP, PIM & CRM",
    text: "Blippa kan bli det sammanhållande lagret mellan befintliga system och användaren.",
  },
  {
    icon: Boxes,
    title: "Cirkulära flöden",
    text: "Stöd återbruk, ägarbyte, rekonditionering och återvinning med verifierbar historik.",
  },
];

const builderOptions = [
  "Support",
  "Skötselråd",
  "Manual",
  "AI-assistent",
  "Felanmälan",
  "Koppla CRM",
  "Koppla ERP",
];

export default function DppPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Lang>("sv");
  const [langOpen, setLangOpen] = useState(false);
  const [demoProduct, setDemoProduct] = useState("Nordic Pro 3000");
  const [demoModel, setDemoModel] = useState("NP-3000");
  const [demoSerial, setDemoSerial] = useState("SE-2026-0142");
  const [demoButtons, setDemoButtons] = useState([
    "Support",
    "Manual",
    "AI-assistent",
  ]);
  const [qrSrc, setQrSrc] = useState("");
  const [kpis, setKpis] = useState([0, 0, 0]);
  const ui = dppUi[lang];
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
  useEffect(() => {
    localStorage.setItem("selectec-lang", lang);
  }, [lang]);
  useEffect(() => {
    const payload = `https://demo.selectec.se/product?name=${encodeURIComponent(demoProduct)}&model=${encodeURIComponent(demoModel)}&serial=${encodeURIComponent(demoSerial)}&features=${encodeURIComponent(demoButtons.join(","))}`;
    QRCode.toDataURL(payload, {
      width: 220,
      margin: 1,
      color: { dark: "#182019", light: "#ffffff" },
    }).then(setQrSrc);
  }, [demoProduct, demoModel, demoSerial, demoButtons]);
  useEffect(() => {
    const element = document.querySelector(".dpp-kpis");
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setKpis([1, 0, 24]);
      } else {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1100, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setKpis([Math.round(eased), 0, Math.round(24 * eased)]);
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
    <main className="dpp-page">
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
        <nav aria-label="DPP menu">
          {ui.nav.map((label, index) => (
            <a
              key={label}
              href={["#vad", "#regelverk", "#blippa", "#iot"][index]}
            >
              {label}
            </a>
          ))}
        </nav>
        <div>
          <div className="lang-wrap">
            <button
              className="language"
              onClick={() => setLangOpen(!langOpen)}
              aria-expanded={langOpen}
            >
              {lang.toUpperCase()} <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="lang-menu">
                {(Object.keys(languageNames) as Lang[]).map((code) => (
                  <button
                    key={code}
                    className={lang === code ? "active" : ""}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                  >
                    {languageNames[code]}
                  </button>
                ))}
              </div>
            )}
          </div>
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

      <section className="dpp-hero" id="vad">
        <div className="dpp-grid" />
        <div className="dpp-hero-copy">
          <span className="dpp-kicker">{ui.kicker}</span>
          <h1>
            {ui.titleA}
            <br />
            <strong>{ui.titleB}</strong>
          </h1>
          <p>{ui.lead}</p>
          <div className="dpp-hero-actions">
            <a className="primary-button" href="#exempel">
              {ui.examples} <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#regelverk">
              {ui.law} <span>↓</span>
            </a>
          </div>
        </div>
        <div className="passport-orbit" aria-label="QR product page">
          <div className="passport-ring ring-one" />
          <div className="passport-ring ring-two" />
          <div className="passport-core">
            <QrCode />
          </div>
          {["INFO", "CARE", "SERVICE", "REUSE"].map((label, index) => (
            <span
              key={label}
              className={`passport-node passport-node-${index + 1}`}
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="dpp-kpis metrics" data-reveal>
        <div><strong>{kpis[0]}</strong><span>{lang === "en" ? "QR code per product" : "QR-kod per produkt"}</span></div>
        <div><strong>{kpis[1]}</strong><span>{lang === "en" ? "apps required" : "appar behöver installeras"}</span></div>
        <div><strong>{kpis[2]}/7</strong><span>{lang === "en" ? "information available" : "information tillgänglig"}</span></div>
        <div className="metric-quote"><QrCode/><span>{lang === "en" ? "Scan. Understand." : "Skanna. Förstå."}<br/><b>{lang === "en" ? "Take the next step." : "Ta nästa steg."}</b></span></div>
      </section>

      <section className="plain-examples" id="exempel">
        <div className="plain-examples-intro" data-reveal>
          <span className="section-index">{ui.examples.toUpperCase()}</span>
          <h2>{ui.exampleTitle}</h2>
          <p>{ui.exampleLead}</p>
        </div>
        <div className="plain-example-grid">
          <article data-reveal>
            <Shirt />
            <span>KLÄDTILLVERKAREN</span>
            <h3>Vad består jackan av?</h3>
            <p>
              Kunden skannar etiketten och ser material, ursprung, tvättråd och
              hur plagget kan repareras eller lämnas till återbruk.
            </p>
            <b>
              Nytta: tydlig produktinformation och en praktisk väg mot kommande
              DPP-krav.
            </b>
          </article>
          <article data-reveal>
            <Car />
            <span>BILREKONDAREN</span>
            <h3>När är nästa behandling?</h3>
            <p>
              En diskret QR-dekal i bilen visar vad som gjorts, skötselråd och
              en knapp för att boka nästa tvätt, lackskydd eller invändig
              behandling.
            </p>
            <b>
              Nytta: fler återbesök och relevant merförsäljning utan en egen
              app.
            </b>
            <small>
              Detta är en digital kundupplevelse, inte ett lagstadgat
              produktpass.
            </small>
          </article>
          <article data-reveal>
            <MessageCircle />
            <span>MASKINEN HOS KUNDEN</span>
            <h3>Hur löser jag problemet?</h3>
            <p>
              Teknikern skannar maskinen och får rätt manual, reservdelar och
              felsökning. En digital assistent kan svara utifrån just den
              produktens information och hjälpa till att skapa ett
              serviceärende.
            </p>
            <b>
              Nytta: snabbare hjälp och färre samtal där ingen vet exakt vilken
              modell kunden har.
            </b>
          </article>
        </div>
      </section>

      <section className="blippa-showcase" data-reveal>
        <div className="showcase-heading">
          <span className="section-index">{ui.showcase}</span>
          <h2>{ui.showcaseTitle}</h2>
          <p>
            Mode, laddplatser och uthyrningsutrustning visar hur varje QR-sida
            kan anpassas efter produkten, varumärket och användarens nästa steg.
          </p>
        </div>
        <div className="showcase-grid">
          <a
            href="https://blippa.com/sv/discover/mode/"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <img
                src="/dpp/examples/fashion-pass.png"
                alt="Haglöfs QR-exempel skapat i Blippa"
              />
            </div>
            <span>MODE & DPP</span>
            <b>Produktinformation direkt i plagget ↗</b>
          </a>
          <a
            href="https://blippa.com/sv/discover/laddplatser/"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <img
                src="/dpp/examples/charging-screen.png"
                alt="Blippa-sida för en laddplats"
              />
            </div>
            <span>LADDPLATS</span>
            <b>Information och bokning på plats ↗</b>
          </a>
          <a
            href="https://blippa.com/sv/discover/uthyrning-av-utrustning/"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <img
                src="/dpp/examples/rental.png"
                alt="Blippa-sida för hyrd utrustning"
              />
            </div>
            <span>UTHYRNINGSUTRUSTNING</span>
            <b>Rätt maskindata för rätt exemplar ↗</b>
          </a>
        </div>
      </section>

      <section className="blippa-builder" data-reveal>
        <div className="builder-intro">
          <span className="section-index">{ui.builder}</span>
          <h2>{ui.builderTitle}</h2>
          <p>{ui.builderLead}</p>
          <div className="standard-note">
            <QrCode />
            <div>
              <b>GS1 Digital Link</b>
              <span>
                Blippa har stöd för standardiserade produktlänkar med exempelvis
                GTIN, batch och serienummer.
              </span>
            </div>
          </div>
        </div>
        <div className="builder-workspace">
          <div className="builder-controls">
            <label>
              {ui.product}
              <input
                value={demoProduct}
                onChange={(event) => setDemoProduct(event.target.value)}
                maxLength={30}
              />
            </label>
            <label>
              {ui.model}
              <input
                value={demoModel}
                onChange={(event) => setDemoModel(event.target.value)}
                maxLength={24}
              />
            </label>
            <label>
              {ui.serial}
              <input
                value={demoSerial}
                onChange={(event) => setDemoSerial(event.target.value)}
                maxLength={24}
              />
            </label>
            <fieldset>
              <legend>{ui.buttons}</legend>
              <div>
                {builderOptions.map((option) => (
                  <button
                    key={option}
                    className={demoButtons.includes(option) ? "active" : ""}
                    onClick={() =>
                      setDemoButtons((current) =>
                        current.includes(option)
                          ? current.filter((item) => item !== option)
                          : [...current, option],
                      )
                    }
                  >
                    {demoButtons.includes(option) ? "✓" : "+"} {option}
                  </button>
                ))}
              </div>
            </fieldset>
            <small>{ui.simulation}</small>
          </div>
          <div className="builder-phone">
            <div className="phone-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="phone-brand">ER LOGOTYP</div>
            <div className="phone-product">
              {qrSrc && <img className="dynamic-qr" src={qrSrc} alt="Dynamic QR code for the simulated product page" />}
              <small>PRODUKTSIDA</small>
              <h3>{demoProduct || ui.product}</h3>
              <dl>
                <div>
                  <dt>{ui.model}</dt>
                  <dd>{demoModel || "–"}</dd>
                </div>
                <div>
                  <dt>{ui.serial}</dt>
                  <dd>{demoSerial || "–"}</dd>
                </div>
              </dl>
              {demoButtons.map((option) => (
                <button key={option}>
                  {option === "AI-assistent" ? (
                    <MessageCircle size={16} />
                  ) : (
                    <ArrowRight size={15} />
                  )}{" "}
                  {option}
                </button>
              ))}
            </div>
            <div className="phone-gs1">GS1 DIGITAL LINK · DEMO</div>
          </div>
        </div>
      </section>

      <section className="dpp-definition" data-reveal>
        <div>
          <span className="section-index">01 / VAD KAN SIDAN VISA?</span>
          <h2>
            En skanning.
            <br />
            Det man behöver veta.
          </h2>
        </div>
        <div className="passport-data-grid">
          {passportData.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dpp-proof" id="blippa">
        <div className="dpp-proof-image" data-reveal>
          <img
            src="/dpp/fashion-passport.jpg"
            alt="Exempel på Blippa-produktpass för ett klädesplagg"
          />
          <span>EXEMPEL / MODE & TEXTIL</span>
        </div>
        <div className="dpp-proof-copy" data-reveal>
          <span className="section-index">02 / BLIPPA</span>
          <h2>En sida för varje produkt.</h2>
          <p>
            Blippa kopplar en QR-kod till en sida som ni själva kan uppdatera.
            Kunden kan se en sak, serviceteknikern en annan. Sidan kan följa ert
            varumärke och visas på flera språk.
          </p>
          <ul>
            <li>
              <b>Ändra innehållet i efterhand.</b> Uppdatera manualer, bilder
              och information utan att byta QR-koden.
            </li>
            <li>
              <b>Lägg till en AI-assistent.</b> Låt användaren ställa frågor och
              få svar utifrån informationen för just den produkten.
            </li>
            <li>
              <b>Samla nästa steg.</b> Garanti, guider, reservdelar, erbjudanden
              och support finns på samma sida.
            </li>
            <li>
              <b>Följ produktens historia.</b> Lägg till service, ägarbyten,
              reparationer och återbruk när det behövs.
            </li>
          </ul>
        </div>
      </section>

      <section className="dpp-law" id="regelverk">
        <div className="law-intro" data-reveal>
          <span className="section-index">03 / EU-REGELVERK</span>
          <h2>
            Förbered nu.
            <br />
            Införandet sker stegvis.
          </h2>
          <p>
            EU:s ekodesignförordning ESPR är ramverket för digitala produktpass.
            De exakta informationskraven och datumen beslutas produktgrupp för
            produktgrupp genom delegerade akter. Det finns alltså inte ett enda
            startdatum för alla produkter.
          </p>
        </div>
        <div className="law-timeline" data-reveal>
          <article className="law-now">
            <span>2024</span>
            <h3>ESPR träder i kraft</h3>
            <p>
              Förordning (EU) 2024/1781 etablerar ramverket. Passet ska bland
              annat vara kopplat till en unik produktidentifierare, bygga på
              öppna standarder och vara tillgängligt under produktens förväntade
              livslängd.
            </p>
          </article>
          <article className="law-battery">
            <BatteryCharging />
            <span>18 FEB 2027</span>
            <h3>Batteripasset blir konkret</h3>
            <p>
              Batteripass krävs för batterier till lätta transportmedel,
              industribatterier över 2 kWh och elfordonsbatterier som släpps på
              EU-marknaden.
            </p>
          </article>
          <article>
            <span>2025–2030</span>
            <h3>Prioriterade produktgrupper</h3>
            <p>
              EU:s arbetsplan prioriterar bland annat textil/kläder, möbler,
              däck, madrasser, järn och stål samt aluminium. Kraven utvecklas
              stegvis och blir produktspecifika.
            </p>
          </article>
        </div>
        <div className="law-note">
          <b>Viktigt:</b> Detta är en översikt, inte juridisk rådgivning.
          Tillämpning och tidplan behöver alltid bedömas för er produktgrupp.
          <div>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1781/oj"
              target="_blank"
              rel="noreferrer"
            >
              ESPR på EUR-Lex ↗
            </a>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2023/1542/oj"
              target="_blank"
              rel="noreferrer"
            >
              Batteriförordningen ↗
            </a>
            <a
              href="https://environment.ec.europa.eu/news/sustainable-products-be-norm-consumers-new-regulation-2024-07-19_en"
              target="_blank"
              rel="noreferrer"
            >
              EU-kommissionens översikt ↗
            </a>
          </div>
        </div>
      </section>

      <section className="dpp-iot" id="iot">
        <div className="iot-heading" data-reveal>
          <span className="section-index">04 / MER ÄN INFORMATION</span>
          <h2>
            När produkten också
            <br />
            <strong>kan skicka och ta emot.</strong>
          </h2>
          <p>
            Blippa kan kopplas till de system ni redan använder. Då kan en
            skanning exempelvis öppna ett lås för rätt person, visa aktuell
            maskinstatus eller skapa ett serviceärende med rätt produktnummer.
          </p>
        </div>
        <div className="connection-grid">
          {connections.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              data-reveal
              style={
                { "--delay": `${(index % 3) * 80}ms` } as React.CSSProperties
              }
            >
              <Icon />
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="connected-demo">
        <div className="connected-demo-copy" data-reveal>
          <span className="section-index">05 / SERVICE I PRODUKTEN</span>
          <h2>Skanna. Förstå. Agera.</h2>
          <p>
            I samma upplevelse kan användaren se produktdata, få AI-stöd, starta
            en felanmälan och lämna information vidare till rätt serviceflöde.
            För en lampa kan det vara installation och energidata. För ett lås
            kan det vara behörig service. För en maskin kan det vara reservdelar
            och realtidsstatus.
          </p>
          <a
            className="primary-button"
            href="mailto:info@selectecnordic.com?subject=DPP%20och%20Blippa"
          >
            Utforska ett Blippa-case <ArrowRight size={17} />
          </a>
        </div>
        <div className="connected-demo-image" data-reveal>
          <img
            src="/dpp/connected-service.jpg"
            alt="Exempel på Blippa som digital serviceyta för en uppkopplad produkt"
          />
          <span>EXEMPEL / SERVICE & UPPKOPPLING</span>
        </div>
      </section>

      <section className="dpp-cta">
        <QrCode />
        <span>FRÅN FÖRSTA PRODUKTDATA TILL LEVANDE PRODUKTPASS</span>
        <h2>
          Vilken produkt vill ni
          <br />
          göra digital först?
        </h2>
        <a href="mailto:info@selectecnordic.com?subject=Vi%20vill%20prata%20DPP">
          Boka en DPP-workshop <ArrowRight />
        </a>
      </section>
      <footer>
        <a className="brand footer-brand" href="/">
          <img src="/selectec-nordic-logo-mono.png" alt="Selectec Nordic" />
        </a>
        <p>
          Digitala produktpass, uppkopplade produkter och nordisk
          implementation.
        </p>
        <div>
          <a href="/">Selectec Nordic</a>
          <a
            href="https://blippa.com/sv/produkt/"
            target="_blank"
            rel="noreferrer"
          >
            Blippa
          </a>
        </div>
        <small>© 2026 Selectec Nordic</small>
      </footer>
    </main>
  );
}
