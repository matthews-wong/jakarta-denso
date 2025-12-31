// app/galeri/page.tsx

"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Award, Phone, ChevronRight, MapPin, CheckCircle, Camera, Eye, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// Gallery data with enhanced SEO and copywriting
const galleryImages = [
  {
    src: "/images/proses-cuci.jpeg",
    title: "Cuci Mobil Premium dengan Teknik Profesional",
    category: "Cuci Mobil",
    alt: "Proses cuci mobil premium Jakarta Intl Denso Cirebon menggunakan shampo khusus dan teknik 2 bucket wash untuk hasil bersih maksimal",
    popular: true,
    description: "Snow wash premium dengan teknologi terdepan untuk hasil bersih maksimal"
  },
  {
    src: "/images/Poles-Mobil.jpeg",
    title: "Poles Mobil Hingga Kinclong Seperti Baru",
    category: "Salon Mobil",
    alt: "Layanan poles mobil profesional Jakarta Intl Denso dengan compound dan wax berkualitas untuk hasil mengkilap sempurna",
    description: "Poles profesional dengan compound import dan wax premium"
  },
  {
    src: "/images/ekterior.jpeg",
    title: "Detail Eksterior Bersih Tanpa Sisa Kotoran",
    category: "Salon Mobil",
    alt: "Hasil pembersihan detail eksterior mobil Jakarta Intl Denso yang bersih maksimal dari kotoran membandel dan noda",
    description: "Pembersihan menyeluruh dengan teknik detailing profesional"
  },
  {
    src: "/images/eksterior2.jpeg",
    title: "Eksterior Mengkilap dengan Perlindungan Optimal",
    category: "Poles Mobil",
    alt: "Eksterior mobil mengkilap hasil poles profesional Jakarta Intl Denso dengan coating pelindung jangka panjang",
    popular: true,
    description: "Hasil poles dengan coating pelindung untuk kilau tahan lama"
  },
  {
    src: "/images/Jok-mobil.jpeg",
    title: "Cover Jok Mobil Berkualitas Premium",
    category: "Aksesoris Mobil",
    alt: "Koleksi cover jok mobil paten dan semi paten berbahan berkualitas tinggi tersedia di Jakarta Intl Denso Cirebon",
    description: "Cover jok premium dengan berbagai pilihan warna dan model"
  },
  {
    src: "/images/Parfum-mobil.jpeg",
    title: "Parfum Mobil Wangi Tahan Lama",
    category: "Aksesoris Mobil",
    alt: "Parfum mobil premium dengan aroma mewah dan tahan lama tersedia di Jakarta Intl Denso Cirebon",
    description: "Koleksi parfum mobil dengan aroma eksklusif dan tahan lama"
  },
  {
    src: "/images/purging.jpeg",
    title: "Purging Diesel untuk Performa Maksimal",
    category: "Perawatan Mobil",
    alt: "Layanan purging diesel profesional Jakarta Intl Denso untuk membersihkan sistem bahan bakar dan meningkatkan performa mesin",
    popular: true,
    description: "Pembersihan sistem bahan bakar diesel untuk performa optimal"
  },
  {
    src: "/images/velg.jpeg",
    title: "Velg Mobil Berkualitas Berbagai Model",
    category: "Aksesoris Mobil",
    alt: "Koleksi velg mobil racing dan elegant berbagai ukuran dan model tersedia di Jakarta Intl Denso Cirebon",
    description: "Velg racing dan elegant dengan berbagai ukuran dan desain"
  },
  {
    src: "/images/bengkel-jid.jpeg",
    title: "Bengkel Modern dengan Fasilitas Lengkap",
    category: "Galeri Bengkel",
    alt: "Fasilitas bengkel Jakarta Intl Denso di Cirebon yang modern, bersih, dan dilengkapi peralatan canggih untuk service terbaik",
    description: "Fasilitas bengkel modern dengan peralatan canggih dan teknisi ahli"
  },
];

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Galeri Jakarta Intl Denso - Bengkel AC Mobil Cirebon",
  "description": "Galeri hasil kerja profesional Jakarta Intl Denso, bengkel AC mobil terpercaya di Cirebon",
  "url": "https://jakartaintldenso.com/galeri",
  "author": {
    "@type": "Organization",
    "name": "Jakarta Intl Denso",
    "url": "https://jakartaintldenso.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cirebon",
      "addressRegion": "Jawa Barat",
      "addressCountry": "Indonesia"
    }
  },
  "mainEntity": galleryImages.map((image) => ({
    "@type": "ImageObject",
    "name": image.title,
    "description": image.alt,
    "url": `https://jakartaintldenso.com${image.src}`,
    "category": image.category
  }))
};

// Fullscreen Modal Component
const FullscreenModal = ({ image, isOpen, onClose, currentIndex, onNext, onPrev }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-0 left-0 right-0 z-60 bg-gradient-to-b from-black/50 to-transparent p-4"
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="text-white/80 text-sm font-medium">
                {currentIndex + 1} / {galleryImages.length}
              </div>
              <div className="text-white/60 text-sm">
                {image.category}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        {galleryImages.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4 pt-20 pb-32"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-full max-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                priority
              />

              {/* Loading indicator */}
              <div className="absolute inset-0 bg-gray-900/20 rounded-lg animate-pulse opacity-0" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="absolute bottom-0 left-0 right-0 z-60 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {image.category}
                </span>
                {image.popular && (
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 inline mr-1 fill-current" />
                    Populer
                  </span>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-balance">
                {image.title}
              </h3>

              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {image.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Instructions */}
        <div className="absolute bottom-4 right-4 text-white/40 text-xs hidden md:block">
          ESC to close • ← → to navigate
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Gallery Item Component
const GalleryItem = ({ image, index, onImageClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
  >
    {/* Popular Badge */}
    {image.popular && (
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
          <Star className="w-3 h-3 inline mr-1 fill-current" />
          Populer
        </div>
      </div>
    )}

    {/* Image Container */}
    <div className="aspect-[4/3] relative overflow-hidden cursor-pointer" onClick={() => onImageClick(image, index)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        loading={index < 6 ? "eager" : "lazy"}
        priority={index < 3}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <Eye className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </div>

      {/* Hover Info */}
      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <p className="text-gray-800 font-medium text-sm truncate">
            Klik untuk melihat detail
          </p>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full">
          {image.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {image.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
        {image.description}
      </p>

      {/* View Button */}
      <motion.button
        onClick={() => onImageClick(image, index)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Lihat Detail
      </motion.button>
    </div>
  </motion.article>
);

export default function GaleriPage() {
  // Fix hydration by using mounted state
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageClick = useCallback((image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  }, [currentImageIndex]);

  const prevImage = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  }, [currentImageIndex]);

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <>
      {/* SEO Head */}
      <Head>
        <title>Galeri Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon</title>
        <meta
          name="description"
          content="Lihat galeri hasil kerja profesional Jakarta Intl Denso - bengkel AC mobil terpercaya di Cirebon. Spesialis service AC mobil, cuci mobil premium, salon mobil, poles mobil, dan aksesoris mobil berkualitas. Melayani wilayah Cirebon dan sekitarnya dengan teknisi berpengalaman."
        />
        <meta
          name="keywords"
          content="bengkel AC mobil Cirebon, Jakarta Intl Denso, service AC mobil Cirebon, cuci mobil Cirebon, salon mobil Cirebon, poles mobil Cirebon, bengkel mobil Cirebon, perawatan AC mobil, aksesoris mobil Cirebon, parfum mobil, cover jok mobil, velg mobil, purging diesel"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jakarta Intl Denso" />
        <link rel="canonical" href="https://jakartaintldenso.com/galeri" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jakartaintldenso.com/galeri" />
        <meta property="og:title" content="Galeri Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon" />
        <meta property="og:description" content="Lihat galeri hasil kerja profesional Jakarta Intl Denso - bengkel AC mobil terpercaya di Cirebon. Spesialis service AC mobil, cuci mobil premium, dan aksesoris mobil." />
        <meta property="og:image" content="https://jakartaintldenso.com/images/bengkel-jid.jpeg" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Jakarta Intl Denso" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Galeri Bengkel AC Mobil Terpercaya | Jakarta Intl Denso Cirebon" />
        <meta name="twitter:description" content="Lihat galeri hasil kerja profesional Jakarta Intl Denso - bengkel AC mobil terpercaya di Cirebon." />
        <meta name="twitter:image" content="https://jakartaintldenso.com/images/bengkel-jid.jpeg" />

        {/* Additional SEO */}
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Cirebon" />
        <meta name="geo.position" content="-6.7063;108.5554" />
        <meta name="ICBM" content="-6.7063, 108.5554" />
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
                <Camera className="w-3 h-3 inline mr-1" />
                Galeri Hasil Kerja #1 Cirebon
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#ed3f36] to-[#ff4757] text-white rounded-full font-semibold text-sm shadow-lg">
                <Award className="w-4 h-4" />
                <span>20+ Tahun Pengalaman</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-balance">
              <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                GALERI JAKARTA INTL DENSO
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Bengkel AC Mobil Terpercaya #1 di Cirebon
              </span>
            </h1>
          </motion.div>

          {/* Gallery Section */}
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
                  Bukti Nyata Kualitas
                </span>
                <span className="text-gray-800"> Layanan Kami</span>
              </h2>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Lihat berbagai hasil kerja profesional kami dengan kualitas terbaik di Cirebon.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <GalleryItem
                  key={index}
                  image={image}
                  index={index}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </motion.section>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 text-center space-y-8"
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Kendaraan Anda Butuh Perawatan Profesional?
              </h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                <strong>Jakarta Intl Denso</strong> siap memberikan solusi terbaik untuk semua kebutuhan kendaraan Anda!
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                ⭐ <strong>AC Mobil Tidak Dingin?</strong> Tim teknisi berpengalaman kami siap service dengan spare part original<br />
                ⭐ <strong>Mobil Kotor & Kusam?</strong> Nikmati layanan cuci & salon mobil premium dengan hasil seperti mobil baru<br />
                ⭐ <strong>Butuh Aksesoris Berkualitas?</strong> Tersedia cover jok, parfum mobil, velg, dan aksesoris lainnya<br />
                ⭐ <strong>Lokasi Strategis di Cirebon</strong> - Mudah dijangkau dengan parkir luas & nyaman
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
                  Lihat Lokasi Bengkel
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Garansi Kualitas</h3>
                <p className="text-gray-600 text-sm">Semua layanan dilengkapi garansi resmi untuk kepuasan maksimal</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Teknisi Berpengalaman</h3>
                <p className="text-gray-600 text-sm">Tim teknisi ahli dengan pengalaman 20+ tahun di bidang automotive</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <Award className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Harga Transparan</h3>
                <p className="text-gray-600 text-sm">Tidak ada biaya tersembunyi, semua harga sudah final dan terjangkau</p>
              </div>
            </div>

            {/* Location and Contact Info */}
            <div className="text-center text-gray-600 space-y-2 pt-8">
              <p className="text-sm">
                <strong className="text-[#27398f]">Bengkel Mobil Cirebon Terpercaya</strong> - Melayani Kota Cirebon dan sekitarnya
              </p>
              <p className="text-sm">
                Alamat: Pusat Kota Cirebon | Buka: Setiap Hari 08:00 - 17:00 WIB
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

      {/* Fullscreen Modal */}
      <FullscreenModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
}