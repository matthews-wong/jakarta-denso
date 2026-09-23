import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { NAV_ITEMS, type NavKey } from "@/lib/navigation";
import {
  PHONE_WHATSAPP_DISPLAY,
  SITE_SHORT_NAME,
  whatsappLink,
} from "@/lib/site";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  /** Highlights the current section in the navigation. */
  active?: NavKey;
  /** Transparent header laid over a photo hero. */
  overlay?: boolean;
}

/**
 * Server-rendered header: every navigation link is in the initial HTML.
 * The mobile menu is a native <details> element, so it works without JavaScript.
 */
export const SiteHeader = ({
  active,
  overlay = false,
}: SiteHeaderProps): React.JSX.Element => (
  <header
    className={cn(
      `z-30`,
      overlay
        ? `absolute inset-x-0 top-0 border-b border-white/15 text-white`
        : `relative border-b border-line bg-white text-ink`,
    )}
  >
    <div className="container-site flex h-[72px] items-center gap-8 lg:h-[86px]">
      <Link
        href="/"
        className="flex items-center gap-3 whitespace-nowrap text-[17px] font-semibold tracking-[-0.01em] lg:text-lg"
      >
        <Image
          src="/images/logo-jid.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 lg:h-10 lg:w-10"
          loading="eager"
        />
        {SITE_SHORT_NAME}
      </Link>

      <nav aria-label="Navigasi utama" className="ml-auto hidden lg:block">
        <ul className="flex gap-7 text-[15.5px] font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={item.key === active ? `page` : undefined}
                className={cn(
                  `whitespace-nowrap py-1.5 opacity-80 transition-opacity hover:opacity-100`,
                  item.key === active &&
                    `opacity-100 shadow-[inset_0_-2px_0_currentColor]`,
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={whatsappLink()}
        className="btn btn-sm btn-wa hidden lg:inline-flex"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {PHONE_WHATSAPP_DISPLAY}
      </a>

      <div className="ml-auto flex items-center gap-2.5 lg:hidden">
        <a
          href={whatsappLink()}
          aria-label={`Chat WhatsApp ${PHONE_WHATSAPP_DISPLAY}`}
          className="grid h-11 w-11 place-items-center rounded-xl bg-wa text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <details className="group">
          <summary
            aria-label="Menu"
            className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl shadow-[inset_0_0_0_1.5px_currentColor]"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <nav
            aria-label="Navigasi seluler"
            className="absolute inset-x-0 top-full z-40 border-b border-line bg-white px-5 pb-6 pt-2 text-ink shadow-panel"
          >
            <ul className="divide-y divide-line">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={item.key === active ? `page` : undefined}
                    className={cn(
                      `block py-3.5 text-[17px] font-medium`,
                      item.key === active && `font-semibold text-brand`,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={whatsappLink()} className="btn btn-wa mt-4 w-full">
              <WhatsAppIcon className="h-5 w-5" />
              Chat WhatsApp {PHONE_WHATSAPP_DISPLAY}
            </a>
          </nav>
        </details>
      </div>
    </div>
  </header>
);
