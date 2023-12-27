import styles from "../tailwind.css";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";
import Layout from "./components/Layout";
import { commitSession, getSession } from "./sessions";
import { createCart, getCart } from "./lib/shopify";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "Cricri Curls" },
  {
    property: "og:title",
    content: "Cricri Curls",
  },
  { name: "description", content: "Curly haired products for the sexy ones" },
  { charSet: "utf-8" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  let cartId = session.get("cartId");
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId) {
    cart = await createCart();
    cartId = cart.id;
    session.set("cartId", cartId);

    const cookieHeader = await commitSession(session);
    return json(
      { cart },
      {
        headers: {
          "Set-Cookie": cookieHeader,
        },
      }
    );
  }

  if (!cart) {
    throw new Response("cart was not able to be initialized", { status: 500 });
  }

  return json({ cart });
};

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
