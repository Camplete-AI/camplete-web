import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GooglePreview } from "@/components/campaign/google-preview";
import { MetaPreview } from "@/components/campaign/meta-preview";
import { ArrowLeft, Rocket, Eye, CheckCircle } from "lucide-react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "prisma-backend/app/lib/prisma";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Response("Missing campaign ID", { status: 400 });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      google: true,
      meta: true,
    },
  });
  if (!campaign) {
    throw new Response("Not found", { status: 404 });
  }

  const hasGoogle = !!campaign.user.googleAccessToken;
  const hasMeta = !!campaign.user.metaAccessToken;

  return { campaign, hasGoogle, hasMeta };
}

export default function PreviewCampaignPage() {
  const { campaign, hasGoogle, hasMeta } = useLoaderData<typeof loader>();

  const placements: string[] = campaign.placements
    ? JSON.parse(campaign.placements as any)
    : ["facebook", "instagram"];

  const handleGoBack = () => {
    window.history.back();
  };

  if (!hasGoogle && !hasMeta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">
              No Integrations Connected
            </CardTitle>
            <CardDescription>
              Please connect your Google Ads or Meta Ads account to preview
              campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoBack} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaign Creation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Creation
          </Button>

          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Preview Mode</span>
          </div>
        </div>

        {/* Campaign Generated */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Campaign Generated Successfully
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campaign Preview
          </h1>
          <p className="text-muted-foreground text-lg">
            Review your AI-generated campaign before publishing
          </p>
        </div>

        {/* Campaign Info */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{campaign.name}</CardTitle>
              <div className="flex gap-2">
                {hasGoogle && (
                  <Badge variant="outline" className="google-accent">
                    Google Ads
                  </Badge>
                )}
                {hasMeta && (
                  <Badge variant="outline" className="facebook-accent">
                    Meta Ads
                  </Badge>
                )}
              </div>
            </div>
            <CardDescription>
              Budget: {campaign.budgetSuggestion} • Strategy:{" "}
              {campaign.biddingStrategy?.replace("_", " ")}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Preview Tabs */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <Tabs
              defaultValue={hasGoogle ? "google" : "meta"}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                {hasGoogle && (
                  <TabsTrigger
                    value="google"
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-google rounded-full" />
                    Google Ads Preview
                  </TabsTrigger>
                )}
                {hasMeta && (
                  <TabsTrigger value="meta" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-facebook rounded-full" />
                    Meta Ads Preview
                  </TabsTrigger>
                )}
              </TabsList>

              {hasGoogle && (
                <TabsContent value="google">
                  <GooglePreview campaign={campaign} />
                </TabsContent>
              )}

              {hasMeta && (
                <TabsContent value="meta">
                  <MetaPreview campaign={campaign} placements={placements} />
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>

        {/* Publish Button */}
        <div className="flex justify-center">
          <form
            method="post"
            action={`/dashboard/publish-campaign/${campaign.id}`}
          >
            <Button
              size="lg"
              className="glow-on-hover shadow-elegant text-lg py-6 px-12"
              type="submit"
            >
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Publish Campaign
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
