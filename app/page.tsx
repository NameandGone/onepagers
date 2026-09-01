import { ExpandingArrowLink } from "./components/expanding-arrow-link";
import { TextScramble } from "./components/text-scramble";

function StudioMark() {
  return (
    <svg className="studio-mark-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M5.5 7.5c5.8-.8 12.1-.7 19 .2l2 2.2c.3 5.7.2 11.4-.5 15.2-6.7.9-13.9.8-20.3.1C5 19.9 4.8 13.2 5.5 7.5Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="m21.3 7.8 3.8 2.1-3.6.6-.2-2.7Z" fill="var(--line)" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 14h9.8M9 17h7.3M9 20h10.2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const TOOLS = [
  {
    name: "Closing Doc Extractor",
    kind: "CLOSING",
    description: "Pull loan terms, costs, and cash to close from Closing Disclosure PDFs.",
    href: "https://closing.molt-rebirth.in",
  },
  {
    name: "Discovery Doc Extractor",
    kind: "DISCOVERY",
    description: "Turn a production into dated, named, numbered facts you can review and export.",
    href: "https://discovery.molt-rebirth.in",
  },
  {
    name: "K-1 Extractor",
    kind: "TAX FORMS",
    description: "Read K-1 and 1099 values with their source boxes still attached.",
    href: "https://k1.molt-rebirth.in",
  },
];

export default function HomePage() {
  return (
    <main className="studio-shell">
      <header className="studio-header">
        <a className="studio-wordmark" href="#top" aria-label="onepagers home">
          <span className="studio-mark"><StudioMark /></span>
          <span>onepagers</span>
        </a>
        <nav className="studio-nav" aria-label="Main navigation">
          <a href="#tools">The tools</a>
          <a href="#why">Why this exists</a>
        </nav>
      </header>

      <section className="studio-hero" id="top" aria-labelledby="studio-title">
        <div className="studio-hero-copy">
          <p className="studio-eyebrow">ONEPAGERS / DOCUMENT TOOLS</p>
          <h1 id="studio-title">
            <TextScramble text={"Stop retyping\nPDFs."} className="hero-title-text" />
          </h1>
          <p className="studio-hero-lede">Pull the facts out, keep the source close, and get back to the work.</p>
          <ExpandingArrowLink href="#tools">See the tools</ExpandingArrowLink>
        </div>

        <div className="hero-workbench" aria-label="A document extraction workbench">
          <div className="workbench-toolbar">
            <span className="workbench-toolbar__brand">ONEPAGERS / WORKBENCH</span>
            <span className="workbench-toolbar__status"><i aria-hidden="true" /> FIELD CHECK</span>
          </div>
          <div className="workbench-body">
            <div className="workbench-source">
              <span className="workbench-label">SOURCE PDF</span>
              <strong>Closing Disclosure</strong>
              <div className="workbench-lines" aria-hidden="true">
                <span /><span /><span /><span /><span /><span />
              </div>
              <div className="workbench-capture">
                <span>cash to close</span>
                <b>$14,147.26</b>
              </div>
            </div>
            <div className="workbench-result">
              <span className="workbench-label">EXTRACTED FIELDS</span>
              <div className="workbench-field">
                <span>Loan amount</span>
                <strong>$162,000</strong>
                <b>HIGH CONFIDENCE</b>
              </div>
              <div className="workbench-field">
                <span>Cash to close</span>
                <strong>$14,147.26</strong>
                <b>HIGH CONFIDENCE</b>
              </div>
              <div className="workbench-field">
                <span>Source page</span>
                <strong>Page 5</strong>
                <b>TEXT LAYER</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section" id="tools" aria-labelledby="tools-title">
        <div className="section-heading section-heading--center">
          <p className="section-kicker">THE FIRST THREE</p>
          <h2 id="tools-title">Three tools for work that keeps coming back.</h2>
          <p>Pick the document. Get the facts. Keep moving.</p>
        </div>

        <div className="tool-showcase-list">
          {TOOLS.map((tool, index) => (
            <article className={`tool-showcase${index % 2 ? " tool-showcase--reverse" : ""}`} key={tool.name}>
              <div className="tool-showcase-copy">
                <p className="tool-kind">{tool.kind}</p>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <a className="tool-open-link" href={tool.href} target="_blank" rel="noreferrer">
                  Open tool
                </a>
              </div>

              <div className="tool-browser">
                <div className="tool-browser-bar" aria-hidden="true">
                  <span className="tool-browser-dots"><i /><i /><i /></span>
                  <span className="tool-browser-url">{tool.href.replace("https://", "")}</span>
                  <span className="tool-browser-state">READY</span>
                </div>
                <iframe src={tool.href} title={`${tool.name} tool`} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="thinking-section" id="why" aria-labelledby="thinking-title">
        <div className="thinking-heading">
          <h2 id="thinking-title">Tools with a point.</h2>
          <p>We build for the work generic software keeps missing.</p>
        </div>
        <div className="thinking-grid">
          <article>
            <span>NARROW SCOPE</span>
            <h3>One ugly job. Done properly.</h3>
            <p>Each tool targets a document workflow specific enough to deserve its own screen.</p>
          </article>
          <article>
            <span>SOURCE ATTACHED</span>
            <h3>Keep the proof.</h3>
            <p>Extracted values stay tied to their file and page, so checking them is not a scavenger hunt.</p>
          </article>
          <article>
            <span>READY TO MOVE</span>
            <h3>Leave with a handoff.</h3>
            <p>Get the facts out, send them on, and stop babysitting a spreadsheet.</p>
          </article>
        </div>
      </section>

      <section className="studio-outro" aria-labelledby="outro-title">
        <div>
          <p className="section-kicker">MORE TO COME</p>
          <h2 id="outro-title">Have a document problem? Good.</h2>
          <p>We build small tools for specialized work. If the job is repetitive and the software is bad, it belongs here.</p>
        </div>
        <a className="outline-link" href="#tools">Back to the tools</a>
      </section>

      <footer className="studio-footer">
        <a className="studio-wordmark" href="#top"><span className="studio-mark"><StudioMark /></span><span>onepagers</span></a>
        <span>Small tools for work worth fixing.</span>
      </footer>
    </main>
  );
}
