"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

const WhatsAppButton = React.lazy(() => import("../components/WhatsAppButton"));

interface BlogListItemView {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    category: string;
  };
}

interface BlogPageClientProps {
  posts: BlogListItemView[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight relative z-10 leading-tight">
                Blog & Artikel
              </h1>
              <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-t from-white to-transparent"></div>
              <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <div className="relative bg-white rounded-3xl overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={
                            post.frontmatter.coverImage || "/placeholder.svg"
                          }
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 transition-transform duration-300">
                            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                            <p className="text-blue-400 text-sm font-medium mb-2 relative z-10">
                              {post.frontmatter.category}
                            </p>
                            <h2 className="text-white text-2xl font-bold relative z-10 leading-tight mb-2">
                              {post.frontmatter.title}
                            </h2>
                            <div className="flex items-center text-sm text-gray-300 mt-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              <time dateTime={post.frontmatter.date}>
                                {new Date(
                                  post.frontmatter.date,
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Analytics />
    </div>
  );
}
