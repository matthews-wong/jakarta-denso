import type { Metadata } from "next";

import { getPostBySlug } from "@/lib/blog";
import { pageMetadata, withBrand } from "@/lib/seo";

const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 158;
const NOT_FOUND_TITLE = `Artikel tidak ditemukan`;

/** Keeps the brand suffix only when the whole title still fits in ~60 characters. */
const articleTitle = (title: string, metaTitle?: string): string => {
  if (metaTitle) return metaTitle;
  const branded = withBrand(title);
  return branded.length <= MAX_TITLE_LENGTH ? branded : title;
};

/** Trims to the last whole word under the snippet limit. */
const clampDescription = (text: string): string => {
  if (text.length <= MAX_DESCRIPTION_LENGTH) return text;
  const cut = text.slice(0, MAX_DESCRIPTION_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(` `)).replace(/[,.;:]$/, ``)}…`;
};

interface BlogPostLayoutProps {
  children: React.ReactNode;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post)
    return {
      title: { absolute: NOT_FOUND_TITLE },
      robots: { index: false, follow: true },
    };

  return pageMetadata({
    path: post.path,
    title: articleTitle(post.title, post.metaTitle),
    description: clampDescription(post.metaDescription ?? post.excerpt),
    image: post.coverImage,
    imageAlt: post.title,
    type: `article`,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
};

const BlogPostLayout = ({
  children,
}: BlogPostLayoutProps): React.JSX.Element => <>{children}</>;

export default BlogPostLayout;
