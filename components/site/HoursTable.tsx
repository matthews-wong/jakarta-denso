import {
  HOLIDAY_HOURS_LABEL,
  HOLIDAY_HOURS_NOTE,
  OPENING_HOURS,
  formatHoursRange,
} from "@/lib/site";
import { cn } from "@/lib/utils";

interface HoursTableProps {
  onDark?: boolean;
  caption?: string;
  rows?: ReadonlyArray<{ label: string; value: string }>;
  className?: string;
}

const HOURS_ROWS = [
  ...OPENING_HOURS.map((hours) => ({
    label: hours.label,
    value: formatHoursRange(hours),
  })),
  { label: HOLIDAY_HOURS_LABEL, value: HOLIDAY_HOURS_NOTE },
];

/** Opening hours (or any label/value list) as a real table — tabular data, read from lib/site.ts. */
export const HoursTable = ({
  onDark = false,
  caption,
  rows = HOURS_ROWS,
  className,
}: HoursTableProps): React.JSX.Element => (
  <table
    className={cn(
      `w-full border-collapse text-[16.5px] tabular-nums`,
      className,
    )}
  >
    {caption && (
      <caption className="pb-1.5 text-left text-base font-semibold">
        {caption}
      </caption>
    )}
    <tbody>
      {rows.map((row) => (
        <tr key={row.label}>
          <th
            scope="row"
            className={cn(
              `border-t py-3 text-left font-normal`,
              onDark ? `border-white/15` : `border-line`,
            )}
          >
            {row.label}
          </th>
          <td
            className={cn(
              `border-t py-3 text-right`,
              onDark ? `border-white/15` : `border-line`,
            )}
          >
            {row.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
