import { useMatches } from "@remix-run/react";

const items = [
  ["/", "Home"],
  ["/biografia", "Biografia"],
  ["mailto:marcoignazio.desantis@gmail.com", "Contatti"],
];

export default function DesktopNavMenu() {
  const matches = useMatches();
  const lastMatch = matches.pop();
  const url = lastMatch?.pathname;

  return (
    <ul id="top-menu" className="container nav nav-pills">
      {items.map(([href, label]) => (
        <li
          key={label}
          className={url === href ? "current" : undefined}
          style={{ marginRight: "4px" }}
        >
          <a href={href} title={label}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
