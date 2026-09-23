import type { JsonLdNode } from "@/lib/structured-data";

interface JsonLdProps {
  data: JsonLdNode;
}

/**
 * Server-rendered JSON-LD. `<` is escaped so a string in the data can never
 * close the script tag early.
 */
export const JsonLd = ({ data }: JsonLdProps): React.JSX.Element => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, `\\u003c`),
    }}
  />
);
