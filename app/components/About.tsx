import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle, Users, Shield, Clock } from "lucide-react"

export default function About() {
  const whatsappNumber = "62819647333"

  return (
    <section className="relative py-20 lg:py-28 bg-[#fafafa]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/consulting.jpeg"
                  alt="Konsultasi Bengkel AC Mobil Cirebon - Jakarta Intl Denso"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl ring-1 ring-gray-100 max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-500">Pelanggan Puas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium ring-1 ring-blue-100 mb-6">
              <CheckCircle className="w-4 h-4" />
              Tentang Kami
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
              Bengkel AC Mobil{" "}
              <span className="text-blue-600">Terpercaya</span>{" "}
              Sejak 2004
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Kami adalah bengkel spesialis AC mobil di Cirebon yang mengutamakan transparansi dan kepuasan pelanggan. Dengan pengalaman lebih dari 20 tahun, kami siap memberikan solusi terbaik untuk kendaraan Anda.
            </p>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tidak ada biaya tersembunyi. Konsultasi gratis sebelum service. Garansi untuk setiap pekerjaan.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Shield, label: "Garansi Resmi" },
                { icon: Clock, label: "20+ Tahun Pengalaman" },
                { icon: Users, label: "Teknisi Bersertifikat" },
                { icon: CheckCircle, label: "Harga Transparan" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" />
                Konsultasi Gratis
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full ring-1 ring-gray-200 transition-colors"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
