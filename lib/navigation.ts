/** Site navigation, shared by the header, footer and breadcrumbs. */

export type NavKey =
  `ac` | `cuci` | `salon` | `harga` | `galeri` | `ulasan` | `blog` | `kontak`;

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
}

export const HOME_CRUMB = { name: `Beranda`, path: `/` } as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    key: `ac`,
    label: `Service AC`,
    href: `/service-ac-dan-mesin-terbaik-cirebon`,
  },
  { key: `cuci`, label: `Cuci mobil`, href: `/cuci-mobil-terbaik-cirebon` },
  { key: `salon`, label: `Salon mobil`, href: `/salon-mobil-terbaik-cirebon` },
  { key: `harga`, label: `Harga`, href: `/harga` },
  { key: `galeri`, label: `Galeri`, href: `/gallery` },
  { key: `ulasan`, label: `Ulasan`, href: `/ulasan-kami` },
  { key: `blog`, label: `Blog`, href: `/blogs` },
  { key: `kontak`, label: `Kontak`, href: `/kontak-kami` },
];

export const navItem = (key: NavKey): NavItem => {
  const item = NAV_ITEMS.find((entry) => entry.key === key);
  if (!item) throw new Error(`Unknown nav key: ${key}`);
  return item;
};

export const FOOTER_SERVICE_LINKS: readonly NavItem[] = [
  { key: `ac`, label: `Service AC dan mesin`, href: navItem(`ac`).href },
  { key: `cuci`, label: `Cuci mobil`, href: navItem(`cuci`).href },
  { key: `salon`, label: `Salon mobil`, href: navItem(`salon`).href },
  { key: `harga`, label: `Daftar harga 2026`, href: navItem(`harga`).href },
];

export const FOOTER_ABOUT_LINKS: readonly NavItem[] = [
  { key: `galeri`, label: `Galeri`, href: navItem(`galeri`).href },
  { key: `ulasan`, label: `Ulasan pelanggan`, href: navItem(`ulasan`).href },
  { key: `kontak`, label: `Alamat dan kontak`, href: navItem(`kontak`).href },
  { key: `blog`, label: `Blog`, href: navItem(`blog`).href },
];

/** Evergreen articles linked from every footer. */
export const FOOTER_POPULAR_ARTICLES = [
  {
    label: `Harga cuci mobil Cirebon 2026`,
    href: `/blogs/harga-cuci-mobil-cirebon-2026`,
  },
  {
    label: `AC mobil tidak dingin: 7 penyebab`,
    href: `/blogs/ac-mobil-tidak-dingin-penyebab-umum-solusi`,
  },
  {
    label: `Rute ke Jakarta Int'l Denso`,
    href: `/blogs/rute-menuju-jakarta-intl-denso-cirebon`,
  },
  {
    label: `Cuci mobil atau salon mobil?`,
    href: `/blogs/perbedaan-cuci-mobil-dan-salon-mobil-cirebon`,
  },
] as const;
