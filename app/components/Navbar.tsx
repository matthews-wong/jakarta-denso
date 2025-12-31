"use client";

import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Car, SprayCanIcon as Spray, PenToolIcon as Tool, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

interface ServiceItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

const serviceItems: ServiceItem[] = [
  {
    name: "Cuci Mobil",
    href: "/cuci-mobil-terbaik-cirebon",
    icon: Car,
    description: "Layanan cuci mobil premium dengan teknologi snow wash",
  },
  {
    name: "Salon Mobil",
    href: "/salon-mobil-terbaik-cirebon",
    icon: Spray,
    description: "Perawatan eksterior & interior untuk tampilan maksimal",
  },
  {
    name: "Service AC & Mesin",
    href: "/service-ac-dan-mesin-terbaik-cirebon",
    icon: Tool,
    description: "Perbaikan dan perawatan AC & mesin oleh teknisi ahli",
  },
];

const navItems: NavItem[] = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/#services", hasDropdown: true },
  { name: "Harga", href: "/harga" },
  { name: "Galeri", href: "/gallery" },
  { name: "Ulasan", href: "/ulasan-kami" },
  { name: "Blog", href: "/blogs" },
  { name: "Kontak", href: "/kontak-kami" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false);
  const [activeServiceDropdown, setActiveServiceDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle outside clicks for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array is correct here as the ref doesn't change.

  // Reset states on route change
  useEffect(() => {
    setIsOpen(false);
    setIsServiceOpen(false);
    setActiveServiceDropdown(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [pathname]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Removed unnecessary useCallback as the function doesn't depend on external state
  const handleNavClick = () => {
    // Close mobile menu and dropdowns
    setIsOpen(false);
    setIsServiceOpen(false);
    setActiveServiceDropdown(false);
  };

  // Removed unnecessary useCallback as the function doesn't depend on external state
  const handleServiceItemClick = (href: string) => {
    // Close menus before navigation
    setIsServiceOpen(false);
    setIsOpen(false);
    setActiveServiceDropdown(false);

    // Navigate to the service page
    router.push(href);
  };

  const toggleMobileServiceDropdown = useCallback(() => {
    setActiveServiceDropdown((prev) => !prev);
  }, []);

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const serviceDropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <nav className="fixed w-full z-50 py-2 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16">
              <Image
                src="/images/logo.avif"
                alt="Jakarta Intl Denso Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 48px, 64px"
              />
            </div>
            <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-blue-900">
              Jakarta Intl Denso
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      onMouseEnter={() => setIsServiceOpen(true)}
                      className="group inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      aria-expanded={isServiceOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServiceOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Mega Dropdown */}
                  {item.hasDropdown && isServiceOpen && (
                    <div
                      className="absolute left-0 mt-2 w-[500px] bg-white rounded-xl shadow-xl p-4 grid grid-cols-1 gap-4 z-10 transform origin-top-left transition-transform duration-200"
                      onMouseLeave={() => setIsServiceOpen(false)}
                    >
                      {serviceItems.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => handleServiceItemClick(service.href)}
                          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          <service.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Desktop-only Call to Action button */}
              <Link
                href="https://wa.me/+62819647333"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button with call icon */}
          <div className="md:hidden flex items-center gap-1">
            {/* Quick call button on mobile navbar */}
            <a
              href="tel:+62819647333"
              className="mr-1 p-2 rounded-full bg-blue-50 text-blue-600 transition-all duration-300"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 z-50 relative"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Menu with AnimatePresence for enter/exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 bg-white z-40 flex flex-col overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(to bottom, #f0f7ff, white)",
            }}
          >
            {/* Close button positioned at the top right */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Logo and branding in mobile menu */}
            <div className="pt-14 pb-3 px-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative h-12 w-12">
                  <Image
                    src="/images/logo.avif"
                    alt="Jakarta Intl Denso Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-blue-900">Jakarta Intl Denso</h2>
                  <p className="text-xs text-gray-600">Layanan Otomotif Terbaik Cirebon</p>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-200 w-full rounded-full"></div>
            </div>

            {/* Navigation items container with scroll */}
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    ref={item.hasDropdown ? mobileDropdownRef : null}
                    className="border-b border-gray-100 last:border-0"
                  >
                    {item.hasDropdown ? (
                      <div>
                        {/* Mobile dropdown button */}
                        <button
                          onClick={toggleMobileServiceDropdown}
                          className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium text-gray-800 hover:text-blue-700 transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
                          aria-expanded={activeServiceDropdown}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-5 w-5 text-blue-600 transition-transform duration-300 ${activeServiceDropdown ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {/* Mobile service items with animations */}
                        <AnimatePresence>
                          {activeServiceDropdown && (
                            <motion.div
                              variants={serviceDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="pl-4 space-y-1 mb-3"
                            >
                              {serviceItems.map((service, idx) => (
                                <motion.div key={service.name} variants={itemVariants} custom={idx}>
                                  <Link
                                    href={service.href}
                                    onClick={() => handleServiceItemClick(service.href)}
                                    className="flex items-start space-x-3 p-3 my-1 rounded-xl bg-blue-50/80 hover:bg-blue-100 transition-colors duration-200"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                      <service.icon className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                                      <p className="text-xs text-gray-600">{service.description}</p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className="flex items-center justify-between px-4 py-3.5 text-base font-medium text-gray-800 hover:text-blue-700 transition-colors duration-200 rounded-lg hover:bg-blue-50/50"
                      >
                        {item.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile contact options */}
            <motion.div
              variants={itemVariants}
              className="px-6 pb-6 pt-2 bg-gradient-to-b from-white/0 via-white to-white"
            >
              <div className="grid grid-cols-2 gap-3 mb-3">
                <a
                  href="tel:+62819647333"
                  className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  Telepon
                </a>
                <Link
                  href="/#contact"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Kontak Kami
                </Link>
              </div>

              <Link
                href="https://wa.me/+62819647333"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat WhatsApp
              </Link>

              <div className="mt-4 flex justify-center">
                <p className="text-xs text-gray-500">© 2025 Jakarta Intl Denso. All rights reserved.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;