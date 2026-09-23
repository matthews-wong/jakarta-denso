import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { CUCI_SERVICE } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  path: CUCI_SERVICE.path,
  title: CUCI_SERVICE.metaTitle,
  description: CUCI_SERVICE.metaDescription,
  image: CUCI_SERVICE.ogImage,
});

interface CuciMobilLayoutProps {
  children: React.ReactNode;
}

const CuciMobilLayout = ({ children }: CuciMobilLayoutProps): React.JSX.Element => <>{children}</>;

export default CuciMobilLayout;
