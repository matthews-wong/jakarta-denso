import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ArrowRight,
  MapPin,
  Car,
  Sparkles,
  Wrench,
  Phone,
  Lightbulb,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import ShareButton from "./ShareButton";

// Statically generate every post at build time; 404 for unknown slugs.
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
};

// MDX component overrides. All presentational — safe to render on the server.
const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-800 border-b pb-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-700 border-l-4 border-blue-500 pl-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-600">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-gray-600 text-lg">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-6 text-gray-600 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-lg">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-6 italic text-gray-700 bg-blue-50 rounded-r-lg">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <Image
        src={typeof src === "string" ? src : "/images/og-image.jpg"}
        alt={alt || ""}
        width={800}
        height={500}
        className="rounded-xl shadow-lg object-cover w-full"
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || "#"}
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
    >
      {children}
    </Link>
  ),
  Tip: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg my-8 border-l-4 border-green-500 shadow-md">
      <div className="flex items-center gap-3">
        <Lightbulb className="w-6 h-6 text-green-500" />
        <span className="font-semibold text-green-700">Tip:</span>
      </div>
      <div className="mt-2 text-green-700">{children}</div>
    </div>
  ),
  Highlight: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg my-8 shadow-md border-t-4 border-purple-500">
      <div className="text-purple-800">{children}</div>
    </div>
  ),
};

// Quick Links Data - matches current routes
const quickLinks = [
  {
    href: "/cuci-mobil-terbaik-cirebon",
    icon: Car,
    title: "Cuci Mobil",
    description: "Layanan cuci mobil premium",
    bgClass: "bg-blue-50",
    hoverClass: "hover:bg-blue-100",
    iconBgClass: "bg-blue-500",
    textClass: "text-blue-900",
    descClass: "text-blue-600",
  },
  {
    href: "/salon-mobil-terbaik-cirebon",
    icon: Sparkles,
    title: "Salon Mobil",
    description: "Detailing & poles mobil",
    bgClass: "bg-purple-50",
    hoverClass: "hover:bg-purple-100",
    iconBgClass: "bg-purple-500",
    textClass: "text-purple-900",
    descClass: "text-purple-600",
  },
  {
    href: "/service-ac-dan-mesin-terbaik-cirebon",
    icon: Wrench,
    title: "Service AC & Mesin",
    description: "Perbaikan AC dan mesin",
    bgClass: "bg-orange-50",
    hoverClass: "hover:bg-orange-100",
    iconBgClass: "bg-orange-500",
    textClass: "text-orange-900",
    descClass: "text-orange-600",
  },
  {
    href: "/harga",
    icon: DollarSign,
    title: "Daftar Harga",
    description: "Lihat harga layanan",
    bgClass: "bg-green-50",
    hoverClass: "hover:bg-green-100",
    iconBgClass: "bg-green-500",
    textClass: "text-green-900",
    descClass: "text-green-600",
  },
  {
    href: "/ulasan-kami",
    icon: MessageSquare,
    title: "Ulasan",
    description: "Testimoni pelanggan",
    bgClass: "bg-pink-50",
    hoverClass: "hover:bg-pink-100",
    iconBgClass: "bg-pink-500",
    textClass: "text-pink-900",
    descClass: "text-pink-600",
  },
  {
    href: "/kontak-kami",
    icon: Phone,
    title: "Kontak",
    description: "Hubungi kami",
    bgClass: "bg-red-50",
    hoverClass: "hover:bg-red-100",
    iconBgClass: "bg-red-500",
    textClass: "text-red-900",
    descClass: "text-red-600",
  },
];

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, source, structuredData } = post;

  return (
    <div className="min-h-screen bg-white">
      {/* BlogPosting structured data — server-rendered into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Simple Navbar */}
      <nav className="fixed w-full z-50 py-3 bg-white shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-jid.png"
              alt="Jakarta Intl Denso"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-gray-900 hidden sm:block">
              Jakarta Intl Denso
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/blogs"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Semua Artikel
            </Link>
            <Link
              href="https://wa.me/62819647333"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <article className="pt-16 bg-white">
          {/* Hero Image */}
          <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
            <Image
              src={frontmatter.coverImage || "/images/og-image.jpg"}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
          </div>

          {/* Content Card */}
          <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-12">
              {/* Navigation */}
              <nav className="flex items-center justify-between mb-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Kembali
                </Link>
                <ShareButton
                  title={frontmatter.title}
                  text={frontmatter.excerpt}
                />
              </nav>

              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-gray-900">
                  {frontmatter.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={frontmatter.date}>
                      {new Date(frontmatter.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{frontmatter.readingTime}</span>
                  </div>
                  {frontmatter.category && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {frontmatter.category}
                    </span>
                  )}
                </div>
              </header>

              {/* MDX Content — rendered on the server */}
              <div className="prose prose-lg max-w-none">
                <MDXRemote
                  source={source}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeHighlight],
                    },
                  }}
                />
              </div>

              {/* Quick Links Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Jelajahi Layanan Kami
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center p-4 ${item.bgClass} rounded-xl ${item.hoverClass} transition-all`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 ${item.iconBgClass} rounded-lg flex items-center justify-center`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className={`font-medium ${item.textClass}`}>
                          {item.title}
                        </p>
                        <p className={`text-sm ${item.descClass}`}>
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ml-auto ${item.descClass} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                    </Link>
                  ))}
                </div>

                {/* Service Area CTA */}
                <div className="bg-gray-50 rounded-xl p-4 mt-6">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Kunjungi <strong>Jakarta Intl Denso Cirebon</strong> di
                      Jl. Garuda No.2, Cirebon. Melayani pelanggan dari{" "}
                      <strong>Indramayu</strong>, <strong>Majalengka</strong>,{" "}
                      <strong>Kuningan</strong>, dan sekitarnya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">
                Jakarta Intl Denso Cirebon
              </h3>
              <p className="text-gray-400 text-sm">
                Spesialis AC Mobil & Perawatan Kendaraan
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://wa.me/62819647333"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors"
              >
                WhatsApp: 0819-647-333
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Jakarta Intl Denso Cirebon. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
