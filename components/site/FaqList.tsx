import type { FaqEntry } from "@/lib/structured-data";

interface FaqListProps {
  faqs: readonly FaqEntry[];
}

/**
 * Native <details> accordion: answers are always in the HTML, so the
 * FAQPage markup on the same page describes visible content.
 */
export const FaqList = ({ faqs }: FaqListProps): React.JSX.Element => (
  <div className="border-t border-line">
    {faqs.map((faq, index) => (
      <details
        key={faq.question}
        open={index === 0}
        className="group border-b border-line py-6"
      >
        <summary className="flex cursor-pointer list-none justify-between gap-6 text-[19.5px] font-semibold tracking-[-0.01em]">
          {faq.question}
          <span
            aria-hidden="true"
            className="relative mt-[7px] h-3.5 w-3.5 flex-none before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-3.5 before:-translate-y-1/2 before:bg-[#8A94AB] after:absolute after:left-1/2 after:top-0 after:h-3.5 after:w-0.5 after:-translate-x-1/2 after:bg-[#8A94AB] group-open:after:hidden"
          />
        </summary>
        <p className="mt-2.5 max-w-[58ch] text-muted">{faq.answer}</p>
      </details>
    ))}
  </div>
);
