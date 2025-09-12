import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Target, DollarSign, Zap } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  headline: string;
  adDescription: string;
  objective: string;
  callToAction: string;
  budgetSuggestion: string;
  image?: string;
  biddingStrategy: string;
}

interface GooglePreviewProps {
  campaign: Campaign;
}

export function GooglePreview({ campaign }: GooglePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Performance Max Ad Preview */}
      <Card className="campaign-card border-google/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-google">
            <Target className="w-5 h-5" />
            Performance Max Campaign
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-google">
              Search
            </Badge>
            <Badge variant="secondary" className="text-google">
              Display
            </Badge>
            <Badge variant="secondary" className="text-google">
              YouTube
            </Badge>
            <Badge variant="secondary" className="text-google">
              Gmail
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ad Preview */}
          <div className="bg-background border border-border/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Ad
                </span>
                <span>example.com</span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>

            <h3 className="text-xl font-semibold text-google hover:underline cursor-pointer">
              {campaign.headline}
            </h3>

            <p className="text-foreground leading-relaxed">
              {campaign.adDescription}
            </p>

            {campaign.image && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={campaign.image}
                  alt="Campaign visual"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="bg-google hover:bg-google/90 text-white"
              >
                {campaign.callToAction}
              </Button>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-google" />
                <div>
                  <p className="font-medium">Campaign Objective</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.objective}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-google" />
                <div>
                  <p className="font-medium">Budget</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.budgetSuggestion}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-google" />
                <div>
                  <p className="font-medium">Bidding Strategy</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.biddingStrategy
                      .replace("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-google" />
                <div>
                  <p className="font-medium">Call to Action</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.callToAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="campaign-card bg-gradient-to-r from-google/5 to-google/10 border-google/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-google mb-3">
            <Zap className="w-4 h-4" />
            <span className="font-medium">AI Optimization Insights</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Audience Targeting</p>
              <p className="text-muted-foreground">
                Automatically optimized across all Google properties
              </p>
            </div>
            <div>
              <p className="font-medium">Asset Performance</p>
              <p className="text-muted-foreground">
                AI will test different combinations for best results
              </p>
            </div>
            <div>
              <p className="font-medium">Budget Allocation</p>
              <p className="text-muted-foreground">
                Dynamic distribution across high-performing channels
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
