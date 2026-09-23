/**
 * Workshop photos for /gallery. Captions and alt text describe what is
 * actually in each photo — no "#1" claims and no coating claims (the salon
 * service does not include coating).
 */

export type GalleryCategory =
  `Cuci mobil` | `Salon mobil` | `Aksesoris` | `Bengkel`;

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
  category: GalleryCategory;
  /** Service page the photo illustrates, for internal linking. */
  href?: string;
}

/** One line per category, shown under its heading on /gallery. */
export const GALLERY_CATEGORY_NOTES: Record<GalleryCategory, string> = {
  "Cuci mobil": `Setiap mobil naik hidrolik, disemprot snow foam, dicuci tangan dengan microfiber dan dibilas air PDAM, jadi kolongnya ikut bersih.`,
  "Salon mobil": `Poles body, salon interior, jamur kaca dan baret wiper. Hasil di foto ini dari pengerjaan salon di bengkel kami, tanpa filter.`,
  Aksesoris: `Cover jok paten dan semi paten, velg, dan parfum mobil yang bisa dipasang sambil menunggu mobil selesai dicuci atau diservis.`,
  Bengkel: `Area servis di bawah kanopi baja di Jl. Garuda No. 2, tempat service AC, purging diesel dan cuci mobil dikerjakan.`,
};

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  `Cuci mobil`,
  `Salon mobil`,
  `Aksesoris`,
  `Bengkel`,
];

const CUCI_PATH = `/cuci-mobil-terbaik-cirebon`;
const SALON_PATH = `/salon-mobil-terbaik-cirebon`;
const SERVICE_PATH = `/service-ac-dan-mesin-terbaik-cirebon`;

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    src: `/images/proses-cuci.jpeg`,
    width: 1599,
    height: 899,
    caption: `Snow foam sebelum cuci tangan`,
    alt: `Mobil disemprot snow foam di area cuci Jakarta Int'l Denso Cirebon`,
    category: `Cuci mobil`,
    href: CUCI_PATH,
  },
  {
    src: `/images/Poles-Mobil.jpeg`,
    width: 1600,
    height: 1200,
    caption: `Poles body exterior`,
    alt: `Teknisi memoles bodi mobil dengan compound dan wax`,
    category: `Salon mobil`,
    href: SALON_PATH,
  },
  {
    src: `/images/bengkel-jid.jpeg`,
    width: 1600,
    height: 900,
    caption: `Area servis di bawah kanopi`,
    alt: `Area servis dan cuci Jakarta Int'l Denso di Jl. Garuda No. 2 Cirebon`,
    category: `Bengkel`,
  },
  {
    src: `/images/ekterior.jpeg`,
    width: 1600,
    height: 1200,
    caption: `Eksterior bersih setelah detailing`,
    alt: `Bodi mobil bersih dari kotoran membandel setelah detailing eksterior`,
    category: `Salon mobil`,
    href: SALON_PATH,
  },
  {
    src: `/images/eksterior2.jpeg`,
    width: 1600,
    height: 900,
    caption: `Hasil poles eksterior`,
    alt: `Bodi mobil mengkilap setelah dipoles`,
    category: `Salon mobil`,
    href: SALON_PATH,
  },
  {
    src: `/images/Jok-mobil.jpeg`,
    width: 1308,
    height: 736,
    caption: `Cover jok paten dan semi paten`,
    alt: `Pilihan cover jok mobil paten dan semi paten`,
    category: `Aksesoris`,
  },
  {
    src: `/images/purging.jpeg`,
    width: 900,
    height: 600,
    caption: `Purging diesel`,
    alt: `Proses purging diesel untuk membersihkan sistem bahan bakar`,
    category: `Bengkel`,
    href: SERVICE_PATH,
  },
  {
    src: `/images/velg.jpeg`,
    width: 1600,
    height: 900,
    caption: `Velg berbagai ukuran`,
    alt: `Deretan velg mobil berbagai ukuran dan model`,
    category: `Aksesoris`,
  },
  {
    src: `/images/Parfum-mobil.jpeg`,
    width: 700,
    height: 525,
    caption: `Parfum mobil`,
    alt: `Pilihan parfum mobil`,
    category: `Aksesoris`,
  },
  {
    src: `/images/lokasi-kami.jpeg`,
    width: 1600,
    height: 900,
    caption: `Tampak depan dari Jl. Garuda`,
    alt: `Tampak depan Jakarta Int'l Denso: spanduk putih di bawah kanopi baja`,
    category: `Bengkel`,
  },
];
