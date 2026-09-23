"use client";

import { useEffect, useState } from "react";

import {
  OPENING_HOURS,
  TIME_ZONE,
  formatHour,
  formatHoursRange,
  type DayCode,
  type OpeningHours,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const REFRESH_MS = 60_000;
const WEEKDAY_TO_CODE: Record<string, DayCode> = {
  Mon: `Mo`,
  Tue: `Tu`,
  Wed: `We`,
  Thu: `Th`,
  Fri: `Fr`,
  Sat: `Sa`,
  Sun: `Su`,
};
const DAY_ORDER: readonly DayCode[] = [
  `Mo`,
  `Tu`,
  `We`,
  `Th`,
  `Fr`,
  `Sa`,
  `Su`,
];

interface Status {
  isOpen: boolean;
  text: string;
}

const hoursFor = (day: DayCode): OpeningHours | undefined =>
  OPENING_HOURS.find((hours) => hours.days.includes(day));

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(`:`).map(Number);
  return hours * 60 + minutes;
};

/** Open/closed state in Cirebon's time zone, whatever the visitor's clock says. */
const computeStatus = (now: Date): Status => {
  const parts = new Intl.DateTimeFormat(`en-US`, {
    timeZone: TIME_ZONE,
    weekday: `short`,
    hour: `2-digit`,
    minute: `2-digit`,
    hourCycle: `h23`,
  }).formatToParts(now);
  const value = (type: string): string =>
    parts.find((part) => part.type === type)?.value ?? ``;
  const day = WEEKDAY_TO_CODE[value(`weekday`)] ?? `Mo`;
  const minutes = Number(value(`hour`)) * 60 + Number(value(`minute`));
  const today = hoursFor(day);

  if (
    today &&
    minutes >= toMinutes(today.opens) &&
    minutes < toMinutes(today.closes)
  ) {
    return {
      isOpen: true,
      text: `Buka sekarang, sampai ${formatHour(today.closes)}`,
    };
  }
  if (today && minutes < toMinutes(today.opens)) {
    return {
      isOpen: false,
      text: `Tutup, buka hari ini ${formatHour(today.opens)}`,
    };
  }
  const tomorrow = hoursFor(
    DAY_ORDER[(DAY_ORDER.indexOf(day) + 1) % DAY_ORDER.length],
  );
  return {
    isOpen: false,
    text: tomorrow
      ? `Tutup, buka besok ${formatHour(tomorrow.opens)}`
      : `Tutup`,
  };
};

const FALLBACK_TEXT = `${OPENING_HOURS[0].label} ${formatHoursRange(OPENING_HOURS[0])}`;

interface OpenStatusProps {
  className?: string;
}

/**
 * Live "open now" line. The server renders the regular hours; the client
 * swaps in the live state after hydration (no layout shift, no mismatch).
 */
export const OpenStatus = ({
  className,
}: OpenStatusProps): React.JSX.Element => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = (): void => setStatus(computeStatus(new Date()));
    update();
    const timer = window.setInterval(update, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={cn(`inline-flex items-center gap-2.5`, className)}>
      <i
        aria-hidden="true"
        className={cn(
          `h-2 w-2 flex-none rounded-full`,
          status === null && `bg-white/60`,
          status?.isOpen === true &&
            `bg-[#3DD68C] shadow-[0_0_0_4px_rgba(61,214,140,0.22)]`,
          status?.isOpen === false && `bg-[#F5B544]`,
        )}
      />
      {status ? status.text : FALLBACK_TEXT}
    </span>
  );
};
