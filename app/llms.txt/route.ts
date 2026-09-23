import { buildLlmsTxt } from "@/lib/llms";

/** Rendered once at build time, like the sitemap. */
export const dynamic = "force-static";

export const GET = async (): Promise<Response> =>
  new Response(await buildLlmsTxt(), {
    headers: { "Content-Type": `text/plain; charset=utf-8` },
  });
