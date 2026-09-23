import type { BlogCategoryId } from "@/lib/blog";
import type { NavKey } from "@/lib/navigation";
import {
  PRICE_ON_ASSESSMENT,
  findPriceItem,
  formatItemPrice,
  type PriceCategoryId,
} from "@/lib/prices";
import type { FaqEntry } from "@/lib/structured-data";
import {
  ADDRESS_LINE,
  OPENING_HOURS,
  PAYMENT_METHODS,
  SHOPFRONT_HINT,
  formatHoursRange,
} from "@/lib/site";

/**
 * Content for the three service landing pages. FAQ answers that mention a
 * price or opening hours are built from lib/prices.ts and lib/site.ts, so the
 * visible answer and its FAQPage markup always match the price list.
 */

export interface ServiceStep {
  title: string;
  detail: string;
}

export interface ServiceConfig {
  navKey: NavKey;
  path: string;
  /** Breadcrumb / schema name. */
  name: string;
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  h1: string;
  lead: string;
  heroImage: { src: string; alt: string; position?: string };
  /** First category is shown in the hero price panel; the rest as tables below. */
  priceCategoryIds: readonly PriceCategoryId[];
  panelTitle: string;
  bookingLabel: string;
  stepsTitle: string;
  stepsLead: string;
  steps: readonly ServiceStep[];
  faqs: readonly FaqEntry[];
  relatedSlugs: readonly string[];
  /** Blog hub linked from the "Baca juga" section. */
  blogCategoryId: BlogCategoryId;
}

const price = (id: PriceCategoryId, name: string): string =>
  formatItemPrice(findPriceItem(id, name));

const hoursSentence = (): string =>
  OPENING_HOURS.map(
    (hours) => `${hours.label} ${formatHoursRange(hours)}`,
  ).join(`, `);

export const OPENING_HOURS_ANSWER = `Ya. ${hoursSentence()}. Hari libur nasional buka dengan jam terbatas.`;

export const CUCI_SERVICE: ServiceConfig = {
  navKey: `cuci`,
  blogCategoryId: `cuci-mobil`,
  path: `/cuci-mobil-terbaik-cirebon`,
  name: `Cuci mobil`,
  serviceType: `Car wash`,
  metaTitle: `Cuci Mobil Cirebon: Harga & Paket | Jakarta Int'l Denso`,
  metaDescription: `Cuci mobil salju ${price(`cuci`, `Cuci Mobil Salju`)} di Jl. Garuda No. 2, Cirebon. Hidrolik, air PDAM, interior divakum, selesai 30–60 menit.`,
  ogImage: `/og/cuci.jpg`,
  h1: `Cuci mobil di Cirebon, bersih sampai kolong`,
  lead: `Hidrolik, snow foam, cuci tangan dengan microfiber, bilas air PDAM, interior divakum. Rata-rata 30–60 menit.`,
  heroImage: {
    src: `/images/blog-cuci-mobil.jpeg`,
    alt: `Mobil dicuci di area cuci Jakarta Int'l Denso Cirebon`,
    position: `50% 58%`,
  },
  priceCategoryIds: [`cuci`],
  panelTitle: `Paket cuci`,
  bookingLabel: `Booking cuci mobil`,
  stepsTitle: `Tujuh tahap setiap mobil`,
  stepsLead: `Urutan yang sama untuk setiap paket, supaya hasilnya konsisten.`,
  steps: [
    { title: `Masuk`, detail: `Cek kondisi awal` },
    { title: `Naik hidrolik`, detail: `Kolong terjangkau` },
    { title: `Snow foam`, detail: `Kotoran terangkat` },
    { title: `Cuci tangan`, detail: `Microfiber` },
    { title: `Bilas`, detail: `Air PDAM` },
    { title: `Interior`, detail: `Vakum dan lap` },
    { title: `Kering`, detail: `Kanebo premium` },
  ],
  faqs: [
    {
      question: `Berapa harga cuci mobil di Jakarta Int'l Denso?`,
      answer: `Cuci mobil salju ${price(`cuci`, `Cuci Mobil Salju`)}, cuci aneka rasa ${price(`cuci`, `Cuci Mobil Aneka Rasa`)} dan cuci wetlook ${price(`cuci`, `Cuci Wetlook`)} untuk mobil ukuran standar. Mobil yang lebih besar bisa berbeda; tanyakan dulu lewat WhatsApp.`,
    },
    {
      question: `Berapa lama proses cuci mobil?`,
      answer: `Sekitar 30 menit untuk cuci luar dan 45–60 menit untuk cuci luar dalam, tergantung antrean.`,
    },
    { question: `Apakah buka setiap hari?`, answer: OPENING_HOURS_ANSWER },
    {
      question: `Bisa sekalian service AC?`,
      answer: `Bisa. Sebutkan saat booking lewat WhatsApp supaya teknisi AC bisa langsung memeriksa mobil Anda.`,
    },
  ],
  relatedSlugs: [
    `harga-cuci-mobil-cirebon-2026`,
    `ciri-tempat-cuci-mobil-cirebon-berkualitas`,
    `perbedaan-cuci-mobil-dan-salon-mobil-cirebon`,
  ],
};

export const SALON_SERVICE: ServiceConfig = {
  navKey: `salon`,
  blogCategoryId: `salon-mobil`,
  path: `/salon-mobil-terbaik-cirebon`,
  name: `Salon mobil`,
  serviceType: `Car detailing`,
  metaTitle: `Salon Mobil Cirebon: Harga & Paket | Jakarta Int'l Denso`,
  metaDescription: `Salon interior, poles body, jamur kaca dan baret wiper di Jl. Garuda No. 2, Cirebon. Paket salon komplit ${price(`salon`, `Paket Salon Komplit`)}. Konsultasi gratis.`,
  ogImage: `/og/salon.jpg`,
  h1: `Salon mobil di Cirebon, luar dan dalam`,
  lead: `Salon interior, poles body, jamur kaca dan baret wiper, dikerjakan tim yang merawat mobil Cirebon sejak 2004. Paket lengkap sekitar 4–6 jam.`,
  heroImage: {
    src: `/images/Salon-mobil.jpeg`,
    alt: `Salon interior mobil di Jakarta Int'l Denso Cirebon`,
    position: `50% 45%`,
  },
  priceCategoryIds: [`salon`],
  panelTitle: `Paket salon`,
  bookingLabel: `Booking salon mobil`,
  stepsTitle: `Tujuh tahap salon mobil`,
  stepsLead: `Dari inspeksi sampai pengecekan akhir, supaya tidak ada bagian yang terlewat.`,
  steps: [
    { title: `Inspeksi`, detail: `Cek eksterior dan interior` },
    { title: `Pencucian`, detail: `Produk khusus` },
    { title: `Eksterior`, detail: `Poles dan wax body` },
    { title: `Vakum`, detail: `Interior menyeluruh` },
    { title: `Interior`, detail: `Dashboard dan trim` },
    { title: `Kaca`, detail: `Jamur dan baret` },
    { title: `Finishing`, detail: `Pengecekan akhir` },
  ],
  faqs: [
    {
      question: `Berapa harga salon mobil di Jakarta Int'l Denso?`,
      answer: `Paket salon komplit ${price(`salon`, `Paket Salon Komplit`)} sudah termasuk enam layanan. Salon interior ${price(`salon`, `Salon Interior`)}, poles body exterior ${price(`salon`, `Poles Body Exterior`)} dan poles jamur kaca ${price(`salon`, `Poles Jamur Kaca`)}.`,
    },
    {
      question: `Berapa lama salon mobil lengkap?`,
      answer: `Sekitar 4–6 jam, tergantung paket dan kondisi mobil. Kami sebutkan perkiraan waktunya saat Anda datang.`,
    },
    {
      question: `Apa saja yang termasuk paket salon komplit?`,
      answer: `Salon eksterior, salon interior, poles jamur kaca, poles body, salon mesin dan cuci mobil.`,
    },
    {
      question: `Apa bedanya cuci mobil dan salon mobil?`,
      answer: `Cuci membersihkan permukaan dan interior secara umum. Salon mengembalikan tampilan dengan poles body dan pembersihan interior yang lebih dalam.`,
    },
  ],
  relatedSlugs: [
    `biaya-salon-mobil-cirebon`,
    `salon-mobil-cirebon-panduan-detailing`,
    `keunggulan-salon-interior-mobil-di-cuaca-hujan`,
  ],
};

export const AC_SERVICE: ServiceConfig = {
  navKey: `ac`,
  blogCategoryId: `service-ac`,
  path: `/service-ac-dan-mesin-terbaik-cirebon`,
  name: `Service AC dan mesin`,
  serviceType: `Car air conditioning repair`,
  metaTitle: `Service AC & Mesin Mobil Cirebon | Jakarta Int'l Denso`,
  metaDescription: `Service AC mobil di Jl. Garuda No. 2, Cirebon: ganti freon ${price(`ac`, `Ganti Freon AC`)}, service AC ${price(`ac`, `Service AC Mobil`)}, purging diesel. Diagnosa dulu, garansi 1 bulan.`,
  ogImage: `/og/ac.jpg`,
  h1: `Service AC mobil di Cirebon, diagnosa dulu baru dikerjakan`,
  lead: `AC tidak dingin, berbau atau berisik? Teknisi kami memeriksa dulu dan menyebut harga sebelum mengerjakan. Isi freon 30–60 menit, ganti kompresor sekitar satu hari kerja.`,
  heroImage: {
    src: `/images/AC-Mobil.jpeg`,
    alt: `Teknisi memeriksa AC mobil di Jakarta Int'l Denso Cirebon`,
    position: `40% 50%`,
  },
  priceCategoryIds: [`ac`, `mesin`],
  panelTitle: `Harga service AC`,
  bookingLabel: `Booking service AC`,
  stepsTitle: `Tujuh tahap service AC`,
  stepsLead: `Harga disampaikan di tahap kedua, sebelum ada yang dibongkar.`,
  steps: [
    { title: `Diagnosa`, detail: `Cek sistem AC dan mesin` },
    { title: `Estimasi`, detail: `Harga sebelum mulai` },
    { title: `Bongkar`, detail: `Alat presisi` },
    { title: `Bersihkan`, detail: `Evaporator dan kondensor` },
    { title: `Ganti part`, detail: `Original atau alternatif` },
    { title: `Pasang`, detail: `Standar pabrik` },
    { title: `Tes`, detail: `Suhu dan tekanan freon` },
  ],
  faqs: [
    {
      question: `Berapa biaya service AC mobil?`,
      answer: `Ganti freon ${price(`ac`, `Ganti Freon AC`)} dan service AC lengkap ${price(`ac`, `Service AC Mobil`)}. Perbaikan kompresor dan kebocoran ${PRICE_ON_ASSESSMENT.toLowerCase()}; harganya kami sebutkan setelah diagnosa, sebelum dikerjakan.`,
    },
    {
      question: `Berapa lama service AC mobil?`,
      answer: `Isi freon 30–60 menit, cuci evaporator 2–3 jam, ganti kompresor sekitar satu hari kerja. Perkiraan waktu kami sampaikan setelah diagnosa.`,
    },
    {
      question: `Apa tanda AC mobil perlu diservis?`,
      answer: `Udara tidak dingin, bau tidak sedap, bunyi aneh saat AC menyala, air menetes di kabin, atau embun berlebih di kaca. Sebaiknya cek rutin setiap 6 bulan.`,
    },
    {
      question: `Apakah ada garansi?`,
      answer: `Service AC dan isi freon bergaransi satu bulan. Penggantian komponen mengikuti garansi sparepart. Syarat dan ketentuan berlaku.`,
    },
    {
      question: `Mobil apa saja yang dilayani?`,
      answer: `Semua merek, dari mobil Jepang seperti Toyota, Honda dan Daihatsu sampai mobil Eropa.`,
    },
  ],
  relatedSlugs: [
    `ac-mobil-tidak-dingin-penyebab-umum-solusi`,
    `serba-serbi-freon-ac-mobil-kapan-isi-ulang`,
    `panduan-lengkap-servis-ac-mobil-kapan-diperlukan`,
  ],
};

export const SERVICES: readonly ServiceConfig[] = [
  AC_SERVICE,
  CUCI_SERVICE,
  SALON_SERVICE,
];

/** Visible homepage FAQ — also the only FAQPage markup on the homepage. */
export const HOME_FAQS: readonly FaqEntry[] = [
  {
    question: `Berapa lama service AC mobil?`,
    answer: `1–3 jam untuk perawatan rutin. Perbaikan kompresor bisa sampai satu hari kerja.`,
  },
  { question: `Apakah buka hari Minggu?`, answer: OPENING_HOURS_ANSWER },
  {
    question: `Mobil apa saja yang dilayani?`,
    answer: `Semua merek, dari mobil Jepang seperti Toyota, Honda dan Daihatsu sampai mobil Eropa.`,
  },
  {
    question: `Apakah ada garansi?`,
    answer: `Service AC dan isi freon bergaransi satu bulan, dengan syarat dan ketentuan.`,
  },
  { question: `Bisa bayar non-tunai?`, answer: `Bisa. ${PAYMENT_METHODS}.` },
  {
    question: `Di mana lokasinya?`,
    answer: `${ADDRESS_LINE}. ${SHOPFRONT_HINT}`,
  },
];

/** Visible FAQ on /kontak-kami (and its FAQPage markup). */
export const CONTACT_FAQS: readonly FaqEntry[] = [
  {
    question: `Perlu booking dulu sebelum datang?`,
    answer: `Tidak wajib, tapi chat WhatsApp dulu membuat Anda tidak perlu antre lama di jam ramai, terutama akhir pekan.`,
  },
  {
    question: `Apakah ada tempat parkir?`,
    answer: `Ada. Area parkir luas tepat di depan bengkel, di bawah kanopi baja.`,
  },
  { question: `Apakah buka hari Minggu dan hari libur?`, answer: OPENING_HOURS_ANSWER },
  {
    question: `Saya dari luar kota, bisa dipandu rutenya?`,
    answer: `Bisa. Telepon atau chat WhatsApp dan kami pandu arahnya. Dari Kuningan biasanya sekitar 45–60 menit.`,
  },
];

