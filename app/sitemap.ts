import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { GALLERY_IMAGES } from "@/lib/gallery";
import { NAV_ITEMS } from "@/lib/navigation";
import { PRICES_UPDATED } from "@/lib/prices";
import { absoluteUrl } from "@/lib/site";

/**
 * lastmod is only emitted when it is actually known (price updates, post
 * dates) — never the build time, which would teach Google to ignore it.
 * changefreq/priority are omitted: Google ignores them.
 */

/** Date the page templates were last changed; bump when a static page's content changes. */
const PAGES_UPDATED = `2026-09-23`;

const PAGE_IMAGES: Record<string, readonly string[]> = {
  "/gallery": GALLERY_IMAGES.map((image) => image.src),
  "/": [
    `/images/hero-bengkel.jpg`,
    `/images/AC-Mobil.jpeg`,
    `/images/cuci-mobil12.jpeg`,
    `/images/Salon-mobil.jpeg`,
  ],
  "/kontak-kami": [`/images/lokasi-kami.jpeg`],
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getAllPosts();
  const staticPaths = [`/`, ...NAV_ITEMS.map((item) => item.href)];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: path === `/harga` ? PRICES_UPDATED : PAGES_UPDATED,
    ...(PAGE_IMAGES[path]
      ? { images: PAGE_IMAGES[path].map((src) => absoluteUrl(src)) }
      : {}),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(post.path),
    lastModified: post.dateModified,
    images: [absoluteUrl(post.coverImage)],
  }));

  return [...staticEntries, ...postEntries];
};

export default sitemap;
