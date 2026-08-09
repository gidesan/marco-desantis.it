// One-shot migration: converts the old Remix content into the Astro `categories`
// and `books` collections, mirroring the /opere/<category>/<book> route layout.
//
//   content/<category>/*.mdx           -> src/content/books/it/<category>/<slug>.md
//   public/images/books/<slug>.jpg     -> src/content/books/it/<category>/covers/<slug>.jpg
//   (authored here)                    -> src/content/categories/it/<category>.md
//
// Run once with: node scripts/migrate-content.mjs
import fs from "fs";
import path from "path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC_CONTENT = path.join(ROOT, "content");
const SRC_COVERS = path.join(ROOT, "public/images/books");
const MIGRATION_SRC = path.join(ROOT, ".migration-src");
const OUT_BOOKS = path.join(ROOT, "src/content/books/it");
const OUT_CATEGORIES = path.join(ROOT, "src/content/categories/it");

// Category metadata: order, label, and one-line description (from the mockup).
const CATEGORIES = [
  {
    code: "poesia",
    title: "Poesia",
    description:
      "Sette sillogi poetiche, tra cui «Uomini di sempre» (Premio Umberto Saba 1989), «Lettere dagli argonauti» e «Libro mastro». Versi tradotti in serbo, croato, albanese, spagnolo e altre lingue.",
  },
  {
    code: "narrativa",
    title: "Narrativa",
    description:
      "Racconti e romanzi come «Vaghe stelle» e altri racconti, insignito del Premio speciale della critica «Thesaurus», e Cronache dal paradiso.",
  },
  {
    code: "critica-letteraria",
    title: "Critica Letteraria",
    description:
      "Saggi su autori italiani del Novecento, tra cui Pirandello, Chiarelli, Montale, Comi, Bodini e altri autori del ’900 (Genesi, Torino 2023).",
  },
  {
    code: "storiografia",
    title: "Storiografia",
    description:
      "Ricerche sulla storia di Molfetta e del territorio, e gli studi salveminiani, tra cui W Salvemini (Aracne, Roma 2013) e Un amico di Garibaldi: Eliodoro Spech (Fiorino d’Oro, Premio Firenze 2011).",
  },
  {
    code: "etnografia",
    title: "Etnografia",
    description:
      "Studio delle tradizioni popolari, dei costumi e delle pratiche culturali che definiscono l'identità delle comunità locali.",
  },
  {
    code: "dialettologia",
    title: "Dialettologia",
    description:
      "La ricchezza delle parlate locali documentata e analizzata per preservare un patrimonio linguistico di inestimabile valore.",
  },
  {
    code: "linguistica",
    title: "Linguistica",
    description:
      "Lo studio scientifico del linguaggio nelle sue molteplici manifestazioni, dalle strutture grammaticali alle evoluzioni semantiche.",
  },
  {
    code: "giornalismo",
    title: "Giornalismo",
    description:
      "Centinaia di elzeviri e articoli culturali pubblicati dal 1989 al 1998 su quotidiani italiani e svizzeri, tra cui «Giornale di Brescia» e «Corriere del Ticino».",
  },
];

// Extra markdown appended to a category's body.
const POESIA_INTRO =
  "La poesia di Marco Ignazio de Santis è anche su [italian-poetry.org](http://www.italian-poetry.org/de_santis_marco_ignazio.html).\n";

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Minimal frontmatter parser for the simple `key: "value"` YAML used here.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

function yamlString(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// Strip the Skeleton wrapper <div>s from the hand-written giornalismo / critica
// lists, leaving the numbered markdown list.
function stripWrapperDivs(raw) {
  return raw
    .split("\n")
    .filter((l) => !/^\s*<\/?div\b/i.test(l))
    .join("\n")
    .trim();
}

fs.rmSync(OUT_BOOKS, { recursive: true, force: true });
fs.rmSync(OUT_CATEGORIES, { recursive: true, force: true });
fs.mkdirSync(OUT_CATEGORIES, { recursive: true });

let bookCount = 0;
let coverCount = 0;

for (const [i, cat] of CATEGORIES.entries()) {
  const catDir = path.join(SRC_CONTENT, cat.code);
  const outCatBooks = path.join(OUT_BOOKS, cat.code);

  // --- Books for this category (from content/<category>/*.mdx) ---
  if (fs.existsSync(catDir)) {
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".mdx"));
    if (files.length) fs.mkdirSync(path.join(outCatBooks, "covers"), { recursive: true });

    for (const file of files) {
      const raw = fs.readFileSync(path.join(catDir, file), "utf-8");
      const { data, body } = parseFrontmatter(raw);
      const originalBase = file.replace(/\.mdx$/, "");
      const slug = slugify(originalBase);

      // Cover: honour the "NONE" sentinel; otherwise copy public/images/books.
      let imageLine = "";
      let imageAltLine = "";
      if (data.imageUrl !== "NONE") {
        const srcCover = path.join(SRC_COVERS, `${originalBase}.jpg`);
        if (fs.existsSync(srcCover)) {
          fs.copyFileSync(
            srcCover,
            path.join(outCatBooks, "covers", `${slug}.jpg`),
          );
          imageLine = `image: "./covers/${slug}.jpg"\n`;
          imageAltLine = `imageAlt: ${yamlString(data.title ?? originalBase)}\n`;
          coverCount++;
        }
      }

      const frontmatter =
        `---\n` +
        `title: ${yamlString(data.title ?? originalBase)}\n` +
        `date: ${yamlString(data.date ?? "")}\n` +
        `category: ${yamlString(cat.code)}\n` +
        `slug: ${yamlString(slug)}\n` +
        imageLine +
        imageAltLine +
        `---\n`;

      fs.writeFileSync(
        path.join(outCatBooks, `${slug}.md`),
        frontmatter + body.trimStart(),
      );
      bookCount++;
    }
  }

  // --- Category file (frontmatter + optional long-form body) ---
  let catBody = "";
  if (cat.code === "poesia") {
    catBody = "\n" + POESIA_INTRO;
  } else if (cat.code === "giornalismo") {
    const list = stripWrapperDivs(
      fs.readFileSync(path.join(MIGRATION_SRC, "giornalismo.mdx"), "utf-8"),
    );
    catBody = "\n## Elenco degli articoli\n\n" + list + "\n";
  } else if (cat.code === "critica-letteraria") {
    const list = stripWrapperDivs(
      fs
        .readFileSync(path.join(MIGRATION_SRC, "critica-tutti.mdx"), "utf-8")
        .replace(/className=/g, "class="),
    );
    catBody = "\n## Elenco generale\n\n" + list + "\n";
  }

  const catFront =
    `---\n` +
    `code: ${yamlString(cat.code)}\n` +
    `title: ${yamlString(cat.title)}\n` +
    `order: ${i + 1}\n` +
    `icon: ${yamlString(cat.code)}\n` +
    `description: ${yamlString(cat.description)}\n` +
    `---\n`;

  fs.writeFileSync(path.join(OUT_CATEGORIES, `${cat.code}.md`), catFront + catBody);
}

console.log(
  `Migrated ${bookCount} books (${coverCount} covers) across ${CATEGORIES.length} categories.`,
);
