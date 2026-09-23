import type { Metadata } from "next";

import { HARGA_META } from "@/lib/page-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: HARGA_META.path,
  title: HARGA_META.title,
  description: HARGA_META.description,
  image: HARGA_META.ogImage,
});

interface HargaLayoutProps {
  children: React.ReactNode;
}

const HargaLayout = ({ children }: HargaLayoutProps): React.JSX.Element => <>{children}</>;

export default HargaLayout;
