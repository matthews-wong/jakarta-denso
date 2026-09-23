import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PhotoHero } from "@/components/site/PhotoHero";
import { PostCard } from "@/components/site/PostCard";
import { PriceCheck } from "@/components/site/PriceCheck";
import { PriceTable } from "@/components/site/PriceTable";
import { priceTab } from "@/components/site/priceRows";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteHeader } from "@/components/site/SiteHeader";
import { VisitSection } from "@/components/site/VisitSection";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { getPostsBySlugs } from "@/lib/blog";
import { HOME_CRUMB } from "@/lib/navigation";
import { getPriceCategory, PRICES_UPDATED } from "@/lib/prices";
import type { ServiceConfig } from "@/lib/services";
import { absoluteUrl, bookingMessage, whatsappLink } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  graph,
  serviceNode,
  webPageNode,
  type Crumb,
} from "@/lib/structured-data";

interface ServicePageProps {
  service: ServiceConfig;
}

const PRICE_NOTE = `Mobil ukuran standar, harga per September 2026.`;
const SIZE_NOTE = `Mobil yang lebih besar bisa berbeda; tanyakan dulu lewat WhatsApp.`;

const serviceCrumbs = (service: ServiceConfig): Crumb[] => [
  HOME_CRUMB,
  { name: service.name, path: service.path },
];

/**
 * Shared template for the cuci, salon and service AC landing pages.
 * Everything (prices, steps, FAQ, related articles) is server-rendered, and
 * the page's JSON-LD is built from the same config the page displays.
 */
export const ServicePage = async ({
  service,
}: ServicePageProps): Promise<React.JSX.Element> => {
  const [primaryId, ...extraIds] = service.priceCategoryIds;
  const related = await getPostsBySlugs(service.relatedSlugs);
  const crumbs = serviceCrumbs(service);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path: service.path,
            name: service.metaTitle,
            description: service.metaDescription,
            image: service.ogImage,
            extra: {
              mainEntity: { "@id": `${absoluteUrl(service.path)}#service` },
              dateModified: PRICES_UPDATED,
            },
          }),
          breadcrumbNode(service.path, crumbs),
          serviceNode({
            path: service.path,
            name: service.name,
            serviceType: service.serviceType,
            description: service.metaDescription,
            categoryIds: service.priceCategoryIds,
          }),
          faqNode(service.path, service.faqs),
        )}
      />

      <SiteHeader overlay active={service.navKey} />

      <main id="konten">

      <PhotoHero
        image={service.heroImage}
        compact
        aside={
          <PriceCheck
            title={service.panelTitle}
            note={PRICE_NOTE}
            footnote={SIZE_NOTE}
            tabs={[
              priceTab({
                id: primaryId,
                label: getPriceCategory(primaryId).name,
                bookingLabel: service.bookingLabel,
              }),
            ]}
          />
        }
      >
        <Breadcrumbs crumbs={crumbs} onDark />
        <h1 className="h-display max-w-[13ch]">{service.h1}</h1>
        <p className="mt-6 max-w-[36ch] text-lg leading-[1.5] text-white/80 lg:text-xl">
          {service.lead}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={whatsappLink(bookingMessage(service.name))}
            className="btn btn-wa max-lg:w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {service.bookingLabel}
          </a>
        </div>
      </PhotoHero>

      {extraIds.length > 0 && (
          <section aria-labelledby="extra-prices-heading" className="section bg-ice">
            <div className="container-site grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <div>
                <h2 id="extra-prices-heading" className="h-section max-w-[13ch]">
                  Sekalian dikerjakan
                </h2>
                <p className="mt-4 max-w-[40ch] text-lg text-muted">
                  Pekerjaan mesin dan ban yang bisa dilakukan sambil AC mobil Anda diservis.
                </p>
              </div>
              <div className="grid gap-6">
                {extraIds.map((id) => (
                  <PriceTable key={id} category={getPriceCategory(id)} headingLevel="h3" />
                ))}
              </div>
            </div>
          </section>
        )}

      <section aria-labelledby="steps-heading" className="section">
        <div className="container-site">
          <SectionHeading id="steps-heading" title={service.stepsTitle}>
            <p>{service.stepsLead}</p>
          </SectionHeading>
          <ol className="grid grid-cols-2 gap-2.5 [counter-reset:step] lg:grid-cols-7 lg:gap-3">
            {service.steps.map((step) => (
              <li
                key={step.title}
                className="rounded-[18px] bg-ice px-[18px] py-[22px] [counter-increment:step] before:mb-[18px] before:grid before:h-8 before:w-8 before:place-items-center before:rounded-full before:bg-navy before:text-sm before:font-semibold before:text-white before:content-[counter(step)]"
              >
                <b className="block text-[17px] font-semibold tracking-[-0.01em]">
                  {step.title}
                </b>
                <span className="text-[14.5px] text-muted">{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="section bg-ice">
        <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="faq-heading" className="h-section max-w-[13ch]">
            Sebelum datang
          </h2>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="section">
          <div className="container-site">
            <SectionHeading id="related-heading" title="Baca juga">
              <p>Panduan dan tips dari bengkel kami di Cirebon.</p>
            </SectionHeading>
            <div className="grid gap-8 lg:grid-cols-3">
              {related.map((post) => (
                <PostCard key={post.slug} post={post} showReadingTime={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      <VisitSection />
      </main>
    </>
  );
};
