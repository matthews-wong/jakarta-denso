import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Coffee, ShieldCheck, Warehouse } from "lucide-react";

import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { OpenStatus } from "@/components/site/OpenStatus";
import { PhotoHero } from "@/components/site/PhotoHero";
import { PostCard } from "@/components/site/PostCard";
import { PriceCheck } from "@/components/site/PriceCheck";
import { priceTab } from "@/components/site/priceRows";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteHeader } from "@/components/site/SiteHeader";
import { VisitSection } from "@/components/site/VisitSection";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { BLOG_PATH, getAllPosts } from "@/lib/blog";
import { navItem } from "@/lib/navigation";
import { findPriceItem, formatItemPrice } from "@/lib/prices";
import { HOME_REVIEWS } from "@/lib/reviews";
import { pageMetadata } from "@/lib/seo";
import {
  AC_SERVICE,
  CUCI_SERVICE,
  HOME_FAQS,
  SALON_SERVICE,
} from "@/lib/services";
import { GOOGLE_MAPS_URL, GOOGLE_RATING, whatsappLink } from "@/lib/site";
import { faqNode, graph, webPageNode } from "@/lib/structured-data";

const PATH = `/`;
const TITLE = `Service AC, Cuci & Salon Mobil Cirebon | Jakarta Int'l Denso`;
const DESCRIPTION = `Bengkel AC dan cuci mobil di Jl. Garuda No. 2, Cirebon sejak 2004. Service AC, cuci mobil, salon mobil. Buka setiap hari. Booking via WhatsApp.`;
const LATEST_POSTS = 3;
const PRICE_NOTE = `Mobil ukuran standar, harga per September 2026.`;

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
});

const REASONS = [
  {
    icon: ShieldCheck,
    title: `Harga disebut sebelum dikerjakan`,
    text: `Konsultasi gratis, tanpa biaya tersembunyi. Service AC dan isi freon bergaransi satu bulan.`,
  },
  {
    icon: Warehouse,
    title: `Kolong ikut bersih`,
    text: `Mobil naik hidrolik dan dibilas air PDAM, jadi bodi tidak berbercak.`,
  },
  {
    icon: Clock,
    title: `Di Jl. Garuda sejak 2004`,
    text: `Pelanggan datang dari Cirebon, Kuningan, Indramayu dan Majalengka.`,
  },
  {
    icon: Coffee,
    title: `Ruang tunggu yang nyaman`,
    text: `WiFi dan minuman. Bayar tunai, kartu, QRIS atau e-wallet.`,
  },
] as const;

const STEPS = [
  {
    title: `Chat WhatsApp`,
    text: `Kirim jenis mobil dan keluhannya. Kami balas dengan estimasi dan jadwal.`,
  },
  {
    title: `Datang sesuai jadwal`,
    text: `Parkir di Jl. Garuda No. 2 dan tunggu di ruang tunggu.`,
  },
  {
    title: `Selesai dan bergaransi`,
    text: `Service AC dan isi freon bergaransi satu bulan.`,
  },
] as const;

const HERO_IMAGE = {
  src: `/images/hero-bengkel.jpg`,
  alt: `Mobil pelanggan berjajar di area cuci Jakarta Int'l Denso, Jl. Garuda No. 2 Cirebon`,
};

const HomePage = async (): Promise<React.JSX.Element> => {
  const posts = (await getAllPosts()).slice(0, LATEST_POSTS);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            image: HERO_IMAGE.src,
            hasBreadcrumb: false,
          }),
          faqNode(PATH, HOME_FAQS),
        )}
      />
      <SiteHeader overlay />
      <main id="konten">
        <PhotoHero
          image={HERO_IMAGE}
          aside={
            <PriceCheck
              title="Cek harga"
              note={PRICE_NOTE}
              footnote="Konsultasi gratis. Dibalas di jam buka."
              tabs={[
                priceTab({
                  id: `ac`,
                  label: `Service AC`,
                  bookingLabel: `Booking service AC`,
                  limit: 3,
                }),
                priceTab({
                  id: `cuci`,
                  label: `Cuci`,
                  bookingLabel: `Booking cuci mobil`,
                  limit: 3,
                }),
                priceTab({
                  id: `salon`,
                  label: `Salon`,
                  bookingLabel: `Booking salon mobil`,
                  limit: 3,
                }),
              ]}
            />
          }
        >
          <h1 className="h-display max-w-[11.5ch]">
            Bengkel AC dan cuci mobil di Cirebon
          </h1>
          <p className="mt-6 max-w-[36ch] text-lg leading-[1.5] text-white/80 lg:text-xl">
            Service AC, cuci dan salon mobil di Jl. Garuda No. 2 sejak 2004.
            Tanyakan harganya lewat WhatsApp sebelum datang.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={whatsappLink()} className="btn btn-wa max-lg:w-full">
              <WhatsAppIcon className="h-5 w-5" />
              Chat WhatsApp
            </a>
            <Link
              href={navItem(`harga`).href}
              className="btn btn-ghost max-lg:w-full"
            >
              Lihat daftar harga
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white/80 lg:mt-11">
            <a
              href={GOOGLE_MAPS_URL}
              className="inline-flex items-center gap-2.5 hover:text-white"
            >
              <span
                aria-hidden="true"
                className="tracking-[1.5px] text-[#FFC53D]"
              >
                ★★★★★
              </span>
              {GOOGLE_RATING.value} dari {GOOGLE_RATING.count} ulasan Google
            </a>
            <OpenStatus />
          </div>
        </PhotoHero>

        <section aria-labelledby="services-heading" className="section">
          <div className="container-site">
            <SectionHeading
              id="services-heading"
              title="Tiga layanan, satu kali parkir"
            >
              <p>
                Tinggalkan mobil untuk service AC, sekalian dicuci atau disalon.
                Semua dikerjakan di Jl. Garuda No. 2.
              </p>
            </SectionHeading>
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-2">
              <article className="flex flex-col overflow-hidden rounded-tile bg-ice lg:row-span-2">
                <div className="relative min-h-[240px] flex-1 lg:min-h-[440px]">
                  <Image
                    src="/images/AC-Mobil.jpeg"
                    alt="Teknisi memeriksa AC mobil pelanggan"
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2.5 p-6 lg:px-[30px] lg:py-7">
                  <h3 className="text-[26px] font-semibold tracking-[-0.025em] lg:text-[30px]">
                    <Link href={AC_SERVICE.path} className="hover:text-brand">
                      Service AC dan mesin
                    </Link>
                  </h3>
                  <p className="max-w-[46ch] text-[16.5px] text-muted">
                    AC tidak dingin, berbau atau berisik? Kami diagnosa dulu dan
                    menyebut harga sebelum mengerjakan. Ganti freon, perbaikan
                    kompresor, purging diesel.
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[15px] text-muted">
                      Ganti freon
                      <b className="ml-2 text-[21px] font-semibold tabular-nums tracking-[-0.01em] text-ink">
                        {formatItemPrice(findPriceItem(`ac`, `Ganti Freon AC`))}
                      </b>
                    </span>
                    <Link href={AC_SERVICE.path} className="text-link">
                      Lihat service AC
                    </Link>
                  </div>
                </div>
              </article>
              {[
                {
                  service: CUCI_SERVICE,
                  image: `/images/cuci-mobil12.jpeg`,
                  alt: `Mobil dicuci dengan snow foam`,
                  text: `Hidrolik, snow foam, air PDAM. Selesai 30–60 menit.`,
                  priceLabel: `Cuci salju`,
                  price: formatItemPrice(
                    findPriceItem(`cuci`, `Cuci Mobil Salju`),
                  ),
                  cta: `Lihat cuci mobil`,
                },
                {
                  service: SALON_SERVICE,
                  image: `/images/Salon-mobil.jpeg`,
                  alt: `Interior mobil setelah salon`,
                  text: `Salon interior, poles body, jamur kaca dan baret wiper.`,
                  priceLabel: `Mulai`,
                  price: formatItemPrice(
                    findPriceItem(`salon`, `Poles Jamur Kaca`),
                  ),
                  cta: `Lihat salon mobil`,
                },
              ].map((tile) => (
                <article
                  key={tile.service.path}
                  className="flex flex-col overflow-hidden rounded-tile bg-ice sm:flex-row"
                >
                  <div className="relative h-[200px] sm:h-auto sm:w-[44%] sm:flex-none">
                    <Image
                      src={tile.image}
                      alt={tile.alt}
                      fill
                      sizes="(min-width: 1024px) 260px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2.5 p-6 lg:px-[30px]">
                    <h3 className="text-[25px] font-semibold tracking-[-0.025em] lg:text-[26px]">
                      <Link
                        href={tile.service.path}
                        className="hover:text-brand"
                      >
                        {tile.service.name}
                      </Link>
                    </h3>
                    <p className="text-[16.5px] text-muted">{tile.text}</p>
                    <span className="mt-1 text-[15px] text-muted">
                      {tile.priceLabel}
                      <b className="ml-2 text-[21px] font-semibold tabular-nums text-ink">
                        {tile.price.replace(/^mulai /, ``)}
                      </b>
                    </span>
                    <Link
                      href={tile.service.path}
                      className="text-link self-start"
                    >
                      {tile.cta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="reasons-heading" className="section bg-ice">
          <div className="container-site grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-tile max-lg:order-2">
              <Image
                src="/consulting.jpeg"
                alt="Pelanggan berkonsultasi dengan teknisi Jakarta Int'l Denso"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="reasons-heading" className="h-section max-w-[13ch]">
                Kenapa pelanggan kembali
              </h2>
              <ul className="mt-9">
                {REASONS.map((reason) => (
                  <li
                    key={reason.title}
                    className="grid grid-cols-[46px_1fr] gap-5 border-t border-[#D9E0EA] py-[22px]"
                  >
                    <span className="grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-white text-brand">
                      <reason.icon
                        className="h-[22px] w-[22px]"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="mb-1 text-[19.5px] font-semibold tracking-[-0.01em]">
                        {reason.title}
                      </h3>
                      <p className="text-base text-muted">{reason.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="reviews-heading" className="section">
          <div className="container-site">
            <SectionHeading id="reviews-heading" title="Kata pelanggan">
              <div className="flex items-center gap-5">
                <span className="text-[52px] font-semibold leading-none tracking-[-0.045em] text-ink lg:text-[68px]">
                  {GOOGLE_RATING.value}
                </span>
                <span>
                  <span
                    aria-hidden="true"
                    className="block text-[19px] tracking-[1.5px] text-[#E6A800]"
                  >
                    ★★★★★
                  </span>
                  <span className="text-[15px]">
                    dari {GOOGLE_RATING.count} ulasan di Google Maps
                  </span>
                </span>
              </div>
            </SectionHeading>
            <div className="grid border-t border-line lg:grid-cols-3">
              {HOME_REVIEWS.map((review, index) => (
                <figure
                  key={review.name}
                  className={
                    index === 0
                      ? `m-0 py-7 lg:pr-9 lg:pt-[34px]`
                      : `m-0 border-t border-line py-7 lg:border-l lg:border-t-0 lg:px-9 lg:pt-[34px]`
                  }
                >
                  <blockquote className="m-0 text-lg leading-[1.5] tracking-[-0.01em] lg:text-xl">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-[15px] text-muted">
                    <b className="block font-semibold text-ink">
                      {review.name}
                    </b>
                    {review.serviceLabel}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-10">
              <Link href={navItem(`ulasan`).href} className="text-link">
                Baca semua ulasan
              </Link>
            </p>
          </div>
        </section>

        <section aria-labelledby="booking-heading" className="section bg-ice">
          <div className="container-site">
            <SectionHeading
              id="booking-heading"
              title="Booking dalam tiga langkah"
            >
              <p>Datang sesuai jadwal, tidak perlu antre lama di jam ramai.</p>
            </SectionHeading>
            <ol className="grid gap-3 [counter-reset:step] lg:grid-cols-3 lg:gap-5">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="rounded-[22px] bg-white p-[30px] [counter-increment:step] before:mb-[22px] before:grid before:h-[38px] before:w-[38px] before:place-items-center before:rounded-full before:bg-navy before:text-[15px] before:font-semibold before:text-white before:content-[counter(step)]"
                >
                  <h3 className="mb-2 text-[22px] font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="section">
          <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <h2 id="faq-heading" className="h-section max-w-[13ch]">
              Pertanyaan sebelum datang
            </h2>
            <FaqList faqs={HOME_FAQS} />
          </div>
        </section>

        <section
          aria-labelledby="blog-heading"
          className="section pt-0 lg:pt-0"
        >
          <div className="container-site">
            <SectionHeading id="blog-heading" title="Dari blog kami">
              <p>
                Tips AC, cuci dan perawatan mobil dari bengkel kami di Cirebon.
                {` `}
                <Link href={BLOG_PATH} className="text-link">
                  Semua artikel
                </Link>
              </p>
            </SectionHeading>
            <div className="grid gap-8 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <VisitSection />
      </main>
    </>
  );
};

export default HomePage;
