import { redirect } from "@remix-run/node";

export async function loader() {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("scope", [
        "https://www.googleapis.com/auth/adwords",
        "https://www.googleapis.com/auth/userinfo.email"
    ].join(" "));

    return redirect(url.toString());
}
