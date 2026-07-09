import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimoni & Ulasan Pelanggan",
  description:
    "Baca testimoni dan ulasan pelanggan Jakarta Intl Denso - bengkel AC mobil terpercaya di Cirebon. Rating 4.9/5 dari pelanggan yang puas dengan layanan cuci mobil premium, service AC mobil, dan salon mobil berkualitas.",
  keywords: [
    "testimoni bengkel AC mobil Cirebon",
    "ulasan Jakarta Intl Denso",
    "review cuci mobil Cirebon",
    "testimonial service AC mobil",
    "bengkel mobil terpercaya Cirebon",
    "pelanggan puas Jakarta Intl Denso",
    "rating bengkel AC mobil Cirebon",
    "salon mobil Cirebon",
  ],
  authors: [{ name: "Jakarta Int'l Denso" }],
  creator: "Jakarta Int'l Denso",
  publisher: "Jakarta Int'l Denso",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://jakartaintldenso.com"),
  alternates: {
    canonical: "/ulasan-kami",
  },
  openGraph: {
    title:
      "Testimoni Pelanggan - Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon",
    description:
      "Baca testimoni dan ulasan pelanggan Jakarta Intl Denso dengan rating 4.9/5. Layanan cuci mobil premium dan service AC mobil terbaik di Cirebon.",
    url: "/ulasan-kami",
    siteName: "Jakarta Int'l Denso Cirebon",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/review1.png",
        width: 1200,
        height: 630,
        alt: "Testimoni Pelanggan Jakarta Int'l Denso Cirebon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimoni Pelanggan Jakarta Intl Denso Cirebon",
    description:
      "Rating 4.9/5 dari pelanggan yang puas dengan layanan bengkel AC mobil terbaik di Cirebon.",
    images: ["/images/review1.png"],
    creator: "@jakartaintldenso",
    site: "@jakartaintldenso",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PriceListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for Local Business with Price List */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["AutoRepair", "CarWash"],
            name: "Jakarta Int'l Denso Cirebon",
            alternateName: "Bengkel AC Mobil Terbaik Cirebon",
            description:
              "Layanan cuci mobil, salon mobil, service AC, dan perawatan kendaraan terbaik di Cirebon",
            url: "https://jakartaintldenso.com",
            logo: "https://jakartaintldenso.com/android-chrome-512x512.png",
            image: "https://jakartaintldenso.com/android-chrome-512x512.png",
            telephone: "+62819647333",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Garuda No 2",
              addressLocality: "Cirebon",
              addressRegion: "Jawa Barat",
              postalCode: "45131",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-6.732022",
              longitude: "108.552316",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "08:00",
                closes: "16:00",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "160",
              bestRating: "5",
              worstRating: "3",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Layanan Jakarta Int'l Denso Cirebon",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cuci Mobil Snow Wash",
                    description:
                      "Layanan cuci mobil premium dengan teknologi snow wash",
                  },
                  price: "55000",
                  priceCurrency: "IDR",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Service AC Mobil",
                    description:
                      "Perbaikan dan perawatan AC mobil oleh teknisi berpengalaman",
                  },
                  price: "350000",
                  priceCurrency: "IDR",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Salon Mobil",
                    description: "Detailing dan poles mobil profesional",
                  },
                  price: "150000",
                  priceCurrency: "IDR",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cuci Mobil Wetlook",
                    description: "Cuci mobil dengan coating wetlook premium",
                  },
                  price: "75000",
                  priceCurrency: "IDR",
                },
              ],
            },
            areaServed: [
              {
                "@type": "City",
                name: "Cirebon",
              },
              {
                "@type": "City",
                name: "Kuningan",
              },
              {
                "@type": "City",
                name: "Indramayu",
              },
            ],
            sameAs: [
              "https://www.instagram.com/jakarta_intl_denso",
              "https://www.tiktok.com/@jakartaintldensocirebon",
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
