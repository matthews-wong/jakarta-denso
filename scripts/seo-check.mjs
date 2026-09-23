#!/usr/bin/env node
/**
 * SEO regression check for the production build.
 *
 * Run after `next build` (npm run seo:check). Parses every prerendered page in
 * .next/server/app and fails (exit 1) on the problems the 2026-09 audit found,
 * so they cannot creep back in:
 *   - canonical / og:url not equal to the page's own URL on SITE_URL
 *   - not exactly one <h1>, or content hidden behind a streaming loader
 *   - meta keywords, bogus verification tags, self-serving review markup
 *   - more than one business entity or FAQPage per page
 *   - FAQPage questions/answers that are not visible on the page
 *   - duplicate titles, sitemap/robots URLs on the wrong host
 * Warnings (titles > 60, descriptions outside 110–160, thin pages) don't fail.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jakartaintldenso.com"
).replace(/\/$/, "");
const APP_DIR = path.join(process.cwd(), ".next", "server", "app");
const SKIP_FILES = new Set(["_global-error.html", "_not-found.html"]);
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 160;
const MIN_WORDS = 250;

const errors = [];
const warnings = [];

/** Recursively lists the .html files under a directory. */
const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return entry.name.endsWith(".html") ? [full] : [];
    }),
  );
  return nested.flat();
};

const routeOf = (file) => {
  const relative = path
    .relative(APP_DIR, file)
    .replace(/\\/g, "/")
    .replace(/\.html$/, "");
  return relative === "index" ? "/" : `/${relative}`;
};

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const metaContent = (head, attr, name) => {
  const tag = head.match(
    new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, "i"),
  )?.[0];
  const content = tag?.match(/content="([^"]*)"/i)?.[1];
  return content === undefined ? undefined : decode(content);
};

const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const jsonLdNodes = (html, route) => {
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ];
  return blocks.flatMap((block) => {
    try {
      const data = JSON.parse(block[1]);
      return data["@graph"] ?? [data];
    } catch (error) {
      errors.push(`${route}: JSON-LD block does not parse (${error.message})`);
      return [];
    }
  });
};

const typesOf = (node) => [node["@type"]].flat();
const withoutSlash = (url) => url?.replace(/\/$/, "");

const checkMetadata = ({ head, expectedUrl, fail, warn }) => {
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  if (!title) fail("missing <title>");
  else if (title.length > TITLE_MAX)
    warn(`title is ${title.length} characters (> ${TITLE_MAX})`);

  const description = metaContent(head, "name", "description");
  if (!description) fail("missing meta description");
  else if (
    description.length < DESCRIPTION_MIN ||
    description.length > DESCRIPTION_MAX
  ) {
    warn(
      `description is ${description.length} characters (want ${DESCRIPTION_MIN}–${DESCRIPTION_MAX})`,
    );
  }

  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
  if (withoutSlash(canonical) !== withoutSlash(expectedUrl))
    fail(`canonical is ${canonical ?? "missing"}, expected ${expectedUrl}`);
  const ogUrl = metaContent(head, "property", "og:url");
  if (withoutSlash(ogUrl) !== withoutSlash(expectedUrl))
    fail(`og:url is ${ogUrl ?? "missing"}, expected ${expectedUrl}`);
  const ogImage = metaContent(head, "property", "og:image");
  if (!ogImage?.startsWith("http")) fail(`og:image is ${ogImage ?? "missing"}`);

  if (metaContent(head, "name", "keywords") !== undefined)
    fail("meta keywords present");
  if (metaContent(head, "name", "google-site-verification")?.startsWith("G-"))
    fail("verification tag holds a GA measurement ID");
  if (/noindex/i.test(metaContent(head, "name", "robots") ?? ""))
    fail("page is noindex");
  return title;
};

const checkContent = ({ html, body, fail, warn }) => {
  if (/Memuat Halaman/i.test(html)) fail("loading screen text in HTML");
  if (/<div hidden id="S:\d+"/.test(html))
    fail("content streamed behind a hidden Suspense boundary");

  const h1Count = (body.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) fail(`${h1Count} <h1> elements (expected 1)`);
  if (/<h1[^>]*style="[^"]*opacity:\s*0/i.test(body))
    fail("<h1> starts at opacity:0");
  const hiddenCount = (body.match(/style="[^"]*opacity:\s*0[;"]/gi) ?? [])
    .length;
  if (hiddenCount > 0) warn(`${hiddenCount} elements start at opacity:0`);

  const missingAlt = (body.match(/<img[^>]*>/gi) ?? []).filter(
    (tag) => !/\salt=/.test(tag),
  ).length;
  if (missingAlt > 0) fail(`${missingAlt} <img> without alt`);

  const text = visibleText(body);
  const words = text.split(" ").length;
  if (words < MIN_WORDS) warn(`only ${words} words of visible text`);
  return text;
};

const checkStructuredData = ({ nodes, text, fail, warn }) => {
  const businesses = nodes.filter((node) =>
    typesOf(node).includes("AutoRepair"),
  );
  if (businesses.length !== 1)
    fail(`${businesses.length} business entities in JSON-LD (expected 1)`);

  const faqs = nodes.filter((node) => typesOf(node).includes("FAQPage"));
  if (faqs.length > 1) fail(`${faqs.length} FAQPage blocks`);
  for (const faq of faqs) {
    for (const question of faq.mainEntity ?? []) {
      if (!text.includes(question.name))
        fail(`FAQ question not visible: "${question.name}"`);
      if (!text.includes(question.acceptedAnswer?.text ?? ""))
        fail(`FAQ answer not visible: "${question.name}"`);
    }
  }

  const serialized = JSON.stringify(nodes);
  if (/"@type":"(Review|AggregateRating)"|aggregateRating/.test(serialized))
    fail("self-serving Review/AggregateRating markup");
  if (/"@type":"HowTo"/.test(serialized))
    warn("HowTo markup (rich result retired)");
  if (
    nodes.some(
      (node) =>
        typeof node["@id"] === "string" && !node["@id"].startsWith(SITE_URL),
    )
  ) {
    fail("JSON-LD @id not on SITE_URL");
  }
};

const checkPage = async (file) => {
  const route = routeOf(file);
  const html = await readFile(file, "utf8");
  const head = html.split("</head>")[0];
  const body = html.slice(html.indexOf("<body"));
  const expectedUrl = `${SITE_URL}${route === "/" ? "" : route}`;
  const fail = (message) => errors.push(`${route}: ${message}`);
  const warn = (message) => warnings.push(`${route}: ${message}`);

  const title = checkMetadata({ head, expectedUrl, fail, warn });
  const text = checkContent({ html, body, fail, warn });
  checkStructuredData({ nodes: jsonLdNodes(html, route), text, fail, warn });
  return { route, title };
};

const checkSitemapAndRobots = async (routes) => {
  const sitemap = await readFile(
    path.join(APP_DIR, "sitemap.xml.body"),
    "utf8",
  );
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL))
      errors.push(`sitemap: ${loc} is not on ${SITE_URL}`);
    const route = withoutSlash(loc.slice(SITE_URL.length)) || "/";
    if (!routes.has(route)) errors.push(`sitemap: ${loc} has no built page`);
  }
  for (const route of routes) {
    if (
      !locs.includes(`${SITE_URL}${route === "/" ? "/" : route}`) &&
      !locs.includes(`${SITE_URL}${route}`)
    ) {
      warnings.push(`sitemap: ${route} is not listed`);
    }
  }
  if (/<changefreq>|<priority>/.test(sitemap))
    warnings.push("sitemap: changefreq/priority present (ignored by Google)");

  const robots = await readFile(path.join(APP_DIR, "robots.txt.body"), "utf8");
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
    errors.push(`robots.txt: sitemap is not ${SITE_URL}/sitemap.xml`);
  if (/Disallow:\s*\/\s*$/m.test(robots))
    errors.push("robots.txt blocks the whole site");
  return locs.length;
};

const main = async () => {
  const files = (await walk(APP_DIR)).filter(
    (file) => !SKIP_FILES.has(path.basename(file)),
  );
  const pages = await Promise.all(files.map(checkPage));
  const sitemapCount = await checkSitemapAndRobots(
    new Set(pages.map((page) => page.route)),
  );

  const titles = new Map();
  for (const page of pages)
    titles.set(page.title, [...(titles.get(page.title) ?? []), page.route]);
  for (const [title, owners] of titles) {
    if (owners.length > 1)
      errors.push(`duplicate title "${title}" on ${owners.join(", ")}`);
  }

  console.log(
    `Checked ${pages.length} pages and ${sitemapCount} sitemap URLs on ${SITE_URL}.`,
  );
  if (warnings.length > 0)
    console.log(`\n${warnings.length} warning(s):\n  ${warnings.join("\n  ")}`);
  if (errors.length > 0) {
    console.error(`\n${errors.length} error(s):\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log("\nNo SEO errors.");
};

await main();
