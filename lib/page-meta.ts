import { findPriceItem, formatItemPrice } from "@/lib/prices";
import {
  ADDRESS_LINE,
  GOOGLE_RATING,
  OPENING_HOURS,
  PHONE_LANDLINE_DISPLAY,
  PHONE_WHATSAPP_DISPLAY,
  formatHoursRange,
} from "@/lib/site";

/**
 * Titles (≤ 60 characters) and descriptions (≈ 140–155) for the non-service
 * routes. Prices and NAP are interpolated from their single sources so the
 * snippets can never quote a stale price or phone number.
 */

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  ogImage: string;
}

const price = (id: Parameters<typeof findPriceItem>[0], name: string): string =>
  formatItemPrice(findPriceItem(id, name));

const hoursSummary = OPENING_HOURS.map(
  (hours) => `${hours.label} ${formatHoursRange(hours)}`,
).join(`, `);

export const HARGA_META: PageMeta = {
  path: `/harga`,
  title: `Harga Cuci, Salon & AC Mobil Cirebon | Jakarta Int'l Denso`,
  description: `Harga 2026: cuci mobil salju ${price(`cuci`, `Cuci Mobil Salju`)}, paket salon komplit ${price(`salon`, `Paket Salon Komplit`)}, ganti freon AC ${price(`ac`, `Ganti Freon AC`)}, purging diesel ${price(`mesin`, `Purging Diesel`)} di Cirebon.`,
  ogImage: `/og/harga.jpg`,
};

export const BLOG_META: PageMeta = {
  path: `/blogs`,
  title: `Blog Perawatan Mobil & AC Cirebon | Jakarta Int'l Denso`,
  description: `Tips service AC, cuci dan salon mobil dari bengkel Jakarta Int'l Denso Cirebon: panduan harga, jadwal perawatan, dan info lokal Cirebon–Pantura.`,
  ogImage: `/og/blog.jpg`,
};

export const GALLERY_META: PageMeta = {
  path: `/gallery`,
  title: `Galeri Cuci & Salon Mobil Cirebon | Jakarta Int'l Denso`,
  description: `Foto hasil cuci mobil, poles, salon interior, aksesoris dan fasilitas bengkel Jakarta Int'l Denso di Jl. Garuda No. 2, Cirebon.`,
  ogImage: `/og/galeri.jpg`,
};

export const REVIEWS_META: PageMeta = {
  path: `/ulasan-kami`,
  title: `Ulasan Pelanggan Jakarta Int'l Denso Cirebon`,
  description: `Apa kata pelanggan tentang cuci mobil, salon dan service AC di Jakarta Int'l Denso Cirebon: ${GOOGLE_RATING.value}/5 dari ${GOOGLE_RATING.count} ulasan Google.`,
  ogImage: `/og/ulasan.jpg`,
};

export const CONTACT_META: PageMeta = {
  path: `/kontak-kami`,
  title: `Alamat & Kontak Jakarta Int'l Denso Cirebon`,
  description: `${ADDRESS_LINE}. WhatsApp ${PHONE_WHATSAPP_DISPLAY}, telepon ${PHONE_LANDLINE_DISPLAY}. Buka ${hoursSummary}.`,
  ogImage: `/og/kontak.jpg`,
};
