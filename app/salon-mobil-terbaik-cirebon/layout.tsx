import type React from "react";
import type { Metadata, Viewport } from "next";

// Advanced SEO metadata for Salon Mobil
export const metadata: Metadata = {
  metadataBase: new URL("https://jakartaintldenso.com"),
  title: {
    absolute: "Salon Mobil Terbaik Cirebon | Jakarta Int'l Denso",
  },
  description:
    "Salon mobil premium #1 di Cirebon sejak 2004. ✓ Paint Correction ✓ Detailing Interior & Eksterior ✓ Poles & Waxing ✓ Teknisi berpengalaman 20+ tahun. Booking sekarang!",
  keywords: [
    "salon mobil cirebon",
    "salon mobil terbaik cirebon",
    "detailing mobil cirebon",
    "paint correction cirebon",
    "poles mobil cirebon",
    "waxing mobil cirebon",
    "interior detailing cirebon",
    "eksterior detailing cirebon",
    "salon mobil premium cirebon",
    "perawatan cat mobil cirebon",
    "jakarta intl denso salon mobil",
  ],
  authors: [
    { name: "Jakarta Int'l Denso", url: "https://jakartaintldenso.com" },
  ],
  creator: "Jakarta Int'l Denso",
  publisher: "Jakarta Int'l Denso",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://jakartaintldenso.com/salon-mobil-terbaik-cirebon",
    languages: {
      "id-ID": "https://jakartaintldenso.com/salon-mobil-terbaik-cirebon",
    },
  },
  openGraph: {
    title: "Salon Mobil Premium Cirebon | Detailing Profesional",
    description:
      "Salon mobil premium #1 di Cirebon. Paint correction, poles, waxing, detailing profesional.",
    url: "https://jakartaintldenso.com/salon-mobil-terbaik-cirebon",
    siteName: "Jakarta Int'l Denso Cirebon",
    images: [
      {
        url: "https://jakartaintldenso.com/images/Salon-mobil.jpeg",
        width: 1200,
        height: 630,
        alt: "Salon Mobil Premium Jakarta Intl Denso Cirebon - Layanan Detailing Terbaik",
        type: "image/jpeg",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Mobil Terbaik Cirebon",
    description:
      "Salon mobil premium #1 di Cirebon sejak 2004. Detailing profesional eksterior & interior.",
    images: ["https://jakartaintldenso.com/images/Salon-mobil.jpeg"],
    creator: "@jakartaintldenso",
    site: "@jakartaintldenso",
  },
  verification: {
    google: "G-FRX906FRWV",
  },
  category: "automotive",
  classification: "Auto Detailing Service",
  other: {
    "geo.region": "ID-JB",
    "geo.placename": "Cirebon",
    "geo.position": "-6.732022;108.552316",
    ICBM: "-6.732022, 108.552316",
    "revisit-after": "7 days",
    rating: "general",
    distribution: "global",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Service Schema for Salon Mobil
const salonMobilServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jakartaintldenso.com/salon-mobil-terbaik-cirebon#service",
  name: "Salon Mobil Premium Cirebon",
  alternateName: ["Auto Detailing Cirebon", "Poles Mobil Cirebon"],
  description:
    "Layanan salon mobil premium dengan detailing eksterior & interior dan paint correction.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://jakartaintldenso.com/#organization",
    name: "Jakarta Int'l Denso Cirebon",
    image: "https://jakartaintldenso.com/images/Salon-mobil.jpeg",
    telephone: "+62819647333",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda No 2",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      postalCode: "45131",
      addressCountry: "ID",
    },
  },
  serviceType: "Auto Detailing",
  areaServed: [
    { "@type": "City", name: "Cirebon" },
    { "@type": "City", name: "Kuningan" },
    { "@type": "City", name: "Indramayu" },
    { "@type": "City", name: "Majalengka" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket Salon Mobil",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Detailing Eksterior",
          description:
            "Paint correction, polishing, dan waxing eksterior mobil",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Detailing Interior",
          description:
            "Deep cleaning, leather treatment, dan fabric protection",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "160",
    bestRating: "5",
    worstRating: "1",
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Beranda",
      item: "https://jakartaintldenso.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Salon Mobil Terbaik Cirebon",
      item: "https://jakartaintldenso.com/salon-mobil-terbaik-cirebon",
    },
  ],
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa saja layanan salon mobil yang tersedia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Layanan salon mobil kami meliputi detailing eksterior (paint correction, polishing, waxing, perawatan kaca) dan detailing interior (deep cleaning, leather treatment, odor removal, fabric protection) untuk hasil yang maksimal.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama proses salon mobil lengkap?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proses salon mobil lengkap membutuhkan waktu 4-6 jam tergantung paket yang dipilih, mulai dari detailing standar hingga paket lengkap eksterior & interior.",
      },
    },
    {
      "@type": "Question",
      name: "Apa keunggulan salon mobil di Jakarta Int'l Denso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keunggulan kami meliputi: (1) Teknisi profesional berpengalaman 20+ tahun, (2) Produk detailing premium berkualitas, (3) Hasil detailing memuaskan, (4) Ruang kerja bersih dan tertutup.",
      },
    },
  ],
};

export default function SalonMobilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        id="schema-salon-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(salonMobilServiceSchema),
        }}
      />
      <script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="schema-faq-salon"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
