"use client";

import {
  useCallback,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { cn } from "@/lib/utils";

export interface PriceCheckRow {
  name: string;
  description?: string;
  price: string;
  isPopular?: boolean;
}

export interface PriceCheckTab {
  id: string;
  label: string;
  rows: readonly PriceCheckRow[];
  bookingLabel: string;
  bookingHref: string;
}

interface PriceCheckProps {
  title: string;
  note: string;
  tabs: readonly PriceCheckTab[];
  footnote?: string;
  className?: string;
}

/**
 * The hero price panel. Every tab's prices are rendered into the HTML (inactive
 * tabs are only `hidden`), so crawlers see all of them; JavaScript just switches tabs.
 */
export const PriceCheck = ({
  title,
  note,
  tabs,
  footnote,
  className,
}: PriceCheckProps): React.JSX.Element => {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? ``);

  const handleSelect = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setActiveId(event.currentTarget.dataset.tab ?? ``);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== `ArrowRight` && event.key !== `ArrowLeft`) return;
      const index = tabs.findIndex((tab) => tab.id === activeId);
      const step = event.key === `ArrowRight` ? 1 : -1;
      const next = tabs[(index + step + tabs.length) % tabs.length];
      setActiveId(next.id);
      document.getElementById(`price-tab-${next.id}`)?.focus();
    },
    [activeId, tabs],
  );

  return (
    <aside
      aria-label={title}
      className={cn(
        `w-full rounded-panel bg-white p-6 text-ink shadow-panel lg:p-7`,
        className,
      )}
    >
      <h2 className="text-[23px] font-semibold tracking-[-0.015em]">{title}</h2>
      <p className="mt-1 text-[14.5px] text-muted">{note}</p>

      {tabs.length > 1 && (
        <div
          role="tablist"
          aria-label="Pilih layanan"
          onKeyDown={handleKeyDown}
          className="mb-1.5 mt-5 grid auto-cols-fr grid-flow-col rounded-xl bg-ice p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`price-tab-${tab.id}`}
              type="button"
              role="tab"
              data-tab={tab.id}
              aria-selected={tab.id === activeId}
              aria-controls={`price-panel-${tab.id}`}
              tabIndex={tab.id === activeId ? 0 : -1}
              onClick={handleSelect}
              className={cn(
                `whitespace-nowrap rounded-[9px] px-1.5 py-2.5 text-[14.5px] font-semibold text-muted transition-colors`,
                tab.id === activeId && `bg-white text-ink shadow-seg`,
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`price-panel-${tab.id}`}
          role={tabs.length > 1 ? `tabpanel` : undefined}
          aria-labelledby={tabs.length > 1 ? `price-tab-${tab.id}` : undefined}
          hidden={tab.id !== activeId}
        >
          <ul className="mt-2 divide-y divide-line">
            {tab.rows.map((row) => (
              <li
                key={row.name}
                className="flex items-center justify-between gap-4 py-3.5 text-base font-medium"
              >
                <span>
                  {row.name}
                  {row.isPopular && (
                    <span className="tag-popular">Terlaris</span>
                  )}
                  {row.description && (
                    <small className="block text-[13.5px] font-normal text-muted">
                      {row.description}
                    </small>
                  )}
                </span>
                <b className="whitespace-nowrap font-semibold tabular-nums">
                  {row.price}
                </b>
              </li>
            ))}
          </ul>
          <a href={tab.bookingHref} className="btn btn-wa mt-4 w-full">
            <WhatsAppIcon className="h-5 w-5" />
            {tab.bookingLabel}
          </a>
        </div>
      ))}

      {footnote && (
        <p className="mt-3 text-center text-[13.5px] text-muted">{footnote}</p>
      )}
    </aside>
  );
};
