// app/routes/dashboard/route.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  MousePointer,
  Eye,
  DollarSign,
  Users,
  PlugZap,
  UnplugIcon,
} from "lucide-react";
import { Link, useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { prisma } from "prisma-backend/app/lib/prisma";

// 🔑 importa componentes do recharts
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

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

  // Mock de dados para os gráficos
  const lineData = [
    { name: "Mon", clicks: 120, impressions: 400 },
    { name: "Tue", clicks: 200, impressions: 600 },
    { name: "Wed", clicks: 150, impressions: 450 },
    { name: "Thu", clicks: 300, impressions: 800 },
    { name: "Fri", clicks: 250, impressions: 700 },
  ];

  const barData = [
    { name: "Google Ads", spend: 240 },
    { name: "Meta Ads", spend: 180 },
  ];

  return (
    <div className="min-h-screen p-6">
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#6B4EFF"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Spend by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spend" fill="#6B4EFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts */}
        <Card className="shadow-card border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Connected Accounts
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Link your ad accounts to unlock AI-powered campaigns.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Ads */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/40 transition-colors">
              <div className="flex items-center space-x-3">
                <p className="font-medium">Google Ads</p>
                <Badge
                  variant="outline"
                  className={
                    googleConnected
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {googleConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {googleConnected ? (
                <form action="/auth/google/disconnect" method="post">
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <UnplugIcon className="w-4 h-4" /> Disconnect
                  </Button>
                </form>
              ) : (
                <form action="/auth/google/connect" method="get">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-blue-600 border-blue-300"
                  >
                    <PlugZap className="w-4 h-4" /> Connect
                  </Button>
                </form>
              )}
            </div>

            {/* Meta Ads */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/40 transition-colors">
              <div className="flex items-center space-x-3">
                <p className="font-medium">Meta Ads</p>
                <Badge
                  variant="outline"
                  className={
                    metaConnected
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {metaConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
              {metaConnected ? (
                <form action="/auth/meta/disconnect" method="post">
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <UnplugIcon className="w-4 h-4" /> Disconnect
                  </Button>
                </form>
              ) : (
                <form action="/auth/meta/connect" method="get">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-indigo-600 border-indigo-300"
                  >
                    <PlugZap className="w-4 h-4" /> Connect
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
