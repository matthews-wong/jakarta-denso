import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://jakartaintldenso.com";

// Gallery images surfaced in the image sitemap for image-heavy pages.
const GALLERY_IMAGE_PATHS = [
  "/images/og-image.jpg",
  "/images/proses-cuci.jpeg",
  "/images/Poles-Mobil.jpeg",
  "/images/ekterior.jpeg",
  "/images/eksterior2.jpeg",
  "/images/Jok-mobil.jpeg",
  "/images/Parfum-mobil.jpeg",
  "/images/purging.jpeg",
  "/images/velg.jpeg",
  "/images/lokasi-kami.jpeg",
];

const absolute = (pathname: string): string =>
  pathname.startsWith("http") ? pathname : `${BASE_URL}${pathname}`;

interface StaticEntry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  images?: string[];
}

const STATIC_PAGES: StaticEntry[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/harga", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/gallery",
    changeFrequency: "weekly",
    priority: 0.8,
    images: GALLERY_IMAGE_PATHS,
  },
  {
    path: "/ulasan-kami",
    changeFrequency: "weekly",
    priority: 0.8,
    images: GALLERY_IMAGE_PATHS,
  },
  {
    path: "/kontak-kami",
    changeFrequency: "monthly",
    priority: 0.7,
    images: GALLERY_IMAGE_PATHS,
  },
  {
    path: "/cuci-mobil-terbaik-cirebon",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/salon-mobil-terbaik-cirebon",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/service-ac-dan-mesin-terbaik-cirebon",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  { path: "/blogs", changeFrequency: "daily", priority: 1.0 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absolute(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.images ? { images: page.images.map(absolute) } : {}),
  }));

  const posts = await getAllPosts();
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absolute(`/blogs/${post.slug}`),
    lastModified: new Date(
      post.frontmatter.lastModified || post.frontmatter.date,
    ),
    changeFrequency: "weekly",
    priority: 0.7,
    images: [absolute(post.frontmatter.coverImage)],
  }));

  return [...staticPages, ...blogPosts];
}
