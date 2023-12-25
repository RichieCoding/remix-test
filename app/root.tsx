import styles from "../tailwind.css";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Layout from "./components/Layout";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => [
  { title: "Cricri Curls" },
  {
    property: "og:title",
    content: "Cricri Curls",
  },
  { name: "description", content: "Curly haired products for the sexy ones" },
  { charSet: "utf-8" }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
