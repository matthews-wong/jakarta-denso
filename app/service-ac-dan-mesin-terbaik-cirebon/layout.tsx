import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { AC_SERVICE } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  path: AC_SERVICE.path,
  title: AC_SERVICE.metaTitle,
  description: AC_SERVICE.metaDescription,
  image: AC_SERVICE.ogImage,
});

interface ServiceAcLayoutProps {
  children: React.ReactNode;
}

const ServiceAcLayout = ({ children }: ServiceAcLayoutProps): React.JSX.Element => <>{children}</>;

export default ServiceAcLayout;
