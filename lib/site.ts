/**
 * Single source of truth for the business's name, address, phone numbers,
 * opening hours and location (NAP).
 *
 * Every component, metadata helper and JSON-LD node reads from here so the
 * site never contradicts itself or the Google Business Profile — consistent
 * NAP is a core local-pack ranking signal. When a detail changes, change it
 * here and nowhere else.
 */

/**
 * Canonical origin. Must equal the host Vercel actually serves (today the
 * apex 308-redirects to www), otherwise every canonical points at a redirect.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://www.jakartaintldenso.com`
).replace(/\/$/, ``);

export const SITE_NAME = `Jakarta Int'l Denso Cirebon`;
export const SITE_SHORT_NAME = `Jakarta Int'l Denso`;
export const SITE_TAGLINE = `Bengkel AC, cuci dan salon mobil di Cirebon sejak 2004`;
export const FOUNDING_YEAR = 2004;
export const LOCALE = `id_ID`;
export const LANGUAGE = `id-ID`;
export const TIME_ZONE = `Asia/Jakarta`;

export const PHONE_WHATSAPP = `+62819647333`;
export const PHONE_WHATSAPP_DISPLAY = `0819-647-333`;
export const PHONE_LANDLINE = `+62231205148`;
export const PHONE_LANDLINE_DISPLAY = `(0231) 205148`;

export const ADDRESS = {
  street: `Jl. Garuda No. 2`,
  locality: `Cirebon`,
  region: `Jawa Barat`,
  postalCode: `45131`,
  country: `ID`,
} as const;

export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality} ${ADDRESS.postalCode}`;

/**
 * Coordinates of the pin used by the embedded Google Map.
 * Verify against the Google Business Profile pin before launch.
 */
export const GEO = { latitude: -6.719029, longitude: 108.554579 } as const;

export const GOOGLE_MAPS_URL = `https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA`;
export const INSTAGRAM_URL = `https://www.instagram.com/jakarta_intl_denso`;
export const TIKTOK_URL = `https://www.tiktok.com/@jakartaintldensocirebon`;
export const SOCIAL_PROFILES = [
  INSTAGRAM_URL,
  TIKTOK_URL,
  GOOGLE_MAPS_URL,
] as const;

export const AREA_SERVED = [
  `Cirebon`,
  `Kuningan`,
  `Indramayu`,
  `Majalengka`,
] as const;

/**
 * Google rating, copied from the Business Profile. Shown as text only —
 * never emitted as Review/AggregateRating schema (self-serving reviews).
 */
export const GOOGLE_RATING = { value: `4,9`, count: `160+` } as const;

export type DayCode = `Mo` | `Tu` | `We` | `Th` | `Fr` | `Sa` | `Su`;

export interface OpeningHours {
  days: readonly DayCode[];
  label: string;
  opens: string;
  closes: string;
}

/** Opening hours. Confirm Sunday hours against the Google Business Profile. */
export const OPENING_HOURS: readonly OpeningHours[] = [
  {
    days: [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`],
    label: `Senin sampai Sabtu`,
    opens: `08:00`,
    closes: `17:00`,
  },
  { days: [`Su`], label: `Minggu`, opens: `08:00`, closes: `16:00` },
];

export const HOLIDAY_HOURS_LABEL = `Libur nasional`;
export const HOLIDAY_HOURS_NOTE = `Jam terbatas`;

/** Driving guidance quoted in the route article. */
export const NEARBY_ROUTES = [
  { city: `Kuningan`, note: `sekitar 45–60 menit` },
  { city: `Indramayu`, note: `lewat jalur Pantura` },
  { city: `Majalengka`, note: `lewat pusat kota` },
] as const;

export const PAYMENT_METHODS = `Tunai, debit, kredit, QRIS, GoPay, OVO, Dana dan transfer bank`;

export const OWNER_NAME = `Suminto Wijaya`;

/** What customers can look for from the road (true to the shopfront photos). */
export const SHOPFRONT_HINT = `Cari spanduk putih “Service AC Mobil, Ganti Oli, Salon Mobil” di bawah kanopi baja. Area parkir luas di depan.`;

/** Formats "08:00" as the Indonesian "08.00". */
export const formatHour = (time: string): string => time.replace(`:`, `.`);

export const formatHoursRange = (hours: OpeningHours): string =>
  `${formatHour(hours.opens)}–${formatHour(hours.closes)}`;

/** WhatsApp deep link, optionally with a pre-filled message. */
export const whatsappLink = (message?: string): string => {
  const base = `https://wa.me/${PHONE_WHATSAPP.replace(`+`, ``)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const bookingMessage = (service: string): string =>
  `Halo ${SITE_SHORT_NAME}, saya mau booking: ${service}`;

export const telLink = (phone: string): string => `tel:${phone}`;

export const absoluteUrl = (path = `/`): string => {
  if (path.startsWith(`http`)) return path;
  return `${SITE_URL}${path.startsWith(`/`) ? path : `/${path}`}`;
};
