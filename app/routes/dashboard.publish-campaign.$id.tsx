import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "prisma-backend/app/lib/prisma";
import { getAuth } from "@clerk/remix/ssr.server";
import { createGoogleCampaign } from "@/lib/google/craete-google-campaign";

export async function action(args: ActionFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) throw new Response("Unauthorized", { status: 401 });

  const campaign = await prisma.campaign.findUnique({
    where: { id: args.params.id },
  });

  if (!campaign) throw new Response("Not found", { status: 404 });

  await createGoogleCampaign(campaign.id);

  await prisma.campaign.update({
    where: { id: campaign.id },
    data: { status: "PUBLISHED" },
  });

  return redirect("/dashboard");
}
