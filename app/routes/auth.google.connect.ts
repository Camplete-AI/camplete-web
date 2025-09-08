// app/routes/auth/google/route.ts
import { redirect, createCookie } from "@remix-run/node";

import { v4 as uuidv4 } from "uuid";

// Cookie para armazenar o `state` temporariamente e prevenir CSRF
export const stateCookie = createCookie("google_oauth_state", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 300, // 5 minutos
});

export async function loader() {
    const state = uuidv4(); // Prevencao de CSRF

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "consent"); // força refresh_token
    url.searchParams.set("scope", [
        "openid",
        "https://www.googleapis.com/auth/adwords",
        "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "));
    url.searchParams.set("state", state); // protege contra CSRF

    return redirect(url.toString(), {
        headers: {
            "Set-Cookie": await stateCookie.serialize(state),
        },
    });
}
