// app/routes/create-campaign.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, DollarSign, Image } from "lucide-react";
import { toast } from "sonner";
import { getAuth } from "@clerk/remix/ssr.server";
import { generateCampaign } from "@/lib/ai/generate-campaign";
import { createCampaign } from "@/lib/db/create-campaign";

// ----------------------------
// Server-side action (Remix)
// ----------------------------
export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const name = String(formData.get("name") || "");
  const description = String(formData.get("description") || "");
  const image = String(formData.get("image") || "");
  const budgetRaw = formData.get("budget");
  const budget = budgetRaw ? parseFloat(String(budgetRaw)) : NaN;
  const biddingStrategy = String(
    formData.get("biddingStrategy") || "MAXIMIZE_CONVERSIONS"
  );
  const specialAdCategories = String(
    formData.get("specialAdCategories") || "NONE"
  );

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
  if (isNaN(budget) || budget < 5) {
    errors.budget = "Budget must be at least R$5.00";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { userId } = await getAuth(args);
  if (!userId) throw new Error("Not authenticated");

  const generated = await generateCampaign({ name, description });

  const campaign = await createCampaign(
    { name, description, image, budget, biddingStrategy, specialAdCategories },
    generated,
    userId
  );

  return redirect(`/dashboard/preview-campaign/${campaign.id}`);
}

// ----------------------------
// Client-side component
// ----------------------------
export default function CreateCampaignPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const errors = actionData?.errors;

  const isSubmitting = navigation.state === "submitting";

  if (actionData?.errors) {
    toast.error("Validation Error", {
      description: "Please check the highlighted fields.",
    });
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI-Powered Campaign Creation
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            Create Campaign
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate a high-converting campaign in seconds with AI
          </p>
        </div>

        {/* Form (Remix Form) */}
        {/* Form (Remix Form) */}
        <Form method="post" className="space-y-6">
          {/* Cards em grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign Basics */}
            <Card className="shadow-elegant glow-on-hover md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Campaign Basics
                </CardTitle>
                <CardDescription>
                  Tell us about your campaign and we'll generate the perfect ad
                  copy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input id="name" name="name" required />
                  {errors?.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                  />
                  {errors?.description && (
                    <p className="text-destructive text-sm">
                      {errors.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Budget & Strategy */}
            <Card className="shadow-elegant glow-on-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Budget & Strategy
                </CardTitle>
                <CardDescription>
                  Set your budget and choose your optimization strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Daily Budget (R$)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    step="0.01"
                    min="5"
                    required
                    placeholder="50.00"
                  />
                  {errors?.budget && (
                    <p className="text-destructive text-sm">{errors.budget}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Bidding Strategy</Label>
                  <Select
                    name="biddingStrategy"
                    defaultValue="MAXIMIZE_CONVERSIONS"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BIDDING_STRATEGIES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <div>
                            <div className="font-medium">{s.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {s.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Media & Compliance */}
            <Card className="shadow-elegant glow-on-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Media & Compliance
                </CardTitle>
                <CardDescription>
                  Add visuals and specify any special requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input id="image" name="image" type="url" />
                  {errors?.image && (
                    <p className="text-destructive text-sm">{errors.image}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>
                    Special Ad Categories
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Meta Ads
                    </Badge>
                  </Label>
                  <Select name="specialAdCategories" defaultValue="NONE">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIAL_AD_CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <div>
                            <div className="font-medium">{c.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {c.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full glow-on-hover shadow-elegant text-lg py-6"
          >
            <div className="flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating Campaign...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Create AI Campaign
                </>
              )}
            </div>
          </Button>
        </Form>
      </div>
    </div>
  );
}

const BIDDING_STRATEGIES = [
  {
    value: "MAXIMIZE_CONVERSIONS",
    label: "Maximize Conversions",
    description: "Get the most conversions for your budget",
  },
  {
    value: "TARGET_CPA",
    label: "Target CPA",
    description: "Target a specific cost per acquisition",
  },
  {
    value: "MAXIMIZE_CLICKS",
    label: "Maximize Clicks",
    description: "Get the most clicks for your budget",
  },
  {
    value: "TARGET_ROAS",
    label: "Target ROAS",
    description: "Target a specific return on ad spend",
  },
];

const SPECIAL_AD_CATEGORIES = [
  {
    value: "NONE",
    label: "None",
    description: "Standard ads with no restrictions",
  },
  {
    value: "HOUSING",
    label: "Housing",
    description: "Real estate, rentals, or housing-related ads",
  },
  {
    value: "EMPLOYMENT",
    label: "Employment",
    description: "Job postings and employment opportunities",
  },
  {
    value: "CREDIT",
    label: "Credit",
    description: "Financial services and credit offers",
  },
];
