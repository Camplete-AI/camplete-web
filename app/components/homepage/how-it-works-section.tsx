import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  Link2,
  Upload,
  Brain,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    step: 1,
    icon: LogIn,
    title: "Sign up with Clerk",
    description: "Create your account in seconds with secure authentication",
    color: "bg-blue-50 text-blue-600",
  },
  {
    step: 2,
    icon: Link2,
    title: "Connect your ad accounts",
    description:
      "Link Google Ads or Meta Ads (we can create accounts automatically)",
    color: "bg-green-50 text-green-600",
  },
  {
    step: 3,
    icon: Upload,
    title: "Upload content",
    description:
      "Share your product images, videos, or describe what you're selling",
    color: "bg-purple-50 text-purple-600",
  },
  {
    step: 4,
    icon: Brain,
    title: "AI generates campaign",
    description:
      "Our AI creates headlines, descriptions, and targeting automatically",
    color: "bg-orange-50 text-orange-600",
  },
  {
    step: 5,
    icon: CreditCard,
    title: "Review & pay",
    description:
      "Check your campaign, pay $20 via Stripe, and we'll publish it",
    color: "bg-pink-50 text-pink-600",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            From idea to{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              live campaign
            </span>{" "}
            in 5 minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process eliminates the complexity of ad management.
            No learning curve, no technical skills required.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.step}
              className="relative p-6 hover:shadow-lg transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-sunset-coral to-sunset-burgundy z-10"></div>
              )}

              <div
                className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <step.icon className="w-6 h-6" />
              </div>

              <div className="text-sm text-primary font-semibold mb-2">
                Step {step.step}
              </div>

              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Success indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </Card>
          ))}
        </div>

        {/* Success message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-full">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">
              Campaign goes live automatically across all platforms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
