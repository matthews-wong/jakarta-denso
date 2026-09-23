import Image from "next/image";
import Link from "next/link";

import {
  FOOTER_ABOUT_LINKS,
  FOOTER_POPULAR_ARTICLES,
  FOOTER_SERVICE_LINKS,
} from "@/lib/navigation";
import {
  ADDRESS_LINE,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  PHONE_LANDLINE,
  PHONE_LANDLINE_DISPLAY,
  PHONE_WHATSAPP_DISPLAY,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  TIKTOK_URL,
  telLink,
  whatsappLink,
} from "@/lib/site";

interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

const FooterColumn = ({
  title,
  links,
}: FooterColumnProps): React.JSX.Element => (
  <div>
    <h2 className="mb-4 text-[15.5px] font-semibold">{title}</h2>
    <ul className="grid gap-2.5 text-muted">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:text-ink">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SOCIAL_LINKS = [
  { label: `Instagram`, href: INSTAGRAM_URL },
  { label: `TikTok`, href: TIKTOK_URL },
  { label: `Google Maps`, href: GOOGLE_MAPS_URL },
] as const;

/** Server-rendered footer: NAP plus a link map to every key page and the most-read articles. */
export const SiteFooter = (): React.JSX.Element => (
  <footer className="container-site pb-28 text-[15.5px] lg:pb-10">
    <div className="grid grid-cols-2 gap-8 border-t border-line pt-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12 lg:pt-16">
      <div className="col-span-2 lg:col-span-1">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold"
        >
          <Image
            src="/images/logo-jid.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
          {SITE_SHORT_NAME}
        </Link>
        <address className="mt-4 not-italic leading-[1.7] text-muted">
          {SITE_TAGLINE}.
          <br />
          {ADDRESS_LINE}
          <br />
          WhatsApp{` `}
          <a href={whatsappLink()} className="hover:text-ink">
            {PHONE_WHATSAPP_DISPLAY}
          </a>
          , telepon{` `}
          <a href={telLink(PHONE_LANDLINE)} className="hover:text-ink">
            {PHONE_LANDLINE_DISPLAY}
          </a>
        </address>
      </div>
      <FooterColumn title="Layanan" links={FOOTER_SERVICE_LINKS} />
      <FooterColumn title="Tentang kami" links={FOOTER_ABOUT_LINKS} />
      <div className="col-span-2 lg:col-span-1">
        <FooterColumn
          title="Paling banyak dibaca"
          links={FOOTER_POPULAR_ARTICLES}
        />
      </div>
    </div>
    <div className="mt-12 flex flex-wrap justify-between gap-4 text-[14.5px] text-muted lg:mt-14">
      <p>
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
      <ul className="flex gap-5">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              rel="noopener"
              target="_blank"
              className="hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
