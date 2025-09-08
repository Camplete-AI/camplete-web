import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Building,
  BarChart,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q1 2024",
    status: "In Development",
    title: "Pro Subscription Plans",
    description: "Monthly plans with unlimited campaigns and advanced features",
    features: ["Unlimited campaigns", "Priority support", "Advanced analytics"],
    icon: Calendar,
    color: "bg-blue-500",
    isActive: true,
  },
  {
    quarter: "Q2 2024",
    status: "Planned",
    title: "Multi-Account Management",
    description:
      "Manage multiple Google Ads and Meta accounts from one dashboard",
    features: ["Agency dashboard", "Client billing", "Team collaboration"],
    icon: Users,
    color: "bg-purple-500",
  },
  {
    quarter: "Q3 2024",
    status: "Planned",
    title: "Enterprise Features",
    description: "Advanced reporting and integrations for larger organizations",
    features: ["Salesforce integration", "HubSpot sync", "Custom reporting"],
    icon: Building,
    color: "bg-green-500",
  },
  {
    quarter: "Q4 2024",
    status: "Research",
    title: "Advanced AI Optimization",
    description: "Real-time campaign optimization and predictive analytics",
    features: ["Auto-optimization", "Predictive insights", "A/B testing"],
    icon: Zap,
    color: "bg-orange-500",
  },
];

const RoadmapSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="roadmap">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <BarChart className="w-3 h-3 mr-1" />
            Product Roadmap
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            What's{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              coming next
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're just getting started. Here's what we're building to make ad
            creation even more powerful and accessible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {roadmapItems.map((item, index) => (
              <Card
                key={index}
                className={`relative p-6 transition-all duration-300 hover:shadow-lg ${
                  item.isActive ? "border-2 border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.quarter}
                      </span>
                      <Badge
                        variant={item.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2">
                      {item.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {item.isActive && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-background rounded-2xl p-8 border">
              <h3 className="text-2xl font-semibold mb-4">
                Want to influence our roadmap?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our beta program and get early access to new features while
                helping shape the future of Camplete AI.
              </p>
              <Button size="lg" className="glow-on-hover">
                Join Beta Program
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
