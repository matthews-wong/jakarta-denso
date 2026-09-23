import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";
import { Lightbulb } from "lucide-react";

import { slugify } from "@/lib/blog";

const ARTICLE_IMAGE_WIDTH = 1200;
const ARTICLE_IMAGE_HEIGHT = 750;

/** Plain text of a heading's children, used to build its anchor id. */
const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) => {
      if (typeof child === `string` || typeof child === `number`)
        return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return textOf(child.props.children);
      return ``;
    })
    .join(``);

const isInternal = (href: string): boolean =>
  href.startsWith(`/`) || href.startsWith(`#`);

/**
 * MDX element overrides for articles. The page renders the post title as the
 * only H1, so any `#` heading left in the markdown is demoted to H2; H2s get
 * ids so the table of contents can link to them.
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mb-4 mt-12 scroll-mt-24 text-[27px] font-semibold tracking-[-0.025em] lg:text-[33px]"
    >
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="mb-4 mt-12 scroll-mt-24 text-[27px] font-semibold tracking-[-0.025em] lg:text-[33px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-[21px] font-semibold tracking-[-0.015em]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-[17.5px] leading-[1.75] text-[#29334F] lg:text-[19px]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 grid list-disc gap-2.5 pl-6 text-[17.5px] leading-[1.7] text-[#29334F] lg:text-[19px]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 grid list-decimal gap-2.5 pl-6 text-[17.5px] leading-[1.7] text-[#29334F] lg:text-[19px]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-brand pl-5 text-lg italic text-muted">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full border-collapse text-left text-base">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-ice">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-line px-4 py-3 text-[#29334F]">
      {children}
    </td>
  ),
  img: ({ src, alt }) =>
    typeof src === `string` ? (
      <figure className="my-9">
        <Image
          src={src}
          alt={alt ?? ``}
          width={ARTICLE_IMAGE_WIDTH}
          height={ARTICLE_IMAGE_HEIGHT}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="h-auto w-full rounded-2xl object-cover"
        />
        {alt && (
          <figcaption className="mt-2.5 text-[14.5px] text-muted">
            {alt}
          </figcaption>
        )}
      </figure>
    ) : null,
  a: ({ href, children }) => {
    const target = href ?? `#`;
    return isInternal(target) ? (
      <Link href={target} className="text-link">
        {children}
      </Link>
    ) : (
      <a href={target} rel="noopener" target="_blank" className="text-link">
        {children}
      </a>
    );
  },
  Tip: ({ children }: { children: ReactNode }) => (
    <aside className="my-8 flex gap-4 rounded-[20px] bg-ice p-6">
      <Lightbulb
        className="mt-1 h-5 w-5 flex-none text-brand"
        aria-hidden="true"
      />
      <div className="text-[17px] text-[#29334F] [&>p]:mb-0">{children}</div>
    </aside>
  ),
  Highlight: ({ children }: { children: ReactNode }) => (
    <aside className="my-8 rounded-[20px] border border-line p-6 text-[17px] text-[#29334F] [&>p]:mb-0">
      {children}
    </aside>
  ),
};
