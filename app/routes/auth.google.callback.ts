import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";
import { GoogleAdsApi } from "google-ads-api";

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const code = url.searchParams.get("code");
    const { userId } = await getAuth(args);

    if (!code || !userId) throw new Error("Invalid auth");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            grant_type: "authorization_code",
        }),
    });

    const raw = await tokenRes.text();
    const tokenData = JSON.parse(raw);
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    const googleAdsClient = new GoogleAdsApi({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        developer_token: process.env.GOOGLE_DEVELOPER_TOKEN!,
    });

    let customerId: string | null = null;
    try {
        const accessible = await googleAdsClient.listAccessibleCustomers(refreshToken);

        customerId = accessible?.resource_names?.[0]?.split("/")[1] ?? null;
    } catch (err) {
        console.error("❌ Erro ao acessar contas Google Ads:", err);
        throw new Response("Erro ao buscar conta do Google Ads", { status: 500 });
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
            googleCustomerId: customerId,
        },
    });

    if (!customerId) return redirect("/no-ads-account");
    return redirect("/dashboard");
}
