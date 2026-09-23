/**
 * Price list — the only place prices live.
 *
 * The /harga page, the service pages, the homepage price-check panel and the
 * Offer structured data are all generated from this module, so visible prices
 * and schema prices can never disagree again.
 */

/** Date the prices were last checked; shown on the page and used as the Harga page's lastmod. */
export const PRICES_UPDATED = `2026-09-23`;

export type PriceCategoryId = `cuci` | `salon` | `ac` | `mesin`;

export interface PriceItem {
  name: string;
  description?: string;
  /** Price in rupiah; `null` when it depends on the car's condition. */
  price: number | null;
  /** "mulai" (from) pricing. */
  isFrom?: boolean;
  /** Unit suffix, e.g. "per ban". */
  unit?: string;
  isPopular?: boolean;
  includes?: readonly string[];
}

export interface PriceCategory {
  id: PriceCategoryId;
  name: string;
  /** Short context shown next to the category heading. */
  note: string;
  /** Service page that describes this category. */
  servicePath: string;
  items: readonly PriceItem[];
}

export const PRICE_CATEGORIES: readonly PriceCategory[] = [
  {
    id: `cuci`,
    name: `Cuci mobil`,
    note: `30–60 menit`,
    servicePath: `/cuci-mobil-terbaik-cirebon`,
    items: [
      {
        name: `Cuci Mobil Salju`,
        description: `Snow wash, aman untuk semua jenis cat mobil`,
        price: 55000,
        isPopular: true,
      },
      {
        name: `Cuci Mobil Aneka Rasa`,
        description: `Pilihan wangi, shampoo premium dan wax pelindung`,
        price: 60000,
      },
      {
        name: `Cuci Wetlook`,
        description: `Coating wetlook premium dengan hasil mengkilap tahan lama`,
        price: 200000,
      },
      {
        name: `Doorsmeer T6`,
        description: `Perawatan karet dan pintu dengan silikon T6`,
        price: 20000,
      },
      {
        name: `Cuci Motor Salju`,
        description: `Snow wash untuk motor`,
        price: 25000,
      },
    ],
  },
  {
    id: `salon`,
    name: `Salon mobil`,
    note: `Interior dan eksterior`,
    servicePath: `/salon-mobil-terbaik-cirebon`,
    items: [
      {
        name: `Paket Salon Komplit`,
        description: `Enam layanan sekaligus, luar dan dalam`,
        price: 860000,
        isPopular: true,
        includes: [
          `Salon eksterior`,
          `Salon interior`,
          `Poles jamur kaca`,
          `Poles body`,
          `Salon mesin`,
          `Cuci mobil`,
        ],
      },
      {
        name: `Salon Interior`,
        description: `Pembersihan interior menyeluruh`,
        price: 400000,
        isFrom: true,
      },
      {
        name: `Poles Body Exterior`,
        description: `Poles body dengan compound import`,
        price: 400000,
        isFrom: true,
      },
      {
        name: `Poles Baret Wiper`,
        description: `Menghilangkan baret wiper dengan poles presisi`,
        price: 250000,
      },
      {
        name: `Poles Jamur Kaca`,
        description: `Menghilangkan jamur dan bercak membandel di kaca`,
        price: 150000,
      },
      { name: `Poles Motor`, description: `Poles body motor`, price: 50000 },
    ],
  },
  {
    id: `ac`,
    name: `Service AC`,
    note: `Konsultasi gratis`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
    items: [
      {
        name: `Service AC Mobil`,
        description: `AC tidak dingin, bocor atau berisik`,
        price: 600000,
        isPopular: true,
      },
      {
        name: `Ganti Freon AC`,
        description: `R134a dan R1234yf, diisi dengan alat digital`,
        price: 350000,
      },
      {
        name: `Perbaikan AC Kompleks`,
        description: `Kompresor, kebocoran, spare part original`,
        price: null,
      },
    ],
  },
  {
    id: `mesin`,
    name: `Service mesin`,
    note: `Bisa sambil menunggu`,
    servicePath: `/service-ac-dan-mesin-terbaik-cirebon`,
    items: [
      {
        name: `Purging Diesel`,
        description: `Membersihkan sistem bahan bakar diesel`,
        price: 300000,
        isFrom: true,
        isPopular: true,
      },
      { name: `Tambal Ban Tubeless`, price: 25000 },
      { name: `Charge Accu`, price: 15000 },
      { name: `Isi Gas Nitrogen`, price: 10000, unit: `per ban` },
    ],
  },
];

const RUPIAH = new Intl.NumberFormat(`id-ID`, { maximumFractionDigits: 0 });

/** "Rp 55.000" */
export const formatRupiah = (amount: number): string =>
  `Rp ${RUPIAH.format(amount)}`;

export const PRICE_ON_ASSESSMENT = `Sesuai kondisi`;
export const PRICE_FROM_LABEL = `mulai`;

/** Human label for an item's price, e.g. "mulai Rp 400.000" or "Rp 10.000 per ban". */
export const formatItemPrice = (item: PriceItem): string => {
  if (item.price === null) return PRICE_ON_ASSESSMENT;
  const amount = formatRupiah(item.price);
  const withFrom = item.isFrom ? `${PRICE_FROM_LABEL} ${amount}` : amount;
  return item.unit ? `${withFrom} ${item.unit}` : withFrom;
};

export const getPriceCategory = (id: PriceCategoryId): PriceCategory => {
  const category = PRICE_CATEGORIES.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown price category: ${id}`);
  return category;
};

export const findPriceItem = (id: PriceCategoryId, name: string): PriceItem => {
  const item = getPriceCategory(id).items.find((entry) => entry.name === name);
  if (!item) throw new Error(`Unknown price item "${name}" in ${id}`);
  return item;
};

const pricedAmounts = PRICE_CATEGORIES.flatMap((category) =>
  category.items.flatMap((item) => (item.price === null ? [] : [item.price])),
);

/** schema.org priceRange, derived from the list, e.g. "Rp 10.000–Rp 860.000". */
export const PRICE_RANGE = `${formatRupiah(Math.min(...pricedAmounts))}–${formatRupiah(
  Math.max(...pricedAmounts),
)}`;
