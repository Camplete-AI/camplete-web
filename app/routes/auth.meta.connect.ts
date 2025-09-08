import { redirect, createCookie } from "@remix-run/node";
import crypto from "crypto";

export const metaStateCookie = createCookie("meta_oauth_state", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 300, // 5 min
});

export async function loader() {
    const state = crypto.randomUUID();
    const clientId = process.env.META_CLIENT_ID!;
    const redirectUri = process.env.META_REDIRECT_URI!;
    const scopes = ["ads_management", "pages_show_list", "business_management"];

    const oauthUrl = new URL("https://www.facebook.com/v23.0/dialog/oauth");
    oauthUrl.searchParams.set("client_id", clientId);
    oauthUrl.searchParams.set("redirect_uri", redirectUri);
    oauthUrl.searchParams.set("scope", scopes.join(","));
    oauthUrl.searchParams.set("response_type", "code");
    oauthUrl.searchParams.set("state", state);

    return redirect(oauthUrl.toString(), {
        headers: {
            "Set-Cookie": await metaStateCookie.serialize(state),
        },
    });
}
