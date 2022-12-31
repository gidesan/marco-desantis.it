import { useMatches } from "@remix-run/react";
import { WORKS } from "../constants";

export default function LegacyBreadcrumbs() {
  const matches = useMatches();
  const lastMatch = matches.pop();
  const pathname = lastMatch?.pathname;

  if (!pathname || pathname === "/") return null;

  const currentNode = WORKS.find(([href, label]) => href === pathname);

  const [, label] = currentNode || ["", ""];

  return (
    <>
      <ul
        id="breadcrumbs-3"
        className="xbreadcrumbs breadcrumb six columns offset-by-one"
      >
        <li id="br-home">
          <a href="/">Home</a>
        </li>

        {pathname === "/biografia" ? (
          <li className="current">Biografia</li>
        ) : (
          <>
            <li className="current">{label}</li>
          </>
        )}
      </ul>
      <br className="clear" />
    </>
  );
}
