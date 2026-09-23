import Image from "next/image";
import Link from "next/link";

import { formatDateId, readingLabel, type BlogPostSummary } from "@/lib/blog";

interface PostCardProps {
  post: BlogPostSummary;
  /** Heading level inside the page outline. */
  headingLevel?: `h2` | `h3`;
  showReadingTime?: boolean;
}

export const PostCard = ({
  post,
  headingLevel = `h3`,
  showReadingTime = true,
}: PostCardProps): React.JSX.Element => {
  const Heading = headingLevel;
  return (
    <article className="group">
      <Link href={post.path} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ice">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <p className="mb-2 mt-5 text-[14.5px] font-semibold text-brand">
          {post.categoryName}
        </p>
        <Heading className="text-[22px] font-semibold leading-[1.22] tracking-[-0.02em] group-hover:text-brand">
          {post.title}
        </Heading>
      </Link>
      <p className="mt-3 text-[14.5px] text-muted">
        <time dateTime={post.datePublished}>
          {formatDateId(post.datePublished)}
        </time>
        {showReadingTime && `, ${readingLabel(post.readingMinutes)}`}
      </p>
    </article>
  );
};
