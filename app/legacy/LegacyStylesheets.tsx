export default function LegacyStylesheets() {
  return (
    <>
      {[
        "legacy/stylesheets/base.css",
        "legacy/stylesheets/skeleton.css",
        "legacy/stylesheets/xbreadcrumbs.css",
        "legacy/stylesheets/layout.css",
        "legacy/javascripts/fancybox/jquery.fancybox.css",
      ].map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
