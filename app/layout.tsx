import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { visibleSoftwareProjects } from "@/lib/projects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s — Patrick Hourihan",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Patrick Hourihan",
    "software developer",
    "AI-enabled products",
    "Next.js developer",
    "TypeScript",
    "Supabase",
    "Western Massachusetts developer",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Person + work structured data. Conservative — no fabricated claims. */
function structuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Software Developer",
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "MA",
      addressCountry: "US",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.personalSite],
    knowsAbout: [
      "TypeScript",
      "Next.js",
      "React",
      "Supabase",
      "Postgres",
      "Stripe integrations",
      "AI-assisted software development",
    ],
  };

  const projects = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected software projects by Patrick Hourihan",
    itemListElement: visibleSoftwareProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.summary,
        ...(p.liveUrl ? { url: p.liveUrl } : {}),
      },
    })),
  };

  return [person, projects];
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Mark JS as available so the scroll-reveal enhancement can engage.
          If this never runs, content stays fully visible (see globals.css).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData()),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
