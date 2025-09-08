import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, DollarSign, Target } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "⚡ Faster",
    description:
      "Active campaigns in minutes, not weeks. Skip the lengthy setup and approval processes.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: DollarSign,
    title: "💸 Cheaper",
    description:
      "Lower subscription cost than any agency. No hidden fees, no percentage cuts from your ad spend.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Target,
    title: "🎯 More Direct",
    description:
      "Speak directly to your audience without intermediaries. Your voice, your message, your results.",
    gradient: "from-blue-400 to-purple-500",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Benefits for You
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            Why our platform{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              wins
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Skip the complexity and get straight to results with our AI-powered
            advertising platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="relative p-8 hover:shadow-elegant transition-all duration-300 group border-0 bg-card/50 backdrop-blur-sm text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon with gradient background */}
              <div className="relative mb-6 flex justify-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} p-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-full h-full text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
            <span>Join 500+ businesses already using Camplete AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
