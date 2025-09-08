import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "prisma-backend/app/lib/prisma";
import { getAuth } from "@clerk/remix/ssr.server";

export async function action(args: ActionFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) throw new Response("Unauthorized", { status: 401 });

  const id = args.params.id!;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!campaign) throw new Response("Not found", { status: 404 });

  const payload = {
    login_customer_id: process.env.SANDBOX_MANAGER_ID,
    customer_id: campaign.user.googleCustomerId,
    budget_micros: campaign.budget ? campaign.budget * 1_000_000 : 50_000_000,
    bidding: {
      type: campaign.biddingStrategy ?? "MAXIMIZE_CONVERSION_VALUE",
      target_roas: campaign.conversionValue ? 3.5 : undefined,
    },
    final_url: "https://example.com",
    locations: ["2076"],
    languages: ["1014"],
    assets: {
      business_name: campaign.businessName ?? "Camplete AI",
      headlines: [campaign.headline],
      descriptions: [campaign.adDescription],
      long_headline: campaign.longHeadline ?? undefined,
      youtube_video_id: campaign.youtubeVideoUrl ?? undefined,
    },
  };

  const PY_BASE = process.env.ADS_PYTHON_BASE_URL ?? "http://localhost:8000";

  const resp = await fetch(`${PY_BASE}/pmax/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Response(`Python error: ${resp.status} ${text}`, { status: 502 });
  }

  await prisma.campaign.update({
    where: { id },
    data: { status: "PUBLISHED" },
  });

  return redirect("/dashboard");
}
