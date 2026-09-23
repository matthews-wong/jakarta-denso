import { MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  GOOGLE_MAPS_URL,
  PHONE_LANDLINE,
  telLink,
  whatsappLink,
} from "@/lib/site";

/** Sticky WhatsApp / Telepon / Rute bar for phones; replaces the old floating bubble. */
export const MobileActionBar = (): React.JSX.Element => (
  <nav
    aria-label="Hubungi kami"
    className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1.5fr_1fr_1fr] gap-2 border-t border-line bg-white/95 px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-2.5 shadow-bar backdrop-blur lg:hidden"
  >
    <a href={whatsappLink()} className="btn btn-wa h-12 px-2 text-[15px]">
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      WhatsApp
    </a>
    <a
      href={telLink(PHONE_LANDLINE)}
      className="btn btn-line h-12 px-2 text-[15px]"
    >
      <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
      Telepon
    </a>
    <a href={GOOGLE_MAPS_URL} className="btn btn-line h-12 px-2 text-[15px]">
      <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
      Rute
    </a>
  </nav>
);
