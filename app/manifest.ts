import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_TAGLINE, THEME_COLOR } from "@/lib/site";

const SHORT_NAME = `Denso Cirebon`;
const BACKGROUND_COLOR = `#ffffff`;

/** Web app manifest, generated from lib/site.ts so name and colours never drift. */
const manifest = (): MetadataRoute.Manifest => ({
  name: SITE_NAME,
  short_name: SHORT_NAME,
  description: SITE_TAGLINE,
  lang: `id`,
  start_url: `/`,
  scope: `/`,
  display: `standalone`,
  theme_color: THEME_COLOR,
  background_color: BACKGROUND_COLOR,
  icons: [
    {
      src: `/android-chrome-192x192.png`,
      sizes: `192x192`,
      type: `image/png`,
    },
    {
      src: `/android-chrome-512x512.png`,
      sizes: `512x512`,
      type: `image/png`,
    },
  ],
});

export default manifest;
