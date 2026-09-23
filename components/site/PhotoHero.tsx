import Image from "next/image";

import { cn } from "@/lib/utils";

interface PhotoHeroProps {
  image: { src: string; alt: string; position?: string };
  /** Headline column. */
  children: React.ReactNode;
  /** Right-hand panel (price check). */
  aside?: React.ReactNode;
  compact?: boolean;
}

/**
 * Full-bleed photo of the actual workshop under a navy overlay, with the
 * transparent SiteHeader (rendered by the page, outside <main>) on top. The photo is the LCP element, so it is
 * preloaded (`priority`) and nothing above the fold starts invisible.
 */
export const PhotoHero = ({
  image,
  children,
  aside,
  compact = false,
}: PhotoHeroProps): React.JSX.Element => (
  <section className="relative overflow-hidden bg-navy text-white">
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority
      sizes="100vw"
      className="z-0 object-cover"
      style={{ objectPosition: image.position ?? `62% 60%` }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(8,23,51,0.55)_0%,rgba(8,23,51,0.86)_45%,rgba(8,23,51,0.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,23,51,0.95)_0%,rgba(8,23,51,0.82)_40%,rgba(8,23,51,0.35)_75%,rgba(8,23,51,0.2)_100%)]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-[1] h-44 bg-[linear-gradient(180deg,rgba(8,23,51,0.7),rgba(8,23,51,0))]"
    />
    <div
      className={cn(
        `container-site relative z-[2] grid items-center gap-9 pb-7 pt-[104px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-[88px]`,
        compact
          ? `lg:min-h-[640px] lg:pt-[140px]`
          : `lg:min-h-[740px] lg:pt-[150px]`,
      )}
    >
      <div>{children}</div>
      {aside && (
        <div className="lg:justify-self-end lg:w-full lg:max-w-[430px]">
          {aside}
        </div>
      )}
    </div>
  </section>
);
