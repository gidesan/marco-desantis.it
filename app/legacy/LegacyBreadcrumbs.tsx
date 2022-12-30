import { useMatches } from "@remix-run/react";
import { WORKS } from "../constants";

export default function LegacyBreadcrumbs() {
  const matches = useMatches();
  const lastMatch = matches.pop();
  const pageId = lastMatch?.pathname.split("/").pop();

  if (!pageId) return null;

  return (
    <>
      <ul
        id="breadcrumbs-3"
        className="xbreadcrumbs breadcrumb six columns offset-by-one"
      >
        <li id="br-home">
          <a href="/">Home</a>
        </li>

        {pageId === "biografia" ? (
          <li className="current">Biografia</li>
        ) : (
          <li>
            <a id="br-opere" href="#">
              Opere
            </a>
            <ul>
              {WORKS.map(([href, label]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <br className="clear" />
    </>
  );
}
