import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { activeBrand, brandCssVars } from "@/lib/brand";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

// Typography per plan Part 5.1. Editorial neo-serif headings + a premium sans
// body + monospace for spec data. Inter/Roboto/Open Sans are explicitly banned.
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${activeBrand.name} — Specialty Architectural Products, ${activeBrand.region}`,
    template: `%s · ${activeBrand.name}`,
  },
  description: activeBrand.positioning,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      // Inject the active brand palette as CSS custom properties — the entire
      // site re-themes from lib/brand.ts via this one style declaration.
      style={{ cssText: brandCssVars() } as React.CSSProperties}
    >
      <body className="min-h-screen antialiased">
        <ScrollProgress />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
