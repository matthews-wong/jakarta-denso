#!/usr/bin/env node
/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver…) with URLs that changed, so
 * they are recrawled within hours instead of weeks. Bing's index also feeds
 * Copilot and ChatGPT search. Google does not use IndexNow: resubmit the
 * sitemap in Search Console instead.
 *
 * Run ONLY after a deploy is live (the key file must be reachable):
 *   npm run indexnow                 every URL in the live sitemap
 *   npm run indexnow -- /harga /…    only the given paths or URLs
 *
 * The key is public by design: search engines verify it by fetching
 * public/<key>.txt from the site.
 */

const INDEXNOW_KEY = "667ddf7c467d88f72b876f12bc88f560";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;
const ACCEPTED_STATUSES = new Set([200, 202]);

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jakartaintldenso.com"
).replace(/\/$/, "");
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const toAbsolute = (value) =>
  value.startsWith("http")
    ? value
    : `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;

const sitemapUrls = async () => {
  const response = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!response.ok)
    throw new Error(`sitemap.xml answered HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
};

const assertKeyIsLive = async () => {
  const response = await fetch(KEY_LOCATION);
  const body = (await response.text()).trim();
  if (!response.ok || body !== INDEXNOW_KEY)
    throw new Error(
      `${KEY_LOCATION} is not serving the key yet (HTTP ${response.status}). Deploy first.`,
    );
};

const submit = async (urls) => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  if (!ACCEPTED_STATUSES.has(response.status))
    throw new Error(
      `IndexNow answered HTTP ${response.status}: ${await response.text()}`,
    );
  return response.status;
};

const main = async () => {
  const args = process.argv.slice(2);
  const urls = args.length > 0 ? args.map(toAbsolute) : await sitemapUrls();
  const offHost = urls.filter((url) => !url.startsWith(SITE_URL));
  if (offHost.length > 0)
    throw new Error(`Not on ${SITE_URL}: ${offHost.join(", ")}`);

  await assertKeyIsLive();
  for (let start = 0; start < urls.length; start += MAX_URLS_PER_REQUEST) {
    const batch = urls.slice(start, start + MAX_URLS_PER_REQUEST);
    const status = await submit(batch);
    console.log(`IndexNow accepted ${batch.length} URL(s) (HTTP ${status}).`);
  }
};

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
