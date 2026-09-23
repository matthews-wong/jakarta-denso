import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { FaqList } from "@/components/site/FaqList";
import { HoursTable } from "@/components/site/HoursTable";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { HOME_CRUMB } from "@/lib/navigation";
import { CONTACT_META } from "@/lib/page-meta";
import { CONTACT_FAQS } from "@/lib/services";
import {
  ADDRESS_LINE,
  GOOGLE_MAPS_URL,
  NEARBY_ROUTES,
  OWNER_NAME,
  PAYMENT_METHODS,
  PHONE_LANDLINE,
  PHONE_LANDLINE_DISPLAY,
  PHONE_WHATSAPP_DISPLAY,
  SHOPFRONT_HINT,
  telLink,
  whatsappLink,
} from "@/lib/site";
import {
  BUSINESS_ID,
  breadcrumbNode,
  faqNode,
  graph,
  webPageNode,
} from "@/lib/structured-data";

const CRUMBS = [HOME_CRUMB, { name: `Kontak`, path: CONTACT_META.path }];
const ROUTE_ARTICLE = `/blogs/rute-menuju-jakarta-intl-denso-cirebon`;

const ACTIONS = [
  {
    label: `WhatsApp`,
    value: PHONE_WHATSAPP_DISPLAY,
    note: `Booking, harga dan estimasi`,
    href: whatsappLink(),
    icon: <WhatsAppIcon className="h-6 w-6" />,
    tone: `bg-wa-soft text-wa`,
  },
  {
    label: `Telepon bengkel`,
    value: PHONE_LANDLINE_DISPLAY,
    note: `Di jam buka`,
    href: telLink(PHONE_LANDLINE),
    icon: <Phone className="h-6 w-6" aria-hidden="true" />,
    tone: `bg-brand-soft text-brand`,
  },
  {
    label: `Rute`,
    value: `Google Maps`,
    note: ADDRESS_LINE,
    href: GOOGLE_MAPS_URL,
    icon: <MapPin className="h-6 w-6" aria-hidden="true" />,
    tone: `bg-brand-soft text-brand`,
  },
] as const;

const KontakPage = (): React.JSX.Element => (
  <>
    <JsonLd
      data={graph(
        webPageNode({
          path: CONTACT_META.path,
          name: CONTACT_META.title,
          description: CONTACT_META.description,
          type: `ContactPage`,
          extra: { mainEntity: { "@id": BUSINESS_ID } },
        }),
        breadcrumbNode(CONTACT_META.path, CRUMBS),
        faqNode(CONTACT_META.path, CONTACT_FAQS),
      )}
    />
    <SiteHeader active="kontak" />
    <main id="konten">
      <PageHeader
        crumbs={CRUMBS}
        title="Alamat dan kontak"
        lead={`${ADDRESS_LINE}. WhatsApp paling cepat dibalas di jam buka.`}
      />

      <section
        aria-label="Cara menghubungi"
        className="container-site pb-[72px] lg:pb-28"
      >
        <ul className="grid gap-3 lg:grid-cols-3 lg:gap-[18px]">
          {ACTIONS.map((action) => (
            <li key={action.label}>
              <a
                href={action.href}
                className="grid content-start gap-1 rounded-[22px] border border-line p-7 transition-colors hover:border-brand"
              >
                <span
                  className={`mb-4 grid h-[50px] w-[50px] place-items-center rounded-[14px] ${action.tone}`}
                >
                  {action.icon}
                </span>
                <span className="text-[15.5px] text-muted">{action.label}</span>
                <b className="text-[26px] font-semibold tabular-nums tracking-[-0.02em]">
                  {action.value}
                </b>
                <small className="text-[14.5px] text-muted">
                  {action.note}
                </small>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hours-heading" className="section bg-ice">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="hours-heading" className="h-section">
              Jam buka
            </h2>
            <HoursTable className="mt-8" />
            <h2 className="h-section mt-14">Dari kota sekitar</h2>
            <HoursTable
              className="mt-8"
              rows={NEARBY_ROUTES.map((route) => ({
                label: route.city,
                value: route.note,
              }))}
            />
            <p className="mt-6 text-base text-muted">
              Ragu soal rute? Baca{` `}
              <Link href={ROUTE_ARTICLE} className="text-link">
                panduan rute dari berbagai arah
              </Link>
              , atau telepon kami.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3.2] overflow-hidden rounded-tile">
              <Image
                src="/images/lokasi-kami.jpeg"
                alt="Tampak depan Jakarta Int'l Denso: spanduk putih di bawah kanopi baja"
                fill
                sizes="(min-width: 1024px) 600px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <p className="mt-3.5 text-[15.5px] text-muted">{SHOPFRONT_HINT}</p>
            <div className="mt-9 flex items-center gap-[18px]">
              <Image
                src="/images/owner.jpeg"
                alt={OWNER_NAME}
                width={64}
                height={64}
                className="h-16 w-16 flex-none rounded-full object-cover"
              />
              <p className="max-w-[44ch] text-base text-muted">
                <b className="font-semibold text-ink">{OWNER_NAME}</b>, pemilik.
                Melayani pelanggan di Jl. Garuda sejak 2004.
              </p>
            </div>
            <p className="mt-6 text-base text-muted">
              <b className="font-semibold text-ink">Pembayaran:</b>{" "}
              {PAYMENT_METHODS}.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-faq-heading" className="section">
        <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="contact-faq-heading" className="h-section max-w-[13ch]">
            Sebelum datang
          </h2>
          <FaqList faqs={CONTACT_FAQS} />
        </div>
      </section>
    </main>
  </>
);

export default KontakPage;
