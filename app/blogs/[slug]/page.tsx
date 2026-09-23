import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { mdxComponents } from "@/components/site/mdxComponents";
import { PostCard } from "@/components/site/PostCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  BLOG_PATH,
  categoryById,
  categoryPath,
  formatDateId,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  readingLabel,
  type BlogCategoryId,
} from "@/lib/blog";
import { HOME_CRUMB } from "@/lib/navigation";
import {
  findPriceItem,
  formatItemPrice,
  type PriceCategoryId,
} from "@/lib/prices";
import {
  OPENING_HOURS,
  bookingMessage,
  formatHoursRange,
  whatsappLink,
} from "@/lib/site";
import {
  blogPostingNode,
  breadcrumbNode,
  graph,
  webPageNode,
} from "@/lib/structured-data";

/** Every post is statically generated at build time; unknown slugs 404. */
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<{ slug: string }[]> =>
  (await getAllSlugs()).map((slug) => ({ slug }));

interface CallToAction {
  title: string;
  service: string;
  priceCategory: PriceCategoryId;
  priceItem: string;
}

/** Contextual CTA per category: the matching service and one real price. */
const CTA_BY_CATEGORY: Record<BlogCategoryId, CallToAction> = {
  "service-ac": {
    title: `AC kurang dingin?`,
    service: `service AC`,
    priceCategory: `ac`,
    priceItem: `Ganti Freon AC`,
  },
  "cuci-mobil": {
    title: `Mobil perlu dicuci?`,
    service: `cuci mobil`,
    priceCategory: `cuci`,
    priceItem: `Cuci Mobil Salju`,
  },
  "salon-mobil": {
    title: `Interior mulai kusam?`,
    service: `salon mobil`,
    priceCategory: `salon`,
    priceItem: `Paket Salon Komplit`,
  },
  "mesin-oli": {
    title: `Mesin terasa berat?`,
    service: `service mesin`,
    priceCategory: `mesin`,
    priceItem: `Purging Diesel`,
  },
  "tips-info": {
    title: `Mau servis sekalian?`,
    service: `cuci atau service AC`,
    priceCategory: `cuci`,
    priceItem: `Cuci Mobil Salju`,
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = async ({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const category = categoryById(post.categoryId);
  const cta = CTA_BY_CATEGORY[post.categoryId];
  const ctaPrice = formatItemPrice(
    findPriceItem(cta.priceCategory, cta.priceItem),
  );
  const crumbs = [
    HOME_CRUMB,
    { name: `Blog`, path: BLOG_PATH },
    { name: category.name, path: categoryPath(category.id) },
    { name: post.title, path: post.path },
  ];
  const weekdayHours = OPENING_HOURS[0];

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path: post.path,
            name: post.title,
            description: post.excerpt,
            image: post.coverImage,
          }),
          breadcrumbNode(post.path, crumbs),
          blogPostingNode({
            path: post.path,
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            section: post.categoryName,
            keywords: post.keywords,
            wordCount: post.wordCount,
            readingMinutes: post.readingMinutes,
          }),
        )}
      />
      <SiteHeader active="blog" />
      <main id="konten">
        <div className="container-site grid gap-10 pb-[72px] pt-7 lg:grid-cols-[minmax(0,720px)_280px] lg:justify-center lg:gap-[88px] lg:pb-28 lg:pt-[52px]">
          <article>
            <Breadcrumbs crumbs={crumbs} />
            <Link
              href={post.categoryPath}
              className="mb-3.5 inline-block text-[15px] font-semibold text-brand hover:underline"
            >
              {post.categoryName}
            </Link>
            <h1 className="text-[36px] font-semibold leading-[1.04] tracking-[-0.035em] lg:text-[54px]">
              {post.title}
            </h1>
            <p className="mb-8 mt-7 text-[15px] text-muted">
              <b className="block font-semibold text-ink">{post.author}</b>
              Terbit{" "}
              <time dateTime={post.datePublished}>
                {formatDateId(post.datePublished)}
              </time>
              {post.dateModified !== post.datePublished && (
                <>
                  , diperbarui{" "}
                  <time dateTime={post.dateModified}>
                    {formatDateId(post.dateModified)}
                  </time>
                </>
              )}
              , {readingLabel(post.readingMinutes)}.
            </p>
            <figure className="relative m-0 aspect-video overflow-hidden rounded-[22px] bg-ice">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 720px, calc(100vw - 40px)"
                className="object-cover"
              />
            </figure>
            <section
              aria-labelledby="ringkasan"
              className="my-9 rounded-[20px] bg-ice px-7 py-6"
            >
              <h2 id="ringkasan" className="mb-2 text-xl font-semibold">
                Ringkasan
              </h2>
              <p className="text-[17px] leading-[1.65] text-[#29334F]">
                {post.excerpt}
              </p>
            </section>

            <MDXRemote
              source={post.source}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            <aside className="my-11 flex flex-col items-start gap-5 rounded-[22px] bg-navy p-7 text-white lg:flex-row lg:items-center lg:gap-6">
              <div className="flex-1">
                <h2 className="mb-1.5 text-[22px] font-semibold">
                  {cta.title}
                </h2>
                <p className="text-base text-white/75">
                  {cta.priceItem} {ctaPrice}. Konsultasi gratis di Jl. Garuda
                  No. 2, {weekdayHours.label}
                  {` `}
                  {formatHoursRange(weekdayHours)}.
                </p>
              </div>
              <a
                href={whatsappLink(bookingMessage(cta.service))}
                className="btn btn-wa"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Tanya lewat WhatsApp
              </a>
            </aside>
            <p className="text-base text-muted">
              Lihat juga{` `}
              <Link href={category.servicePath} className="text-link">
                layanan {category.name.toLowerCase()}
              </Link>
              ,{` `}
              <Link href={post.categoryPath} className="text-link">
                artikel {category.name.toLowerCase()} lainnya
              </Link>
              {` `}dan{` `}
              <Link href="/harga" className="text-link">
                daftar harga lengkap
              </Link>
              .
            </p>
          </article>

          {post.headings.length > 0 && (
            <aside aria-label="Daftar isi" className="hidden lg:block">
              <nav className="sticky top-6">
                <h2 className="mb-3.5 text-[15px] font-semibold">
                  Di artikel ini
                </h2>
                <ol className="border-l-2 border-line">
                  {post.headings.map((heading) => (
                    <li
                      key={heading.id}
                      className="-ml-0.5 border-l-2 border-transparent py-1.5 pl-4 text-[15px] text-muted hover:border-brand hover:text-ink"
                    >
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="section bg-ice">
            <div className="container-site">
              <SectionHeading id="related-heading" title="Baca juga">
                <p>
                  Artikel lain dari kategori {post.categoryName.toLowerCase()}{" "}
                  dan terbaru.
                </p>
              </SectionHeading>
              <div className="grid gap-8 lg:grid-cols-3">
                {related.map((entry) => (
                  <PostCard key={entry.slug} post={entry} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default BlogPostPage;
