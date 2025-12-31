"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, type FC, type ReactNode } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  MapPin,
  Instagram,
  Clock,
  ArrowRight,
  Car,
  Wrench,
  CheckCircle,
  Star,
  MessageSquare,
  Truck,
  Settings,
  Award,
  Users,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"



const Contact: FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const businessName = "Jakarta Int'l Denso Cirebon"
  const businessDescription = "Layanan cuci mobil, service AC mobil, dan perawatan mobil terbaik di Cirebon"
  const phoneNumber = "0819-647-333"
  const address = "Jl. Garuda Raya No 2-4, Cirebon, Jawa Barat"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: businessName,
    description: businessDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda Raya No 2-4",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    telephone: phoneNumber,
    openingHours: "Mo-Su 08:00-17:00",
    image: "https://www.jakartaintldenso.com/images/owner.jpeg",
    url: "https://www.jakartaintldenso.com",
    sameAs: ["https://www.instagram.com/jakarta_intl_denso", "https://www.tiktok.com/@jakartaintldensocirebon"],
  }

  if (!isMounted) {
    return <div className="min-h-screen bg-gray-50" />
  }

  const stats = [
    { value: "4.7★", label: "Rating Google", color: "from-yellow-400 to-orange-500" },
    { value: "1000+", label: "Pelanggan Puas", color: "from-green-400 to-emerald-500" },
    { value: "20+", label: "Tahun Pengalaman", color: "from-blue-400 to-indigo-500" },
    { value: "24/7", label: "Layanan Darurat", color: "from-red-400 to-pink-500" },
  ]

  const services = [
    {
      value: "Service AC Mobil",
      description: "Teknisi berpengalaman 20+ tahun",
      color: "from-blue-500 to-blue-600",
      icon: <Wrench />,
    },
    {
      value: "Cuci Mobil Premium",
      description: "Snow wash dengan hasil maksimal",
      color: "from-green-500 to-emerald-600",
      icon: <Car />,
    },
    {
      value: "Derek Darurat",
      description: "24/7 untuk wilayah Cirebon-Kuningan",
      color: "from-red-500 to-red-600",
      icon: <Truck />,
    },
    {
      value: "Service Umum",
      description: "Oli, tune up, dan perawatan rutin",
      color: "from-purple-500 to-purple-600",
      icon: <Settings />,
    },
  ]

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27398f]/5 via-blue-400/3 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ed3f36]/4 via-red-400/3 to-transparent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/3 to-pink-400/3 rounded-full animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 space-y-8"
          >
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <div className="bg-gradient-to-r from-[#27398f] to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                <Phone className="w-4 h-4 inline mr-2" />
                Hubungi Kami Sekarang
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm shadow-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Buka Setiap Hari</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-balance">
              <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                HUBUNGI KAMI
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Jakarta Intl Denso Cirebon
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tim profesional kami siap membantu Anda 24/7 untuk semua kebutuhan perawatan kendaraan. Dari layanan
              darurat hingga perawatan rutin, kami selalu siap melayani.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* Owner Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 flex justify-center"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/owner.jpeg"
                  alt="Suminto Wijaya - Owner Jakarta Int'l Denso Cirebon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 448px, 384px"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="relative bg-black/60 rounded-2xl p-5 shadow-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-bold mb-1 text-white">Suminto Wijaya</h2>
                        <p className="text-blue-200 font-medium text-sm">Owner Jakarta Intl Denso</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                        <Users className="w-3 h-3 text-blue-200" />
                        <span className="text-blue-100">1000+ Pelanggan</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-blue-100">20+ Tahun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => window.open(`tel:+62${phoneNumber.replace(/[^0-9]/g, "")}`)}
                >
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                        <Phone className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          Hubungi Kami
                        </h3>
                        <p className="text-gray-700 font-semibold text-lg">{phoneNumber}</p>
                        <p className="text-gray-500 text-sm mt-1">Response Cepat & Terpercaya</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => window.open("https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA")}
                >
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-green-200">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                        <MapPin className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                          Lokasi Bengkel
                        </h3>
                        <p className="text-gray-700 font-semibold">{address}</p>
                        <p className="text-gray-500 text-sm mt-1">Strategis di Pusat Kota Cirebon</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group cursor-pointer">
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-purple-200">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                        <MessageSquare className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                          Konsultasi Gratis
                        </h3>
                        <p className="text-gray-700 font-semibold">WhatsApp & Telepon</p>
                        <p className="text-gray-500 text-sm mt-1">Tanya jawab seputar service mobil</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="group cursor-pointer">
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-orange-200">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                        <Clock className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          Jam Operasional
                        </h3>
                        <p className="text-gray-700 font-semibold">Senin - Minggu</p>
                        <p className="text-gray-500 text-sm mt-1">08:00 - 17:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  Hubungi Kami Via:
                </h3>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`https://wa.me/62${phoneNumber.replace(/[^0-9]/g, "")}`}
                    className="group flex items-center justify-between gap-4 px-8 py-6 rounded-2xl text-white font-semibold transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 shadow-xl hover:shadow-green-500/30 border border-green-400/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hubungi kami melalui WhatsApp"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Phone className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-lg">WhatsApp - Chat Langsung</span>
                        <p className="text-green-100 text-sm opacity-90">Respon cepat dalam hitungan menit</p>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-500"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="https://www.instagram.com/jakarta_intl_denso"
                    className="group flex items-center justify-between gap-4 px-8 py-6 rounded-2xl text-white font-semibold transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 shadow-xl hover:shadow-purple-500/30 border border-purple-400/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kunjungi Instagram kami"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Instagram className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-lg">Instagram - Lihat Portfolio</span>
                        <p className="text-purple-100 text-sm opacity-90">Foto hasil kerja & testimoni pelanggan</p>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-500"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="https://www.tiktok.com/@jakartaintldensocirebon"
                    className="group flex items-center justify-between gap-4 px-8 py-6 rounded-2xl text-white font-semibold transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-800 shadow-xl hover:shadow-gray-500/30 border border-gray-600/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kunjungi TikTok kami"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Image
                          src="/images/tiktok-social.png"
                          alt="TikTok"
                          width={24}
                          height={24}
                          className="brightness-0 invert"
                        />
                      </div>
                      <div>
                        <span className="text-lg">TikTok - Video Tutorial</span>
                        <p className="text-gray-100 text-sm opacity-90">Tips perawatan mobil & behind the scenes</p>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-500"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Services Quick Access */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
                  Layanan Unggulan
                </span>
                <span className="text-gray-800"> Kami</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hubungi kami sekarang untuk mendapatkan layanan terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {service.value}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Main CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="relative">
              <div className="relative bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl p-12 shadow-xl border border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Butuh Bantuan Segera? Hubungi Kami Sekarang!
                </h2>
                <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                  <strong className="text-white">Jakarta Intl Denso</strong> - Solusi Terpercaya untuk Semua Kebutuhan
                  Kendaraan Anda
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-4xl mx-auto">
                  🔧 <strong>Service AC Mobil Expert</strong> - Teknisi berpengalaman dengan spare part original
                  <br />🚗 <strong>Cuci Mobil Premium</strong> - Hasil bersih maksimal dengan teknik profesional
                  <br />
                  🛡️ <strong>Garansi Berkualitas</strong> - Kepuasan pelanggan adalah prioritas utama kami
                  <br />📍 <strong>Lokasi Strategis</strong> - Mudah dijangkau di pusat kota Cirebon
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`tel:+62${phoneNumber.replace(/[^0-9]/g, "")}`}
                      className="group inline-flex items-center justify-center px-10 py-5
                        bg-gradient-to-r from-[#27398f] via-blue-600 to-blue-700 text-white font-bold rounded-2xl text-lg
                        shadow-xl hover:shadow-2xl transform transition-all duration-300 border border-blue-400/20"
                    >
                      <Phone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                      Hubungi: {phoneNumber}
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`https://wa.me/62${phoneNumber.replace(/[^0-9]/g, "")}`}
                      className="group inline-flex items-center justify-center px-10 py-5
                        bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl text-lg
                        shadow-xl hover:shadow-2xl transform transition-all duration-300 border border-green-400/20"
                    >
                      <MessageSquare className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                      WhatsApp Chat
                    </Link>
                  </motion.div>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Location and Hours */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    Lokasi Bengkel
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    <strong>Jl. Garuda Raya No 2-4</strong>
                    <br />
                    Cirebon, Jawa Barat
                    <br />
                    <span className="text-gray-600">(Strategis di pusat kota, mudah dijangkau)</span>
                  </p>
                  <Link
                    href="https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group-hover:gap-3 duration-300"
                  >
                    Lihat di Google Maps
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    Jam Operasional
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="font-medium">Senin - Minggu</span>
                      <span className="font-bold text-green-600">08:00 - 17:00 WIB</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                      Buka setiap hari untuk melayani kebutuhan kendaraan Anda dengan pelayanan terbaik
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Info Footer */}
            <div className="text-center text-gray-600 space-y-2 pt-8">
              <p className="text-sm">
                <strong className="text-[#27398f]">Jakarta Intl Denso Cirebon</strong> - Bengkel AC Mobil & Cuci Mobil
                Terpercaya #1 di Cirebon
              </p>
              <p className="text-sm">📍 Jl. Garuda Raya No 2-4, Cirebon | 📞 {phoneNumber} | ⏰ 08:00 - 17:00 WIB</p>
              <p className="text-sm text-blue-600 font-medium">
                💬 Konsultasi Gratis Sebelum Service | 🔧 Teknisi Berpengalaman 20+ Tahun
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,120 C150,100 350,0 600,20 C850,40 1050,100 1200,80 L1200,120 Z"
            ></path>
          </svg>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}

export default Contact
