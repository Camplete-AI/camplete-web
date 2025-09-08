import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";
import { stateCookie } from "@/routes/auth.google.connect";
import {
    getAccessibleCustomerId,
    createCustomerInMcc,
    inviteClientFromMcc,
} from "@/utils/google-ads.server";

const exchangeCodeForTokens = async (code: string) => {
    const res = await fetch("https://oauth2.googleapis.com/token", {
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

    const json = await res.json();
    if (!res.ok) {
        throw new Error(
            `❌ Failed to exchange code: ${res.status} - ${JSON.stringify(json)}`
        );
    }

    return {
        accessToken: json.access_token as string,
        refreshToken: json.refresh_token as string | undefined,
    };
};

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");
    const cookieHeader = args.request.headers.get("cookie");
    const storedState = (await stateCookie.parse(cookieHeader)) || null;

    const { userId } = await getAuth(args);
    if (!userId) throw new Error("❌ User not authenticated");
    if (!code) throw new Error("❌ Missing Google OAuth code");
    if (!returnedState || returnedState !== storedState)
        throw new Error("❌ Invalid OAuth state");

    // 1. Troca o code por tokens do usuário
    const { accessToken, refreshToken } = await exchangeCodeForTokens(code);

    // 2. Tenta encontrar conta existente do usuário
    let googleCustomerId = await getAccessibleCustomerId(accessToken);

    if (!googleCustomerId) {
        // Usuário não tem Ads → cria
        console.log("⚠️ Nenhuma conta Ads encontrada → criando cliente...");
        googleCustomerId = await createCustomerInMcc();
    } else {
        // Usuário já tem Ads
        if (process.env.GOOGLE_ACCESS_LEVEL === "BASIC") {
            console.log("🔗 Conta Ads encontrada → enviando convite do MCC...");
            await inviteClientFromMcc(googleCustomerId);
        } else {
            console.log("ℹ️ Sandbox/Test Access → não é possível enviar convite. Usando conta existente.");
        }
    }

    // 3. Atualiza no banco
    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: accessToken,
            googleCustomerId,
            ...(refreshToken ? { googleRefreshToken: refreshToken } : {}),
        },
    });

    // 4. Redireciona para dashboard
    return redirect("/dashboard", {
        headers: {
            "Set-Cookie": await stateCookie.serialize("", { maxAge: 0 }),
        },
    });
}
