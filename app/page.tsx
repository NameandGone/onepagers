import Image from "next/image";

function StudioMark() {
  return (
    <svg className="studio-mark-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 7.5c5.9-.8 12.3-.7 19.3.2l2.8 2.5c.2 6.1.1 12.1-.6 15.9-6.8 1-14.2.9-20.9.1C5 20.2 4.7 13.5 5 7.5Z" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21.1 7.8 25 10.3l-3.7.4-.2-2.9Z" fill="#CFE4E5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 14h9.6M9 17h7.2M9 20h10.2" stroke="#0E6B65" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

const TOOLS = [
  {
    name: "Closing Doc Extractor",
    kind: "CLOSING",
    description: "Pull loan fields, costs, and cash to close out of Closing Disclosure PDFs.",
    href: "https://closing.molt-rebirth.in",
    className: "tool-card--closing",
  },
  {
    name: "Discovery Doc Extractor",
    kind: "DISCOVERY",
    description: "Turn a production into a reviewable list of dates, people, amounts, exhibits, and Bates references.",
    href: "https://discovery.molt-rebirth.in",
    className: "tool-card--discovery",
  },
  {
    name: "K-1 Extractor",
    kind: "TAX FORMS",
    description: "Read K-1 and 1099 values, show their source boxes, and export the checked rows.",
    href: "https://k1.molt-rebirth.in",
    className: "tool-card--tax",
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
          <a href="#why">How we think</a>
        </nav>
      </header>

      <section className="studio-hero" id="top" aria-labelledby="studio-title">
        <Image className="hero-prop hero-prop--closing" src="/props/closing-sheet.svg" alt="" width={220} height={280} priority />
        <Image className="hero-prop hero-prop--discovery" src="/props/discovery-index.svg" alt="" width={240} height={250} priority />
        <Image className="hero-prop hero-prop--tax" src="/props/tax-form.svg" alt="" width={230} height={290} priority />
        <Image className="hero-prop hero-prop--pencil" src="/props/correction-pencil.svg" alt="" width={300} height={110} priority />

        <div className="studio-hero-copy">
          <p className="studio-eyebrow">Small software for the work nobody wants to repeat</p>
          <h1 id="studio-title">We bring boring, very niche tools to life.</h1>
          <p className="studio-hero-lede">Serious little tools for the repetitive document work that deserves a better afternoon.</p>
          <a className="studio-primary-link" href="#tools">See what we’re making <Arrow /></a>
        </div>

        <div className="hero-product-mock" aria-label="A preview of the document tools">
          <div className="mock-window-bar">
            <span className="mock-window-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="mock-window-title">review / extract / check</span>
            <span className="mock-window-status">READY</span>
          </div>
          <div className="mock-window-body">
            <div className="mock-source-paper">
              <span className="mock-label">SOURCE PDF</span>
              <strong>Closing Disclosure</strong>
              <span className="mock-rule" />
              <span className="mock-lines" />
              <span className="mock-highlight">$14,147.26</span>
            </div>
            <div className="mock-field-list">
              <span className="mock-label">FIELDS TO CHECK</span>
              <div className="mock-field"><span>Loan amount</span><strong>$162,000</strong><b>HIGH</b></div>
              <div className="mock-field"><span>Cash to close</span><strong>$14,147.26</strong><b>HIGH</b></div>
              <div className="mock-field"><span>Source page</span><strong>Page 5</strong><b>TEXT</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section" id="tools" aria-labelledby="tools-title">
        <div className="section-intro">
          <p className="studio-eyebrow">The first three</p>
          <h2 id="tools-title">For documents that take too long.</h2>
          <p>Each one starts with a narrow problem, then stays close to the real work: upload, read, check, move on.</p>
        </div>
        <div className="tool-grid">
          {TOOLS.map((tool) => (
            <a className={`tool-card ${tool.className}`} href={tool.href} key={tool.name} target="_blank" rel="noreferrer">
              <div className="tool-card-topline"><span>{tool.kind}</span><Arrow /></div>
              <div className="tool-card-sheet" aria-hidden="true"><span /><span /><span /><b /></div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <span className="tool-card-link">Open tool <Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="thinking-section" id="why" aria-labelledby="thinking-title">
        <div className="section-intro section-intro--small">
          <p className="studio-eyebrow">How we think</p>
          <h2 id="thinking-title">Useful beats impressive.</h2>
        </div>
        <div className="thinking-grid">
          <article><span>01</span><h3>Start with the annoying bit</h3><p>We look for the repeated task hiding inside a specialized workflow.</p></article>
          <article><span>02</span><h3>Keep the source close</h3><p>When a document becomes data, you should still be able to see where it came from.</p></article>
          <article><span>03</span><h3>Make the next step obvious</h3><p>Good tools leave you with something ready to check, export, or hand off.</p></article>
        </div>
      </section>

      <section className="studio-outro" aria-labelledby="outro-title">
        <p className="studio-eyebrow">More small tools are on the way</p>
        <h2 id="outro-title">The boring work is usually worth fixing.</h2>
        <p>We’re making a home for the narrow, serious jobs that generic software keeps overlooking.</p>
      </section>

      <footer className="studio-footer">
        <a className="studio-wordmark" href="#top"><span className="studio-mark"><StudioMark /></span><span>onepagers</span></a>
        <span>Small tools for serious repetitive work.</span>
      </footer>
    </main>
  );
}
