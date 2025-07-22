// app/routes/dashboard/route.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link, useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) throw redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleCustomerId: true,
    },
  });

  return { googleConnected: Boolean(user?.googleCustomerId) };
}

export default function DashboardHome() {
  const { googleConnected } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back 👋</h1>
        <p className="text-muted-foreground mt-1">
          Let’s launch your next high-converting ad campaign with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold space-y-2">
            {googleConnected ? (
              <div className="space-y-2">
                <div>Google Ads ✅</div>
                <form action="/auth/google/disconnect" method="post">
                  <Button type="submit" variant="destructive" size="sm">
                    Disconnect
                  </Button>
                </form>
              </div>
            ) : (
              <form action="/auth/google/connect" method="get">
                <Button type="submit" variant="outline">
                  Connect Google Ads
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaigns Created</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">3</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated Spend</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">$420</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Credits</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">7</CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Campaigns
          </h2>
          <Button asChild>
            <Link
              to="/dashboard/create-campaign"
              className="flex items-center gap-2"
            >
              New Campaign <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="border border-dashed border-muted rounded-md p-6 mt-4 text-muted-foreground text-center">
          No campaigns yet. Start by launching your first one!
        </div>
      </div>
    </div>
  );
}
