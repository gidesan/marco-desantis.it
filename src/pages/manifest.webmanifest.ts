import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import iconSrc from "@images/icon.png";
import { SITE } from "@/site";

// Web app manifest. Icons run through Astro's asset pipeline for hashed URLs.
export const GET: APIRoute = async () => {
  const icon192 = await getImage({
    src: iconSrc,
    width: 192,
    height: 192,
    format: "png",
  });
  const icon512 = await getImage({
    src: iconSrc,
    width: 512,
    height: 512,
    format: "png",
  });

  const manifest = {
    name: SITE.title,
    short_name: SITE.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#b25334",
    icons: [
      { src: icon192.src, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: icon512.src, sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: icon512.src,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
};
