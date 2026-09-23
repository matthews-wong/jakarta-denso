import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { SALON_SERVICE } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  path: SALON_SERVICE.path,
  title: SALON_SERVICE.metaTitle,
  description: SALON_SERVICE.metaDescription,
  image: SALON_SERVICE.ogImage,
});

interface SalonMobilLayoutProps {
  children: React.ReactNode;
}

const SalonMobilLayout = ({ children }: SalonMobilLayoutProps): React.JSX.Element => <>{children}</>;

export default SalonMobilLayout;
