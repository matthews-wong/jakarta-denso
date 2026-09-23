import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Server-only blog data access for `content/*.md`.
 *
 * SEO rules enforced here:
 * - dates are real ISO dates from frontmatter (never the build time), so
 *   `dateModified` and sitemap `lastmod` stay trustworthy;
 * - the markdown's leading `# Title` is stripped because the page already
 *   renders the title as the single H1;
 * - 20+ ad-hoc category labels are normalised into five hubs.
 */

const CONTENT_DIR = path.join(process.cwd(), `content`);
const MARKDOWN_EXTENSION = `.md`;
const WORDS_PER_MINUTE = 200;
export const FALLBACK_COVER = `/og/blog.jpg`;
export const DEFAULT_AUTHOR = `Tim Jakarta Int'l Denso`;
export const BLOG_PATH = `/blogs`;

export const BLOG_CATEGORY_BASE = `${BLOG_PATH}/kategori`;

/**
 * The five topic hubs. Each one is also a crawlable page at
 * `/blogs/kategori/{id}` with its own title, description and intro, so the
 * copy here must stay unique per hub and true to what the workshop does.
 */
export const BLOG_CATEGORIES = [
  {
    id: `service-ac`,
    name: `Service AC`,
    heading: `Artikel service AC mobil`,
    metaTitle: `Tips Service AC Mobil Cirebon | Blog Jakarta Int'l Denso`,
    metaDescription: `Artikel service AC mobil dari bengkel kami di Cirebon: penyebab AC tidak dingin, kapan isi freon, bau AC apek dan jadwal servis rutin.`,
    intro: `Ditulis dari keluhan yang paling sering datang ke bengkel: AC tidak dingin, bau apek, freon cepat habis dan AC yang berisik.`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
    serviceLabel: `Lihat layanan service AC`,
  },
  {
    id: `cuci-mobil`,
    name: `Cuci mobil`,
    heading: `Artikel cuci mobil`,
    metaTitle: `Tips & Harga Cuci Mobil Cirebon | Blog Jakarta Int'l Denso`,
    metaDescription: `Artikel cuci mobil dari Jakarta Int'l Denso Cirebon: harga paket cuci terbaru, ciri tempat cuci yang baik dan apa saja yang dikerjakan saat cuci hidrolik.`,
    intro: `Harga paket cuci, cara memilih tempat cuci dan apa yang dikerjakan di area cuci kami, dari hidrolik sampai bilas air PDAM.`,
    servicePath: `/cuci-mobil-terbaik-cirebon`,
    serviceLabel: `Lihat layanan cuci mobil`,
  },
  {
    id: `salon-mobil`,
    name: `Salon mobil`,
    heading: `Artikel salon mobil`,
    metaTitle: `Tips & Biaya Salon Mobil Cirebon | Blog Jakarta Int'l Denso`,
    metaDescription: `Artikel salon mobil dari Jakarta Int'l Denso Cirebon: rincian biaya salon, perawatan interior, poles body dan jamur kaca, serta kapan mobil perlu disalon.`,
    intro: `Rincian biaya salon, perawatan interior dan poles body, serta tanda mobil sudah perlu disalon setelah terkena debu Pantura.`,
    servicePath: `/salon-mobil-terbaik-cirebon`,
    serviceLabel: `Lihat layanan salon mobil`,
  },
  {
    id: `mesin-oli`,
    name: `Mesin dan oli`,
    heading: `Artikel mesin dan oli`,
    metaTitle: `Tips Mesin, Oli & Radiator Mobil | Blog Jakarta Int'l Denso`,
    metaDescription: `Artikel perawatan mesin dari Jakarta Int'l Denso Cirebon: memilih oli mobil yang tepat, bahaya radiator kurang air dan kapan mesin diesel perlu purging.`,
    intro: `Memilih oli yang tepat, menjaga radiator tetap terisi dan kapan mesin diesel perlu purging.`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
    serviceLabel: `Lihat layanan service mesin`,
  },
  {
    id: `tips-info`,
    name: `Tips dan info`,
    heading: `Tips perawatan dan info bengkel`,
    metaTitle: `Tips Rawat Mobil & Info Bengkel | Blog Jakarta Int'l Denso`,
    metaDescription: `Tips merawat mobil untuk jalanan Cirebon dan Pantura, plus info bengkel kami: alamat, jam buka dan rute dari Kuningan, Indramayu dan Majalengka.`,
    intro: `Merawat mobil untuk musim hujan, kemarau dan mudik lewat Pantura, plus alamat, jam buka dan rute ke bengkel kami.`,
    servicePath: `/harga`,
    serviceLabel: `Lihat daftar harga`,
  },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export type BlogCategoryId = BlogCategory[`id`];

const CATEGORY_RULES: ReadonlyArray<{ pattern: RegExp; id: BlogCategoryId }> = [
  { pattern: /\bAC\b/, id: `service-ac` },
  { pattern: /cuci/i, id: `cuci-mobil` },
  { pattern: /salon|interior|jok|detailing|poles/i, id: `salon-mobil` },
  { pattern: /mesin|oli|diesel|radiator/i, id: `mesin-oli` },
];
const LOCAL_GUIDE_PATTERN = /lokasi|automotif/i;
const PROMOTION_PATTERN = /promo/i;
const LOOSE_DATE_PATTERN = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

/** Pads "2025-02-6" to "2025-02-06" and rejects anything that is not a real date. */
export const normalizeDate = (value: string): string => {
  const match = LOOSE_DATE_PATTERN.exec(value.trim());
  const iso = match
    ? `${match[1]}-${match[2].padStart(2, `0`)}-${match[3].padStart(2, `0`)}`
    : value.trim();
  if (Number.isNaN(Date.parse(iso))) throw new Error(`Invalid date: ${value}`);
  return iso;
};

const DateSchema = z.string().transform(normalizeDate);

const FrontmatterSchema = z.object({
  title: z.string(),
  date: DateSchema,
  /** Preferred "last reviewed" date; `lastModified` is accepted for older posts. */
  updated: DateSchema.optional(),
  lastModified: DateSchema.optional(),
  excerpt: z.string(),
  coverImage: z.string().default(FALLBACK_COVER),
  category: z.string().default(``),
  author: z.string().default(DEFAULT_AUTHOR),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export interface Heading {
  id: string;
  text: string;
}

export interface BlogPostSummary {
  slug: string;
  path: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  metaDescription?: string;
  coverImage: string;
  categoryId: BlogCategoryId;
  categoryName: string;
  categoryPath: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  wordCount: number;
  /** Time-limited offer; its prices may differ from the current price list. */
  isPromotion: boolean;
  author: string;
  keywords: readonly string[];
}

export interface BlogPost extends BlogPostSummary {
  /** MDX source without the leading H1. */
  source: string;
  headings: readonly Heading[];
}

export const categoryById = (id: BlogCategoryId): BlogCategory => {
  const category = BLOG_CATEGORIES.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown blog category: ${id}`);
  return category;
};

export const categoryPath = (id: BlogCategoryId): string =>
  `${BLOG_CATEGORY_BASE}/${id}`;

export const isBlogCategoryId = (value: string): value is BlogCategoryId =>
  BLOG_CATEGORIES.some((category) => category.id === value);

/** Maps a post's free-text category (and title) onto one of the five hubs. */
export const classifyCategory = (
  rawCategory: string,
  title: string,
): BlogCategoryId => {
  if (LOCAL_GUIDE_PATTERN.test(rawCategory)) return `tips-info`;
  const haystack = `${rawCategory} ${title}`;
  const rule = CATEGORY_RULES.find((entry) => entry.pattern.test(haystack));
  return rule ? rule.id : `tips-info`;
};

export const slugify = (text: string): string =>
  text
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-+|-+$/g, ``);

const stripInlineMarkdown = (text: string): string =>
  text
    .replace(/[*_`[\]]/g, ``)
    .replace(/\(.*?\)/g, ``)
    .trim();

/** Removes the first `# Heading` so the page keeps a single H1. */
export const stripLeadingH1 = (content: string): string =>
  content.replace(/^\s*#\s+[^\n]+\n+/, ``);

export const extractHeadings = (content: string): Heading[] =>
  content
    .split(`\n`)
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = stripInlineMarkdown(line.replace(/^##\s+/, ``));
      return { id: slugify(text), text };
    });

const countWords = (content: string): number =>
  content.trim().split(/\s+/).length;

const countReadingMinutes = (wordCount: number): number =>
  Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

const sanitizeSlug = (slug: string): string =>
  slug.replace(/[^a-zA-Z0-9-]/g, ``);

const readPost = async (slug: string): Promise<BlogPost | null> => {
  const safeSlug = sanitizeSlug(slug);
  try {
    const file = await fs.readFile(
      path.join(CONTENT_DIR, `${safeSlug}${MARKDOWN_EXTENSION}`),
      `utf8`,
    );
    const { data, content } = matter(file);
    if (!content.trim()) return null;
    const frontmatter = FrontmatterSchema.parse(data);
    const categoryId = classifyCategory(
      frontmatter.category,
      frontmatter.title,
    );
    const body = stripLeadingH1(content);
    const wordCount = countWords(body);
    return {
      slug: safeSlug,
      path: `${BLOG_PATH}/${safeSlug}`,
      title: frontmatter.title,
      metaTitle: frontmatter.metaTitle,
      excerpt: frontmatter.excerpt,
      metaDescription: frontmatter.metaDescription,
      coverImage: frontmatter.coverImage,
      categoryId,
      categoryName: categoryById(categoryId).name,
      categoryPath: categoryPath(categoryId),
      datePublished: frontmatter.date,
      dateModified:
        frontmatter.updated ?? frontmatter.lastModified ?? frontmatter.date,
      readingMinutes: countReadingMinutes(wordCount),
      wordCount,
      isPromotion: PROMOTION_PATTERN.test(frontmatter.category),
      author: frontmatter.author,
      keywords: frontmatter.keywords,
      source: body,
      headings: extractHeadings(body),
    };
  } catch (error) {
    console.error(`Error reading blog post ${safeSlug}:`, error);
    return null;
  }
};

const toSummary = (post: BlogPost): BlogPostSummary => {
  const { source: _source, headings: _headings, ...summary } = post;
  return summary;
};

let allPostsCache: Promise<BlogPost[]> | null = null;

const loadAllPosts = (): Promise<BlogPost[]> => {
  allPostsCache ??= (async () => {
    const slugs = await getAllSlugs();
    const posts = await Promise.all(slugs.map(readPost));
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort(
        (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
      );
  })();
  return allPostsCache;
};

/** All markdown slugs found in `content/`. */
export const getAllSlugs = async (): Promise<string[]> => {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(MARKDOWN_EXTENSION))
      .map((file) => file.slice(0, -MARKDOWN_EXTENSION.length));
  } catch (error) {
    console.error(`Error reading content directory:`, error);
    return [];
  }
};

/** Every post, newest first. */
export const getAllPosts = async (): Promise<BlogPostSummary[]> =>
  (await loadAllPosts()).map(toSummary);

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const posts = await loadAllPosts();
  return posts.find((post) => post.slug === sanitizeSlug(slug)) ?? null;
};

/** Posts in one hub, newest first. */
export const getPostsByCategory = async (
  id: BlogCategoryId,
): Promise<BlogPostSummary[]> =>
  (await getAllPosts()).filter((post) => post.categoryId === id);

/** Hubs that have at least one post (empty hubs get no page). */
export const getPopulatedCategories = async (): Promise<BlogCategory[]> => {
  const posts = await getAllPosts();
  return BLOG_CATEGORIES.filter((category) =>
    posts.some((post) => post.categoryId === category.id),
  );
};

export interface CategoryLink {
  id: BlogCategoryId;
  name: string;
  path: string;
}

/** Tabs for the blog index and hub pages: one link per populated hub. */
export const getCategoryLinks = async (): Promise<CategoryLink[]> =>
  (await getPopulatedCategories()).map(({ id, name }) => ({
    id,
    name,
    path: categoryPath(id),
  }));

/** Most recent `dateModified` among the given posts (for sitemap lastmod). */
export const latestModified = (
  posts: readonly BlogPostSummary[],
): string | undefined =>
  posts
    .map((post) => post.dateModified)
    .sort()
    .at(-1);

/** Same-category posts first, then the newest others. */
export const getRelatedPosts = async (
  post: BlogPostSummary,
  limit = 3,
): Promise<BlogPostSummary[]> => {
  const others = (await getAllPosts()).filter(
    (entry) => entry.slug !== post.slug,
  );
  const sameCategory = others.filter(
    (entry) => entry.categoryId === post.categoryId,
  );
  const rest = others.filter((entry) => entry.categoryId !== post.categoryId);
  return [...sameCategory, ...rest].slice(0, limit);
};

export const getPostsBySlugs = async (
  slugs: readonly string[],
): Promise<BlogPostSummary[]> => {
  const posts = await getAllPosts();
  return slugs.flatMap(
    (slug) => posts.find((post) => post.slug === slug) ?? [],
  );
};

const DATE_FORMAT = new Intl.DateTimeFormat(`id-ID`, {
  day: `numeric`,
  month: `long`,
  year: `numeric`,
  timeZone: `UTC`,
});

/** "5 Juni 2025" */
export const formatDateId = (iso: string): string =>
  DATE_FORMAT.format(new Date(iso));

export const readingLabel = (minutes: number): string =>
  `${minutes} menit baca`;

export const isRemoteImage = (src: string): boolean => /^https?:\/\//.test(src);
