import {
  ADDRESS,
  AREA_SERVED,
  FOUNDING_YEAR,
  GEO,
  GOOGLE_MAPS_URL,
  LANGUAGE,
  OPENING_HOURS,
  PAYMENT_METHODS,
  PHONE_WHATSAPP,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "@/lib/site";
import {
  PRICE_RANGE,
  getPriceCategory,
  type PriceCategoryId,
} from "@/lib/prices";

/**
 * JSON-LD builders. The site publishes ONE business entity (stable `@id`)
 * and every page node references it, instead of repeating conflicting
 * LocalBusiness blocks. Rules this module enforces:
 * - no Review/AggregateRating about ourselves (self-serving, against policy)
 * - FAQPage only for questions that are visible on that page
 * - Offer prices come from lib/prices.ts, the same data the page shows
 */

export type JsonLdNode = Record<string, unknown>;

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_PATH = `/android-chrome-512x512.png`;
const DEFAULT_IMAGE_PATH = `/og/home.jpg`;

const DAY_NAMES: Record<string, string> = {
  Mo: `Monday`,
  Tu: `Tuesday`,
  We: `Wednesday`,
  Th: `Thursday`,
  Fr: `Friday`,
  Sa: `Saturday`,
  Su: `Sunday`,
};

const ref = (id: string): JsonLdNode => ({ "@id": id });

const cityNodes = (): JsonLdNode[] =>
  AREA_SERVED.map((name) => ({ "@type": `City`, name }));

export const pageId = (path: string): string => `${absoluteUrl(path)}#webpage`;
export const breadcrumbId = (path: string): string =>
  `${absoluteUrl(path)}#breadcrumb`;

export const graph = (...nodes: JsonLdNode[]): JsonLdNode => ({
  "@context": `https://schema.org`,
  "@graph": nodes,
});

export const websiteNode = (): JsonLdNode => ({
  "@type": `WebSite`,
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: LANGUAGE,
  publisher: ref(BUSINESS_ID),
});

export const businessNode = (): JsonLdNode => ({
  "@type": [`AutoRepair`, `CarWash`],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": `ImageObject`, url: absoluteUrl(LOGO_PATH) },
  image: absoluteUrl(DEFAULT_IMAGE_PATH),
  telephone: PHONE_WHATSAPP,
  priceRange: PRICE_RANGE,
  currenciesAccepted: `IDR`,
  paymentAccepted: PAYMENT_METHODS,
  foundingDate: String(FOUNDING_YEAR),
  address: {
    "@type": `PostalAddress`,
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  geo: {
    "@type": `GeoCoordinates`,
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  hasMap: GOOGLE_MAPS_URL,
  openingHoursSpecification: OPENING_HOURS.map((hours) => ({
    "@type": `OpeningHoursSpecification`,
    dayOfWeek: hours.days.map((day) => DAY_NAMES[day]),
    opens: hours.opens,
    closes: hours.closes,
  })),
  areaServed: cityNodes(),
  sameAs: [...SOCIAL_PROFILES],
});

export interface WebPageNodeInput {
  path: string;
  name: string;
  description: string;
  type?: `WebPage` | `CollectionPage` | `ContactPage` | `ImageGallery`;
  image?: string;
  hasBreadcrumb?: boolean;
  extra?: JsonLdNode;
}

export const webPageNode = (input: WebPageNodeInput): JsonLdNode => ({
  "@type": input.type ?? `WebPage`,
  "@id": pageId(input.path),
  url: absoluteUrl(input.path),
  name: input.name,
  description: input.description,
  inLanguage: LANGUAGE,
  isPartOf: ref(WEBSITE_ID),
  about: ref(BUSINESS_ID),
  ...(input.image
    ? {
        primaryImageOfPage: {
          "@type": `ImageObject`,
          url: absoluteUrl(input.image),
        },
      }
    : {}),
  ...(input.hasBreadcrumb === false
    ? {}
    : { breadcrumb: ref(breadcrumbId(input.path)) }),
  ...input.extra,
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbNode = (
  path: string,
  crumbs: readonly Crumb[],
): JsonLdNode => ({
  "@type": `BreadcrumbList`,
  "@id": breadcrumbId(path),
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": `ListItem`,
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

const offerNodes = (categoryIds: readonly PriceCategoryId[]): JsonLdNode[] =>
  categoryIds.flatMap((id) =>
    getPriceCategory(id).items.flatMap((item): JsonLdNode[] => {
      if (item.price === null) return [];
      const price = item.isFrom
        ? {
            priceSpecification: {
              "@type": `PriceSpecification`,
              priceCurrency: `IDR`,
              minPrice: item.price,
            },
          }
        : { price: item.price };
      return [
        {
          "@type": `Offer`,
          itemOffered: {
            "@type": `Service`,
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
          },
          priceCurrency: `IDR`,
          ...price,
        },
      ];
    }),
  );

export interface ServiceNodeInput {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  categoryIds: readonly PriceCategoryId[];
}

export const serviceNode = (input: ServiceNodeInput): JsonLdNode => ({
  "@type": `Service`,
  "@id": `${absoluteUrl(input.path)}#service`,
  name: input.name,
  serviceType: input.serviceType,
  description: input.description,
  url: absoluteUrl(input.path),
  provider: ref(BUSINESS_ID),
  areaServed: cityNodes(),
  hasOfferCatalog: {
    "@type": `OfferCatalog`,
    name: input.name,
    itemListElement: offerNodes(input.categoryIds),
  },
});

export const priceCatalogNode = (
  path: string,
  categoryIds: readonly PriceCategoryId[],
): JsonLdNode => ({
  "@type": `OfferCatalog`,
  "@id": `${absoluteUrl(path)}#catalog`,
  name: `Daftar harga ${SITE_NAME}`,
  provider: ref(BUSINESS_ID),
  itemListElement: offerNodes(categoryIds),
});

export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqNode = (
  path: string,
  faqs: readonly FaqEntry[],
): JsonLdNode => ({
  "@type": `FAQPage`,
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": `Question`,
    name: faq.question,
    acceptedAnswer: { "@type": `Answer`, text: faq.answer },
  })),
});

export interface BlogPostingNodeInput {
  path: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  section: string;
  keywords: readonly string[];
}

export const blogPostingNode = (input: BlogPostingNodeInput): JsonLdNode => ({
  "@type": `BlogPosting`,
  "@id": `${absoluteUrl(input.path)}#article`,
  headline: input.headline,
  description: input.description,
  image: [absoluteUrl(input.image)],
  datePublished: input.datePublished,
  dateModified: input.dateModified,
  inLanguage: LANGUAGE,
  articleSection: input.section,
  keywords: input.keywords.join(`, `),
  author: ref(BUSINESS_ID),
  publisher: ref(BUSINESS_ID),
  mainEntityOfPage: ref(pageId(input.path)),
  isPartOf: ref(WEBSITE_ID),
});

export const itemListNode = (
  path: string,
  urls: readonly string[],
): JsonLdNode => ({
  "@type": `ItemList`,
  "@id": `${absoluteUrl(path)}#list`,
  itemListElement: urls.map((url, index) => ({
    "@type": `ListItem`,
    position: index + 1,
    url: absoluteUrl(url),
  })),
});

export interface ImageObjectInput {
  src: string;
  caption: string;
}

export const imageObjectNodes = (
  images: readonly ImageObjectInput[],
): JsonLdNode[] =>
  images.map((image) => ({
    "@type": `ImageObject`,
    contentUrl: absoluteUrl(image.src),
    caption: image.caption,
    creator: ref(BUSINESS_ID),
    copyrightHolder: ref(BUSINESS_ID),
  }));
