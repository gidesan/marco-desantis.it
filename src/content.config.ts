// https://docs.astro.build/en/guides/content-collections/
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// The 8 literary categories (poesia, narrativa, ...). Markdown body holds the
// category's description plus any long-form content (the Giornalismo list,
// the Critica "tutti" list, the Poesia intro) — there's no separate
// `description` field; the body's first paragraph doubles as the short
// excerpt shown on /opere (see `excerptFromBody` in @utils/content).
// Entry ids are locale-prefixed (e.g. "it/poesia").
const categories = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/categories",
  }),
  schema: ({ image }) =>
    z.object({
      code: z.string(),
      title: z.string(),
      order: z.number(),
      icon: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

// Individual bibliographic entries. `category` is the parent category `code`
// (matched manually rather than via reference() to sidestep locale-prefixed id
// mismatch). Body = the citation markdown. Entry ids look like
// "it/<category>/<slug>".
const books = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/books",
    // Force the id to the locale-prefixed file path ("it/<category>/<slug>").
    // Without this the loader would use the frontmatter `slug` as the id,
    // breaking `collectionFilterByLocale` (which keys on the "it/" prefix).
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Italian translation of the title, for works originally published
      // under a foreign-language title. Rendered in parentheses after `title`.
      translatedTitle: z.string().optional(),
      // Set only for standalone books (not journal articles or anthology
      // contributions, which don't have a "publisher" of their own).
      publisher: z.string().optional(),
      city: z.string().optional(),
      // Set only for works that won a literary award (per the biography).
      award: z.string().optional(),
      // Mixed granularity in the source data (YYYY / YYYY-MM / YYYY-MM-DD),
      // kept as a string and sorted lexically (ISO-ordered).
      date: z.string(),
      category: z.string(),
      slug: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { categories, books };
