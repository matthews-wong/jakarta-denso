import type { Metadata } from "next";

import { CONTACT_META } from "@/lib/page-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: CONTACT_META.path,
  title: CONTACT_META.title,
  description: CONTACT_META.description,
  image: CONTACT_META.ogImage,
});

interface KontakLayoutProps {
  children: React.ReactNode;
}

const KontakLayout = ({ children }: KontakLayoutProps): React.JSX.Element => <>{children}</>;

export default KontakLayout;
