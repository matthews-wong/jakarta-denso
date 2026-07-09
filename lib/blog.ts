import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Server-only blog data access.
 *
 * Centralizes markdown reading, frontmatter validation and BlogPosting
 * structured-data generation so the `/blogs` list, the `/blogs/[slug]` page and
 * the sitemap all share one implementation. Content lives in `content/*.md`.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://jakartaintldenso.com";
const CONTENT_DIR = path.join(process.cwd(), "content");
const SITE_NAME = "Jakarta Intl Denso Cirebon";
const LOGO_URL = `${BASE_URL}/images/logo-jid.png`;

const FrontmatterSchema = z.object({
  title: z
    .string()
    .default(
      "Blog Post Jakarta Intl Denso Cirebon, Spesialis AC Mobil Cirebon",
    ),
  date: z.string().default(() => new Date().toISOString().split("T")[0]),
  excerpt: z
    .string()
    .default(
      "Jakarta Intl Denso Cirebon, Tempat Cuci Mobil Terbaik di Cirebon dan Spesialis AC Mobil di Cirebon",
    ),
  coverImage: z.string().default("/images/og-image.jpg"),
  category: z.string().default("Automotif Cirebon"),
  author: z.string().default("Tim Jakarta Intl Denso Cirebon"),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default(["blog"]),
  lastModified: z
    .string()
    .default(() => new Date().toISOString().split("T")[0]),
  readingTime: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof FrontmatterSchema>;

export interface BlogPostingStructuredData {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  description: string;
  keywords: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  /** Raw MDX source, rendered on the server via `next-mdx-remote/rsc`. */
  source: string;
  structuredData: BlogPostingStructuredData;
}

export interface BlogListItem {
  slug: string;
  frontmatter: BlogFrontmatter;
}

const sanitizeSlug = (slug: string): string =>
  slug.replace(/[^a-zA-Z0-9-]/g, "");

const calculateReadingTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return `${Math.ceil(wordCount / WORDS_PER_MINUTE)} min read`;
};

const toAbsoluteUrl = (value: string): string =>
  value.startsWith("http") ? value : `${BASE_URL}${value}`;

const buildStructuredData = (
  frontmatter: BlogFrontmatter,
  url: string,
): BlogPostingStructuredData => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: frontmatter.title,
  image: [toAbsoluteUrl(frontmatter.coverImage)],
  datePublished: frontmatter.date,
  dateModified: frontmatter.lastModified,
  author: {
    "@type": "Person",
    name: frontmatter.author,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  description: frontmatter.excerpt,
  keywords: frontmatter.keywords.join(", "),
  url,
});

/** All markdown slugs found in `content/`. */
export const getAllSlugs = async (): Promise<string[]> => {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
};

/** Frontmatter for every post, newest first — used by the blog list. */
export const getAllPosts = async (): Promise<BlogListItem[]> => {
  const slugs = await getAllSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug): Promise<BlogListItem | null> => {
      try {
        const fileContent = await fs.readFile(
          path.join(CONTENT_DIR, `${slug}.md`),
          "utf8",
        );
        const { data, content } = matter(fileContent);
        const frontmatter = FrontmatterSchema.parse({
          ...data,
          readingTime: data.readingTime || calculateReadingTime(content),
        });
        return { slug, frontmatter };
      } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
      }
    }),
  );

  return posts
    .filter((post): post is BlogListItem => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
};

/** A single post with raw MDX source and its BlogPosting structured data, or null if not found. */
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const sanitizedSlug = sanitizeSlug(slug);

  try {
    const fileContent = await fs.readFile(
      path.join(CONTENT_DIR, `${sanitizedSlug}.md`),
      "utf8",
    );
    const { data, content } = matter(fileContent);

    if (!content.trim()) {
      return null;
    }

    const frontmatter = FrontmatterSchema.parse({
      ...data,
      readingTime: data.readingTime || calculateReadingTime(content),
    });

    const url = `${BASE_URL}/blogs/${sanitizedSlug}`;

    return {
      slug: sanitizedSlug,
      frontmatter,
      source: content,
      structuredData: buildStructuredData(frontmatter, url),
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
};
