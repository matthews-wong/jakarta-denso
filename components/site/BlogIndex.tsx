import Image from "next/image";
import Link from "next/link";

import {
  BLOG_PATH,
  formatDateId,
  readingLabel,
  type BlogPostSummary,
  type CategoryLink,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogIndexProps {
  posts: readonly BlogPostSummary[];
  categories: readonly CategoryLink[];
  /** Hub being shown; omitted on the all-posts page. */
  activeId?: string;
}

const ALL_TAB = { id: `all`, name: `Semua`, path: BLOG_PATH } as const;

/**
 * Server-rendered article list. The category tabs are real links to the hub
 * pages (/blogs/kategori/…), so every hub is crawlable and works without JS.
 */
export const BlogIndex = ({
  posts,
  categories,
  activeId = ALL_TAB.id,
}: BlogIndexProps): React.JSX.Element => {
  const [featured, ...rest] = posts;
  const tabs = [ALL_TAB, ...categories];

  return (
    <>
      <nav aria-label="Kategori artikel" className="container-site">
        <ul className="inline-flex max-w-full flex-wrap gap-0.5 rounded-[13px] bg-ice p-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <li key={tab.id}>
                <Link
                  href={tab.path}
                  aria-current={isActive ? `page` : undefined}
                  className={cn(
                    `block whitespace-nowrap rounded-[10px] px-3 py-2.5 text-[14px] font-semibold text-muted hover:text-ink lg:px-[18px] lg:text-[15px]`,
                    isActive && `bg-white text-ink shadow-seg`,
                  )}
                >
                  {tab.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="container-site pb-[72px] pt-8 lg:pb-28 lg:pt-12">
        {featured && (
          <article className="group mb-12 grid items-center gap-6 lg:mb-[72px] lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            {/* Duplicate of the title link, so it is hidden from keyboard and screen readers. */}
            <Link
              href={featured.path}
              tabIndex={-1}
              aria-hidden="true"
              className="relative block aspect-[16/10] overflow-hidden rounded-3xl bg-ice"
            >
              <Image
                src={featured.coverImage}
                alt=""
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 760px, calc(100vw - 40px)"
                className="object-cover"
              />
            </Link>
            <div>
              <Link
                href={featured.categoryPath}
                className="text-[15px] font-semibold text-brand hover:underline"
              >
                {featured.categoryName}
              </Link>
              <h2 className="mb-4 mt-2.5 text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] lg:text-[42px]">
                <Link href={featured.path} className="group-hover:text-brand">
                  {featured.title}
                </Link>
              </h2>
              <p className="max-w-[40ch] text-lg text-muted">
                {featured.excerpt}
              </p>
              <p className="mt-5 text-[15px] text-muted">
                <time dateTime={featured.datePublished}>
                  {formatDateId(featured.datePublished)}
                </time>
                , {readingLabel(featured.readingMinutes)}
              </p>
            </div>
          </article>
        )}

        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={post.path} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ice">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, calc(100vw - 40px)"
                      className="object-cover"
                    />
                  </div>
                  <p className="mb-2 mt-5 text-[14.5px] font-semibold text-brand">
                    {post.categoryName}
                  </p>
                  <h2 className="text-[22px] font-semibold leading-[1.22] tracking-[-0.02em] group-hover:text-brand">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-2.5 line-clamp-3 text-[15.5px] leading-[1.55] text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-[14.5px] text-muted">
                  <time dateTime={post.datePublished}>
                    {formatDateId(post.datePublished)}
                  </time>
                  , {readingLabel(post.readingMinutes)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
