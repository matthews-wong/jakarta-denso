import type {
  PriceCheckRow,
  PriceCheckTab,
} from "@/components/site/PriceCheck";
import {
  formatItemPrice,
  getPriceCategory,
  type PriceCategoryId,
} from "@/lib/prices";
import { bookingMessage, whatsappLink } from "@/lib/site";

/** Converts a price-list category into rows for the PriceCheck panel. */
export const priceRows = (
  id: PriceCategoryId,
  limit?: number,
): PriceCheckRow[] =>
  getPriceCategory(id)
    .items.slice(0, limit)
    .map((item) => ({
      name: item.name,
      description: item.description,
      price: formatItemPrice(item),
      isPopular: item.isPopular,
    }));

interface PriceTabInput {
  id: PriceCategoryId;
  label: string;
  bookingLabel: string;
  limit?: number;
}

export const priceTab = ({
  id,
  label,
  bookingLabel,
  limit,
}: PriceTabInput): PriceCheckTab => ({
  id,
  label,
  rows: priceRows(id, limit),
  bookingLabel,
  bookingHref: whatsappLink(bookingMessage(getPriceCategory(id).name)),
});
