import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
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

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s · Patrick Hourihan",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Patrick Hourihan",
    "small business website design",
    "website designer Northampton MA",
    "Western Massachusetts web design",
    "website redesign",
    "website maintenance",
    "web developer",
    "Next.js developer",
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
        type: "image/png",
        alt: `${siteConfig.name}, ${siteConfig.role}`,
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

/** Person + service structured data. Conservative: no ratings or fabricated claims. */
function structuredData() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Northampton",
    addressRegion: "MA",
    addressCountry: "US",
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#patrick`,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Website Designer and Developer",
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone.e164,
    address,
    sameAs: [siteConfig.links.github, siteConfig.links.personalSite],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Patrick Hourihan Website Design and Development",
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone.e164,
    address,
    areaServed: "Western Massachusetts",
    founder: { "@id": `${siteConfig.url}/#patrick` },
  };

  return [person, service];
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
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
