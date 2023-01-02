import { useMatches } from "@remix-run/react";

export default function CriticaLetterariaContentSwitcher() {
  const featuredContentUrl = "/opere/critica-letteraria";
  const fullContentUrl = "/opere/critica-letteraria/tutti";
  const matches = useMatches();
  const lastMatch = matches.pop();
  const currentUrl = lastMatch?.pathname;
  return (
    <select
      style={{ width: "128px" }}
      defaultValue={currentUrl}
      onChange={(e) => {
        window.location.replace(e.target.value);
      }}
    >
      <option value={featuredContentUrl}>Opere in evidenza</option>
      <option value={fullContentUrl}>Elenco generale</option>
    </select>
  );
}
