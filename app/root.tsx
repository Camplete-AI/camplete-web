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

  // 👉 adiciona aqui:
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Jomhuria&display=swap",
  },
];
export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { title: "Camplete AI — Launch Ads in Seconds with AI" },
  {
    name: "description",
    content:
      "Camplete AI is the fastest way to generate and publish ads on Google and Meta with AI. No experience needed. Ideal for creators and small businesses.",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "author", content: "Camplete AI" },
  { name: "robots", content: "index, follow" },
  { name: "theme-color", content: "#4f46e5" },

  // Open Graph
  {
    property: "og:title",
    content: "Camplete AI — Launch Ads in Seconds with AI",
  },
  {
    property: "og:description",
    content:
      "Generate AI-powered ad campaigns and go live in minutes. Camplete AI is built for creators, solopreneurs, and marketers who need fast, effective results.",
  },
  { property: "og:url", content: "https://www.Camplete AI.io/" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "Camplete AI" },
  { property: "og:image", content: "https://www.Camplete AI.io/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },

  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content: "Camplete AI — Launch Ads in Seconds with AI",
  },
  {
    name: "twitter:description",
    content:
      "Create and publish ads using AI. Target audiences. Save time. Camplete AI helps you go from idea to campaign in just a few clicks.",
  },
  { name: "twitter:image", content: "https://www.Camplete AI.io/og-image.png" },
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
