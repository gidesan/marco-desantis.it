// One-shot: render the raster brand assets (icon.png, social.png) that Meta.astro
// and the manifest import through Astro's asset pipeline. Run with `node
// scripts/gen-assets.mjs` after installing dependencies (needs sharp).
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const imagesDir = join(dirname(fileURLToPath(import.meta.url)), "../src/images");

const CREAM = "#f8f6f1";
const TERRACOTTA = "#b25334";
const INK = "#2a2522";

// 512×512 app icon (terracotta square + serif monogram).
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${TERRACOTTA}"/>
  <text x="256" y="256" fill="${CREAM}" font-family="Georgia, 'Times New Roman', serif" font-size="300" font-weight="600" font-style="italic" text-anchor="middle" dominant-baseline="central">M</text>
</svg>`;

// 1200×600 Open Graph / social card.
const socialSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
  <rect width="1200" height="600" fill="${CREAM}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${TERRACOTTA}"/>
  <text x="600" y="250" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="90" font-weight="600" text-anchor="middle">Marco Ignazio de Santis</text>
  <text x="600" y="330" fill="${TERRACOTTA}" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic" text-anchor="middle">Poeta, scrittore e giornalista</text>
  <rect x="540" y="380" width="120" height="2" fill="${TERRACOTTA}"/>
</svg>`;

await sharp(Buffer.from(iconSvg)).png().toFile(join(imagesDir, "icon.png"));
await sharp(Buffer.from(socialSvg)).png().toFile(join(imagesDir, "social.png"));
console.log("Generated src/images/icon.png and src/images/social.png");
