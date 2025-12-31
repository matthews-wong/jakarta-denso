import { Car, Sparkles, Wrench, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    title: "Cuci Mobil",
    description: "Layanan cuci mobil premium dengan teknologi snow wash modern",
    icon: Car,
    items: ["Cuci Motor Salju", "Cuci Mobil Salju", "Cuci Mobil Aneka Rasa", "Cuci Wetlook", "Doorsmeer T6"],
    image: "/images/cuci-mobil12.jpeg",
    link: "/cuci-mobil-terbaik-cirebon",
    price: "Mulai Rp 25.000",
  },
  {
    title: "Salon Mobil",
    description: "Detailing profesional untuk tampilan mobil maksimal",
    icon: Sparkles,
    items: ["Poles Motor", "Poles Jamur Kaca", "Poles Baret Wiper", "Poles Body Exterior", "Salon Interior", "Poles Mesin"],
    image: "/images/Salon-mobil.jpeg",
    link: "/salon-mobil-terbaik-cirebon",
    price: "Mulai Rp 50.000",
  },
  {
    title: "Service AC & Mesin",
    description: "Spesialis perbaikan AC dan mesin oleh teknisi ahli",
    icon: Wrench,
    items: ["Isi Gas Nitrogen", "Charge ACCU", "Tambal Ban Tubeless", "Perbaikan AC Mobil", "Ganti Sparepart AC", "Ganti Filter Kabin"],
    image: "/images/AC-Mobil.jpeg",
    link: "/service-ac-dan-mesin-terbaik-cirebon",
    price: "Mulai Rp 10.000",
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium ring-1 ring-blue-100 mb-6">
            <CheckCircle className="w-4 h-4" />
            Layanan Terlengkap
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Layanan Kami
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Solusi lengkap perawatan kendaraan dengan teknologi modern dan teknisi berpengalaman 20+ tahun
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden ring-1 ring-gray-100 hover:ring-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <service.icon className="w-5 h-5 text-gray-900" />
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full shadow">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{service.description}</p>

                {/* Service Items */}
                <div className="space-y-2 mb-6">
                  {service.items.slice(0, 4).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {service.items.length > 4 && (
                    <p className="text-sm text-gray-400">+{service.items.length - 4} layanan lainnya</p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={service.link}
                  className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Lihat Detail
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 bg-gray-50 rounded-2xl ring-1 ring-gray-100">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Butuh Konsultasi Gratis?
              </h3>
              <p className="text-gray-500 text-sm">
                Tim ahli kami siap membantu masalah kendaraan Anda
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="https://wa.me/62819647333"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link
                href="https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full ring-1 ring-gray-200 transition-colors"
              >
                Lokasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
