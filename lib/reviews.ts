/**
 * Customer reviews copied verbatim (sometimes shortened with "…") from the
 * Google Business Profile. Shown as quotes only — never emitted as Review
 * schema, because reviews a business publishes about itself are ineligible.
 *
 * Dates are intentionally omitted: the old hard-coded "2 minggu lalu" went
 * stale. Add each review's real date from Google when copying new ones.
 */

export type ReviewService = `Cuci mobil` | `Salon mobil` | `Service AC`;

export interface Review {
  name: string;
  service: ReviewService;
  serviceLabel: string;
  text: string;
}

export const REVIEWS: readonly Review[] = [
  {
    name: `Dante Istanto`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `Kolong Bersih, cepat, interior di vacuum, semua mobil sy cuci disini`,
  },
  {
    name: `Cindy Putri Amelia`,
    service: `Salon mobil`,
    serviceLabel: `Salon interior`,
    text: `Biasanya cuma cuci mobil aja disini. Karena selalu cepet prosesnya. Hari ini salon interior mobil karena jok mobil kotor banget. Dan hasilnya bersih banget semobil dibersihin sampe ke dalem2. Wangi banget udahnya.`,
  },
  {
    name: `Aditya Rifki Satria`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `Cuci mobil paling juara, dengan harga yg worth it, terjangkau. Bisa mendapat kebersihan maksimal luar dalam… Tapi saya puas akan hasilnya.`,
  },
  {
    name: `Bagas Anindito`,
    service: `Service AC`,
    serviceLabel: `Cuci mobil dan service AC`,
    text: `Tempat cuci mobil terbaik di Cirebon, pelayanannya sangat baik dan mobil bersih luar & dalam. Terdapat pelayanan yang lain seperti Service AC, Custom Jok, Ganti Oli, dll.`,
  },
  {
    name: `Novi Andini`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `Pelayanannya ramah, bersih bangett hasilnyaa ga asal asalan, ada ruang tunggu ac-nya tempat favorit nyaman buat tunggu selesai cuci mobil, harga terjangkau.`,
  },
  {
    name: `Ferry Hendryk`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `om Ownernya baek, waktu mau beli air mineral dingin keabisan eh di kasih nya minuman manis tp bayarnya seharga air mineral… mantap pelayanan nya`,
  },
  {
    name: `Sandry Juliandry`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `Nyuci nya bersih, sudah langganan puluhan taun, pelayanan nya sangat memuaskan`,
  },
  {
    name: `Hariadi Sugandi`,
    service: `Cuci mobil`,
    serviceLabel: `Cuci mobil`,
    text: `Mantap, kerja bersih drpd cuci mobil yg lain ada di crb, pertahankan terus utk lbh baik`,
  },
  {
    name: `Rudi Mus Andriyanto`,
    service: `Salon mobil`,
    serviceLabel: `Salon mobil`,
    text: `Bersih maksimal..`,
  },
];

export const REVIEW_FILTERS: readonly ReviewService[] = [
  `Cuci mobil`,
  `Salon mobil`,
  `Service AC`,
];

export const HOME_REVIEWS = REVIEWS.slice(0, 3);
