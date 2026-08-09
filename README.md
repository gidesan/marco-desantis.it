# marco-desantis.it

Sito personale di Marco Ignazio de Santis — poeta, scrittore e giornalista.
Astro (static output) + Tailwind CSS v4, deployato su Netlify.

## Sviluppo

Il package manager è **pnpm** (vedi `packageManager` in `package.json` e
`pnpm-workspace.yaml`); un `preinstall` guard blocca `npm`/`yarn`.

```sh
pnpm install
pnpm dev
```

Apri [http://localhost:4321](http://localhost:4321).

Altri comandi:

```sh
pnpm check     # astro check (type-check + diagnostica)
pnpm build     # astro check && astro build -> dist/
pnpm preview   # serve dist/ in locale
pnpm lint      # eslint
pnpm format    # prettier --write
```

## Deployment

Sito statico su Netlify (`netlify.toml`): build command `pnpm run build`,
publish directory `dist`. Netlify rileva `pnpm-lock.yaml` e installa le
dipendenze con pnpm automaticamente prima della build.

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```
