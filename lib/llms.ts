import { categoryPath, getAllPosts, getPopulatedCategories } from "@/lib/blog";
import {
  BLOG_META,
  CONTACT_META,
  GALLERY_META,
  HARGA_META,
  REVIEWS_META,
  type PageMeta,
} from "@/lib/page-meta";
import {
  PRICES_UPDATED,
  PRICE_CATEGORIES,
  formatItemPrice,
} from "@/lib/prices";
import { SERVICES } from "@/lib/services";
import {
  ADDRESS_LINE,
  AREA_SERVED,
  FOUNDING_YEAR,
  OPENING_HOURS,
  PAYMENT_METHODS,
  PHONE_LANDLINE_DISPLAY,
  PHONE_WHATSAPP_DISPLAY,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  formatHoursRange,
} from "@/lib/site";

/**
 * Builds /llms.txt (llmstxt.org): a plain-markdown map of the site for AI
 * assistants and answer engines. Every fact comes from the same modules the
 * pages render, so the file cannot contradict the site.
 */

const link = (name: string, path: string, note?: string): string =>
  `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ``}`;

const pageLink = (name: string, meta: PageMeta): string =>
  link(name, meta.path, meta.description);

const hoursLine = (): string =>
  OPENING_HOURS.map(
    (hours) => `${hours.label} ${formatHoursRange(hours)} WIB`,
  ).join(`, `);

const businessSection = (): string[] => [
  `# ${SITE_NAME}`,
  ``,
  `> ${SITE_TAGLINE}. ${ADDRESS_LINE}, Jawa Barat.`,
  ``,
  `- Alamat: ${ADDRESS_LINE}`,
  `- WhatsApp: ${PHONE_WHATSAPP_DISPLAY}`,
  `- Telepon: ${PHONE_LANDLINE_DISPLAY}`,
  `- Jam buka: ${hoursLine()}`,
  `- Berdiri: ${FOUNDING_YEAR}`,
  `- Area pelanggan: ${AREA_SERVED.join(`, `)}`,
  `- Pembayaran: ${PAYMENT_METHODS}`,
  `- Booking dan konsultasi harga: lewat WhatsApp`,
];

const servicesSection = (): string[] => [
  `## Layanan`,
  ``,
  ...SERVICES.map((service) =>
    link(service.name, service.path, service.metaDescription),
  ),
];

const pricesSection = (): string[] => [
  `## Harga (diperbarui ${PRICES_UPDATED}, mobil ukuran standar)`,
  ``,
  ...PRICE_CATEGORIES.flatMap((category) => [
    `### ${category.name}`,
    ``,
    ...category.items.map((item) => `- ${item.name}: ${formatItemPrice(item)}`),
    ``,
  ]),
  `Daftar lengkap: ${absoluteUrl(HARGA_META.path)}`,
];

const pagesSection = (): string[] => [
  `## Informasi`,
  ``,
  pageLink(`Daftar harga`, HARGA_META),
  pageLink(`Alamat dan kontak`, CONTACT_META),
  pageLink(`Ulasan pelanggan`, REVIEWS_META),
  pageLink(`Galeri`, GALLERY_META),
  pageLink(`Blog`, BLOG_META),
];

const blogSections = async (): Promise<string[]> => {
  const [categories, posts] = await Promise.all([
    getPopulatedCategories(),
    getAllPosts(),
  ]);
  return [
    `## Topik blog`,
    ``,
    ...categories.map((category) =>
      link(category.heading, categoryPath(category.id), category.intro),
    ),
    ``,
    `## Optional`,
    ``,
    // Promotions are left out: their prices are time-limited and would
    // contradict the price list above.
    ...posts
      .filter((post) => !post.isPromotion)
      .map((post) => link(post.title, post.path, post.excerpt)),
  ];
};

export const buildLlmsTxt = async (): Promise<string> =>
  [
    ...businessSection(),
    ``,
    ...servicesSection(),
    ``,
    ...pricesSection(),
    ``,
    ...pagesSection(),
    ``,
    ...(await blogSections()),
    ``,
  ].join(`\n`);
