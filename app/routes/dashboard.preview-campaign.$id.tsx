// app/routes/dashboard/preview-campaign.$id.tsx
import { Button } from "@/components/ui/button";
import { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { prisma } from "prisma-backend/app/lib/prisma";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Response("Missing campaign ID", { status: 400 });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
  });

  if (!campaign) {
    throw new Response("Not found", { status: 404 });
  }

  return { campaign };
}
export default function PreviewCampaignPage() {
  const { campaign } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">Campaign Preview</h1>

      <div className="border rounded p-4 space-y-2 bg-muted/30">
        <h2 className="text-xl font-semibold">{campaign.headline}</h2>
        <p className="text-muted-foreground">{campaign.adDescription}</p>
        <p>
          <strong>Audience:</strong> {campaign.audience}
        </p>
        <p>
          <strong>Objective:</strong> {campaign.objective}
        </p>
        <p>
          <strong>CTA:</strong> {campaign.callToAction}
        </p>
        <p>
          <strong>Budget:</strong> {campaign.budgetSuggestion}
        </p>
        <p>
          <strong>Keywords:</strong> {campaign.keywords}
        </p>
        {campaign.conversionCategory && (
          <p>
            <strong>Conversion Category:</strong> {campaign.conversionCategory}
          </p>
        )}
        {campaign.conversionValue && (
          <p>
            <strong>Conversion Value:</strong> R${" "}
            {campaign.conversionValue.toFixed(2)}
          </p>
        )}
        {campaign.image && (
          <img
            src={campaign.image}
            alt="Campaign visual"
            className="mt-4 rounded-md w-full max-w-md"
          />
        )}
      </div>

      <form method="post" action={`/dashboard/publish-campaign/${campaign.id}`}>
        <Button type="submit">Publish Campaign</Button>
      </form>
    </div>
  );
}
