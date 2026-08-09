// Italian is the only populated locale today. Add a locale here (e.g. "en") and
// a matching dictionary in ./dictionaries to go multilingual — the routing,
// hreflang, sitemap and translator machinery already handle N locales.
const locales = ["it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = locales[0];

export const localesByKey = Object.fromEntries(
  locales.map((loc) => [loc, loc]),
);

export function isLocale(str: string): str is Locale {
  return locales.some((loc) => loc === str);
}
