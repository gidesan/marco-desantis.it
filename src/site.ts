// Single source of site-wide identity. Marco is a person (not a company), so
// this drives the Person/WebSite JSON-LD in Meta.astro rather than Organization.
export const SITE = {
  title: "Marco Ignazio de Santis",
  shortName: "M. de Santis",
  url: "https://marco-desantis.it",
  author: "Marco Ignazio de Santis",
  email: "marcoignazio.desantis@gmail.com",
  // Person structured-data details.
  jobTitle: "Poeta, scrittore e giornalista",
  birthPlace: "Molfetta",
  nationality: "IT",
  // External profiles / references, surfaced as schema.org `sameAs`.
  sameAs: ["http://www.italian-poetry.org/de_santis_marco_ignazio.html"],
};
