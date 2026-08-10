#!/usr/bin/env sh
# Run Lighthouse against a local production build (`pnpm lhci`).
#
# `astro preview` injects the dev toolbar, whose "Learn more" link fails
# Lighthouse's `link-text` SEO audit — a false positive that never appears on
# the published site. The toolbar is controlled by a per-user *preference*
# (.astro/settings.json), not by astro.config, so we disable it for the audit
# and restore the previous preference afterward. This keeps the local SEO score
# in line with the toolbar-free Netlify deploy that CI audits, so both configs
# can assert SEO at the same `error` threshold.
set -e

settings=".astro/settings.json"
backup="$(mktemp)"
had_settings=0
if [ -f "$settings" ]; then
  had_settings=1
  cp "$settings" "$backup"
fi

restore() {
  if [ "$had_settings" -eq 1 ]; then
    cp "$backup" "$settings"
  else
    rm -f "$settings"
  fi
  rm -f "$backup"
}
trap restore EXIT INT TERM

pnpm exec astro preferences disable devToolbar >/dev/null
pnpm build
pnpm exec lhci autorun --config=lighthouserc.local.json
