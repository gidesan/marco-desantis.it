// Plain-text excerpt from a content entry's raw markdown body: the first
// paragraph, with basic markdown/HTML syntax stripped. Used where a short
// description is needed (card blurbs, SEO meta) without rendering the full
// body — e.g. a category's body opens with its description paragraph.
export function excerptFromBody(body: string | undefined): string {
  if (!body) return "";
  const firstParagraph = body.trim().split(/\n\s*\n/)[0] ?? "";
  return firstParagraph
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[_*]{1,3}([^_*]+)[_*]{1,3}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
