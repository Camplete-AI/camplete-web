import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Lightbulb, Target, TrendingUp } from "lucide-react";

const ComparisonSection = () => {
  const competitors = [
    {
      name: "Our Platform",
      cost: "~$250¹",
      setupTime:
        "From idea to campaign in minutes, direct and without bureaucracy",
      tools: "Everything in one integrated panel",
      efficiency: "AI automation, error-free checking",
      focus: "You communicate directly, no intermediaries",
      icon: Lightbulb,
      color: "text-primary",
      isHighlight: true,
    },
    {
      name: "Internal Team",
      cost: "≥ $2,000²",
      setupTime: "Weeks for training, onboarding, planning and execution",
      tools: "Every week the team invents they need an extra tool",
      efficiency: "Dependent on team experience",
      focus: "Distraction and fads",
      icon: Users,
      color: "text-orange-500",
    },
    {
      name: "Agency/Advisory",
      cost: "From $3,000³",
      setupTime: "Weeks for briefing, approval and execution",
      tools: "Team uses own stack, but client doesn't control",
      efficiency: "High, but requires constant alignments",
      focus: "Generic content to reuse work",
      icon: Target,
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Comparison
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            See why were the{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              smart choice
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare costs, efficiency, and control across different advertising
            solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {competitors.map((competitor, index) => (
              <Card
                key={index}
                className={`relative p-8 transition-all duration-300 ${
                  competitor.isHighlight
                    ? "border-2 border-primary/50 bg-primary/5 hover:border-primary shadow-elegant"
                    : "hover:shadow-lg"
                }`}
              >
                {competitor.isHighlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Best Choice
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${
                      competitor.isHighlight ? "bg-primary/10" : "bg-muted"
                    } flex items-center justify-center mx-auto mb-4`}
                  >
                    <competitor.icon
                      className={`w-8 h-8 ${competitor.color}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{competitor.name}</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Estimated Cost per Campaign
                    </h4>
                    <p className="text-foreground font-semibold">
                      {competitor.cost}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Setup Time
                    </h4>
                    <p className="text-foreground text-sm">
                      {competitor.setupTime}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Tools
                    </h4>
                    <p className="text-foreground text-sm">
                      {competitor.tools}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Efficiency
                    </h4>
                    <p className="text-foreground text-sm">
                      {competitor.efficiency}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Business Focus
                    </h4>
                    <p className="text-foreground text-sm">
                      {competitor.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                  {index === 0 && (
                    <>
                      <p>
                        ¹ Hypothetical value for annual platform subscription.
                      </p>
                      <p>
                        ² Based on Glassdoor Brazil averages: Mid-level Analyst
                        (~$4,700/month) + Specialist (~$9,000/month) + labor
                        charges.
                      </p>
                      <p>
                        ³ Based on packages from known marketing agencies like
                        V4 Company, which may vary according to scope and media.
                      </p>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
