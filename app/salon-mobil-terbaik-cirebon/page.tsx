"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Users,
  Star,
  MapPin,
  Phone,
  Gem,
  CheckCircle2,
  PaintBucket,
  HelpCircle,
} from "lucide-react";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), {
  ssr: false,
});

const SalonMobil = () => {
  const whatsappNumber = "62819647333";

  const salonSteps = [
    {
      title: "Inspeksi Awal",
      description: "Pemeriksaan kondisi eksterior & interior",
      icon: "🔍",
      step: 1,
    },
    {
      title: "Pencucian",
      description: "Cuci dengan produk premium khusus",
      icon: "🚿",
      step: 2,
    },
    {
      title: "Detailing Eksterior",
      description: "Polishing & waxing body mobil",
      icon: "✨",
      step: 3,
    },
    {
      title: "Interior Clean",
      description: "Vakum & pembersihan menyeluruh",
      icon: "🧹",
      step: 4,
    },
    {
      title: "Detailing Interior",
      description: "Perawatan dashboard & trim",
      icon: "🧼",
      step: 5,
    },
    {
      title: "Perawatan Kaca",
      description: "Pembersihan kaca anti air",
      icon: "🪟",
      step: 6,
    },
    {
      title: "Finishing Touch",
      description: "Inspeksi akhir & sentuhan final",
      icon: "🏁",
      step: 7,
    },
  ];

  const services = [
    {
      title: "Detailing Eksterior",
      description: "Perawatan menyeluruh untuk eksterior mobil Anda",
      icon: PaintBucket,
      features: ["Paint correction", "Polishing", "Waxing", "Perawatan kaca"],
    },
    {
      title: "Detailing Interior",
      description: "Perawatan menyeluruh untuk interior mobil Anda",
      icon: Sparkles,
      features: [
        "Deep cleaning",
        "Leather treatment",
        "Odor removal",
        "Fabric protection",
      ],
    },
  ];

  const stats = [
    { value: "20+", label: "Tahun", suffix: "pengalaman sejak 2004" },
    { value: "4.9/5", label: "Rating", suffix: "dari 160+ pelanggan" },
    { value: "7", label: "Langkah", suffix: "proses detailing" },
    { value: "100%", label: "Kepuasan", suffix: "pelanggan terjamin" },
  ];

  const faqs = [
    {
      question: "Apa saja layanan salon mobil yang tersedia?",
      answer:
        "Layanan salon mobil kami meliputi detailing eksterior (paint correction, polishing, waxing, perawatan kaca) dan detailing interior (deep cleaning, leather treatment, odor removal, fabric protection) untuk hasil yang maksimal.",
    },
    {
      question: "Berapa lama proses salon mobil lengkap?",
      answer:
        "Proses salon mobil lengkap membutuhkan waktu 4-6 jam tergantung paket yang dipilih, mulai dari detailing standar hingga paket lengkap eksterior & interior.",
    },
    {
      question: "Apa keunggulan salon mobil di Jakarta Int'l Denso?",
      answer:
        "Keunggulan kami meliputi: (1) Teknisi profesional berpengalaman 20+ tahun, (2) Produk detailing premium berkualitas, (3) Hasil detailing memuaskan, (4) Ruang kerja bersih dan tertutup.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#27398f] to-slate-900" />

        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#27398f]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#ed3f36]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#27398f]/10 rounded-full blur-3xl" />

        {/* Hero Image Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/Salon-mobil.jpeg"
            alt="Layanan salon mobil premium di Cirebon"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <Gem className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                Premium Auto Detailing Cirebon
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Salon Mobil{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              di Cirebon
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-purple-100/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Kembalikan kilau dan kesegaran mobil Anda dengan layanan detailing
              profesional. Poles, waxing, paint correction dengan hasil
              maksimal.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() =>
                  (window.location.href = `https://wa.me/${whatsappNumber}`)
                }
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Booking Sekarang
              </button>
              <a
                href="#layanan"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Lihat Layanan
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mt-12"
            >
              <div className="flex items-center gap-2 text-white/70">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">Rating 4.9/5</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Teknisi Profesional</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-24 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,90 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Salon-mobil.jpeg"
                  alt="Salon mobil premium Jakarta Intl Denso Cirebon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-50 text-[#27398f] text-sm font-semibold rounded-full mb-6">
                Tentang Kami
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Salon Mobil <span className="text-purple-600">Terbaik</span> di
                Cirebon
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Jakarta Intl Denso Cirebon menawarkan layanan salon mobil
                premium dengan standar kualitas tertinggi. Kami menggunakan
                produk terbaik dan teknologi modern untuk merawat mobil Anda.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Tim profesional kami memiliki pengalaman bertahun-tahun dalam
                industri detailing mobil, menjamin hasil yang memuaskan untuk
                setiap kendaraan.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Detailing eksterior & interior",
                  "Poles & waxing",
                  "Paint correction",
                  "Leather treatment",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-purple-100 font-medium">{stat.label}</div>
                <div className="text-purple-200/70 text-sm">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-pink-50 text-pink-600 text-sm font-semibold rounded-full mb-6">
              Proses Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              7 Langkah Salon Mobil{" "}
              <span className="text-purple-600">Premium</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proses sistematis untuk hasil detailing maksimal
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {salonSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  index === 6
                    ? "sm:col-span-2 lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-[#27398f] to-[#ed3f36] text-white"
                    : ""
                }`}
              >
                <div
                  className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                    index === 6
                      ? "bg-white text-[#27398f]"
                      : "bg-[#27398f] text-white"
                  }`}
                >
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3
                  className={`text-lg font-bold mb-2 ${index === 6 ? "text-white" : "text-gray-900"}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm ${index === 6 ? "text-blue-100" : "text-gray-600"}`}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() =>
                (window.location.href = `https://wa.me/${whatsappNumber}`)
              }
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#27398f] to-[#ed3f36] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Booking Salon Mobil Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#27398f] text-sm font-semibold rounded-full mb-6">
              Layanan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Layanan Salon <span className="text-[#27398f]">Unggulan</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan detailing premium untuk kendaraan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#27398f] to-[#ed3f36] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-[#27398f] text-sm font-semibold rounded-full mb-6">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pertanyaan <span className="text-purple-600">Umum</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jawaban seputar salon mobil di Cirebon
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 open:shadow-xl transition-shadow duration-300"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-gray-900">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <span className="text-purple-600 transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-gray-600 mt-4 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-[#27398f] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#27398f]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ed3f36]/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Berikan Perawatan <span className="text-[#ed3f36]">Terbaik</span>{" "}
              untuk Mobil Anda
            </h2>
            <p className="text-xl text-blue-100/80 mb-10">
              Rasakan layanan salon mobil terbaik! Hubungi kami sekarang!
            </p>
            <button
              onClick={() =>
                (window.location.href = `https://wa.me/${whatsappNumber}`)
              }
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#27398f] font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Kami via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/lokasi-kami.jpeg"
                alt="Lokasi Jakarta Intl Denso Cirebon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-50 text-[#27398f] text-sm font-semibold rounded-full mb-6">
                Lokasi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Lokasi <span className="text-[#27398f]">Strategis</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Berlokasi di pusat kota Cirebon, mudah diakses dari seluruh
                penjuru kota.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#27398f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#27398f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jl. Garuda Raya No. 2, Cirebon, Jawa Barat 45131
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#27398f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#27398f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Jam Operasional
                    </h4>
                    <p className="text-gray-600">
                      Senin - Minggu: 08.00 - 17.00 WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-[#ed3f36]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#ed3f36]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Kontak</h4>
                    <p className="text-gray-600">WhatsApp: 0819-647-333</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Layanan Lainnya
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/cuci-mobil-terbaik-cirebon"
              className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-gray-900 mb-1">Cuci Mobil</h3>
              <p className="text-gray-600 text-sm">
                Cuci mobil premium dengan hidrolik modern
              </p>
            </Link>
            <Link
              href="/service-ac-dan-mesin-terbaik-cirebon"
              className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-gray-900 mb-1">
                Service AC & Mesin
              </h3>
              <p className="text-gray-600 text-sm">
                Bengkel AC mobil & tune up mesin terpercaya
              </p>
            </Link>
            <Link
              href="/harga"
              className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-bold text-gray-900 mb-1">Daftar Harga</h3>
              <p className="text-gray-600 text-sm">
                Lihat harga lengkap semua layanan kami
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default SalonMobil;
