import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Clock,
  Wand2,
  Zap,
  Users,
} from "lucide-react";

const SolutionSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Create campaigns in minutes",
      description: "Step-by-step guided process",
    },
    {
      icon: Wand2,
      title: "AI-generated content",
      description: "Headlines, descriptions & calls-to-action",
    },
    {
      icon: Zap,
      title: "Automatic publishing",
      description: "Direct to Google and Meta (Facebook, Instagram, WhatsApp)",
    },
    {
      icon: Users,
      title: "No intermediaries",
      description: "No communication noise, direct connection",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-6">
            <CheckCircle className="w-3 h-3 mr-1" />
            The Solution
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-8">
            Your communication{" "}
            <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
              direct
            </span>{" "}
            to your customers
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6 glow-on-hover">
            ➡️ Test now in just a few clicks
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
