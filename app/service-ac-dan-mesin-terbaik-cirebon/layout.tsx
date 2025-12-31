import type React from "react"
import Script from "next/script"
import type { Metadata, Viewport } from "next"

// Advanced SEO metadata for Service AC & Mesin
export const metadata: Metadata = {
  metadataBase: new URL("https://jakartaintldenso.com"),
  title: {
    default: "Service AC & Mesin Mobil Terbaik Cirebon - Bengkel Spesialis | Jakarta Int'l Denso",
    template: "%s | Service AC Mesin Cirebon - Jakarta Int'l Denso",
  },
  description:
    "Bengkel service AC & mesin mobil #1 di Cirebon sejak 2004. ✓ Isi Freon ✓ Ganti Kompresor ✓ Tune Up Mesin ✓ Scanner ECU ✓ Garansi Service ✓ Teknisi bersertifikat. Konsultasi gratis!",
  keywords: [
    "service ac mobil cirebon",
    "bengkel ac mobil cirebon",
    "service mesin mobil cirebon",
    "tune up mobil cirebon",
    "isi freon ac mobil cirebon",
    "ganti kompresor ac cirebon",
    "bengkel terbaik cirebon",
    "perbaikan ac mobil cirebon",
    "ac mobil tidak dingin cirebon",
    "cuci evaporator cirebon",
    "scanner ecu mobil cirebon",
    "carbon clean cirebon",
    "jakarta intl denso service",
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
    canonical: "https://jakartaintldenso.com/service-ac-dan-mesin-terbaik-cirebon",
    languages: {
      "id-ID": "https://jakartaintldenso.com/service-ac-dan-mesin-terbaik-cirebon",
    },
  },
  openGraph: {
    title: "Service AC & Mesin Mobil Terbaik Cirebon - Bengkel Spesialis Sejak 2004",
    description:
      "Bengkel service AC & mesin mobil #1 di Cirebon. Spesialis AC, tune up mesin, scanner ECU. Garansi service.",
    url: "https://jakartaintldenso.com/service-ac-dan-mesin-terbaik-cirebon",
    siteName: "Jakarta Int'l Denso Cirebon",
    images: [
      {
        url: "https://jakartaintldenso.com/images/service-ac.jpeg",
        width: 1200,
        height: 630,
        alt: "Service AC & Mesin Mobil Jakarta Intl Denso Cirebon - Bengkel Spesialis Terbaik",
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
    title: "Service AC & Mesin Mobil Terbaik Cirebon | Jakarta Int'l Denso",
    description:
      "Bengkel service AC & mesin mobil #1 di Cirebon sejak 2004. Teknisi bersertifikat, peralatan modern.",
    images: ["https://jakartaintldenso.com/images/service-ac.jpeg"],
    creator: "@jakartaintldenso",
    site: "@jakartaintldenso",
  },
  verification: {
    google: "G-FRX906FRWV",
  },
  category: "automotive",
  classification: "Auto Repair Service",
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

// Service Schema for AC & Mesin
const serviceACMesinSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://jakartaintldenso.com/service-ac-dan-mesin-terbaik-cirebon#service",
  name: "Service AC & Mesin Mobil Cirebon",
  alternateName: ["Bengkel AC Mobil Cirebon", "Service Mesin Mobil Cirebon", "Tune Up Mobil Cirebon"],
  description: "Layanan service AC dan mesin mobil profesional dengan teknisi bersertifikat, peralatan canggih, dan garansi service. Melayani semua merk mobil.",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://jakartaintldenso.com/#organization",
    name: "Jakarta Int'l Denso Cirebon",
    image: "https://jakartaintldenso.com/images/service-ac.jpeg",
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
  serviceType: "Auto Repair",
  areaServed: [
    { "@type": "City", name: "Cirebon" },
    { "@type": "City", name: "Kuningan" },
    { "@type": "City", name: "Indramayu" },
    { "@type": "City", name: "Majalengka" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Service AC & Mesin",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Service AC Mobil",
          description: "Isi freon, ganti kompresor, cuci evaporator, flushing sistem AC",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tune Up Mesin",
          description: "Carbon clean, ganti oli, ganti busi, pembersihan injektor",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Perbaikan Kelistrikan",
          description: "Scan ECU, perbaikan kabel, ganti aki, perbaikan alternator",
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
      name: "Service AC & Mesin Terbaik Cirebon",
      item: "https://jakartaintldenso.com/service-ac-dan-mesin-terbaik-cirebon",
    },
  ],
}

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa biaya service AC mobil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biaya service AC mobil bervariasi: cuci blower mulai Rp100.000, isi freon Rp350.000-500.000, ganti kompresor sesuai merk dan tipe mobil. Kami memberikan estimasi biaya transparan sebelum pengerjaan.",
      },
    },
    {
      "@type": "Question",
      name: "Apa tanda AC mobil perlu diservis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tanda AC mobil perlu diservis: udara tidak dingin, ada bau tidak sedap, bunyi-bunyi aneh saat AC menyala, kebocoran air di kabin, atau embun berlebih pada kaca. Sebaiknya servis rutin setiap 6 bulan.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama proses service AC mobil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waktu service AC bervariasi: isi freon 30-60 menit, cuci evaporator 2-3 jam, ganti kompresor 1 hari kerja. Kami akan menginformasikan estimasi waktu setelah diagnosa awal.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada garansi service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kami memberikan garansi untuk setiap pengerjaan. Garansi isi freon 1 bulan, penggantian komponen sesuai garansi sparepart. Syarat dan ketentuan berlaku.",
      },
    },
  ],
}

export default function ServiceACMesinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="schema-service-ac" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceACMesinSchema)}
      </Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script id="schema-faq-service" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
    </>
  )
}
