interface SectionHeadingProps {
  id: string;
  title: string;
  children?: React.ReactNode;
}

/** Two-column section head: heading left, supporting line (or rating, links) right. */
export const SectionHeading = ({
  id,
  title,
  children,
}: SectionHeadingProps): React.JSX.Element => (
  <div className="mb-8 grid items-end gap-4 lg:mb-[52px] lg:grid-cols-2 lg:gap-16">
    <h2 id={id} className="h-section max-w-[13ch]">
      {title}
    </h2>
    {children && (
      <div className="max-w-[44ch] text-lg text-muted lg:justify-self-start">
        {children}
      </div>
    )}
  </div>
);
