import Image from "next/image";

type StackedCircularFooterProps = {
  homeHref: string;
  toolsHref: string;
  whyHref: string;
  faqHref: string;
  description: string;
  note: string;
};

const SOCIALS = ["in", "x", "◉"];

export function StackedCircularFooter({
  homeHref,
  toolsHref,
  whyHref,
  faqHref,
  description,
  note,
}: StackedCircularFooterProps) {
  return (
    <footer className="circular-footer">
      <div className="circular-footer__stack">
        <div className="circular-footer__identity">
          <a className="circular-footer__brand" href={homeHref}>
            <span className="circular-footer__logo-orb"><Image src="/onepagers-mark.svg" alt="" width={24} height={24} /></span>
            <span>onepagers</span>
          </a>
          <p>{description}</p>
        </div>
        <nav className="circular-footer__links" aria-label="Footer navigation">
          <a href={homeHref}>Home</a>
          <a href={toolsHref}>The tools</a>
          <a href={whyHref}>Why this exists</a>
          <a href={faqHref}>FAQ</a>
        </nav>
        <div className="circular-footer__socials" aria-label="Social links">
          {SOCIALS.map((social) => (
            <span className="circular-footer__social" tabIndex={0} aria-label={`${social} — Coming soon`} key={social}>
              {social}
              <span className="circular-footer__tooltip">Coming soon</span>
            </span>
          ))}
        </div>
      </div>
      <div className="circular-footer__bottom">
        <span>{note}</span>
        <span>© {new Date().getFullYear()} onepagers</span>
      </div>
    </footer>
  );
}
