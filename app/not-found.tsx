import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site/SiteHeader";
import { NAV_ITEMS } from "@/lib/navigation";

export const metadata: Metadata = {
  title: { absolute: `Halaman tidak ditemukan | Jakarta Int'l Denso` },
  description: `Halaman yang Anda cari tidak ada. Lihat layanan, harga dan alamat Jakarta Int'l Denso Cirebon.`,
  robots: { index: false, follow: true },
};

const NotFound = (): React.JSX.Element => (
  <>
    <SiteHeader />
    <main id="konten" className="container-site py-20 lg:py-28">
      <p className="text-[15px] font-semibold text-brand">404</p>
      <h1 className="h-page mt-3 max-w-[16ch]">Halaman ini tidak ditemukan</h1>
      <p className="mt-5 max-w-[48ch] text-lg text-muted">
        Alamatnya mungkin sudah berubah. Coba salah satu halaman di bawah, atau
        kembali ke beranda.
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        <li>
          <Link href="/" className="btn btn-dark">
            Ke beranda
          </Link>
        </li>
        {NAV_ITEMS.slice(0, 4).map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="btn btn-line">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default NotFound;
