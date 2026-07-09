"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

interface Review {
  id: number;
  name: string;
  role?: string;
  rating: number;
  content: string;
  images: string[];
}

interface ReviewStarsProps {
  rating: number;
}

interface ReviewImagesProps {
  images: string[];
  alt: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Dante Istanto",
    role: "Local Guide",
    rating: 5,
    content:
      "Kolong Bersih, cepat, interior di vacuum, semua mobil sy cuci disini",
    images: ["/images/review1.png", "/images/review2.png"],
  },
  {
    id: 2,
    name: "Bagas Anindito",
    rating: 5,
    content:
      "Tempat cuci mobil terbaik di Cirebon, pelayanannya sangat baik dan mobil bersih luar & dalam.\nHarga cuci mobil menurut saya standar, yaitu 45k.\nTerdapat pelayanan yang lain seperti Service AC, Custom Jok, Ganti Oli, dll.\nBerlokasi strategis di tengah kota tepatnya di Jalan Ampera di pertigaan.\nYang paling saya suka di sini terdapat 2 jenis hidrolik, yang standar alias yang hanya menyangga bagian tengah mobil, dan ada yang menyangga ban mobilnya juga sehingga kaki-kaki mobil tidak cepat rusak.\nTerdapat tempat untuk menunggu.\nWaktu yang dihabiskan sekitar 30 menit - 1 jam untuk 1 mobil tergantung jenis mobilnya.",
    images: [],
  },
  {
    id: 3,
    name: "Aditya Rifki Satria",
    rating: 5,
    content:
      "Cuci mobil paling juara, dengan harga yg worth it, terjangkau. Bisa mendapat kebersihan maksimal luar dalam, ya meski tempatnya selalu penuh dan saya nunggu dari jam set9 pagi baru selesai jam 11 siang. Tapi saya puas akan hasilnya.. oiya saya betah nunggu karena tempatnya enak, bisa ngopi juga, juara pokoknya disini pelayananya 🙏",
    images: ["/images/review3.png"],
  },
  {
    id: 4,
    name: "Ferry Hendryk",
    rating: 5,
    content:
      "om Ownernya baek, waktu mau beli air mineral dingin keabisan eh di kasih nya minuman manis tp bayarnya seharga air mineral 😂😂 ...mantap pelayanan nya.. tetap pertahankan kualitas dan pelayanan nya",
    images: [],
  },
  {
    id: 5,
    name: "Rudi Mus Andriyanto",
    rating: 5,
    content: "Bersih maksimal..",
    images: ["/images/review4.png"],
  },
  {
    id: 6,
    name: "Hariadi Sugandi",
    rating: 5,
    content:
      "Mantap, kerja bersih drpd cuci mobil yg lain ada di crb, pertahankan terus utk lbh baik",
    images: [],
  },
];

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating }) => {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const ReviewImages: React.FC<ReviewImagesProps> = ({ images, alt }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-lg overflow-hidden"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${alt} - Image ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default function Reviews() {
  return (
    <>
      <section id="ulasan" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight relative z-10">
              Ulasan Pelanggan Kami
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Dari hasil Google Reviews - Rating Rata-rata: 4.4/5
            </p>
            <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-t from-white to-transparent"></div>
            <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="efek-blur absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>

                <div className="bg-white p-6 rounded-3xl h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-bold text-gray-900">{review.name}</h2>
                      {review.role && (
                        <p className="text-sm text-gray-600">{review.role}</p>
                      )}
                    </div>
                  </div>

                  <ReviewStars rating={review.rating} />

                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {review.content}
                  </p>

                  <ReviewImages
                    images={review.images}
                    alt={`Review by ${review.name}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
