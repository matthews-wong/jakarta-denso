import type { Metadata } from "next";

import { LOCALE, SITE_NAME, SITE_SHORT_NAME } from "@/lib/site";

/**
 * Builds a route's metadata so every page gets — by construction — a
 * self-referencing canonical, matching Open Graph/Twitter tags and a
 * 1200×630 share image. The root layout deliberately sets no canonical so a
 * route that forgets this helper can never inherit the homepage's.
 */

export const DEFAULT_OG_IMAGE = `/og/home.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const TITLE_SEPARATOR = ` | `;

export interface PageMetadataInput {
  /** Route path, e.g. "/harga". */
  path: string;
  /** Full document title (≤ 60 characters). */
  title: string;
  /** Meta description (≈ 140–155 characters). */
  description: string;
  image?: string;
  imageAlt?: string;
  type?: `website` | `article`;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/** "Harga" → "Harga | Jakarta Int'l Denso" */
export const withBrand = (title: string): string =>
  `${title}${TITLE_SEPARATOR}${SITE_SHORT_NAME}`;

export const pageMetadata = (input: PageMetadataInput): Metadata => {
  const image = input.image ?? DEFAULT_OG_IMAGE;
  const imageAlt = input.imageAlt ?? input.title;
  const isArticle = input.type === `article`;

  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: isArticle ? `article` : `website`,
      url: input.path,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      locale: LOCALE,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt,
        },
      ],
      ...(isArticle
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: `summary_large_image`,
      title: input.title,
      description: input.description,
      images: [image],
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
};
