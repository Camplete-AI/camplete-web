import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-06-30.basil" });

export async function createStripeCheckoutSession(userId: string, campaignId: string) {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "usd",
                unit_amount: 2000,
                product_data: { name: "AI-Powered Campaign" },
            },
            quantity: 1,
        }],
        metadata: { userId, campaignId },
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/create-campaign`,
    });

    return session.url!;
}
