import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";

import { SITE } from "./src/site";
import { defaultLocale, localesByKey } from "./src/i18n/locales";
import { htmlMinifier } from "./scripts/htmlMinifier.mjs";

const locales = Object.keys(localesByKey);

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // Italian is the only populated locale today, but the i18n machinery is fully
  // wired so a second locale (e.g. "en") can be added later by extending
  // src/i18n/locales.ts + adding a dictionary, with no routing rework.
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  prefetch: true,
  integrations: [
    sitemap({
      // Drop any discovered non-default-locale URL and re-attach all locales as
      // hreflang alternates on the single default-locale entry. (No-op while
      // there's one locale; ready for when a second is added.)
      filter: (page) => !isNonDefaultLocale(new URL(page).pathname),
      serialize: (item) => {
        const path = stripLocale(new URL(item.url).pathname);
        const localeUrl = (loc) =>
          new URL(loc === defaultLocale ? path : `/${loc}${path}`, SITE.url)
            .href;
        item.url = localeUrl(defaultLocale);
        item.links = [
          ...locales.map((loc) => ({ lang: loc, url: localeUrl(loc) })),
          { lang: "x-default", url: localeUrl(defaultLocale) },
        ];
        return item;
      },
    }),
    mdx(),
    pagefind(),
    htmlMinifier(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

// Strip a leading non-default locale segment (e.g. "/en/opere/" -> "/opere/").
const stripLocale = (pathname) => {
  for (const loc of locales) {
    if (loc === defaultLocale) continue;
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return pathname.slice(loc.length + 1) || "/";
    }
  }
  return pathname;
};

const isNonDefaultLocale = (pathname) => stripLocale(pathname) !== pathname;
