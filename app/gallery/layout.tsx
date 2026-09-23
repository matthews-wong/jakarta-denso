import type { Metadata } from "next";

import { GALLERY_META } from "@/lib/page-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: GALLERY_META.path,
  title: GALLERY_META.title,
  description: GALLERY_META.description,
  image: GALLERY_META.ogImage,
});

interface GalleryLayoutProps {
  children: React.ReactNode;
}

const GalleryLayout = ({ children }: GalleryLayoutProps): React.JSX.Element => <>{children}</>;

export default GalleryLayout;
