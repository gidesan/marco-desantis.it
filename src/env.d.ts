/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GTAG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
