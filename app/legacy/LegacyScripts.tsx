export default function LegacyScripts() {
  return (
    <>
      {[
        "legacy/javascripts/jquery.min.js",
        "legacy/javascripts/xbreadcrumbs.js",
        "legacy/javascripts/fancybox/jquery.fancybox.pack.js",
        "legacy/javascripts/jquery.elpaginator.js",
        // "legacy/javascripts/app.js",
      ].map((src) => (
        <script type="text/javascript" async key={src} src={src} />
      ))}
    </>
  );
}
