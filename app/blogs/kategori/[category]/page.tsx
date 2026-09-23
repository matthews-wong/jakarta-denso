import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogIndex } from "@/components/site/BlogIndex";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  BLOG_PATH,
  categoryById,
  categoryPath,
  getCategoryLinks,
  getPopulatedCategories,
  getPostsByCategory,
  isBlogCategoryId,
  type BlogCategory,
  type BlogCategoryId,
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
  type Crumb,
} from "@/lib/structured-data";

/** Only hubs that have posts are generated; anything else 404s. */
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<
  { category: BlogCategoryId }[]
> => (await getPopulatedCategories()).map(({ id }) => ({ category: id }));

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const resolveCategory = async (
  params: CategoryPageProps[`params`],
): Promise<BlogCategory | null> => {
  const { category } = await params;
  return isBlogCategoryId(category) ? categoryById(category) : null;
};

const categoryCrumbs = (category: BlogCategory): Crumb[] => [
  HOME_CRUMB,
  { name: `Blog`, path: BLOG_PATH },
  { name: category.name, path: categoryPath(category.id) },
];

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const category = await resolveCategory(params);
  if (!category) return {};
  return pageMetadata({
    path: categoryPath(category.id),
    title: category.metaTitle,
    description: category.metaDescription,
    image: BLOG_META.ogImage,
  });
};

/**
 * Topic hub: every article in one category, linked to the matching service
 * page. Gives each topic a crawlable, indexable URL with its own title
 * instead of a JavaScript-only filter on /blogs.
 */
const BlogCategoryPage = async ({
  params,
}: CategoryPageProps): Promise<React.JSX.Element> => {
  const category = await resolveCategory(params);
  if (!category) notFound();

  const path = categoryPath(category.id);
  const crumbs = categoryCrumbs(category);
  const [posts, categories] = await Promise.all([
    getPostsByCategory(category.id),
    getCategoryLinks(),
  ]);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path,
            name: category.metaTitle,
            description: category.metaDescription,
            type: `CollectionPage`,
            extra: {
              mainEntity: { "@id": `${absoluteUrl(path)}#list` },
            },
          }),
          breadcrumbNode(path, crumbs),
          itemListNode(
            path,
            posts.map((post) => post.path),
          ),
        )}
      />
      <SiteHeader active="blog" />
      <main id="konten">
        <PageHeader
          crumbs={crumbs}
          title={category.heading}
          lead={category.intro}
        >
          <p className="mt-5 text-[15.5px] text-muted">
            {posts.length} artikel.{` `}
            <Link href={category.servicePath} className="text-link">
              {category.serviceLabel}
            </Link>
          </p>
        </PageHeader>
        <BlogIndex
          posts={posts}
          categories={categories}
          activeId={category.id}
        />
      </main>
    </>
  );
};

export default BlogCategoryPage;
