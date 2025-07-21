import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { ClerkApp } from "@clerk/remix";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import { rootAuthLoader } from "@clerk/remix/ssr.server";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.svg",
    type: "image/svg",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { title: "OneClickAds — Launch Ads in Seconds with AI" },
  {
    name: "description",
    content:
      "OneClickAds is the fastest way to generate and publish ads on Google and Meta with AI. No experience needed. Ideal for creators and small businesses.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "author", content: "OneClickAds" },
  { name: "robots", content: "index, follow" },
  { name: "theme-color", content: "#4f46e5" },

  // Open Graph
  {
    property: "og:title",
    content: "OneClickAds — Launch Ads in Seconds with AI",
  },
  {
    property: "og:description",
    content:
      "Generate AI-powered ad campaigns and go live in minutes. OneClickAds is built for creators, solopreneurs, and marketers who need fast, effective results.",
  },
  { property: "og:url", content: "https://www.oneclickads.io/" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "OneClickAds" },
  { property: "og:image", content: "https://www.oneclickads.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },

  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content: "OneClickAds — Launch Ads in Seconds with AI",
  },
  {
    name: "twitter:description",
    content:
      "Create and publish ads using AI. Target audiences. Save time. OneClickAds helps you go from idea to campaign in just a few clicks.",
  },
  { name: "twitter:image", content: "https://www.oneclickads.io/og-image.png" },
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default ClerkApp(App, {
  afterSignOutUrl: "/",
});
