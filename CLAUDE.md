# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal site for the Italian poet/writer Marco Ignazio de Santis. Astro 7 (SSG, no adapter) + Tailwind CSS v4, deployed to Netlify. All user-facing content and copy is **Italian**.

## Commands

Package manager is **pnpm** (a `preinstall` guard rejects npm/yarn). Node 22.

```sh
pnpm dev       # astro dev (localhost:4321)
pnpm check     # astro check — type-check + Astro diagnostics
pnpm build     # astro check && astro build -> dist/
pnpm preview   # serve dist/ locally
pnpm lint      # eslint (type-aware, includes .astro frontmatter)
pnpm format    # prettier --write .
pnpm lhci      # Lighthouse CI against a local production build
```

There is no test suite. `pnpm check` + `pnpm lint` are the verification gates; `pnpm build` runs `check` first, so a build failure is often a type error.

`pnpm lhci` builds, serves `dist/`, and audits six representative URLs (see `lighthouserc.local.json`). Accessibility and SEO are asserted at `error` with minScore 0.95 — a regression there fails the run. The script temporarily disables the Astro dev toolbar preference (it injects a link that trips the `link-text` SEO audit) and restores it afterwards.

`node scripts/gen-assets.mjs` is a one-shot regeneration of `src/images/icon.png` and `social.png` from inline SVG; only run it if the brand marks change.

## Architecture

### Content model (`src/content.config.ts`)

Three glob-loaded collections, all under `src/content/`, all with **locale-prefixed entry ids**:

- `categories` — the 8 literary categories (`it/poesia`, `it/storiografia`, …). Frontmatter carries `code`, `title`, `order`, `icon`; there is **no `description` field** — the markdown body's first paragraph doubles as the short excerpt via `excerptFromBody` in `@utils/content`.
- `books` — one file per bibliographic entry at `it/<category>/<slug>.md`, cover images in a sibling `covers/` dir referenced as `./covers/<slug>.jpg` so Astro's image pipeline optimizes them. `generateId` forces the id to the file path (not the frontmatter `slug`), which is what the locale filter keys on.
- `categoryLists` — optional long-form appendix for a category (currently only Critica Letteraria's full bibliography), rendered on its own page instead of crowding the category page.

`books.category` / `categoryLists.category` are plain strings matched manually against `categories[].data.code` — deliberately **not** `reference()`, because the locale-prefixed ids wouldn't match. Keep it that way when adding entries.

`date` is a string with mixed granularity (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`) sorted lexically; the display year is extracted with `/\d{4}/`.

A category with no `books` entries is valid (e.g. `giornalismo`, whose list lives entirely in its markdown body).

### Routing

`/opere/[category]` and `/opere/[category]/[book]` are generated from the collections. `/opere/critica-letteraria/tutti` is a **hardcoded** page (not a dynamic route) that renders the single `categoryLists` entry; it throws at build time if that entry is missing. Adding a second `categoryLists` entry means generalizing that page into a dynamic route.

### i18n

Italian is the only populated locale, but the machinery is fully wired for N locales and should be preserved when editing. Adding a locale = one entry in `src/i18n/locales.ts` + a dictionary in `src/i18n/dictionaries/` — routing, hreflang, sitemap serialization (`astro.config.mjs`) and collection filtering already handle it.

- Never hardcode a UI string in a component. Add a key to `src/i18n/dictionaries/it.ts` and read it via `createTranslator(Astro.currentLocale)`; `it.ts` is also the type source for `I18nKey`.
- Build internal links with `createUrlTranslator(Astro.currentLocale)`, not raw paths.
- Filter every `getCollection` call with `collectionFilterByLocale<"books">(Astro.currentLocale)` (use `"it"` inside `getStaticPaths`, where `Astro.currentLocale` isn't available).

### Layout and SEO

`BaseLayout.astro` is the single layout: it takes `title`, `description`, `structuredData`, `breadcrumbs` and emits `<html lang dir>`, the `Meta` head, BreadcrumbList JSON-LD, and `<main data-pagefind-body>` (which is what Pagefind indexes). Page-level `structuredData` overrides the default WebPage schema — book pages pass a `Book` schema. Site-wide identity (title, url, author, `sameAs`) lives in `src/site.ts` and drives Person/WebSite JSON-LD.

Search is Pagefind via `astro-pagefind`, rendered in `SearchOverlay.astro`. **The index only exists after `pnpm build`** — search does nothing in `astro dev`.

### Styling

Tailwind v4, configured entirely in `src/styles/global.css` via `@theme` (no `tailwind.config`). `--color-*: initial` wipes Tailwind's default palette, so **only the tokens defined there exist** (`background`, `foreground`, `primary`, `muted`, `terracotta`, `paper`, …). Reach for a token, never an arbitrary hex or a default Tailwind color like `bg-slate-100`. Serif is self-hosted Cormorant Garamond; body copy uses the system sans stack. The 500-weight woff2 is explicitly preloaded in `BaseLayout` to avoid a wordmark FOUC.

Reusable primitives live in `src/components/ui/` (`Button`, `Prose`, `Divider`, `ImageFrame`, …), page chrome in `src/components/shell/`, and icons in `src/components/icons/` — all icons wrap `IconBase`, and per-category glyphs are keyed by category `code` in `CategoryIcon.astro`, so a new category needs a glyph added there.

### Build pipeline notes

`astro.config.mjs` wires sitemap (which rewrites entries to the default-locale URL with all locales as hreflang alternates), MDX, Pagefind, and a custom `htmlMinifier` integration (`scripts/htmlMinifier.mjs`) that minifies every file in `dist/` on `astro:build:done`.

## Conventions

- Import via the tsconfig aliases: `@/`, `@components/`, `@content/`, `@i18n/`, `@images/`, `@styles/`, `@utils/`.
- `pnpm-workspace.yaml` holds pnpm settings (pnpm 11 reads them there, not `.npmrc`), including `allowBuilds` for sharp/esbuild and a block of `overrides` that pin transitive deps for Dependabot alerts. Each override has a comment explaining why; keep that comment discipline and drop an entry once `@lhci/cli` resolves it upstream.
- **Language**: code comments, commit messages, PR titles and descriptions are written in **English**, even though the site's content and UI copy are Italian. Conversation with the user in the Claude Code session can be in Italian.
