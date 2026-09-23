"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

export interface BlogIndexPost {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  coverImage: string;
  categoryId: string;
  categoryName: string;
  datePublished: string;
  dateLabel: string;
  readingLabel: string;
}

interface BlogIndexProps {
  posts: readonly BlogIndexPost[];
  categories: ReadonlyArray<{ id: string; name: string }>;
}

const ALL = `all`;

/**
 * Category filter over a fully server-rendered list: every article link is in
 * the initial HTML; JavaScript only hides the ones outside the chosen category.
 */
export const BlogIndex = ({
  posts,
  categories,
}: BlogIndexProps): React.JSX.Element => {
  const [activeId, setActiveId] = useState(ALL);

  const handleSelect = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setActiveId(event.currentTarget.dataset.category ?? ALL);
  }, []);

  const visible = useMemo(
    () =>
      activeId === ALL
        ? posts
        : posts.filter((post) => post.categoryId === activeId),
    [activeId, posts],
  );
  const [featured, ...rest] = visible;
  const tabs = [{ id: ALL, name: `Semua` }, ...categories];

  return (
    <>
      <div role="group" aria-label="Filter kategori" className="container-site">
        <div className="inline-flex max-w-full flex-wrap gap-0.5 rounded-[13px] bg-ice p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-category={tab.id}
              aria-pressed={tab.id === activeId}
              onClick={handleSelect}
              className={cn(
                `whitespace-nowrap rounded-[10px] px-3 py-2.5 text-[14px] font-semibold text-muted lg:px-[18px] lg:text-[15px]`,
                tab.id === activeId && `bg-white text-ink shadow-seg`,
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container-site pb-[72px] pt-8 lg:pb-28 lg:pt-12">
        {featured && (
          <article className="group mb-12 grid items-center gap-6 lg:mb-[72px] lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <Link
              href={featured.path}
              className="relative block aspect-[16/10] overflow-hidden rounded-3xl bg-ice"
            >
              <Image
                src={featured.coverImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
              />
            </Link>
            <div>
              <p className="text-[15px] font-semibold text-brand">
                {featured.categoryName}
              </p>
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
                  {featured.dateLabel}
                </time>
                , {featured.readingLabel}
              </p>
            </div>
          </article>
        )}

        <ul className="grid gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="group">
                <Link href={post.path} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ice">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
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
                <p className="mt-3 text-[14.5px] text-muted">
                  <time dateTime={post.datePublished}>{post.dateLabel}</time>,{" "}
                  {post.readingLabel}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
