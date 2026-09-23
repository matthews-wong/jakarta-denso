import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/site/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteHeader } from "@/components/site/SiteHeader";
import { slugify } from "@/lib/blog";
import { GALLERY_CATEGORIES, GALLERY_CATEGORY_NOTES, GALLERY_IMAGES } from "@/lib/gallery";
import { HOME_CRUMB } from "@/lib/navigation";
import { GALLERY_META } from "@/lib/page-meta";
import {
  breadcrumbNode,
  graph,
  imageObjectNodes,
  webPageNode,
} from "@/lib/structured-data";

const CRUMBS = [HOME_CRUMB, { name: `Galeri`, path: GALLERY_META.path }];

const GalleryPage = (): React.JSX.Element => (
  <>
    <JsonLd
      data={graph(
        webPageNode({
          path: GALLERY_META.path,
          name: GALLERY_META.title,
          description: GALLERY_META.description,
          type: `ImageGallery`,
          extra: {
            image: imageObjectNodes(
              GALLERY_IMAGES.map((image) => ({
                src: image.src,
                caption: image.caption,
              })),
            ),
          },
        }),
        breadcrumbNode(GALLERY_META.path, CRUMBS),
      )}
    />
    <SiteHeader active="galeri" />
    <main id="konten">
      <PageHeader
        crumbs={CRUMBS}
        title="Galeri"
        lead="Foto dari bengkel kami di Jl. Garuda No. 2: cuci, poles, salon interior, aksesoris, dan area servisnya."
      >
        <nav
          aria-label="Kategori foto"
          className="mt-9 inline-flex max-w-full flex-wrap gap-0.5 rounded-[13px] bg-ice p-1"
        >
          {GALLERY_CATEGORIES.map((category) => (
            <a
              key={category}
              href={`#${slugify(category)}`}
              className="whitespace-nowrap rounded-[10px] px-3 py-2.5 text-[14px] font-semibold text-muted hover:bg-white hover:text-ink lg:px-[18px] lg:text-[15px]"
            >
              {category}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="container-site pb-[72px] lg:pb-28">
        {GALLERY_CATEGORIES.map((category) => {
          const images = GALLERY_IMAGES.filter(
            (image) => image.category === category,
          );
          return (
            <section
              key={category}
              id={slugify(category)}
              aria-labelledby={`${slugify(category)}-heading`}
              className="scroll-mt-24 pt-10 lg:pt-14"
            >
              <h2
                id={`${slugify(category)}-heading`}
                className="mb-6 text-[28px] font-semibold tracking-[-0.025em] lg:text-[34px]"
              >
                {category}
              </h2>
              <p className="-mt-2 mb-6 max-w-[62ch] text-base text-muted lg:text-[17px]">{GALLERY_CATEGORY_NOTES[category]}</p>
              <div className="columns-2 gap-3 lg:columns-3 lg:gap-6">
                {images.map((image) => (
                  <figure
                    key={image.src}
                    className="mb-5 break-inside-avoid lg:mb-8"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 1024px) 420px, 50vw"
                      className="h-auto w-full rounded-[18px]"
                    />
                    <figcaption className="px-0.5 pt-3 text-[14px] font-semibold lg:text-base">
                      {image.caption}
                      {image.href && (
                        <Link
                          href={image.href}
                          className="mt-0.5 block text-[13.5px] font-normal text-brand hover:underline lg:text-[14px]"
                        >
                          Lihat layanannya
                        </Link>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  </>
);

export default GalleryPage;
