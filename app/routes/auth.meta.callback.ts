import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "prisma-backend/app/lib/prisma";
import { metaStateCookie } from "./auth.meta.connect";

async function exchangeCodeForToken(code: string, redirectUri: string) {
    const res = await fetch(
        `https://graph.facebook.com/v23.0/oauth/access_token` +
        `?client_id=${process.env.META_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&client_secret=${process.env.META_CLIENT_SECRET}` +
        `&code=${code}`
    );

    const json = await res.json();
    if (!res.ok || !json.access_token) {
        throw new Error(`❌ Failed to exchange code: ${JSON.stringify(json)}`);
    }

    return json.access_token as string;
}

async function getAdAccounts(accessToken: string) {
    const res = await fetch(
        `https://graph.facebook.com/v23.0/me/adaccounts?access_token=${accessToken}`
    );
    const json = await res.json();
    if (!res.ok) {
        throw new Error(`❌ Failed to fetch ad accounts: ${JSON.stringify(json)}`);
    }
    return json?.data ?? [];
}

async function getPages(accessToken: string) {
    const res = await fetch(
        `https://graph.facebook.com/v23.0/me/accounts?access_token=${accessToken}`
    );
    const json = await res.json();
    if (!res.ok) {
        throw new Error(`❌ Failed to fetch pages: ${JSON.stringify(json)}`);
    }
    return json?.data ?? [];
}

export async function loader(args: LoaderFunctionArgs) {
    try {
        const url = new URL(args.request.url);
        const code = url.searchParams.get("code");
        const returnedState = url.searchParams.get("state");
        const cookieHeader = args.request.headers.get("cookie");
        const stored = (await metaStateCookie.parse(cookieHeader)) || null;

        if (!code) return redirect("/dashboard?error=facebook_code_missing");
        if (!stored) return redirect("/dashboard?error=no_cookie");

        const { state: storedState, userId } = JSON.parse(stored);

        if (!returnedState || returnedState !== storedState) {
            return redirect("/dashboard?error=state_mismatch");
        }
        if (!userId) {
            return redirect("/sign-in");
        }

        const redirectUri = process.env.META_REDIRECT_URI!;
        const accessToken = await exchangeCodeForToken(code, redirectUri);

        // pega ad accounts
        const accounts = await getAdAccounts(accessToken);
        const adAccountId = accounts[0]?.id ?? null;

        // pega pages
        const pages = await getPages(accessToken);
        const pageId = pages[0]?.id ?? null;

        await prisma.user.update({
            where: { id: userId },
            data: {
                metaAccessToken: accessToken,
                metaAdAccountId: adAccountId,
                metaPageId: pageId,
            },
        });

        return redirect("/dashboard", {
            headers: {
                // 🔥 limpa o cookie depois de usar
                "Set-Cookie": await metaStateCookie.serialize("", { maxAge: 0 }),
            },
        });
    } catch (err) {
        console.error("❌ Error in Meta callback loader:", err);
        return redirect("/dashboard?error=unexpected_facebook");
    }
}
