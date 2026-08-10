import type { createTranslator } from "@/i18n/utils";

// Display title for a book, combining the original title with its Italian
// translation in parentheses when the work was originally published under a
// foreign-language title (e.g. "Jesen u srcu" -> "Jesen u srcu (L'autunno nel cuore)").
export function bookDisplayTitle(data: {
  title: string;
  translatedTitle?: string;
}) {
  return data.translatedTitle
    ? `${data.title} (${data.translatedTitle})`
    : data.title;
}

// Alt text for a book's cover image. Falls back to "Copertina di <title>" when
// `imageAlt` isn't set in frontmatter, so most books don't need to specify it
// explicitly — only set `imageAlt` when a cover needs custom descriptive text.
export function bookImageAlt(
  data: { title: string; translatedTitle?: string; imageAlt?: string },
  tl: ReturnType<typeof createTranslator>,
) {
  return data.imageAlt ?? tl("book.coverAlt", { title: bookDisplayTitle(data) });
}
