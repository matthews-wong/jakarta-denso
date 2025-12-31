"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Phone, Star, ChevronRight, Play } from "lucide-react"

export default function Hero() {
  const whatsappNumber = "62819647333"
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date()
      const jakartaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
      const hour = jakartaTime.getHours()
      setIsOpen(hour >= 8 && hour < 17)
    }
    checkOpenStatus()
    const interval = setInterval(checkOpenStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#fafafa] pt-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center pt-8 pb-12 lg:pt-16 lg:pb-20">

          {/* Status Pill */}
          {isOpen !== null && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${isOpen
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}>
              <span className="relative flex h-2 w-2">
                {isOpen && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
              </span>
              {isOpen ? "Buka Sekarang" : "Tutup"} · 08:00 - 17:00 WIB
            </div>
          )}

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mb-6 max-w-4xl">
            Bengkel AC & Perawatan Mobil{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
              Terpercaya
            </span>{" "}
            di Cirebon
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
            Service AC, cuci mobil premium, dan salon mobil profesional.
            Lebih dari 20 tahun melayani dengan standar kualitas terbaik.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-4 h-4" />
              Hubungi via WhatsApp
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full ring-1 ring-gray-200 transition-colors"
            >
              <Play className="w-4 h-4" />
              Lihat Layanan
            </Link>
          </div>

          {/* Social Proof Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-gray-600">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.9</span>
              <span className="text-gray-400">·</span>
              <span>160+ ulasan</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-gray-300" />

            {/* Stats */}
            <div className="flex items-center gap-4">
              <span><strong className="text-gray-900">20+</strong> tahun</span>
              <span className="text-gray-300">·</span>
              <span><strong className="text-gray-900">10,000+</strong> pelanggan</span>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Image Container */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10 ring-1 ring-gray-900/5">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9]">
              <Image
                src="/images/jakartaintldenso-cover.jpg"
                alt="Bengkel Jakarta Int'l Denso Cirebon - Service AC dan Cuci Mobil Terbaik"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />

              {/* Content on image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  {/* Location & Services */}
                  <div>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Jl. Garuda No. 2, Cirebon
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Service AC", "Cuci Mobil", "Salon Mobil", "Tune Up"].map((service, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA on image - Desktop only */}
                  <Link
                    href={`https://wa.me/${whatsappNumber}`}
                    className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
                  >
                    Booking Sekarang
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          {/* Testimonial Card - Left */}
          <div className="hidden lg:block absolute -left-8 bottom-24 bg-white rounded-2xl p-4 shadow-xl shadow-gray-900/10 max-w-[220px] ring-1 ring-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                BA
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Bagas Anindito</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              &quot;Cuci mobil terbaik di Cirebon! Pelayanan ramah, hasil bersih maksimal.&quot;
            </p>
          </div>

          {/* Stats Card - Right */}
          <div className="hidden lg:block absolute -right-6 top-12 bg-white rounded-2xl p-4 shadow-xl shadow-gray-900/10 ring-1 ring-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Garansi Layanan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges - Mobile */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
          {[
            { label: "20+ Tahun", sublabel: "Pengalaman" },
            { label: "100%", sublabel: "Garansi" },
            { label: "10,000+", sublabel: "Pelanggan" },
            { label: "4.9/5", sublabel: "Rating" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center ring-1 ring-gray-100">
              <p className="text-xl font-bold text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-500">{item.sublabel}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom curve transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 sm:h-16 text-white" preserveAspectRatio="none" viewBox="0 0 1440 54">
          <path fill="currentColor" d="M0 22L60 16.7C120 11 240 1.00001 360 0.700012C480 1.00001 600 11 720 16.7C840 22 960 22 1080 19.2C1200 16 1320 11 1380 8.50001L1440 6V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z" />
        </svg>
      </div>
    </section>
  )
}
