const GOOGLE_API_BASE = "https://googleads.googleapis.com/v21";

export const createHeaders = (token: string, customerId: string) => {
    if (!customerId) {
        throw new Error("Missing Customer ID for campaign creation");
    }

    console.log(`🔑 Creating campaign for user account: ${customerId}`);

    return {
        Authorization: `Bearer ${token}`,
        "developer-token": process.env.GOOGLE_DEVELOPER_TOKEN!,
        "login-customer-id": process.env.SANDBOX_MANAGER_ID,
        "Content-Type": "application/json",
    };
};

/**
 * Troca o refreshToken do MCC por um accessToken válido
 */
export async function getMccAccessToken(): Promise<string> {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            refresh_token: process.env.MCC_REFRESH_TOKEN!,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            grant_type: "refresh_token",
        }),
    });

    const json = await res.json();
    if (!res.ok) {
        throw new Error(
            `❌ Failed to refresh MCC token: ${res.status} - ${JSON.stringify(json)}`
        );
    }

    return json.access_token as string;
}

/**
 * Lista contas acessíveis pelo usuário logado (com token do usuário)
 */
export async function getAccessibleCustomerId(
    userAccessToken: string
): Promise<string | null> {
    const res = await fetch(
        `${GOOGLE_API_BASE}/customers:listAccessibleCustomers`,
        {
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
                "developer-token": process.env.GOOGLE_DEVELOPER_TOKEN!,
            },
        }
    );

    const json = await res.json();
    if (!res.ok) {
        throw new Error(
            `❌ listAccessibleCustomers failed: ${res.status} - ${JSON.stringify(
                json
            )}`
        );
    }

    const resource = json.resourceNames?.[0]; // "customers/1234567890"
    const match = resource?.match(/^customers\/(\d+)$/);
    return match ? match[1] : null;
}

/**
 * Envia convite do MCC para gerenciar uma conta cliente
 * - Auth = MCC Access Token
 * - login-customer-id = MCC ID
 * - body = { operations: [{ create: {...} }] }
 */
export async function inviteClientFromMcc(clientCustomerId: string) {
    const MCC_ID = process.env.SANDBOX_MANAGER_ID!;
    const DEV_TOKEN = process.env.GOOGLE_DEVELOPER_TOKEN!;
    const mccAccessToken = await getMccAccessToken();

    const res = await fetch(
        `${GOOGLE_API_BASE}/customers/${MCC_ID}/customerClientLinks:mutate`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${mccAccessToken}`,
                "developer-token": DEV_TOKEN,
                "login-customer-id": MCC_ID,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: {
                    create: {
                        clientCustomer: `customers/${clientCustomerId}`,
                        status: "PENDING"
                    }
                }
            }),
        }
    );

    const json = await res.json();
    if (!res.ok) {
        throw new Error(
            `❌ Failed to invite client: ${res.status} - ${JSON.stringify(json)}`
        );
    }

    console.log("✅ Invite sent from MCC to client:", json);
    return json;
}


/**
 * Cria uma nova conta cliente diretamente dentro do MCC
 */
export async function createCustomerInMcc(): Promise<string> {
    const mccAccessToken = await getMccAccessToken();
    const managerId = process.env.SANDBOX_MANAGER_ID!;
    const developerToken = process.env.GOOGLE_DEVELOPER_TOKEN!;

    const res = await fetch(
        `${GOOGLE_API_BASE}/customers/${managerId}:createCustomerClient`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${mccAccessToken}`,
                "developer-token": developerToken,
                "login-customer-id": managerId,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerClient: {
                    descriptiveName: `Camplete AI User ${Date.now()}`,
                    currencyCode: "USD",
                    timeZone: "America/New_York",
                },
            }),
        }
    );

    const json = await res.json();
    if (!res.ok) {
        throw new Error(
            `❌ createCustomerClient failed: ${res.status} - ${JSON.stringify(json)}`
        );
    }

    const resource = json.resourceName; // "customers/1234567890"
    const match = resource?.match(/^customers\/(\d+)$/);
    if (!match) throw new Error("❌ Failed to parse new customer ID");

    return match[1];
}
