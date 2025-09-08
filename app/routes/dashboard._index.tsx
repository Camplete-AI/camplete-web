// app/routes/dashboard/route.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MousePointer, Eye, DollarSign, Users } from "lucide-react";
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
      metaAdAccountId: true,
    },
  });

  return {
    googleConnected: Boolean(user?.googleCustomerId),
    metaConnected: Boolean(user?.metaAdAccountId),
  };
}

export default function DashboardHome() {
  const { googleConnected, metaConnected } = useLoaderData<typeof loader>();

  const stats = [
    {
      title: "Campaigns Created",
      value: "3",
      icon: MousePointer,
      change: "+12.5%",
    },
    {
      title: "Estimated Spend",
      value: "$420",
      icon: DollarSign,
      change: "-5.3%",
    },
    {
      title: "AI Credits",
      value: "7",
      icon: Eye,
      change: "+8.2%",
    },
    {
      title: "Leads",
      value: "53",
      icon: Users,
      change: "+23.1%",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Let’s launch your next high-converting ad campaign with AI.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card
                key={i}
                className="shadow-soft hover:shadow-card transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-coral" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p
                    className={`text-xs ${
                      stat.change.includes("+")
                        ? "text-coral"
                        : "text-destructive"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Connected Accounts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <p className="font-medium">Google Ads</p>
                <Badge
                  variant={googleConnected ? "default" : "secondary"}
                  className={
                    googleConnected ? "bg-coral hover:bg-coral/80" : ""
                  }
                >
                  {googleConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {googleConnected ? (
                <form action="/auth/google/disconnect" method="post">
                  <Button type="submit" variant="destructive" size="sm">
                    Disconnect
                  </Button>
                </form>
              ) : (
                <form action="/auth/google/connect" method="get">
                  <Button type="submit" variant="outline" size="sm">
                    Connect
                  </Button>
                </form>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <p className="font-medium">Meta Ads</p>
                <Badge
                  variant={metaConnected ? "default" : "secondary"}
                  className={metaConnected ? "bg-coral hover:bg-coral/80" : ""}
                >
                  {metaConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {metaConnected ? (
                <form action="/auth/meta/disconnect" method="post">
                  <Button type="submit" variant="destructive" size="sm">
                    Disconnect
                  </Button>
                </form>
              ) : (
                <form action="/auth/meta/connect" method="get">
                  <Button type="submit" variant="outline" size="sm">
                    Connect
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Campaigns */}
        <Card className="shadow-soft">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Recent Campaigns</CardTitle>
            <Button asChild>
              <Link
                to="/dashboard/create-campaign"
                className="flex items-center gap-2"
              >
                New Campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border border-dashed border-muted rounded-md p-6 text-muted-foreground text-center">
              No campaigns yet. Start by launching your first one!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
