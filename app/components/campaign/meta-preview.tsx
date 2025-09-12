import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Heart,
  Share,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  headline: string;
  adDescription: string;
  objective: string;
  callToAction: string;
  budgetSuggestion: string;
  image?: string;
  specialAdCategories: string;
}

interface MetaPreviewProps {
  campaign: Campaign;
  placements: string[];
}

const placementConfig = {
  facebook: {
    icon: Facebook,
    name: "Facebook",
    color: "facebook-accent",
    bgColor: "bg-facebook/10",
  },
  instagram: {
    icon: Instagram,
    name: "Instagram",
    color: "instagram-accent",
    bgColor: "bg-instagram/10",
  },
  messenger: {
    icon: MessageCircle,
    name: "Messenger",
    color: "messenger-accent",
    bgColor: "bg-messenger/10",
  },
};

export function MetaPreview({ campaign, placements }: MetaPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Placements Overview */}
      <Card className="campaign-card border-facebook/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-facebook">
            <Facebook className="w-5 h-5" />
            Meta Ads Campaign
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            {placements.map((placement) => {
              const config =
                placementConfig[placement as keyof typeof placementConfig];
              if (!config) return null;

              const Icon = config.icon;
              return (
                <Badge
                  key={placement}
                  variant="secondary"
                  className={config.color}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {config.name}
                </Badge>
              );
            })}
          </div>
        </CardHeader>
      </Card>

      {/* Facebook Feed Preview */}
      {placements.includes("facebook") && (
        <Card className="campaign-card border-facebook/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-facebook">
              <Facebook className="w-4 h-4" />
              Facebook Feed Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background border border-border/50 rounded-lg p-4 max-w-md mx-auto">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-facebook/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-facebook">AD</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Your Business</p>
                  <p className="text-xs text-muted-foreground">Sponsored</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <p className="text-sm">{campaign.adDescription}</p>

                {campaign.image && (
                  <img
                    src={campaign.image}
                    alt="Campaign visual"
                    className="w-full rounded-lg"
                  />
                )}

                <Button
                  size="sm"
                  className="w-full bg-facebook hover:bg-facebook/90 text-white"
                >
                  {campaign.callToAction}
                </Button>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <button className="flex items-center gap-1 text-xs hover:text-facebook">
                    <ThumbsUp className="w-3 h-3" />
                    Like
                  </button>
                  <button className="flex items-center gap-1 text-xs hover:text-facebook">
                    <MessageSquare className="w-3 h-3" />
                    Comment
                  </button>
                  <button className="flex items-center gap-1 text-xs hover:text-facebook">
                    <Share className="w-3 h-3" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instagram Stories Preview */}
      {placements.includes("instagram") && (
        <Card className="campaign-card border-instagram/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-instagram">
              <Instagram className="w-4 h-4" />
              Instagram Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stories Preview */}
              <div>
                <h4 className="font-medium mb-3 text-instagram">Stories</h4>
                <div className="bg-black rounded-lg aspect-[9/16] max-w-[200px] mx-auto p-4 text-white relative">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">AD</span>
                      </div>
                      <span className="text-sm font-medium">Your Business</span>
                    </div>
                  </div>

                  {campaign.image && (
                    <img
                      src={campaign.image}
                      alt="Story background"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60"
                    />
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm mb-3 font-medium">
                      {campaign.headline}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-white text-black hover:bg-gray-100"
                    >
                      {campaign.callToAction}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Feed Preview */}
              <div>
                <h4 className="font-medium mb-3 text-instagram">Feed</h4>
                <div className="bg-background border border-border/50 rounded-lg p-4 max-w-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Your Business</p>
                      <p className="text-xs text-muted-foreground">Sponsored</p>
                    </div>
                  </div>

                  {campaign.image && (
                    <img
                      src={campaign.image}
                      alt="Campaign visual"
                      className="w-full aspect-square object-cover rounded-lg mb-3"
                    />
                  )}

                  <div className="flex items-center gap-4 mb-2">
                    <Heart className="w-5 h-5" />
                    <MessageSquare className="w-5 h-5" />
                    <Share className="w-5 h-5" />
                  </div>

                  <p className="text-sm">
                    <span className="font-semibold">Your Business</span>{" "}
                    {campaign.adDescription}
                  </p>

                  <Button
                    size="sm"
                    className="w-full mt-3 bg-instagram hover:bg-instagram/90 text-white"
                  >
                    {campaign.callToAction}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign Settings */}
      <Card className="campaign-card bg-gradient-to-r from-facebook/5 to-instagram/5 border-facebook/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-facebook" />
                Campaign Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Objective:</span>
                  <span>{campaign.objective}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span>{campaign.budgetSuggestion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Special Categories:
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {campaign.specialAdCategories || "None"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Active Placements</h4>
              <div className="space-y-2">
                {placements.map((placement) => {
                  const config =
                    placementConfig[placement as keyof typeof placementConfig];
                  if (!config) return null;

                  const Icon = config.icon;
                  return (
                    <div
                      key={placement}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span>{config.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Active
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
