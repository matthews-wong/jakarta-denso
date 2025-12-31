"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Star, Shield, Award, Phone, ChevronRight, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

// Types
interface ServiceItem {
  name: string
  price: string
  description: string
  keywords: string[]
  popular?: boolean
}

interface PriceCategory {
  name: string
  icon: string
  description: string
  items: ServiceItem[]
  color: string
}

// Enhanced price data with better SEO and visibility
const priceCategories: PriceCategory[] = [
  {
    name: "Cuci Mobil",
    icon: "🚗",
    color: "from-blue-600 to-blue-700",
    description: "Layanan cuci mobil terbaik di Cirebon dengan teknologi modern dan peralatan premium",
    items: [
      {
        name: "Cuci Motor Salju",
        price: "Rp 25.000",
        description: "Teknologi snow wash premium untuk motor. Pembersihan menyeluruh dengan foam berkualitas tinggi.",
        keywords: ["cuci motor cirebon", "snow wash cirebon", "cuci motor snow wash"],
      },
      {
        name: "Cuci Mobil Salju",
        price: "Rp 55.000",
        description: "Snow wash teknologi terbaru untuk mobil. Aman untuk semua jenis cat mobil dengan hasil maksimal.",
        keywords: ["cuci mobil cirebon", "snow wash mobil", "bengkel cuci mobil"],
        popular: true,
      },
      {
        name: "Cuci Mobil Aneka Rasa",
        price: "Rp 60.000",
        description: "Premium wash dengan pilihan wangi eksklusif. Termasuk shampoo mobil premium dan wax pelindung.",
        keywords: ["cuci mobil premium cirebon", "cuci mobil wangi", "salon mobil cirebon"],
      },
      {
        name: "Cuci Wetlook",
        price: "Rp 200.000",
        description: "Coating wetlook premium dengan hasil mengkilap tahan lama. Garansi hasil dan konsultasi gratis.",
        keywords: ["wetlook mobil cirebon", "coating mobil cirebon", "poles mobil cirebon"],
      },
      {
        name: "Doorsmeer T6",
        price: "Rp 20.000",
        description: "Perawatan profesional untuk karet dan pintu mobil menggunakan silikon T6 premium.",
        keywords: ["doorsmeer cirebon", "perawatan mobil cirebon", "doorsmeer murah"],
      },
    ],
  },
  {
    name: "Salon Mobil",
    icon: "✨",
    color: "from-purple-600 to-purple-700",
    description: "Jasa salon dan poles kendaraan profesional di Cirebon dengan teknisi berpengalaman",
    items: [
      {
        name: "Poles Motor",
        price: "Rp 50.000",
        description: "Poles motor profesional dengan pengalaman 10+ tahun. Compound premium untuk hasil mengkilap maksimal.",
        keywords: ["poles motor cirebon", "salon motor cirebon", "bengkel motor cirebon"],
      },
      {
        name: "Poles Jamur Kaca",
        price: "Rp 150.000",
        description: "Treatment khusus jamur kaca dengan nano coating. Menghilangkan jamur dan bercak membandel permanen.",
        keywords: ["poles kaca mobil cirebon", "treatment jamur kaca", "nano coating cirebon"],
        popular: true,
      },
      {
        name: "Poles Baret Wiper",
        price: "Rp 250.000",
        description: "Layanan khusus menghilangkan baret wiper dengan teknik poles presisi dan bahan premium.",
        keywords: ["poles baret wiper", "treatment kaca mobil", "poles kaca cirebon"],
      },
      {
        name: "Poles Body Exterior",
        price: "Mulai Rp 400.000",
        description: "Poles body profesional dengan compound import. Hasil premium dengan garansi dan konsultasi gratis.",
        keywords: ["poles mobil cirebon", "salon mobil cirebon", "detailing mobil"],
      },
      {
        name: "Salon Interior",
        price: "Mulai Rp 400.000",
        description: "Pembersihan interior menyeluruh dengan produk khusus dan teknik detailing profesional.",
        keywords: ["salon interior mobil", "detailing interior", "cuci jok mobil"],
      },
      {
        name: "Paket Salon Komplit",
        price: "Mulai Rp 700.000",
        description: "Paket lengkap salon mobil exterior, interior, dan mesin. Termasuk coating dan perlindungan ekstra.",
        keywords: ["salon mobil komplit", "detailing mobil full", "paket salon mobil"],
        popular: true,
      },
    ],
  },
  {
    name: "Service AC",
    icon: "❄️",
    color: "from-cyan-600 to-cyan-700",
    description: "Bengkel specialist AC mobil terpercaya di Cirebon dengan teknisi berpengalaman",
    items: [
      {
        name: "Service AC Mobil",
        price: "Rp 600.000",
        description: "Service AC lengkap oleh teknisi berpengalaman. Mengatasi AC tidak dingin, bocor, dan berisik.",
        keywords: ["service ac mobil cirebon", "bengkel ac cirebon", "perbaikan ac mobil"],
        popular: true,
      },
      {
        name: "Ganti Freon AC",
        price: "Rp 350.000",
        description: "Isi freon AC berkualitas R134a dan R1234yf. Pengisian presisi dengan alat digital dan garansi dingin.",
        keywords: ["isi freon cirebon", "ganti freon ac", "service ac mobil"],
      },
      {
        name: "Perbaikan AC Kompleks",
        price: "Sesuai Kondisi",
        description: "Perbaikan AC mobil untuk kerusakan kompleks. Teknisi ahli dengan peralatan modern dan spare part original.",
        keywords: ["service ac mobil cirebon", "bengkel ac terdekat", "perbaikan ac mobil"],
      },
    ],
  },
  {
    name: "Service Mesin",
    icon: "🔧",
    color: "from-orange-600 to-orange-700",
    description: "Layanan perawatan dan perbaikan mesin mobil oleh teknisi ahli di Cirebon",
    items: [
      {
        name: "Isi Gas Nitrogen",
        price: "Rp 10.000/Ban",
        description: "Pengisian gas nitrogen untuk performa dan umur ban optimal. Menghemat BBM dengan teknologi presisi.",
        keywords: ["isi nitrogen cirebon", "gas ban mobil", "perawatan ban"],
      },
      {
        name: "Charge ACCU",
        price: "Rp 15.000",
        description: "Pengisian aki mobil dengan charger modern. Perpanjang umur aki dengan cek kondisi gratis.",
        keywords: ["charge aki cirebon", "service aki mobil", "bengkel aki"],
      },
      {
        name: "Tambal Ban Tubeless",
        price: "Rp 25.000",
        description: "Tambal ban tubeless profesional dengan material berkualitas tinggi. Proses cepat dan garansi tidak bocor.",
        keywords: ["tambal ban tubeless", "service ban cirebon", "bengkel ban 24 jam"],
      },
      {
        name: "Purging Diesel",
        price: "Mulai Rp 300.000",
        description: "Pembersihan sistem bahan bakar diesel untuk performa optimal dan konsumsi BBM efisien.",
        keywords: ["purging diesel cirebon", "service mesin diesel", "pembersihan injector"],
        popular: true,
      },
    ],
  },
]

// Service Card Component
const ServiceCard: React.FC<{ item: ServiceItem; category: PriceCategory; index: number }> = ({
  item,
  category,
  index
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
  >
    {/* Popular Badge */}
    {item.popular && (
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
          <Star className="w-3 h-3 inline mr-1 fill-current" />
          Populer
        </div>
      </div>
    )}

    {/* Card Header */}
    <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>

    <div className="p-6">
      {/* Service Name and Price */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {item.name}
        </h3>
        <div className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
          {item.price}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6 text-sm">
        {item.description}
      </p>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-6">
        {item.keywords.slice(0, 2).map((keyword, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${category.color} text-white shadow-sm`}
          >
            #{keyword.toLowerCase().replace(/ /g, "-")}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <Link
        href={`https://wa.me/62819647333?text=Halo%20saya%20mau%20booking%20untuk%20:%20${encodeURIComponent(item.name)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 bg-gradient-to-r ${category.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
        >
          <Phone className="w-4 h-4" />
          Pesan via WhatsApp
        </motion.button>
      </Link>
    </div>
  </motion.div>
)

// Category Section Component
const CategorySection: React.FC<{ category: PriceCategory; index: number }> = ({ category, index }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="mb-20"
  >
    {/* Category Header */}
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className={`text-4xl p-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-lg`}>
          <span className="text-white text-3xl">{category.icon}</span>
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-4">
        <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
          {category.name}
        </span>
        <span className="text-gray-800"> Cirebon</span>
      </h2>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {category.description}
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {category.items.map((item, itemIndex) => (
        <ServiceCard
          key={item.name}
          item={item}
          category={category}
          index={itemIndex}
        />
      ))}
    </div>
  </motion.section>
)

const PriceList: React.FC = () => {
  return (
    <section id="price-list" className="relative min-h-screen overflow-hidden">
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
              <Shield className="w-3 h-3 inline mr-1" />
              Harga Transparan #1 Cirebon
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#ed3f36] to-[#ff4757] text-white rounded-full font-semibold text-sm shadow-lg">
              <Award className="w-4 h-4" />
              <span>20+ Tahun Pengalaman</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-balance">
            <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              DAFTAR HARGA LENGKAP
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Bengkel Cirebon Terpercaya
            </span>
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <span className="font-bold text-[#27398f]">Layanan automotive terlengkap di Cirebon</span> dengan harga transparan,
            kualitas terjamin, dan teknisi berpengalaman 20+ tahun. Dari cuci mobil, salon, service AC hingga perbaikan mesin.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
              <span className="font-bold text-2xl text-gray-900">4.8/5</span>
              <span className="text-sm text-gray-600">Rating Google</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <Shield className="w-8 h-8 text-green-500" />
              <span className="font-bold text-2xl text-gray-900">100%</span>
              <span className="text-sm text-gray-600">Garansi Resmi</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <Award className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-2xl text-gray-900">2000+</span>
              <span className="text-sm text-gray-600">Mobil Dilayani</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg">
              <Clock className="w-8 h-8 text-purple-500" />
              <span className="font-bold text-2xl text-gray-900">24/7</span>
              <span className="text-sm text-gray-600">Siap Melayani</span>
            </div>
          </div>
        </motion.div>

        {/* Price Categories */}
        <div className="space-y-24">
          {priceCategories.map((category, index) => (
            <CategorySection
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 text-center space-y-8"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Melayani Kendaraan Anda?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Dapatkan layanan terbaik untuk kendaraan Anda dengan harga transparan dan kualitas terjamin.
              Konsultasi gratis sebelum service!
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
    </section>
  )
}

export default PriceList