import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";
import { JsonLd } from "@/components/site/JsonLd";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  LOCALE,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  THEME_COLOR,
} from "@/lib/site";
import { DEFAULT_OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/seo";
import { businessNode, graph, websiteNode } from "@/lib/structured-data";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/**
 * Site-wide defaults only. There is deliberately NO canonical here: every
 * route sets its own through `pageMetadata()`, so a route can never inherit
 * the homepage's canonical by accident.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_SHORT_NAME}` },
  applicationName: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": `large`,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: LOCALE,
    type: `website`,
    images: [
      { url: DEFAULT_OG_IMAGE, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
    ],
  },
  icons: {
    icon: [
      { url: `/favicon.ico` },
      { url: `/favicon-16x16.png`, sizes: `16x16`, type: `image/png` },
      { url: `/favicon-32x32.png`, sizes: `32x32`, type: `image/png` },
    ],
    apple: [
      { url: `/apple-touch-icon.png`, sizes: `180x180`, type: `image/png` },
    ],
  },
};

export const viewport: Viewport = {
  width: `device-width`,
  initialScale: 1,
  themeColor: THEME_COLOR,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * `data-scroll-behavior="smooth"` makes Next.js switch the global smooth
 * scroll (globals.css) off during route changes, so a new page opens at the
 * top instantly instead of animating up from the previous scroll position.
 * In-page anchors (table of contents, price tabs) still scroll smoothly.
 */
const RootLayout = ({ children }: RootLayoutProps): React.JSX.Element => (
  <html
    lang="id"
    className={instrumentSans.variable}
    data-scroll-behavior="smooth"
  >
    <body>
      <a
        href="#konten"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten
      </a>
      {children}
      <SiteFooter />
      <MobileActionBar />

      <JsonLd data={graph(websiteNode(), businessNode())} />

      <GoogleAnalytics />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
