"use client";

import {
  Phone,
  MapPin,
  Instagram,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FC, type ReactNode } from "react";

interface SocialButtonProps {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
}

const SocialButton: FC<SocialButtonProps> = ({
  href,
  className = "",
  children,
  ariaLabel,
}) => {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-3 px-6 py-4 rounded-xl text-white font-medium transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 hover:scale-105 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-3">{children}</div>
      <ArrowRight
        className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-500"
        aria-hidden="true"
      />
    </Link>
  );
};

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  subContent?: string;
  className?: string;
}

const ContactCard: FC<ContactCardProps> = ({
  icon,
  title,
  content,
  subContent,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
      <div className="relative p-6 bg-white rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-100 group-hover:border-blue-200">
        <div className="flex items-start gap-4">
          <div
            className={`text-blue-600 transform transition-all duration-500 ${isHovered ? "scale-125 rotate-12" : ""}`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 font-medium">{content}</p>
            {subContent && (
              <p className="text-gray-500 text-sm mt-1">{subContent}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: FC = () => {
  const businessName = "Jakarta Int'l Denso Cirebon";
  const phoneNumber = "0819-647-333";
  const address = "Jl. Garuda Raya No 2-4, Cirebon, Jawa Barat";

  return (
    <>
      <section
        id="contact"
        className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 animate-[pulse_4s_ease-in-out_infinite]" />

        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-blue-600 font-semibold mb-4 block uppercase tracking-wider">
              Kontak Kami
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 leading-normal">
              Hubungi {businessName}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
              Kami siap melayani kebutuhan cuci mobil dan service AC mobil Anda
              di Cirebon. Jangan ragu untuk menghubungi kami melalui berbagai
              channel yang tersedia.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(8,112,184,0.7)] transition-all duration-700">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/owner.jpeg"
                  alt="Suminto Wijaya - Owner Jakarta Int'l Denso Cirebon"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent opacity-70 group-hover:opacity-70 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="space-y-4 transform translate-y-0 group-hover:-translate-y-4 transition-all duration-500">
                    <div className="relative backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/10 bg-black/40">
                      <h2 className="text-4xl font-bold mb-2 relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                          Suminto Wijaya
                        </span>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full mt-2 group-hover:w-full transition-all duration-700" />
                      </h2>
                      <p className="text-blue-200 font-medium text-xl group-hover:text-blue-100 transition-colors duration-300">
                        Owner {businessName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <ContactCard
                  icon={<Phone className="h-8 w-8" />}
                  title="Telepon"
                  content={phoneNumber}
                  subContent="Senin - Minggu, 08:00 - 17:00"
                />
                <ContactCard
                  icon={<MapPin className="h-8 w-8" />}
                  title="Alamat"
                  content={address}
                  subContent="Cirebon, Jawa Barat"
                />
                <ContactCard
                  icon={<Mail className="h-8 w-8" />}
                  title="Gratis Konsultasi"
                  content="Tentang AC Mobil 🚗❄️"
                  subContent="Hubungi kami untuk info lebih lanjut"
                />
                <ContactCard
                  icon={<Clock className="h-8 w-8" />}
                  title="Jam Operasional"
                  content="Senin - Minggu"
                  subContent="08:00 - 17:00 WIB"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SocialButton
                  href={`https://wa.me/62${phoneNumber.replace(/[^0-9]/g, "")}`}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex-1"
                  ariaLabel="Hubungi kami melalui WhatsApp"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </SocialButton>

                <SocialButton
                  href="https://www.tiktok.com/@jakartaintldensocirebon"
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black flex-1"
                  ariaLabel="Kunjungi TikTok kami"
                >
                  <Image
                    src="/images/tiktok-social.png"
                    alt="TikTok"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                  <span>TikTok</span>
                </SocialButton>

                <SocialButton
                  href="https://www.instagram.com/jakarta_intl_denso"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-1"
                  ariaLabel="Kunjungi Instagram kami"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  <span>Instagram</span>
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
