"use client";

import { useCallback } from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
}

/**
 * Client-only share control extracted from the (now server-rendered) blog post
 * page. Uses the Web Share API when available, otherwise copies the URL.
 */
const ShareButton = ({ title, text }: ShareButtonProps): React.JSX.Element => {
  const handleShare = useCallback(async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link berhasil disalin!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, [title, text]);

  return (
    <button
      onClick={handleShare}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Bagikan artikel"
    >
      <Share2 className="w-5 h-5 text-gray-600" />
    </button>
  );
};

export default ShareButton;
