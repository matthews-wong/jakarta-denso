import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Cache configuration
const cache = new LRUCache<string, BlogPost>({
  max: 100,
  ttl: 1000 * 60 * 60,
});

// Zod schemas for runtime type validation
const FrontmatterSchema = z.object({
  title: z.string().default('Blog Post Jakarta Intl Denso Cirebon , Spesialis AC Mobil Cirebon'),
  date: z.string().default(() => new Date().toISOString().split('T')[0]),
  excerpt: z.string().default('Jakarta Intl Denso Cirebon , Tempat Cuci Mobil Terbaik di Cirebon dan Spesialis AC Mobil di Cirebon'),
  coverImage: z.string().default('/images/2022-09-07.avif'),
  category: z.string().default('Automotif Cirebon'),
  author: z.string().default('Tim Jakarta Intl Denso Cirebon'),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default(['blog']),
  lastModified: z.string().default(() => new Date().toISOString().split('T')[0]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  readingTime: z.string().optional(),
  canonical: z.string().optional(),
});

// Types derived from Zod schemas
type Frontmatter = z.infer<typeof FrontmatterSchema>;

interface BlogPost {
  frontmatter: Frontmatter;
  content: MDXRemoteSerializeResult;
  seo: {
    structuredData: string;
    metaTags: {
      title: string;
      description: string;
      ogImage: string;
      ogType: 'article';
      twitterCard: 'summary_large_image';
      canonical: string;
      keywords: string;
      author: string;
      publishedTime: string;
      modifiedTime: string;
    };
  };
}

class BlogError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = 'BLOG_ERROR'
  ) {
    super(message);
    this.name = 'BlogError';
    Object.setPrototypeOf(this, BlogError.prototype);
  }
}

const calculateReadingTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return `${Math.ceil(wordCount / WORDS_PER_MINUTE)} min read`;
};

const generateStructuredData = (frontmatter: Frontmatter, url: string) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'BlogPosting' as const,
  headline: frontmatter.title,
  image: [frontmatter.coverImage],
  datePublished: frontmatter.date,
  dateModified: frontmatter.lastModified,
  author: {
    '@type': 'Person' as const,
    name: frontmatter.author,
  },
  description: frontmatter.excerpt,
  keywords: frontmatter.keywords.join(', '),
  url,
});

async function getPostFromFile(slug: string, baseUrl: string): Promise<BlogPost> {
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
  const filePath = path.join(process.cwd(), 'content', `${sanitizedSlug}.md`);
  
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  if (!content) {
    throw new BlogError('Empty content', 400, 'EMPTY_CONTENT');
  }

  const canonicalUrl = `${baseUrl}/blogs/${sanitizedSlug}`;
  
  // Ensure excerpt is present and prioritized
  const excerpt = data.excerpt || '';
  
  // Parse and validate frontmatter with additional computed fields
  const parsedFrontmatter = FrontmatterSchema.parse({
    ...data,
    // Ensure excerpt is explicitly set and not overridden
    excerpt: excerpt,
    metaTitle: data.metaTitle || data.title,
    // Always use excerpt as metaDescription if available
    metaDescription: excerpt || data.metaDescription,
    readingTime: calculateReadingTime(content),
    canonical: canonicalUrl,
  });
  
  const mdxSource = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  const structuredData = generateStructuredData(parsedFrontmatter, canonicalUrl);

  return {
    frontmatter: parsedFrontmatter,
    content: mdxSource,
    seo: {
      structuredData: JSON.stringify(structuredData),
      metaTags: {
        title: parsedFrontmatter.metaTitle || parsedFrontmatter.title,
        // Explicitly use excerpt for description
        description: excerpt || parsedFrontmatter.metaDescription,
        ogImage: parsedFrontmatter.coverImage,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        canonical: canonicalUrl,
        keywords: parsedFrontmatter.keywords.join(', '),
        author: parsedFrontmatter.author,
        publishedTime: parsedFrontmatter.date,
        modifiedTime: parsedFrontmatter.lastModified,
      },
    },
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    const baseUrl = 'https://jakartaintldenso.com';

    if (!slug) {
      throw new BlogError('Invalid slug provided', 400, 'INVALID_SLUG');
    }

    // Check cache first
    const cachedPost = cache.get(slug);
    if (cachedPost) {
      return NextResponse.json(cachedPost, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
      });
    }

    const post = await getPostFromFile(slug, baseUrl);
    
    // Store in cache
    cache.set(slug, post);

    return NextResponse.json(post, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    if (error instanceof BlogError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}