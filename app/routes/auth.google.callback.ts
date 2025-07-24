import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";

async function getMccAccessToken() {
    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            refresh_token: process.env.MCC_REFRESH_TOKEN!,
            grant_type: "refresh_token",
        }),
    });

    const json = await res.json();
    if (!res.ok) {
        throw new Error(`Failed to get MCC access_token: ${res.status} - ${JSON.stringify(json)}`);
    }
    return json.access_token as string;
}

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const code = url.searchParams.get("code");
    const { userId } = await getAuth(args);

    if (!userId) throw new Error("User not authenticated");
    if (!code) throw new Error("Missing Google code");

    // Troca o code do usuário por access/refresh tokens
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

    const tokenData = await tokenRes.json();
    const userAccessToken = tokenData.access_token;
    const userRefreshToken = tokenData.refresh_token;

    // Access token do MCC (para criar a subconta)
    const managerId = process.env.SANDBOX_MANAGER_ID?.replace(/-/g, "");
    if (!managerId) throw new Error("Missing SANDBOX_MANAGER_ID");
    const mccAccessToken = await getMccAccessToken();

    const createResponse = await fetch(
        `https://googleads.googleapis.com/v18/customers/${managerId}:createCustomerClient`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "developer-token": process.env.GOOGLE_DEVELOPER_TOKEN!,
                "login-customer-id": managerId,
                Authorization: `Bearer ${mccAccessToken}`,
            },
            body: JSON.stringify({
                customerClient: {
                    descriptiveName: `Client ${Date.now()}`,
                    currencyCode: "USD",
                    timeZone: "America/New_York",
                },
            }),
        }
    );

    if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create customer: ${createResponse.status} - ${errorText}`);
    }

    const createData = await createResponse.json();
    const resourceName = createData.resourceName;
    const newCustomerId = resourceName?.split("/")[1];
    if (!newCustomerId) {
        throw new Error("Could not extract customer ID from response");
    }

    // Salva dados no banco (tokens do user + customerId que você gerou no seu MCC)
    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: userAccessToken,
            googleRefreshToken: userRefreshToken,
            googleCustomerId: newCustomerId,
        },
    });

    return redirect("/dashboard");
}
