import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
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
    return res.json();
}

async function getAdAccounts(accessToken: string) {
    const res = await fetch(
        `https://graph.facebook.com/v23.0/me/adaccounts?access_token=${accessToken}`
    );
    return res.json();
}

export async function loader(args: LoaderFunctionArgs) {
    try {
        const url = new URL(args.request.url);
        const code = url.searchParams.get("code");
        const returnedState = url.searchParams.get("state");
        const cookieHeader = args.request.headers.get("cookie");
        const storedState = (await metaStateCookie.parse(cookieHeader)) || null;

        if (!code) return redirect("/dashboard?error=facebook");
        if (!returnedState || returnedState !== storedState) {
            return redirect("/dashboard?error=state_mismatch");
        }

        // 🔑 Aqui: pega o usuário logado pelo Clerk
        const { userId } = await getAuth(args);
        if (!userId) return redirect("/sign-in");

        // troca code -> token
        const redirectUri = process.env.META_REDIRECT_URI!;
        const tokenData = await exchangeCodeForToken(code, redirectUri);
        if (!tokenData.access_token) {
            return redirect("/dashboard?error=token_facebook");
        }

        const accessToken = tokenData.access_token;
        const accountsData = await getAdAccounts(accessToken);
        const adAccountId = accountsData?.data?.[0]?.id ?? null;

        // 🔥 Salva direto no banco
        await prisma.user.update({
            where: { id: userId },
            data: {
                metaAccessToken: accessToken,
                metaAdAccountId: adAccountId,
            },
        });

        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": await metaStateCookie.serialize("", { maxAge: 0 }),
            },
        });
    } catch (err) {
        console.error("❌ Error in Meta callback loader:", err);
        return redirect("/dashboard?error=unexpected_facebook");
    }
}
