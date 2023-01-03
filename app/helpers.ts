import { AUTHOR } from "./constants";

export function pageTitle(pathname: string) {
  const prefix = pageTitlePrefix(pathname);
  return prefix ? `${prefix} - ${AUTHOR}` : AUTHOR;
}

function pageTitlePrefix(pathname: string) {
  if (!pathname) return "";

  const pageId = pathname.split("/").pop() || "";

  return pageId
    ? pageId
        .split("-")
        .map((token) => token[0].toUpperCase() + token.substring(1))
        .join(" ")
    : "";
}
