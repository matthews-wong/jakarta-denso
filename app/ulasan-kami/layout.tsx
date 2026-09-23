import type { Metadata } from "next";

import { REVIEWS_META } from "@/lib/page-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: REVIEWS_META.path,
  title: REVIEWS_META.title,
  description: REVIEWS_META.description,
  image: REVIEWS_META.ogImage,
});

interface UlasanLayoutProps {
  children: React.ReactNode;
}

const UlasanLayout = ({ children }: UlasanLayoutProps): React.JSX.Element => <>{children}</>;

export default UlasanLayout;
