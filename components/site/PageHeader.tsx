import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import type { Crumb } from "@/lib/structured-data";

interface PageHeaderProps {
  crumbs: readonly Crumb[];
  title: string;
  lead: string;
  children?: React.ReactNode;
}

/** Plain header for inner pages: breadcrumb, the page's single H1 and a lead paragraph. */
export const PageHeader = ({
  crumbs,
  title,
  lead,
  children,
}: PageHeaderProps): React.JSX.Element => (
  <section className="container-site pb-8 pt-8 lg:pb-[52px] lg:pt-[60px]">
    <Breadcrumbs crumbs={crumbs} />
    <h1 className="h-page max-w-[15ch]">{title}</h1>
    <p className="mt-5 max-w-[52ch] text-lg leading-[1.5] text-muted lg:text-xl">
      {lead}
    </p>
    {children}
  </section>
);
