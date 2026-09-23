import type { Metadata } from "next";

import { BlogIndex, type BlogIndexPost } from "@/components/site/BlogIndex";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  BLOG_CATEGORIES,
  formatDateId,
  getAllPosts,
  readingLabel,
} from "@/lib/blog";
import { HOME_CRUMB } from "@/lib/navigation";
import { BLOG_META } from "@/lib/page-meta";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  breadcrumbNode,
  graph,
  itemListNode,
  webPageNode,
} from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  path: BLOG_META.path,
  title: BLOG_META.title,
  description: BLOG_META.description,
  image: BLOG_META.ogImage,
});

const CRUMBS = [HOME_CRUMB, { name: `Blog`, path: BLOG_META.path }];

const BlogPage = async (): Promise<React.JSX.Element> => {
  const posts = await getAllPosts();
  const indexPosts: BlogIndexPost[] = posts.map((post) => ({
    slug: post.slug,
    path: post.path,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    categoryId: post.categoryId,
    categoryName: post.categoryName,
    datePublished: post.datePublished,
    dateLabel: formatDateId(post.datePublished),
    readingLabel: readingLabel(post.readingMinutes),
  }));
  const categories = BLOG_CATEGORIES.filter((category) =>
    posts.some((post) => post.categoryId === category.id),
  );

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path: BLOG_META.path,
            name: BLOG_META.title,
            description: BLOG_META.description,
            type: `CollectionPage`,
            extra: { mainEntity: { "@id": `${absoluteUrl(BLOG_META.path)}#list` } },
          }),
          breadcrumbNode(BLOG_META.path, CRUMBS),
          itemListNode(
            BLOG_META.path,
            posts.map((post) => post.path),
          ),
        )}
      />
      <SiteHeader active="blog" />
      <main id="konten">
        <PageHeader
          crumbs={CRUMBS}
          title="Blog perawatan mobil"
          lead="Dari bengkel kami: kapan AC perlu dicek, berapa harga cuci dan salon di Cirebon, dan rute dari kota sekitar."
        />
        <BlogIndex
          posts={indexPosts}
          categories={categories.map(({ id, name }) => ({ id, name }))}
        />
      </main>
    </>
  );
};

export default BlogPage;
