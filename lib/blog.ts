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

export const BLOG_CATEGORIES = [
  {
    id: `service-ac`,
    name: `Service AC`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
  },
  {
    id: `cuci-mobil`,
    name: `Cuci mobil`,
    servicePath: `/cuci-mobil-terbaik-cirebon`,
  },
  {
    id: `salon-mobil`,
    name: `Salon mobil`,
    servicePath: `/salon-mobil-terbaik-cirebon`,
  },
  {
    id: `mesin-oli`,
    name: `Mesin dan oli`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
  },
  { id: `tips-info`, name: `Tips dan info`, servicePath: `/harga` },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number][`id`];

const CATEGORY_RULES: ReadonlyArray<{ pattern: RegExp; id: BlogCategoryId }> = [
  { pattern: /\bAC\b/, id: `service-ac` },
  { pattern: /cuci/i, id: `cuci-mobil` },
  { pattern: /salon|interior|jok|detailing|poles/i, id: `salon-mobil` },
  { pattern: /mesin|oli|diesel|radiator/i, id: `mesin-oli` },
];
const LOCAL_GUIDE_PATTERN = /lokasi|automotif/i;
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
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  author: string;
  keywords: readonly string[];
}

export interface BlogPost extends BlogPostSummary {
  /** MDX source without the leading H1. */
  source: string;
  headings: readonly Heading[];
}

export const categoryById = (
  id: BlogCategoryId,
): (typeof BLOG_CATEGORIES)[number] => {
  const category = BLOG_CATEGORIES.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown blog category: ${id}`);
  return category;
};

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

const countReadingMinutes = (content: string): number =>
  Math.max(1, Math.ceil(content.trim().split(/\s+/).length / WORDS_PER_MINUTE));

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
      datePublished: frontmatter.date,
      dateModified:
        frontmatter.updated ?? frontmatter.lastModified ?? frontmatter.date,
      readingMinutes: countReadingMinutes(body),
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
