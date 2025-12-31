// app/testimonial/page.tsx

"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Award,
  Phone,
  ChevronRight,
  MapPin,
  CheckCircle,
  Quote,
  Eye,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  MessageSquare,
  ThumbsUp,
  Users,
  Trophy
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

interface Review {
  id: number;
  name: string;
  role?: string;
  rating: number;
  content: string;
  images: string[];
  date?: string;
  service?: string;
  verified?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Dante Istanto",
    role: "Local Guide",
    rating: 5,
    content: "Kolong Bersih, cepat, interior di vacuum, semua mobil sy cuci disini",
    images: ["/images/review1.png", "/images/review2.png"],
    date: "2 minggu lalu",
    service: "Cuci Mobil Premium",
    verified: true,
  },
  {
    id: 2,
    name: "Bagas Anindito",
    rating: 5,
    content: "Tempat cuci mobil terbaik di Cirebon, pelayanannya sangat baik dan mobil bersih luar & dalam.\nHarga cuci mobil menurut saya standar, yaitu 45k.\nTerdapat pelayanan yang lain seperti Service AC, Custom Jok, Ganti Oli, dll.\nBerlokasi strategis di tengah kota tepatnya di Jalan Ampera di pertigaan.\nYang paling saya suka di sini terdapat 2 jenis hidrolik, yang standar alias yang hanya menyangga bagian tengah mobil, dan ada yang menyangga ban mobilnya juga sehingga kaki-kaki mobil tidak cepat rusak.\nTerdapat tempat untuk menunggu.\nWaktu yang dihabiskan sekitar 30 menit - 1 jam untuk 1 mobil tergantung jenis mobilnya.",
    images: [],
    date: "3 minggu lalu",
    service: "Cuci Mobil & Service AC",
    verified: true,
  },
  {
    id: 3,
    name: "Aditya Rifki Satria",
    rating: 5,
    content: "Cuci mobil paling juara, dengan harga yg worth it, terjangkau. Bisa mendapat kebersihan maksimal luar dalam, ya meski tempatnya selalu penuh dan saya nunggu dari jam set9 pagi baru selesai jam 11 siang. Tapi saya puas akan hasilnya.. oiya saya betah nunggu karena tempatnya enak, bisa ngopi juga, juara pokoknya disini pelayananya 🙏",
    images: ["/images/review3.png"],
    date: "1 bulan lalu",
    service: "Cuci Mobil",
    verified: true,
  },
  {
    id: 4,
    name: "Ferry Hendryk",
    rating: 5,
    content: "om Ownernya baek, waktu mau beli air mineral dingin keabisan eh di kasih nya minuman manis tp bayarnya seharga air mineral 😂😂 ...mantap pelayanan nya.. tetap pertahankan kualitas dan pelayanan nya",
    images: [],
    date: "1 bulan lalu",
    service: "Cuci Mobil",
    verified: true,
  },
  {
    id: 5,
    name: "Rudi Mus Andriyanto",
    rating: 5,
    content: "Bersih maksimal..",
    images: ["/images/review4.png"],
    date: "2 bulan lalu",
    service: "Salon Mobil",
    verified: true,
  },
  {
    id: 6,
    name: "Hariadi Sugandi",
    rating: 5,
    content: "Mantap, kerja bersih drpd cuci mobil yg lain ada di crb, pertahankan terus utk lbh baik",
    images: [],
    date: "2 bulan lalu",
    service: "Cuci Mobil",
    verified: true,
  },
  {
    id: 7,
    name: "Cindy Putri Amelia",
    rating: 5,
    content: "Biasanya cuma cuci mobil aja disini. Karena selalu cepet prosesnya. Hari ini salon interior mobil karena jok mobil kotor banget. Dan hasilnya bersih banget semobil dibersihin sampe ke dalem2. Wangi banget udahnya. Kinclong. Udah ga ada noda setitik pun. Best",
    images: ["/images/ulasan-salon.png", "/images/ulasan-salon1.png", "/images/ulasan-salon2.png"],
    date: "5 bulan lalu",
    service: "Salon Mobil",
    verified: true,
  },
  {
    id: 8,
    name: "Novi Andini",
    rating: 5,
    content: "Pelayanannya ramah,bersih bangett hasilnyaa ga asal asalan,ada ruang tunggu ac-nya tempat favorit nyaman buat tunggu selesai cuci mobil,harga terjangkau,tempat cuci mobil favorit dicirebon..🤩",
    images: ["/images/ulasan-cuci.png"],
    date: "2 bulan lalu",
    service: "Cuci Mobil",
    verified: true,
  },
  {
    id: 9,
    name: "Sandry Juliandry",
    rating: 5,
    content: "Nyuci nya bersih, sudah langganan puluhan taun, pelayanan nya sangat memuaskan",
    images: ["/images/ulasan-cuci1.png"],
    date: "2 bulan lalu",
    service: "Cuci Mobil",
    verified: true,
  },
];

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Jakarta Intl Denso Cirebon - Spesialis AC Mobil dan Cuci Mobil",
  "url": "https://jakartaintldenso.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cirebon",
    "addressRegion": "Jawa Barat",
    "addressCountry": "Indonesia"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": reviews.length.toString(),
    "bestRating": "5",
    "worstRating": "5"
  },
  "review": reviews.map((review) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.content,
    "datePublished": "2024"
  })),
};

// Review Stars Component
const ReviewStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// Review Images Modal Component
const ReviewImagesModal: React.FC<{
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  reviewerName: string;
}> = ({ images, isOpen, onClose, reviewerName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex(prev => (prev + 1) % images.length);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-60 flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(prev => (prev + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex]}
            alt={`Review photo by ${reviewerName} - ${currentIndex + 1}`}
            width={800}
            height={600}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Review Images Component
const ReviewImages: React.FC<{
  images: string[];
  alt: string;
  reviewerName: string;
}> = ({ images, alt, reviewerName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* More images indicator */}
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>

      <ReviewImagesModal
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewerName={reviewerName}
      />
    </>
  );
};

// Review Card Component
const ReviewCard: React.FC<{
  review: Review;
  index: number;
}> = ({ review, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentLength = review.content.length;
  const shouldTruncate = contentLength > 150;
  const displayContent = isExpanded || !shouldTruncate
    ? review.content
    : review.content.substring(0, 150) + '...';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
    >
      {/* Verified Badge */}
      {review.verified && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {review.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
              {review.role && (
                <p className="text-sm text-blue-600 font-medium">{review.role}</p>
              )}
              {review.date && (
                <p className="text-xs text-gray-500">{review.date}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <ReviewStars rating={review.rating} />
          <span className="text-sm font-medium text-gray-600">
            {review.rating}.0 bintang
          </span>
        </div>

        {/* Service Tag */}
        {review.service && (
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              {review.service}
            </span>
          </div>
        )}

        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-blue-500/30 mb-4" />

        {/* Review Content */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
            {displayContent}
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              {isExpanded ? 'Tutup' : 'Baca Selengkapnya'}
            </button>
          )}
        </div>

        {/* Review Images */}
        <ReviewImages
          images={review.images}
          alt={`Review by ${review.name}`}
          reviewerName={review.name}
        />

        {/* Like Button */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group">
            <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Helpful</span>
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-transparent group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
    </motion.article>
  );
};



export default function TestimonialPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <>
      {/* SEO Head */}
      <Head>
        <title>Testimoni Pelanggan - Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon</title>
        <meta
          name="description"
          content="Baca testimoni dan ulasan pelanggan Jakarta Intl Denso - bengkel AC mobil terpercaya di Cirebon. Rating 4.8/5 dari pelanggan yang puas dengan layanan cuci mobil premium, service AC mobil, dan salon mobil berkualitas."
        />
        <meta
          name="keywords"
          content="testimoni bengkel AC mobil Cirebon, ulasan Jakarta Intl Denso, review cuci mobil Cirebon, testimonial service AC mobil, bengkel mobil terpercaya Cirebon, pelanggan puas Jakarta Intl Denso"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jakarta Intl Denso" />
        <link rel="canonical" href="https://jakartaintldenso.com/testimonial" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jakartaintldenso.com/testimonial" />
        <meta property="og:title" content="Testimoni Pelanggan - Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon" />
        <meta property="og:description" content="Baca testimoni dan ulasan pelanggan Jakarta Intl Denso dengan rating 4.8/5. Layanan cuci mobil premium dan service AC mobil terbaik di Cirebon." />
        <meta property="og:image" content="https://jakartaintldenso.com/images/review1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testimoni Pelanggan Jakarta Intl Denso Cirebon" />
        <meta name="twitter:description" content="Rating 4.8/5 dari pelanggan yang puas dengan layanan bengkel AC mobil terbaik di Cirebon." />
      </Head>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27398f]/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ed3f36]/15 via-red-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 space-y-8"
          >
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <div className="bg-gradient-to-r from-[#27398f] to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                <MessageSquare className="w-3 h-3 inline mr-1" />
                Testimoni Pelanggan #1 Cirebon
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm shadow-lg">
                <Trophy className="w-4 h-4" />
                <span>Rating 4.8/5 ⭐</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-balance">
              <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                TESTIMONI PELANGGAN
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Jakarta Intl Denso Cirebon
              </span>
            </h1>
          </motion.div>

          {/* Reviews Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
                  Apa Kata Pelanggan
                </span>
                <span className="text-gray-800"> Tentang Kami?</span>
              </h2>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Kepuasan pelanggan adalah prioritas utama kami. Lihat apa yang mereka katakan tentang layanan kami.
              </p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={index}
                />
              ))}
            </div>
          </motion.section>

          {/* Google Reviews CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-20"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Lihat Lebih Banyak Ulasan di Google
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Ribuan pelanggan puas telah memberikan testimoni positif tentang layanan kami
              </p>
              <Link
                href="https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Star className="w-5 h-5 fill-current" />
                Baca Semua Review Google
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 text-center space-y-8"
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Siap Merasakan Pelayanan Terbaik Seperti Mereka?
              </h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                <strong>Jakarta Intl Denso</strong> siap memberikan pengalaman terbaik untuk kendaraan Anda!
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                ⭐ <strong>Service AC Mobil Profesional</strong> - Teknisi berpengalaman 20+ tahun dengan spare part original<br />
                ⭐ <strong>Cuci Mobil Premium</strong> - Hasil bersih maksimal luar dalam dengan teknik snow wash<br />
                ⭐ <strong>Salon Mobil Lengkap</strong> - Poles, wax, coating untuk hasil mengkilap seperti mobil baru<br />
                ⭐ <strong>Aksesoris Berkualitas</strong> - Cover jok, parfum mobil, velg racing, dan aksesoris lainnya
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="tel:+62819647333"
                  className="group inline-flex items-center justify-center px-8 py-4
                    bg-gradient-to-r from-[#ed3f36] via-red-500 to-[#ed3f36] text-white font-bold rounded-xl
                    shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Hubungi Sekarang - Konsultasi Gratis!
                </Link>

                <Link
                  href="https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA"
                  className="inline-flex items-center justify-center px-8 py-4
                    bg-white text-gray-700 hover:text-[#27398f] font-semibold rounded-xl
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-[#27398f]"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Kunjungi Bengkel Kami
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">100% Verified</h3>
                <p className="text-gray-600 text-sm">Semua testimoni terverifikasi dari pelanggan asli</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Rating 4.8/5</h3>
                <p className="text-gray-600 text-sm">Kepuasan pelanggan tinggi dengan layanan berkualitas</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">1000+ Pelanggan</h3>
                <p className="text-gray-600 text-sm">Dipercaya ribuan pelanggan di Cirebon dan sekitarnya</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">20+ Tahun</h3>
                <p className="text-gray-600 text-sm">Pengalaman mendalam dalam perawatan kendaraan</p>
              </div>
            </div>

            {/* Location and Contact Info */}
            <div className="text-center text-gray-600 space-y-2 pt-8">
              <p className="text-sm">
                <strong className="text-[#27398f]">Bengkel AC Mobil Terpercaya #1 Cirebon</strong> - Melayani seluruh wilayah Cirebon Raya
              </p>
              <p className="text-sm">
                📍 Jl. Ampera, Pusat Kota Cirebon | ⏰ Buka Setiap Hari: 08:00 - 17:00 WIB
              </p>
              <p className="text-sm text-blue-600 font-medium">
                📞 Hubungi: 0819-647-333 | 💬 Konsultasi Gratis Sebelum Service
              </p>
            </div>
          </motion.div>
        </div>

        {/* Wave Footer */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path fill="url(#waveGradient)" d="M0,120 C150,100 350,0 600,20 C850,40 1050,100 1200,80 L1200,120 Z"></path>
          </svg>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}