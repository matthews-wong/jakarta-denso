import type { MetadataRoute } from "next";

import {
  BLOG_PATH,
  categoryPath,
  getAllPosts,
  getPopulatedCategories,
  latestModified,
  type BlogPostSummary,
} from "@/lib/blog";
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

/** Listing pages change when a post in them changes, not when templates do. */
const listingLastModified = (posts: readonly BlogPostSummary[]): string =>
  latestModified(posts) ?? PAGES_UPDATED;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getPopulatedCategories(),
  ]);
  const staticPaths = [`/`, ...NAV_ITEMS.map((item) => item.href)];
  const lastModifiedFor = (path: string): string => {
    if (path === `/harga`) return PRICES_UPDATED;
    if (path === BLOG_PATH) return listingLastModified(posts);
    return PAGES_UPDATED;
  };

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: lastModifiedFor(path),
    ...(PAGE_IMAGES[path]
      ? { images: PAGE_IMAGES[path].map((src) => absoluteUrl(src)) }
      : {}),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(post.path),
    lastModified: post.dateModified,
    images: [absoluteUrl(post.coverImage)],
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: absoluteUrl(categoryPath(category.id)),
      lastModified: listingLastModified(
        posts.filter((post) => post.categoryId === category.id),
      ),
    }),
  );

  return [...staticEntries, ...categoryEntries, ...postEntries];
};

export default sitemap;
