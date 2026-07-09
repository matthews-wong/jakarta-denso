import type { Metadata, Viewport } from "next";
import BlogPageClient from "./BlogPageClient";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Otomotif",
  description:
    "Temukan tips dan informasi terbaru seputar perawatan mobil, cuci mobil, dan layanan otomotif di Cirebon.",
  keywords: [
    "Cuci Mobil Cirebon",
    "Cuci Mobil Terbaik",
    "Cuci Mobil Indonesia",
    "Cuci Mobil dekat CSB Mall",
    "AC Mobil Cirebon",
    "Bengkel AC Mobil Cirebon",
    "Service AC Mobil Cirebon",
    "Salon Mobil Cirebon",
    "Cuci Mobil dekat Grage Mall",
    "Cuci Mobil Murah Cirebon",
    "Cuci Mobil Premium Cirebon",
    "Jakarta Intl Denso Cirebon",
    "Bengkel Jakarta Intl Denso",
    "Jakarta Intl Denso Jl Garuda No 2",
    "Service AC Mobil Cirebon",
    "Service AC Mobil Terbaik Cirebon",
    "Bengkel AC Mobil Cirebon",
    "Perbaikan AC Mobil Cirebon",
    "Servis AC Mobil Cirebon",
    "Service AC Mobil Terdekat Cirebon",
    "Service AC Mobil Murah Cirebon",
    "Service AC Mobil Profesional Cirebon",
    "Service AC Mobil Berkualitas Cirebon",
    "Service AC Mobil Bergaransi Cirebon",
    "Service AC Mobil Panggilan Cirebon",
    "Perawatan AC Mobil Berkala Cirebon",
    "Pengisian Freon AC Mobil Cirebon",
    "Perbaikan Kompresor AC Mobil Cirebon",
    "Pembersihan Evaporator AC Mobil Cirebon",
    "Deteksi Kebocoran AC Mobil Cirebon",
    "Servis AC Mobil Tanpa Bongkar Cirebon",
    "Upgrade Sistem AC Mobil Cirebon",
    "Konsultasi Masalah AC Mobil Cirebon",
    "Layanan Darurat AC Mobil Cirebon",
    "Paket Hemat Servis AC Mobil Cirebon",
    "Garansi Servis AC Mobil Cirebon",
    "Spare Part AC Mobil Original Cirebon",
    "Promo Servis AC Mobil Cirebon",
    "Servis AC Mobil Semua Merek Cirebon",
    "Testimoni Pelanggan Servis AC Mobil Cirebon",
    "Bengkel AC Mobil Cirebon",
    "Service AC Mobil Cirebon",
    "Salon Mobil Cirebon",
    "Blog Otomotif",
    "Tips Perawatan Mobil",
  ].join(", "),
  openGraph: {
    title: "Blog Otomotif | Jakarta Int'l Denso Cirebon",
    description:
      "Temukan tips dan informasi terbaru seputar perawatan mobil, cuci mobil, dan layanan otomotif di Cirebon.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Otomotif | Jakarta Int'l Denso Cirebon",
    description:
      "Temukan tips dan informasi terbaru seputar perawatan mobil, cuci mobil, dan layanan otomotif di Cirebon.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const viewPosts = posts.map(({ slug, frontmatter }) => ({
    slug,
    frontmatter: {
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      coverImage: frontmatter.coverImage,
      category: frontmatter.category,
    },
  }));

  return <BlogPageClient posts={viewPosts} />;
}
