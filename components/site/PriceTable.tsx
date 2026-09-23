import { formatItemPrice, type PriceCategory } from "@/lib/prices";
import { bookingMessage, whatsappLink } from "@/lib/site";

interface PriceTableProps {
  category: PriceCategory;
  /** Heading level inside the page outline. */
  headingLevel?: `h2` | `h3`;
}

const ASK_LABEL = `Tanya`;
const ORDER_LABEL = `Pesan`;

/** One service line's prices, with a per-row WhatsApp link pre-filled with that item. */
export const PriceTable = ({
  category,
  headingLevel = `h2`,
}: PriceTableProps): React.JSX.Element => {
  const Heading = headingLevel;
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="scroll-mt-28 overflow-hidden rounded-panel bg-white"
    >
      <div className="flex items-baseline justify-between gap-4 px-5 pb-4 pt-6 lg:px-7">
        <Heading
          id={`${category.id}-heading`}
          className="text-[23px] font-semibold tracking-[-0.025em] lg:text-[27px]"
        >
          {category.name}
        </Heading>
        <span className="text-[14.5px] text-muted">{category.note}</span>
      </div>
      <ul>
        {category.items.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-[1fr_auto] items-center gap-3.5 border-t border-line px-5 py-4 lg:grid-cols-[1fr_auto_auto] lg:gap-6 lg:px-7"
          >
            <div>
              <span className="text-[17px] font-semibold">{item.name}</span>
              {item.isPopular && <span className="tag-popular">Terlaris</span>}
              {item.description && (
                <small className="mt-0.5 block text-[14.5px] text-muted">
                  {item.description}
                </small>
              )}
              {item.includes && (
                <ul
                  className="mt-2.5 flex flex-wrap gap-1.5"
                  aria-label="Sudah termasuk"
                >
                  {item.includes.map((included) => (
                    <li
                      key={included}
                      className="rounded-md bg-ice px-2.5 py-0.5 text-[13px]"
                    >
                      {included}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="whitespace-nowrap text-right text-lg font-semibold tabular-nums tracking-[-0.01em]">
              {formatItemPrice(item)}
            </span>
            <a
              href={whatsappLink(bookingMessage(item.name))}
              className="hidden whitespace-nowrap text-[15px] font-semibold text-wa hover:underline lg:inline"
              aria-label={`${item.price === null ? ASK_LABEL : ORDER_LABEL} ${item.name} lewat WhatsApp`}
            >
              {item.price === null ? ASK_LABEL : ORDER_LABEL}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
