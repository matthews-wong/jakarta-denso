import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Script from "next/script"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

// Define base metadata for SEO - Advanced Configuration
export const metadata: Metadata = {
    metadataBase: new URL("https://jakartaintldenso.com"),
    title: {
        default: "Bengkel AC Mobil Terbaik Cirebon - Jakarta Int'l Denso | Cuci Mobil & Detailing",
        template: "%s | Jakarta Int'l Denso Cirebon",
    },
    description:
        "Jakarta Int'l Denso - Bengkel AC mobil #1 di Cirebon sejak 2004. ✓ Service AC ✓ Cuci mobil premium ✓ Detailing & poles ✓ Teknisi 20+ tahun ✓ Rating 4.9/5 dari 160+ pelanggan. Garansi layanan!",
    keywords: [
        "bengkel terbaik cirebon",
        "bengkel ac cirebon",
        "jakarta intl denso",
        "bengkel mobil cirebon",
        "service ac mobil cirebon",
        "cuci mobil cirebon",
        "detailing mobil cirebon",
        "poles mobil cirebon",
        "perbaikan ac mobil cirebon",
        "bengkel ac mobil terbaik cirebon",
        "cuci mobil profesional cirebon",
        "salon mobil cirebon",
        "perawatan mobil cirebon",
        "freon ac mobil cirebon",
        "kompresor ac mobil cirebon",
        "servis ac mobil pantura",
        "bengkel resmi denso cirebon",
        "teknisi ac mobil berpengalaman",
        "ganti freon ac mobil cirebon",
        "harga service ac mobil cirebon",
        "bengkel mobil terdekat cirebon",
        "cuci mobil terdekat cirebon",
        "ac mobil tidak dingin cirebon",
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
        canonical: "https://jakartaintldenso.com",
        languages: {
            "id-ID": "https://jakartaintldenso.com",
        },
    },
    openGraph: {
        title: "Bengkel AC Mobil Terbaik Cirebon - Jakarta Int'l Denso",
        description:
            "Bengkel AC mobil #1 di Cirebon sejak 2004. Service AC, cuci mobil premium, detailing & poles. Rating 4.9/5 dari 160+ pelanggan.",
        url: "https://jakartaintldenso.com",
        siteName: "Jakarta Int'l Denso Cirebon",
        images: [
            {
                url: "https://jakartaintldenso.com/images/jakartaintldenso-cover.jpg",
                width: 1200,
                height: 630,
                alt: "Jakarta Int'l Denso - Bengkel AC Mobil Terbaik Cirebon",
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
        title: "Bengkel AC Mobil Terbaik Cirebon - Jakarta Int'l Denso",
        description:
            "Bengkel AC mobil #1 di Cirebon sejak 2004. Service AC, cuci mobil premium, detailing & poles.",
        images: ["https://jakartaintldenso.com/images/jakartaintldenso-cover.jpg"],
        creator: "@jakartaintldenso",
        site: "@jakartaintldenso",
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        other: [
            {
                rel: "manifest",
                url: "/site.webmanifest",
            },
        ],
    },
    verification: {
        google: "G-FRX906FRWV",
    },
    category: "automotive",
    classification: "Auto Repair and Car Wash Service",
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

// Separate viewport configuration
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
}

// Structured data for the website
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jakartaintldenso.com/#website",
    url: "https://jakartaintldenso.com",
    name: "Jakarta Int'l Denso Cirebon",
    description: metadata.description,
    publisher: {
        "@id": "https://jakartaintldenso.com/#organization",
    },
    inLanguage: "id-ID",
}

// Structured data for the business
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "CarWash"],
    "@id": "https://jakartaintldenso.com/#organization",
    name: "Jakarta Int'l Denso Cirebon",
    alternateName: "Bengkel AC Mobil Terbaik Cirebon",
    description: metadata.description,
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
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
    department: [
        {
            "@type": "AutoRepair",
            name: "Service AC Mobil",
            description: "Spesialis service dan perbaikan AC mobil semua merk",
        },
        {
            "@type": "CarWash",
            name: "Cuci & Salon Mobil",
            description: "Layanan cuci mobil premium dan salon mobil profesional",
        },
    ],
    review: [
        {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
            },
            author: {
                "@type": "Person",
                name: "Bagas Anindito",
            },
            datePublished: "2022-01-15",
            reviewBody:
                "Tempat cuci mobil terbaik di Cirebon, pelayanannya sangat baik dan mobil bersih luar & dalam. Terdapat pelayanan yang lain seperti Service AC, Custom Jok, Ganti Oli dll. Berlokasi strategis di tengah kota Cirebon.",
        },
        {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
            },
            author: {
                "@type": "Person",
                name: "Aditya Rifki Satria",
            },
            datePublished: "2020-01-15",
            reviewBody:
                "Cuci mobil paling juara, dengan harga yg worth it, terjangkau. Bisa mendapat kebersihan maksimal luar dalam. Saya puas akan hasilnya. Tempatnya enak, bisa ngopi juga, juara pokoknya disini pelayananya.",
        },
        {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
            },
            author: {
                "@type": "Person",
                name: "Matthews Wong",
            },
            datePublished: "2024-01-15",
            reviewBody:
                "Jakarta Intl Denso merupakan pilihan tepat bagi Anda yang sedang mencari jasa cuci mobil terbaik di Cirebon. Dengan pengalaman bertahun-tahun, mereka telah membuktikan diri sebagai penyedia layanan cuci mobil terpercaya.",
        },
    ],
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "160",
        bestRating: "5",
        worstRating: "3",
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
    sameAs: ["https://www.instagram.com/jakarta_intl_denso", "https://www.tiktok.com/@jakartaintldensocirebon"],
}

// Structured data for FAQ
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Apa saja layanan bengkel Jakarta Int'l Denso Cirebon?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Kami menyediakan layanan lengkap meliputi service AC mobil, cuci mobil, salon mobil, poles mobil, dan detailing mobil dengan teknisi berpengalaman.",
            },
        },
        {
            "@type": "Question",
            name: "Berapa lama waktu service AC mobil di Jakarta Int'l Denso?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Waktu service AC mobil bervariasi tergantung kerusakan, mulai dari 1-3 jam untuk perawatan rutin hingga 1 hari untuk perbaikan kompresor.",
            },
        },
        {
            "@type": "Question",
            name: "Apakah Jakarta Int'l Denso buka hari Minggu?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ya, kami buka setiap hari Minggu dari jam 08:00 sampai 16:00 WIB.",
            },
        },
        {
            "@type": "Question",
            name: "Berapa biaya service AC mobil di Jakarta Int'l Denso Cirebon?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Biaya service AC mobil dimulai dari Rp100.000 untuk cuci blower ac dan perawatan standar, sementara freon recharge berkisar Rp350.000-Rp500.000 tergantung jenis freon dan mobil. Perbaikan komponen AC memiliki biaya yang bervariasi sesuai kerusakan.",
            },
        },
        {
            "@type": "Question",
            name: "Dimana lokasi Jakarta Int'l Denso Cirebon?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Jakarta Int'l Denso Cirebon berlokasi strategis di Jl. Garuda No 2, Cirebon, Jawa Barat. Kami mudah diakses dari pusat kota maupun jalan utama.",
            },
        },
        {
            "@type": "Question",
            name: "Apa keunggulan service AC mobil di Jakarta Int'l Denso dibanding bengkel lain?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Jakarta Int'l Denso memiliki keunggulan berupa teknisi berpengalaman, peralatan modern, suku cadang original, garansi service hingga 1 bulan, dan fasilitas ruang tunggu nyaman dengan WiFi gratis dan minuman.",
            },
        },
        {
            "@type": "Question",
            name: "Apakah Jakarta Int'l Denso menyediakan layanan antar-jemput mobil?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ya, kami menyediakan layanan antar-jemput mobil dalam radius 10 km dari bengkel dengan biaya tambahan yang terjangkau. Layanan ini dapat dipesan melalui telepon atau WhatsApp.",
            },
        },
        {
            "@type": "Question",
            name: "Berapa lama garansi untuk service AC mobil?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Kami memberikan garansi service AC selama 1 bulan untuk perbaikan dan penggantian komponen. Untuk pengisian freon, kami berikan garansi 1 bulan. Syarat dan ketentuan berlaku.",
            },
        },
        {
            "@type": "Question",
            name: "Bagaimana cara membuat janji service AC mobil di Jakarta Int'l Denso?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Anda dapat membuat janji service melalui telepon di 0231-205148, WhatsApp di 085-2756-47333, atau mengisi form booking online di website kami. Dengan membuat janji, Anda tidak perlu antri lama.",
            },
        },
        {
            "@type": "Question",
            name: "Apakah Jakarta Int'l Denso menerima pembayaran non-tunai?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ya, kami menerima berbagai metode pembayaran termasuk tunai, kartu debit/kredit, QRIS, e-wallet seperti GoPay, OVO, Dana, dan transfer bank untuk kenyamanan pelanggan.",
            },
        },
        {
            "@type": "Question",
            name: "Mobil apa saja yang dapat diservis di Jakarta Int'l Denso Cirebon?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Kami melayani service AC untuk semua jenis dan merk mobil, termasuk mobil Jepang (Toyota, Honda, Daihatsu, dll), mobil Eropa (BMW, Mercedes, Audi, dll), dan berbagai jenis mobil lainnya.",
            },
        },
        {
            "@type": "Question",
            name: "Apa tanda-tanda AC mobil perlu diservis?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Tanda-tanda AC mobil perlu diservis antara lain: udara tidak dingin, ada bau tidak sedap, bunyi-bunyi aneh, kebocoran air di kabin, dan embun pada windshield. Kami sarankan pengecekan rutin setiap 6 bulan.",
            },
        },
        {
            "@type": "Question",
            name: "Apakah Jakarta Int'l Denso menyediakan suku cadang original?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ya, kami hanya menggunakan suku cadang original dan berkualitas tinggi untuk menjamin kualitas perbaikan dan keawetan sistem AC mobil Anda.",
            },
        },
        {
            "@type": "Question",
            name: "Berapa jam operasional Jakarta Int'l Denso Cirebon?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Kami buka setiap hari Senin-Sabtu pukul 08:00-17:00 WIB dan Minggu pukul 08:00-16:00 WIB. Kami juga buka pada hari libur nasional dengan jam operasional terbatas.",
            },
        },
        {
            "@type": "Question",
            name: "Apakah Jakarta Int'l Denso menyediakan layanan darurat untuk AC mobil?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ya, kami menyediakan layanan darurat untuk masalah AC mobil dengan respons cepat. Hubungi hotline kami di 0819-647-333 untuk bantuan darurat dalam area Cirebon dan sekitarnya.",
            },
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <body className={inter.className}>
                {children}

                {/* Google Analytics */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-FRX906FRWV" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FRX906FRWV');
          `}
                </Script>

                {/* Structured Data */}
                <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify(websiteSchema)}
                </Script>
                <Script id="schema-business" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify(localBusinessSchema)}
                </Script>
                <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify(faqSchema)}
                </Script>
            </body>
        </html>
    )
}
