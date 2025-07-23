import { GoogleAdsApi } from "google-ads-api";

export const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_DEVELOPER_TOKEN!,
});


export const googleAdsClient = {
    async createAsset({
        imageUrl,
        customerId,
        token,
    }: {
        imageUrl: string;
        customerId: string;
        token: string;
    }) {

        const customer = client.Customer({
            customer_id: customerId,
            refresh_token: token,
        });

        const asset = await customer.assets.create([
            {
                name: "Main Image Asset",
                image_asset: {
                    data: await fetch(imageUrl).then((r) => r.buffer()),
                },
                final_urls: ["https://example.com"],
            },
        ]);

        return asset;
    },
};
