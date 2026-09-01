import type { ReactNode } from "react";

type ExpandingArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function DottedChevron() {
  return (
    <svg viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <circle cx="4" cy="4" r="2" fill="currentColor" />
      <circle cx="10" cy="9" r="2" fill="currentColor" />
      <circle cx="16" cy="14" r="2" fill="currentColor" />
      <circle cx="10" cy="19" r="2" fill="currentColor" />
      <circle cx="4" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

export function ExpandingArrowLink({
  href,
  children,
  className,
}: ExpandingArrowLinkProps) {
  return (
    <a className={`expanding-arrow-link${className ? ` ${className}` : ""}`} href={href}>
      <span className="expanding-arrow-link__accent" aria-hidden="true">
        <span className="expanding-arrow-link__chevron expanding-arrow-link__chevron--single">
          <DottedChevron />
        </span>
        <span className="expanding-arrow-link__trail">
          <DottedChevron />
          <DottedChevron />
          <DottedChevron />
          <DottedChevron />
          <DottedChevron />
        </span>
      </span>
      <span className="expanding-arrow-link__label">{children}</span>
    </a>
  );
}
