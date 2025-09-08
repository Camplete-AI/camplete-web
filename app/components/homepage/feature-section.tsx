import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Search,
  Users,
  Upload,
  BarChart3,
  Eye,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Complete Google Ads campaigns",
      description:
        "Full campaign setup with keywords, ad groups, and targeting",
    },
    {
      icon: Users,
      title: "Meta Ads launch",
      description:
        "Traffic and lead generation campaigns for Facebook, Instagram & WhatsApp",
    },
    {
      icon: Upload,
      title: "Simple image upload",
      description: "Use your own images with our easy upload system",
    },
    {
      icon: BarChart3,
      title: "Clear metrics dashboard",
      description:
        "Track clicks, impressions, costs, and leads in one simple panel",
    },
    {
      icon: Eye,
      title: "Real-time campaign status",
      description: "See the status of each campaign as it happens",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6">
            <CheckCircle className="w-3 h-3 mr-1" />
            Main Features (MVP)
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            What you can do{" "}
            <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
              today
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to launch successful ad campaigns, available
            right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
