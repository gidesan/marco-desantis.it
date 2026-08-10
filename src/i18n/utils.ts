import type { CollectionEntry, CollectionKey } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";

import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";
import { it } from "@/i18n/dictionaries/it";

// `it` is the type source and the default locale. Add more locales here (and to
// src/i18n/locales.ts) to go multilingual; the fallback chain keeps missing
// keys from breaking pages.
const localeConfigs = { it } as const;
const dictionaries = {
  it: it.dictionary,
} as const;

export type I18nKey = keyof (typeof dictionaries)[typeof defaultLocale];

export const localeNames: Record<Locale, string> = Object.fromEntries(
  Object.entries(localeConfigs).map(([lang, cfg]) => [lang, cfg.name]),
) as Record<Locale, string>;

export const localeMetadata: Record<Locale, { og: string; bcp47: string }> =
  Object.fromEntries(
    Object.entries(localeConfigs).map(([lang, cfg]) => [
      lang,
      { og: cfg.og, bcp47: cfg.bcp47 },
    ]),
  ) as Record<Locale, { og: string; bcp47: string }>;

export function createTranslator(locale: string | undefined) {
  return function tl(key: I18nKey, vars?: Record<string, string | number>) {
    return t(locale, key, vars);
  };
}

export function createUrlTranslator(locale: string | undefined) {
  return function url(path: Parameters<typeof getRelativeLocaleUrl>[1]) {
    return getRelativeLocaleUrl(locale ?? defaultLocale, path);
  };
}

export function getLocaleFromUrl(url: URL) {
  const [, locale] = url.pathname.split("/");
  return isLocale(locale) ? locale : defaultLocale;
}

export function getPathWithoutLocale(pathname: string, locale: string) {
  if (locale === defaultLocale) return pathname;

  // On i18n-rewritten pages (shared routes served under a non-default locale via
  // fallbackType: "rewrite"), Astro.url.pathname is already the unprefixed
  // default-locale path even though currentLocale is the non-default one. Only
  // strip the prefix when it's actually present.
  const prefix = `/${locale}`;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length) || "/";
  }
  return pathname;
}

export function getTextDirection(locale: string): "rtl" | "ltr" {
  return ["ar", "he", "fa", "ur"].includes(locale) ? "rtl" : "ltr";
}

export function collectionFilterByLocale<T extends CollectionKey>(
  locale: string | undefined,
) {
  return (s: CollectionEntry<T>) =>
    locale ? s.id.startsWith(`${locale}/`) : true;
}

function t(
  locale: string | undefined,
  key: I18nKey,
  vars?: Record<string, string | number>,
) {
  const l = locale && isLocale(locale) ? locale : defaultLocale;

  // fallback chain: requested locale -> default locale -> key itself
  const template =
    dictionaries[l][key] ?? dictionaries[defaultLocale][key] ?? String(key);

  if (!vars) return template;

  // simple interpolation: "Hello {name}"
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] === undefined ? `{${name}}` : String(vars[name]),
  );
}
