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
