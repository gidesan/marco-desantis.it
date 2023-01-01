import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import LegacyBreadcrumbs from "./legacy/LegacyBreadcrumbs";
import LegacyDesktopNavMenu from "./legacy/LegacyDesktopNavMenu";
import LegacyMobileNavMenu from "./legacy/LegacyMobileNavMenu";

import baseStyles from "./legacy/stylesheets/base.css";
import skeletonStyles from "./legacy/stylesheets/skeleton.css";
import xbreadcrumbsStyles from "./legacy/stylesheets/xbreadcrumbs.css";
import layoutStyles from "./legacy/stylesheets/layout.css";
//"legacy/javascripts/fancybox/jquery.fancybox.css",

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Marco Ignazio de Santis",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const matches = useMatches();
  const lastMatch = matches.pop();
  const bodyClass = lastMatch?.pathname.split("/").pop();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={bodyClass}>
        <div id="body-wrap" className="container">
          <LegacyDesktopNavMenu />
          <LegacyMobileNavMenu />
          <div id="wrapper" className="container">
            <div
              id="header"
              className="fourteen columns offset-by-one roffset-by-one"
            >
              <a href="/">
                <h1>
                  <span className="dropcaps">M</span>arco{" "}
                  <span className="dropcaps">I</span>gnazio de{" "}
                  <span className="dropcaps">S</span>antis
                  <div>poeta e scrittore</div>
                </h1>
              </a>
              <hr />
            </div>
            <LegacyBreadcrumbs />
            <Outlet />
          </div>
          <div id="footer" className="sixteen columns">
            <p>&copy; {new Date().getFullYear()} Marco Ignazio de Santis</p>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [baseStyles, skeletonStyles, xbreadcrumbsStyles, layoutStyles].map(
    (style) => ({ rel: "stylesheet", href: style })
  );
}
