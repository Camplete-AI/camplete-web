import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";
import { GoogleAdsApi, fields } from "google-ads-api";


const IS_DEV = process.env.NODE_ENV === "development";

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const code = url.searchParams.get("code");
    const { userId } = await getAuth(args);

    if (!userId) throw new Error("User not authenticated");
    if (!code) throw new Error("Missing Google code");

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
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;

    if (IS_DEV) {
        const googleAdsClient = new GoogleAdsApi({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            developer_token: process.env.GOOGLE_DEVELOPER_TOKEN!,
        });

        const mccCustomer = googleAdsClient.Customer({
            customer_id: process.env.SANDBOX_MANAGER_ID!,
            refresh_token: refreshToken,
        });


        const operations = [
            {
                resource: {
                    resource_name: "customers/-",
                    descriptive_name: `Test Client ${Date.now()}`,
                    currency_code: "USD",
                    time_zone: "America/New_York",
                },
                entity: "customer" as fields.Resource,
                operation: "create" as const,
            },
        ];

        const response = await mccCustomer.mutateResources(operations);


        const customerResult = response.mutate_operation_responses?.[0]?.customer_result;
        const newCustomerId = customerResult?.resource_name?.split("/")[1];


        await prisma.user.update({
            where: { id: userId },
            data: {
                googleAccessToken: accessToken,
                googleRefreshToken: refreshToken,
                googleCustomerId: newCustomerId,
            },
        });

        return redirect("/dashboard");
    }

    // produção normal (pega conta real do usuário)
    const googleAdsClient = new GoogleAdsApi({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        developer_token: process.env.GOOGLE_DEVELOPER_TOKEN!,
    });

    const accessible = await googleAdsClient.listAccessibleCustomers(accessToken);
    const realCustomerId = accessible?.resource_names?.[0]?.split("/")[1] ?? null;

    if (!realCustomerId) return redirect("/no-ads-account");

    await prisma.user.update({
        where: { id: userId },
        data: {
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
            googleCustomerId: realCustomerId,
        },
    });

    return redirect("/dashboard");
}
