// app/routes/create-campaign.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateCampaign } from "@/lib/ai/generate-campaign";
import { createCampaign } from "@/lib/db/create-campaign";
import { getAuth } from "@clerk/remix/ssr.server";

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const image = String(formData.get("image") || "");

  const errors: Record<string, string> = {};

  if (!name || name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!description || description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (image && !image.startsWith("http")) {
    errors.image = "Image must be a valid URL";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { userId } = await getAuth(args);
  if (!userId) throw new Error("Not authenticated");

  const generated = await generateCampaign({ name, description });
  const campaign = await createCampaign(
    { name, description, image },
    generated,
    userId
  );

  return redirect(`/dashboard/preview-campaign/${campaign.id}`);
}

export default function CreateCampaignPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const errors = actionData?.errors;

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
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} required />
          {errors?.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input id="image" name="image" type="url" />
          {errors?.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        <Button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting"
            ? "Generating..."
            : "Create Campaign"}
        </Button>
      </Form>
    </div>
  );
}
