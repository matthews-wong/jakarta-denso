import type React from "react"
import Script from "next/script"
import type { Metadata, Viewport } from "next"

// Advanced SEO metadata for Cuci Mobil - optimized for Google Search
export const metadata: Metadata = {
  metadataBase: new URL("https://jakartaintldenso.com"),
  title: {
    default: "Cuci Mobil Terbaik Cirebon - Premium Car Wash | Jakarta Int'l Denso",
    template: "%s | Cuci Mobil Cirebon - Jakarta Int'l Denso",
  },
  description:
    "Cuci mobil premium #1 di Cirebon sejak 2004. ✓ Hidrolik modern ✓ Air PDAM berkualitas ✓ Teknisi berpengalaman 20+ tahun ✓ Cuci luar dalam ✓ Rating 4.9/5 dari 160+ pelanggan. Booking sekarang!",
  keywords: [
    "cuci mobil cirebon",
    "cuci mobil terbaik cirebon",
    "cuci mobil premium cirebon",
    "cuci mobil murah cirebon",
    "cuci mobil hidrolik cirebon",
    "cuci mobil snow wash cirebon",
    "cuci mobil berkualitas cirebon",
    "tempat cuci mobil cirebon",
    "cuci mobil interior cirebon",
    "cuci mobil eksterior cirebon",
    "cuci mobil terdekat cirebon",
    "cuci mobil 24 jam cirebon",
    "harga cuci mobil cirebon",
    "promo cuci mobil cirebon",
    "jakarta intl denso cuci mobil",
    "car wash cirebon",
  ],
  authors: [{ name: "Jakarta Int'l Denso", url: "https://jakartaintldenso.com" }],
  creator: "Jakarta Int'l Denso",
  publisher: "Jakarta Int'l Denso",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://jakartaintldenso.com/cuci-mobil-terbaik-cirebon",
    languages: {
      "id-ID": "https://jakartaintldenso.com/cuci-mobil-terbaik-cirebon",
    },
  },
  openGraph: {
    title: "Cuci Mobil Terbaik Cirebon - Premium Car Wash Sejak 2004",
    description:
      "Cuci mobil premium #1 di Cirebon. Hidrolik modern, teknisi berpengalaman, hasil memuaskan. Rating 4.9/5.",
    url: "https://jakartaintldenso.com/cuci-mobil-terbaik-cirebon",
    siteName: "Jakarta Int'l Denso Cirebon",
    images: [
      {
        url: "https://jakartaintldenso.com/images/blog-cuci-mobil.jpeg",
        width: 1200,
        height: 630,
        alt: "Cuci Mobil Premium Jakarta Intl Denso Cirebon - Layanan Cuci Mobil Terbaik",
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
    title: "Cuci Mobil Terbaik Cirebon | Jakarta Int'l Denso",
    description:
      "Cuci mobil premium #1 di Cirebon sejak 2004. Teknisi berpengalaman, hidrolik modern, hasil memuaskan.",
    images: ["https://jakartaintldenso.com/images/blog-cuci-mobil.jpeg"],
    creator: "@jakartaintldenso",
    site: "@jakartaintldenso",
  },
  verification: {
    google: "G-FRX906FRWV",
  },
  category: "automotive",
  classification: "Car Wash Service",
  other: {
    "geo.region": "ID-JB",
    "geo.placename": "Cirebon",
    "geo.position": "-6.732022;108.552316",
    "ICBM": "-6.732022, 108.552316",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

// Enhanced Structured Data - Service Schema
const carWashServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jakartaintldenso.com/cuci-mobil-terbaik-cirebon#service",
  name: "Cuci Mobil Premium Cirebon",
  alternateName: ["Car Wash Cirebon", "Premium Car Wash", "Cuci Mobil Terbaik"],
  description: "Layanan cuci mobil premium dengan teknisi berpengalaman 20+ tahun, hidrolik modern, dan air PDAM berkualitas. Melayani cuci luar, cuci dalam, dan paket lengkap.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://jakartaintldenso.com/#organization",
    name: "Jakarta Int'l Denso Cirebon",
    image: "https://jakartaintldenso.com/images/blog-cuci-mobil.jpeg",
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
  serviceType: "Car Wash",
  areaServed: [
    { "@type": "City", name: "Cirebon" },
    { "@type": "City", name: "Kuningan" },
    { "@type": "City", name: "Indramayu" },
    { "@type": "City", name: "Majalengka" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket Cuci Mobil",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cuci Luar",
          description: "Cuci eksterior mobil dengan snow foam dan pengeringan",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "IDR",
          price: "35000",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cuci Luar Dalam",
          description: "Cuci eksterior dan interior lengkap termasuk vakum",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "IDR",
          price: "55000",
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
}

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
      name: "Cuci Mobil Terbaik Cirebon",
      item: "https://jakartaintldenso.com/cuci-mobil-terbaik-cirebon",
    },
  ],
}

// FAQ Schema - Car Wash specific
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa harga cuci mobil di Jakarta Int'l Denso Cirebon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Harga cuci mobil mulai dari Rp35.000 untuk cuci luar dan Rp55.000 untuk cuci luar dalam. Harga dapat bervariasi tergantung jenis dan ukuran mobil. Tersedia juga paket bulanan dengan harga lebih hemat.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama waktu cuci mobil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waktu cuci mobil berkisar 30-60 menit tergantung paket yang dipilih. Cuci luar sekitar 30 menit, cuci luar dalam sekitar 45-60 menit. Kami mengutamakan kualitas hasil cuci.",
      },
    },
    {
      "@type": "Question",
      name: "Apa keunggulan cuci mobil di Jakarta Int'l Denso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keunggulan kami meliputi: (1) Pengalaman 20+ tahun sejak 2004, (2) Teknisi profesional terlatih, (3) Hidrolik modern untuk akses menyeluruh, (4) Air PDAM berkualitas, (5) Produk pembersih premium, (6) Ruang tunggu nyaman dengan WiFi gratis.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah buka setiap hari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kami buka setiap hari Senin-Minggu mulai pukul 08.00-17.00 WIB. Kami juga beroperasi di hari libur nasional.",
      },
    },
    {
      "@type": "Question",
      name: "Dimana lokasi Jakarta Int'l Denso Cirebon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami berlokasi strategis di Jl. Garuda No 2, Cirebon, Jawa Barat 45131. Lokasi mudah dijangkau dari pusat kota dan tersedia area parkir luas.",
      },
    },
  ],
}

// HowTo Schema for process
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Proses Cuci Mobil Premium di Jakarta Int'l Denso",
  description: "7 langkah cuci mobil premium untuk hasil maksimal",
  totalTime: "PT45M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Mobil Masuk", text: "Pemeriksaan kondisi awal kendaraan" },
    { "@type": "HowToStep", position: 2, name: "Naik Hidrolik", text: "Akses menyeluruh ke seluruh bagian mobil" },
    { "@type": "HowToStep", position: 3, name: "Snow Foam", text: "Penyemprotan snow foam untuk mengangkat kotoran" },
    { "@type": "HowToStep", position: 4, name: "Hand Wash", text: "Pembersihan manual dengan microfiber" },
    { "@type": "HowToStep", position: 5, name: "Pembilasan", text: "Pembilasan dengan air PDAM berkualitas" },
    { "@type": "HowToStep", position: 6, name: "Interior Clean", text: "Vakum dan pembersihan interior" },
    { "@type": "HowToStep", position: 7, name: "Pengeringan", text: "Pengeringan dengan kanebo premium" },
  ],
}

export default function CuciMobilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="schema-carwash-service" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(carWashServiceSchema)}
      </Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id="schema-faq-carwash" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="schema-howto" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(howToSchema)}
      </Script>
    </>
  )
}
