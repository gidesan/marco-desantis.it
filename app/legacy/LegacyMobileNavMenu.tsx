import { WORKS } from "../constants";

export default function LegacyMobileNavMenu() {
  return (
    <select
      defaultValue=""
      onChange={(e) => {
        window.location.replace(e.target.value);
      }}
    >
      <option value="">Vai a...</option>
      <option value="/">Home</option>
      <option value="/biografia">Biografia</option>
      <optgroup label="Opere">
        {WORKS.map(([href, label]) => (
          <option key={href} value={href}>
            {label}
          </option>
        ))}
      </optgroup>
      <option value="mailto:marcoignazio.desantis@gmail.com">Contatti</option>
    </select>
  );
}
