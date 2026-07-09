import Link from "next/link";
import {
  activeBrand,
  addressLines,
  isPlaceholderPhone,
  isPlaceholderEmail,
} from "@/lib/brand";
import { solutionCategories, productLines } from "@/lib/products";

/**
 * Persistent footer with product/resource wayfinding and the always-on
 * quote/phone CTAs (plan Part 2.2). Company name/contact read from brand.ts.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <Wordmarkish />
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            {activeBrand.positioning}
          </p>
          <address className="mt-4 space-y-0.5 font-mono text-xs not-italic text-ink-muted">
            {addressLines().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            {!isPlaceholderPhone() && (
              <a
                href={`tel:${activeBrand.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="block hover:text-ink"
              >
                {activeBrand.contact.phone}
              </a>
            )}
            {!isPlaceholderEmail() && (
              <a
                href={`mailto:${activeBrand.contact.email}`}
                className="block hover:text-ink"
              >
                {activeBrand.contact.email}
              </a>
            )}
          </address>
        </div>

        <FooterCol title="Solutions">
          {solutionCategories.map((c) => (
            <FooterLink key={c.slug} href={`/solutions/${c.slug}`}>
              {c.title}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Product Lines">
          {Object.values(productLines).map((l) => (
            <FooterLink
              key={l.slug}
              href={`/solutions/${l.category}/${l.slug}`}
            >
              {l.name}
              {l.fulfillment === "sell-only" ? " (supply only)" : ""}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Resources">
          <FooterLink href="/resources/spec-library">Spec Library</FooterLink>
          <FooterLink href="/resources/cad-bim">CAD / BIM</FooterLink>
          <FooterLink href="/resources/lead-times">Lead Times</FooterLink>
          <FooterLink href="/resources/aia-ceu">AIA CEU</FooterLink>
          <FooterLink href="/resources/faq">FAQ</FooterLink>
          <FooterLink href="/contact/request-quote">Request a Quote</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-6 font-mono text-xs text-ink-muted">
          © {activeBrand.legalName}. {activeBrand.region}. Manufacturer names are
          trademarks of their respective owners; {activeBrand.name} is an
          independent authorized dealer-installer.
        </div>
      </div>
    </footer>
  );
}

function Wordmarkish() {
  return (
    <span className="font-serif text-lg tracking-tight text-ink">
      {activeBrand.name}
    </span>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wide text-ink-muted">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ink hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
