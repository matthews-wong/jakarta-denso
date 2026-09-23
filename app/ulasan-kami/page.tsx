import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HOME_CRUMB } from "@/lib/navigation";
import { REVIEWS_META } from "@/lib/page-meta";
import { REVIEWS } from "@/lib/reviews";
import { GOOGLE_MAPS_URL, GOOGLE_RATING } from "@/lib/site";
import { breadcrumbNode, graph, webPageNode } from "@/lib/structured-data";

const CRUMBS = [HOME_CRUMB, { name: `Ulasan`, path: REVIEWS_META.path }];

/** Reviews are shown as quotes only; no Review schema (self-serving reviews are ineligible). */
const UlasanPage = (): React.JSX.Element => (
  <>
    <JsonLd
      data={graph(
        webPageNode({
          path: REVIEWS_META.path,
          name: REVIEWS_META.title,
          description: REVIEWS_META.description,
        }),
        breadcrumbNode(REVIEWS_META.path, CRUMBS),
      )}
    />
    <SiteHeader active="ulasan" />
    <main id="konten">
      <PageHeader
        crumbs={CRUMBS}
        title="Kata pelanggan"
        lead="Ulasan asli dari Google Maps. Rating diambil dari Google Business Profile dan sama di seluruh situs."
      />
      <div className="container-site pb-[72px] lg:pb-28">
        <section
          aria-label="Rating Google"
          className="grid items-center gap-4 rounded-tile bg-ice p-6 lg:grid-cols-[auto_1fr_auto] lg:gap-9 lg:px-10 lg:py-[34px]"
        >
          <span className="text-[60px] font-semibold leading-[0.9] tracking-[-0.05em] lg:text-[84px]">
            {GOOGLE_RATING.value}
          </span>
          <p className="text-base text-muted">
            <span
              aria-hidden="true"
              className="block text-[22px] tracking-[1.5px] text-[#E6A800]"
            >
              ★★★★★
            </span>
            dari {GOOGLE_RATING.count} ulasan di Google Maps
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            rel="noopener"
            target="_blank"
            className="btn btn-dark max-lg:w-full"
          >
            Baca atau tulis ulasan di Google
          </a>
        </section>

        <h2 className="mb-6 mt-12 text-[28px] font-semibold tracking-[-0.025em] lg:mb-9 lg:mt-16 lg:text-[34px]">
          Ulasan terbaru
        </h2>
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="mb-5 break-inside-avoid rounded-[22px] border border-line p-7"
            >
              <span
                aria-hidden="true"
                className="tracking-[1.5px] text-[#E6A800]"
              >
                ★★★★★
              </span>
              <blockquote className="m-0 mt-3 text-lg leading-[1.55]">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 text-[14.5px] text-muted">
                <b className="block text-[15.5px] font-semibold text-ink">
                  {review.name}
                </b>
                {review.serviceLabel}, ulasan Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  </>
);

export default UlasanPage;
