// app/routes/create-campaign.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { generateCampaign } from "@/lib/ai/generate-campaign";
import { createCampaign } from "@/lib/db/create-campaign";
import { createStripeCheckoutSession } from "@/lib/stripe/show-payment-method";
import { getAuth } from "@clerk/remix/ssr.server";

const CampaignSchema = zfd.formData({
  name: z.string().min(3),
  description: z.string().min(10),
  image: z.string().url().optional(),
});

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const { userId } = await getAuth(args);

  const data = CampaignSchema.parse(formData);
  const generated = await generateCampaign(data);
  const campaign = await createCampaign(data, generated, userId!);
  const paymentUrl = await createStripeCheckoutSession(userId!, campaign.id);

  return redirect(paymentUrl);
}

export default function CreateCampaignPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Create Campaign</h1>
      <p className="text-muted-foreground">
        Generate a campaign powered by AI in seconds.
      </p>

      <Form method="post" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Campaign Name</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input id="image" name="image" type="url" />
        </div>

        {actionData?.error && (
          <p className="text-red-500 text-sm">{actionData.error}</p>
        )}
        {actionData?.success && (
          <p className="text-green-600 text-sm">{actionData.message}</p>
        )}

        <Button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting"
            ? "Generating..."
            : "Create Campaign"}
        </Button>
      </Form>
    </div>
  );
}
