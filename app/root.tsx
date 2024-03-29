import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import Breadcrumbs from "./components/Breadcrumbs";
import DesktopNavMenu from "./components/DesktopNavMenu";
import MobileNavMenu from "./components/MobileNavMenu";

import baseStyles from "./legacy/stylesheets/base.css";
import skeletonStyles from "./legacy/stylesheets/skeleton.css";
import xbreadcrumbsStyles from "./legacy/stylesheets/xbreadcrumbs.css";
import layoutStyles from "./legacy/stylesheets/layout.css";
import fancyboxStyles from "@fancyapps/ui/dist/fancybox.css";
import type { MetaFunction } from "@remix-run/node";
import { pageTitle } from "./helpers";

export const meta: MetaFunction = ({ location }) => {
  return {
    charset: "utf-8",
    title: pageTitle(location.pathname),
    viewport: "width=device-width,initial-scale=1",
  };
};

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
          <DesktopNavMenu />
          <MobileNavMenu />
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
            <Breadcrumbs />
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
  return [
    baseStyles,
    skeletonStyles,
    xbreadcrumbsStyles,
    layoutStyles,
    fancyboxStyles,
  ].map((style) => ({ rel: "stylesheet", href: style }));
}
