import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { PriceTable } from "@/components/site/PriceTable";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HOME_CRUMB } from "@/lib/navigation";
import { HARGA_META } from "@/lib/page-meta";
import { PRICE_CATEGORIES, PRICES_UPDATED } from "@/lib/prices";
import {
  breadcrumbNode,
  graph,
  priceCatalogNode,
  webPageNode,
} from "@/lib/structured-data";


const CRUMBS = [HOME_CRUMB, { name: `Harga`, path: HARGA_META.path }];
const CATEGORY_IDS = PRICE_CATEGORIES.map((category) => category.id);

const HargaPage = (): React.JSX.Element => (
  <>
    <JsonLd
      data={graph(
        webPageNode({
          path: HARGA_META.path,
          name: HARGA_META.title,
          description: HARGA_META.description,
          image: HARGA_META.ogImage,
          extra: { dateModified: PRICES_UPDATED },
        }),
        breadcrumbNode(HARGA_META.path, CRUMBS),
        priceCatalogNode(HARGA_META.path, CATEGORY_IDS),
      )}
    />
    <SiteHeader active="harga" />
    <main id="konten">
      <PageHeader
        crumbs={CRUMBS}
        title="Daftar harga 2026"
        lead="Untuk mobil ukuran standar, diperbarui 23 September 2026. Mobil yang lebih besar bisa berbeda; tanyakan dulu lewat WhatsApp."
      >
        <nav
          aria-label="Kategori harga"
          className="mt-9 inline-flex max-w-full flex-wrap gap-0.5 rounded-[13px] bg-ice p-1"
        >
          {PRICE_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="whitespace-nowrap rounded-[10px] px-3 py-2.5 text-[14px] font-semibold text-muted hover:bg-white hover:text-ink lg:px-[18px] lg:text-[15px]"
            >
              {category.name}
            </a>
          ))}
        </nav>
      </PageHeader>
      <section
        aria-label="Tabel harga"
        className="bg-ice py-10 lg:pb-28 lg:pt-16"
      >
        <div className="container-site grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
          {PRICE_CATEGORIES.map((category) => (
            <PriceTable key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  </>
);

export default HargaPage;
