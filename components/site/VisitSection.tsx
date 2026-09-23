import Image from "next/image";
import { MapPin } from "lucide-react";

import { HoursTable } from "@/components/site/HoursTable";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  ADDRESS_LINE,
  GOOGLE_MAPS_URL,
  SHOPFRONT_HINT,
  whatsappLink,
} from "@/lib/site";

/** Navy "visit us" band: address, what to look for from the road, hours and the two actions. */
export const VisitSection = (): React.JSX.Element => (
  <section aria-labelledby="visit-heading" className="container-site pb-[72px] lg:pb-28">
    <div className="grid items-center gap-8 rounded-3xl bg-navy px-6 py-9 text-white lg:grid-cols-2 lg:gap-[68px] lg:rounded-[32px] lg:p-[68px]">
      <div>
        <h2 id="visit-heading" className="h-section max-w-[13ch]">
          Datang ke bengkel
        </h2>
        <p className="mt-6 text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] lg:text-[27px]">
          {ADDRESS_LINE}
        </p>
        <p className="mt-3 max-w-[42ch] text-[16.5px] text-white/70">
          {SHOPFRONT_HINT}
        </p>
        <HoursTable onDark className="mt-7" />
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappLink()} className="btn btn-wa max-lg:w-full">
            <WhatsAppIcon className="h-5 w-5" />
            Chat WhatsApp
          </a>
          <a href={GOOGLE_MAPS_URL} className="btn btn-ghost max-lg:w-full">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Buka di Google Maps
          </a>
        </div>
      </div>
      <div className="relative aspect-[4/3.3] overflow-hidden rounded-[22px]">
        <Image
          src="/images/lokasi-kami.jpeg"
          alt="Tampak depan Jakarta Int'l Denso di Jl. Garuda No. 2 Cirebon"
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  </section>
);
