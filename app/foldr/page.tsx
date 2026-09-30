'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Cloud,
  FileSearch,
  Files,
  FolderKanban,
  HardDrive,
  Link2,
  Moon,
  Network,
  PenTool,
  Server,
  Share2,
  ShieldCheck,
  Sun,
  Workflow,
} from 'lucide-react';

type Lang = 'sv' | 'en' | 'no' | 'da' | 'fi' | 'is';
const languageNames: Record<Lang, string> = {
  sv: 'Svenska',
  en: 'English',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  is: 'Íslenska',
};

const content: Record<
  Lang,
  {
    nav: string[];
    back: string;
    kicker: string;
    title: string;
    accent: string;
    lead: string;
    talk: string;
    explore: string;
    storage: string;
    platform: string;
    platformLead: string;
    deploy: string;
    deployLead: string;
    local: string;
    localLead: string;
    cta: string;
    ctaLead: string;
    book: string;
    surfaces: { title: string; text: string }[];
    modes: { label: string; title: string; text: string; points: string[] }[];
  }
> = {
  sv: {
    nav: ['Plattformen', 'Drift', 'Selectec'],
    back: 'Till Selectec',
    kicker: 'FÅ FILERNA ATT ARBETA',
    title: 'En plats för alla era filer.',
    accent: 'Oavsett var de ligger.',
    lead: 'Foldr kopplar ihop människor och processer med den lagring ni redan har – OneDrive, SharePoint, S3, nätverksdiskar och NAS. Filerna behöver inte flyttas och befintliga rättigheter följer med.',
    talk: 'Prata Foldr med oss',
    explore: 'Utforska plattformen',
    storage: 'ANSLUTER TILL ER BEFINTLIGA LAGRING',
    platform: 'Flera arbetsytor. En plattform.',
    platformLead:
      'Sök, redigera, dela, signera och automatisera från samma säkra lager – i webben, mobilen eller som en disk på datorn.',
    deploy: 'Välj drift efter era krav.',
    deployLead:
      'Samma Foldr-upplevelse som SaaS eller självhostad – från enkel molndrift till isolerade miljöer.',
    local: 'Global plattform. Nordisk väg till produktion.',
    localLead:
      'Selectec hjälper er kartlägga lagringen, designa åtkomsten, installera, utbilda och förvalta lösningen.',
    cta: 'Kan Foldr förenkla er filvardag?',
    ctaLead:
      'Vi visar hur Foldr kan samla befintlig lagring utan ett riskfyllt migreringsprojekt.',
    book: 'Boka en genomgång',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Bläddra, förhandsvisa och organisera filer från alla anslutna lagringsplatser i ett gränssnitt.',
      },
      {
        title: 'Sök',
        text: 'Fulltextsökning, OCR och filter över flera lagringskällor – alltid styrt av användarens behörigheter.',
      },
      {
        title: 'Grace AI',
        text: 'Ställ frågor, sammanfatta och jämför dokument inom samma säkra rättighetsmodell.',
      },
      {
        title: 'Dela & samla in',
        text: 'Säkra länkar, kundportaler, uppladdningsytor och inlämningsmappar med tydlig kontroll.',
      },
      {
        title: 'Foldr Sign',
        text: 'Skicka PDF:er för signering och låt det signerade dokumentet landa tillbaka i rätt mapp.',
      },
      {
        title: 'Flow & MaSH',
        text: 'Klassificera, routa och automatisera filer över systemgränser med återanvändbara arbetsflöden.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Driftat och redo.',
        text: 'För er som vill komma igång snabbt med kontinuerliga uppdateringar och mindre lokal administration.',
        points: [
          '30 dagars test utan betalkort',
          'Dataregion i Storbritannien eller EU',
          'SSO och gruppsynk',
        ],
      },
      {
        label: 'SJÄLVHOSTAD',
        title: 'Er miljö. Er kontroll.',
        text: 'För verksamheter med egna infrastruktur-, säkerhets- eller isoleringskrav.',
        points: [
          'Virtuell appliance eller eget molnkonto',
          'Stöd för isolerade installationer',
          'AD, ADFS eller Entra ID',
        ],
      },
    ],
  },
  en: {
    nav: ['Platform', 'Deployment', 'Selectec'],
    back: 'Back to Selectec',
    kicker: 'PUT YOUR FILES TO WORK',
    title: 'One place for every file.',
    accent: 'Wherever it is stored.',
    lead: 'Foldr connects people and processes to the storage you already use – OneDrive, SharePoint, S3, network shares and NAS. Files stay where they are and existing permissions remain in control.',
    talk: 'Talk Foldr with us',
    explore: 'Explore the platform',
    storage: 'CONNECTS TO YOUR EXISTING STORAGE',
    platform: 'Multiple surfaces. One platform.',
    platformLead:
      'Search, edit, share, sign and automate through one secure layer – on the web, mobile or as a desktop drive.',
    deploy: 'Deploy around your requirements.',
    deployLead:
      'The same Foldr experience as SaaS or self-hosted – from effortless cloud operations to isolated environments.',
    local: 'Global platform. Nordic path to production.',
    localLead:
      'Selectec helps map your storage, design access, deploy, train and manage the solution.',
    cta: 'Could Foldr simplify file access?',
    ctaLead:
      'We will show how Foldr can unite existing storage without a high-risk migration project.',
    book: 'Book an introduction',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Browse, preview and organise files from every connected storage location in one interface.',
      },
      {
        title: 'Search',
        text: 'Full-text search, OCR and filters across storage sources, always governed by user permissions.',
      },
      {
        title: 'Grace AI',
        text: 'Ask questions, summarise and compare documents inside the same secure permission model.',
      },
      {
        title: 'Share & collect',
        text: 'Secure links, client portals, upload areas and hand-in folders with clear control.',
      },
      {
        title: 'Foldr Sign',
        text: 'Send PDFs for signature and return the signed document to the folder where it belongs.',
      },
      {
        title: 'Flow & MaSH',
        text: 'Classify, route and automate files across systems with reusable workflows.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Hosted and ready.',
        text: 'For teams that want a fast start, continuous updates and less local administration.',
        points: [
          '30-day trial, no credit card',
          'UK or EU data residency',
          'SSO and group sync',
        ],
      },
      {
        label: 'SELF-HOSTED',
        title: 'Your environment. Your control.',
        text: 'For organisations with specific infrastructure, security or isolation requirements.',
        points: [
          'Virtual appliance or your cloud account',
          'Air-gapped deployments supported',
          'AD, ADFS or Entra ID',
        ],
      },
    ],
  },
  no: {
    nav: ['Plattformen', 'Drift', 'Selectec'],
    back: 'Til Selectec',
    kicker: 'FÅ FILENE I ARBEID',
    title: 'Ett sted for alle filene.',
    accent: 'Uansett hvor de ligger.',
    lead: 'Foldr kobler mennesker og prosesser til lagringen dere allerede bruker – OneDrive, SharePoint, S3, nettverksdisker og NAS. Filene trenger ikke flyttes, og eksisterende rettigheter følger med.',
    talk: 'Snakk Foldr med oss',
    explore: 'Utforsk plattformen',
    storage: 'KOBLES TIL EKSISTERENDE LAGRING',
    platform: 'Flere arbeidsflater. Én plattform.',
    platformLead:
      'Søk, rediger, del, signer og automatiser fra ett sikkert lag – på web, mobil eller som disk på datamaskinen.',
    deploy: 'Velg drift etter kravene deres.',
    deployLead: 'Samme Foldr-opplevelse som SaaS eller selvhostet.',
    local: 'Global plattform. Nordisk vei til produksjon.',
    localLead:
      'Selectec hjelper med kartlegging, design, installasjon, opplæring og forvaltning.',
    cta: 'Kan Foldr forenkle filhverdagen?',
    ctaLead:
      'Vi viser hvordan eksisterende lagring kan samles uten et risikofylt migreringsprosjekt.',
    book: 'Bestill en gjennomgang',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Bla gjennom og organiser filer fra alle tilkoblede lagringssteder.',
      },
      {
        title: 'Søk',
        text: 'Fulltekstsøk, OCR og filtre – alltid styrt av brukerens rettigheter.',
      },
      {
        title: 'Grace AI',
        text: 'Still spørsmål og oppsummer dokumenter innenfor samme sikkerhetsmodell.',
      },
      {
        title: 'Del og samle inn',
        text: 'Sikre lenker, kundeportaler og opplastingsområder.',
      },
      {
        title: 'Foldr Sign',
        text: 'Send PDF-er til signering og lagre dem tilbake i riktig mappe.',
      },
      {
        title: 'Flow og MaSH',
        text: 'Klassifiser, rut og automatiser filer på tvers av systemer.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Driftet og klart.',
        text: 'Rask oppstart og mindre lokal administrasjon.',
        points: [
          '30 dagers test',
          'Dataregion i Storbritannia eller EU',
          'SSO og gruppesynk',
        ],
      },
      {
        label: 'SELVHOSTET',
        title: 'Deres miljø. Deres kontroll.',
        text: 'For egne infrastruktur- og sikkerhetskrav.',
        points: [
          'Virtuell appliance eller egen sky',
          'Støtte for isolerte miljøer',
          'AD, ADFS eller Entra ID',
        ],
      },
    ],
  },
  da: {
    nav: ['Platformen', 'Drift', 'Selectec'],
    back: 'Til Selectec',
    kicker: 'SÆT FILERNE I ARBEJDE',
    title: 'Ét sted til alle filer.',
    accent: 'Uanset hvor de ligger.',
    lead: 'Foldr forbinder mennesker og processer med den lagring, I allerede bruger – OneDrive, SharePoint, S3, netværksdrev og NAS. Filerne skal ikke flyttes, og eksisterende rettigheder følger med.',
    talk: 'Tal Foldr med os',
    explore: 'Udforsk platformen',
    storage: 'FORBINDER TIL JERES EKSISTERENDE LAGRING',
    platform: 'Flere arbejdsflader. Én platform.',
    platformLead:
      'Søg, redigér, del, underskriv og automatisér gennem ét sikkert lag.',
    deploy: 'Vælg drift efter jeres krav.',
    deployLead: 'Samme Foldr-oplevelse som SaaS eller selvhostet.',
    local: 'Global platform. Nordisk vej til produktion.',
    localLead:
      'Selectec hjælper med kortlægning, design, installation, uddannelse og drift.',
    cta: 'Kan Foldr forenkle jeres filhverdag?',
    ctaLead:
      'Vi viser, hvordan Foldr samler eksisterende lagring uden et risikofyldt migreringsprojekt.',
    book: 'Book en gennemgang',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Se og organisér filer fra alle tilsluttede lagringssteder.',
      },
      {
        title: 'Søgning',
        text: 'Fuldtekstsøgning, OCR og filtre styret af brugerens rettigheder.',
      },
      {
        title: 'Grace AI',
        text: 'Stil spørgsmål og opsummér dokumenter i samme sikre rettighedsmodel.',
      },
      {
        title: 'Del og indsaml',
        text: 'Sikre links, kundeportaler og uploadområder.',
      },
      {
        title: 'Foldr Sign',
        text: "Send PDF'er til underskrift og gem dem tilbage i den rette mappe.",
      },
      {
        title: 'Flow og MaSH',
        text: 'Klassificér, rout og automatisér filer på tværs af systemer.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Driftet og klar.',
        text: 'Hurtig start og mindre lokal administration.',
        points: [
          '30 dages prøveperiode',
          'Dataregion i Storbritannien eller EU',
          'SSO og gruppesynk',
        ],
      },
      {
        label: 'SELVHOSTET',
        title: 'Jeres miljø. Jeres kontrol.',
        text: 'Til egne infrastruktur- og sikkerhedskrav.',
        points: [
          'Virtuel appliance eller egen cloud',
          'Isolerede installationer',
          'AD, ADFS eller Entra ID',
        ],
      },
    ],
  },
  fi: {
    nav: ['Alusta', 'Käyttöönotto', 'Selectec'],
    back: 'Takaisin Selecteciin',
    kicker: 'LAITA TIEDOSTOT TÖIHIN',
    title: 'Yksi paikka kaikille tiedostoille.',
    accent: 'Riippumatta niiden sijainnista.',
    lead: 'Foldr yhdistää ihmiset ja prosessit jo käytössä olevaan tallennukseen – OneDriveen, SharePointiin, S3:een, verkkolevyihin ja NAS-ratkaisuihin. Tiedostoja ei tarvitse siirtää ja nykyiset oikeudet säilyvät.',
    talk: 'Keskustele Foldrista',
    explore: 'Tutustu alustaan',
    storage: 'YHDISTYY NYKYISEEN TALLENNUKSEEN',
    platform: 'Useita työpintoja. Yksi alusta.',
    platformLead:
      'Hae, muokkaa, jaa, allekirjoita ja automatisoi yhden turvallisen kerroksen kautta.',
    deploy: 'Valitse vaatimuksiinne sopiva käyttömalli.',
    deployLead: 'Sama Foldr-kokemus SaaS-palveluna tai omassa ympäristössä.',
    local: 'Globaali alusta. Pohjoismainen tie tuotantoon.',
    localLead:
      'Selectec auttaa kartoituksessa, suunnittelussa, asennuksessa, koulutuksessa ja ylläpidossa.',
    cta: 'Voisiko Foldr helpottaa tiedostotyötä?',
    ctaLead:
      'Näytämme, kuinka nykyinen tallennus voidaan yhdistää ilman riskialtista migraatiota.',
    book: 'Varaa esittely',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Selaa ja järjestä kaikkien yhdistettyjen tallennuspaikkojen tiedostoja.',
      },
      {
        title: 'Haku',
        text: 'Kokotekstihaku, OCR ja suodattimet käyttöoikeuksien mukaisesti.',
      },
      {
        title: 'Grace AI',
        text: 'Kysy ja tiivistä asiakirjoja samassa turvallisessa käyttöoikeusmallissa.',
      },
      {
        title: 'Jaa ja kerää',
        text: 'Turvalliset linkit, asiakasportaalit ja latausalueet.',
      },
      {
        title: 'Foldr Sign',
        text: 'Lähetä PDF allekirjoitettavaksi ja palauta se oikeaan kansioon.',
      },
      {
        title: 'Flow ja MaSH',
        text: 'Luokittele, reititä ja automatisoi tiedostoja järjestelmien välillä.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Ylläpidetty ja valmis.',
        text: 'Nopea aloitus ja vähemmän paikallista ylläpitoa.',
        points: [
          '30 päivän kokeilu',
          'UK- tai EU-data-alue',
          'SSO ja ryhmäsynkronointi',
        ],
      },
      {
        label: 'OMA YMPÄRISTÖ',
        title: 'Teidän ympäristönne. Teidän hallintanne.',
        text: 'Erityisiin infrastruktuuri- ja tietoturvavaatimuksiin.',
        points: [
          'Virtuaalinen appliance tai oma pilvi',
          'Eristetyt asennukset',
          'AD, ADFS tai Entra ID',
        ],
      },
    ],
  },
  is: {
    nav: ['Kerfið', 'Rekstur', 'Selectec'],
    back: 'Til Selectec',
    kicker: 'LÁTTU SKRÁRNAR VINNA',
    title: 'Einn staður fyrir allar skrár.',
    accent: 'Hvar sem þær eru geymdar.',
    lead: 'Foldr tengir fólk og ferla við geymsluna sem þið notið nú þegar – OneDrive, SharePoint, S3, netdrif og NAS. Skrárnar þurfa ekki að flytjast og núverandi heimildir haldast.',
    talk: 'Ræðum Foldr',
    explore: 'Skoða kerfið',
    storage: 'TENGIST NÚVERANDI GEYMSLU',
    platform: 'Mörg vinnusvæði. Eitt kerfi.',
    platformLead:
      'Leitaðu, breyttu, deildu, undirritaðu og sjálfvirknivæddu í einu öruggu lagi.',
    deploy: 'Veljið rekstur eftir ykkar kröfum.',
    deployLead: 'Sama Foldr-upplifun sem SaaS eða í eigin hýsingu.',
    local: 'Alþjóðlegt kerfi. Norræn leið í framleiðslu.',
    localLead:
      'Selectec aðstoðar við greiningu, hönnun, uppsetningu, þjálfun og rekstur.',
    cta: 'Getur Foldr einfaldað skráavinnuna?',
    ctaLead:
      'Við sýnum hvernig Foldr sameinar núverandi geymslu án áhættusams flutningsverkefnis.',
    book: 'Bóka kynningu',
    surfaces: [
      {
        title: 'Foldr Files',
        text: 'Skoðaðu og skipuleggðu skrár úr öllum tengdum geymslum.',
      },
      {
        title: 'Leit',
        text: 'Heildartextaleit, OCR og síur samkvæmt heimildum notandans.',
      },
      {
        title: 'Grace AI',
        text: 'Spyrðu og dragðu saman skjöl innan sama öryggislíkans.',
      },
      {
        title: 'Deila og safna',
        text: 'Öruggir tenglar, viðskiptavinagáttir og upphleðslusvæði.',
      },
      {
        title: 'Foldr Sign',
        text: 'Sendu PDF til undirritunar og vistaðu aftur í rétta möppu.',
      },
      {
        title: 'Flow og MaSH',
        text: 'Flokkaðu, beindu og sjálfvirknivæddu skrár milli kerfa.',
      },
    ],
    modes: [
      {
        label: 'SAAS',
        title: 'Hýst og tilbúið.',
        text: 'Hröð byrjun og minni staðbundin umsýsla.',
        points: [
          '30 daga prufa',
          'Gagnasvæði í Bretlandi eða ESB',
          'SSO og hópasamstilling',
        ],
      },
      {
        label: 'EIGIN HÝSING',
        title: 'Ykkar umhverfi. Ykkar stjórn.',
        text: 'Fyrir sérstakar innviða- og öryggiskröfur.',
        points: [
          'Sýndarvélar eða eigið ský',
          'Einangraðar uppsetningar',
          'AD, ADFS eða Entra ID',
        ],
      },
    ],
  },
};

const surfaceIcons = [Files, FileSearch, Bot, Share2, PenTool, Workflow];
const storageNames = [
  'OneDrive',
  'SharePoint',
  'S3',
  'Google Drive',
  'Dropbox',
  'Box',
  'SMB / NAS',
];

export default function FoldrPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Lang>('sv');
  const [langOpen, setLangOpen] = useState(false);
  const ui = content[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectec-theme');
    const nextTheme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    const savedLang = localStorage.getItem('selectec-lang') as Lang | null;
    if (savedLang && languageNames[savedLang]) setLang(savedLang);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('selectec-theme', theme);
  }, [theme]);
  useEffect(() => localStorage.setItem('selectec-lang', lang), [lang]);

  return (
    <main className="foldr-page">
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
        <nav aria-label="Foldr menu">
          {ui.nav.map((label, index) => (
            <a key={label} href={['#plattform', '#drift', '#selectec'][index]}>
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
                    className={lang === code ? 'active' : ''}
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
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={
              theme === 'dark' ? 'Aktivera ljust tema' : 'Aktivera mörkt tema'
            }
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="dpp-back" href="/">
            <ArrowLeft size={15} /> {ui.back}
          </a>
        </div>
      </header>

      <section className="foldr-hero">
        <div className="foldr-hero-copy">
          <div className="foldr-brand">
            <img src="/brands/foldr.png" alt="" />
            <b>Foldr</b>
          </div>
          <span className="section-index">{ui.kicker}</span>
          <h1>
            {ui.title}
            <br />
            <strong>{ui.accent}</strong>
          </h1>
          <p>{ui.lead}</p>
          <div>
            <a
              className="primary-button"
              href="mailto:info@selectecnordic.com?subject=Vi%20vill%20prata%20Foldr"
            >
              {ui.talk} <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#plattform">
              {ui.explore} <span>↓</span>
            </a>
          </div>
        </div>
        <div
          className="foldr-workspace"
          aria-label="Illustration av Foldrs gemensamma filvy"
        >
          <div className="workspace-top">
            <span>
              <i /> FOLDR / NORDIC HQ
            </span>
            <small>ALL STORAGE · LIVE</small>
          </div>
          <div className="workspace-path">
            <FolderKanban size={17} /> Projects / Nordic launch
          </div>
          {[
            { name: 'Launch plan.docx', place: 'SharePoint', state: 'EDITING' },
            { name: 'Q4 forecast.xlsx', place: 'OneDrive', state: 'READY' },
            { name: 'Brand assets.zip', place: 'S3', state: 'SHARED' },
          ].map((file, index) => (
            <div className="workspace-file" key={file.name}>
              <span>
                {index === 0 ? (
                  <Files />
                ) : index === 1 ? (
                  <HardDrive />
                ) : (
                  <Cloud />
                )}
              </span>
              <div>
                <b>{file.name}</b>
                <small>{file.place}</small>
              </div>
              <em>{file.state}</em>
            </div>
          ))}
          <div className="workspace-ai">
            <Bot />
            <div>
              <small>GRACE</small>
              <b>Summarise the launch files</b>
            </div>
            <span>↗</span>
          </div>
        </div>
      </section>

      <section className="foldr-storage" data-reveal>
        <span>{ui.storage}</span>
        <div>
          {storageNames.map((name, index) => (
            <b key={name}>
              {index < 2 ? <Cloud /> : index === 6 ? <Server /> : <Network />}
              {name}
            </b>
          ))}
        </div>
      </section>

      <section className="foldr-platform" id="plattform">
        <div className="section-intro" data-reveal>
          <div>
            <span className="section-index">01 / FOLDR</span>
            <h2>{ui.platform}</h2>
          </div>
          <p>{ui.platformLead}</p>
        </div>
        <div className="foldr-surface-grid">
          {ui.surfaces.map((surface, index) => {
            const Icon = surfaceIcons[index];
            return (
              <article key={surface.title} data-reveal>
                <div>
                  <Icon />
                  <span>0{index + 1}</span>
                </div>
                <h3>{surface.title}</h3>
                <p>{surface.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="foldr-deploy" id="drift">
        <div className="choice-heading" data-reveal>
          <span className="section-index">02 / DEPLOY</span>
          <h2>{ui.deploy}</h2>
          <p>{ui.deployLead}</p>
        </div>
        <div className="foldr-deploy-grid">
          {ui.modes.map((mode, index) => (
            <article key={mode.label} data-reveal>
              {index === 0 ? <Cloud /> : <Server />}
              <small>{mode.label}</small>
              <h3>{mode.title}</h3>
              <p>{mode.text}</p>
              <ul>
                {mode.points.map((point) => (
                  <li key={point}>
                    <Check />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="foldr-selectec" id="selectec" data-reveal>
        <div>
          <span className="section-index">03 / SELECTEC NORDIC</span>
          <h2>{ui.local}</h2>
          <p>{ui.localLead}</p>
        </div>
        <div className="foldr-steps">
          {[ShieldCheck, Network, FolderKanban, Workflow].map((Icon, index) => (
            <span key={index}>
              <Icon />
              <b>{['ANALYS', 'DESIGN', 'IMPLEMENTATION', 'SUPPORT'][index]}</b>
            </span>
          ))}
        </div>
      </section>

      <section className="foldr-cta" data-reveal>
        <Link2 />
        <span>FOLDR / SELECTEC NORDIC</span>
        <h2>{ui.cta}</h2>
        <p>{ui.ctaLead}</p>
        <a
          className="primary-button"
          href="mailto:info@selectecnordic.com?subject=Foldr%20genomgång"
        >
          {ui.book} <ArrowRight size={17} />
        </a>
      </section>
      <footer>
        <a className="brand footer-brand" href="/">
          <img src="/selectec-nordic-logo-mono.png" alt="Selectec Nordic" />
        </a>
        <p>{ui.localLead}</p>
        <div>
          <a href="/">Selectec Nordic</a>
          <a href="https://foldr.com/" target="_blank" rel="noreferrer">
            Foldr
          </a>
        </div>
        <small>© 2026 Selectec Nordic</small>
      </footer>
    </main>
  );
}
