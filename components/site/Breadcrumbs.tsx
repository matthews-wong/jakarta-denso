import Link from "next/link";

import type { Crumb } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  crumbs: readonly Crumb[];
  /** Light text for use on a photo hero. */
  onDark?: boolean;
}

/** Visible breadcrumb trail; the matching BreadcrumbList JSON-LD is built from the same crumbs. */
export const Breadcrumbs = ({
  crumbs,
  onDark = false,
}: BreadcrumbsProps): React.JSX.Element => (
  <nav
    aria-label="Breadcrumb"
    className={cn(
      `mb-5 text-[14.5px]`,
      onDark ? `text-white/70` : `text-muted`,
    )}
  >
    <ol className="flex flex-wrap gap-1.5">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <li key={crumb.path} className="flex gap-1.5">
            {isLast ? (
              <span
                aria-current="page"
                className={cn(
                  `font-medium`,
                  onDark ? `text-white` : `text-ink`,
                )}
              >
                {crumb.name}
              </span>
            ) : (
              <>
                <Link href={crumb.path} className="hover:underline">
                  {crumb.name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
