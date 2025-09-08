import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Simple Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            No monthly fees. No{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              hidden costs
            </span>
            .
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay only when you create campaigns. Your ad spend goes directly to
            your account - we never touch it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current MVP Plan */}
            <Card className="relative p-8 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Zap className="w-3 h-3 mr-1" />
                  Available Now
                </Badge>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">
                  Pay-Per-Campaign
                </h3>
                <div className="text-5xl font-display font-normal text-primary mb-2">
                  $20
                </div>
                <p className="text-muted-foreground">per campaign created</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    AI-generated headlines and descriptions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Automatic audience targeting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Direct publishing to Google Ads & Meta
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Basic performance dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>

              <Button className="w-full" size="lg">
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Ad spend goes directly to your account via your credit card
                </p>
              </div>
            </Card>

            {/* Coming Soon Plan */}
            <Card className="relative p-8 opacity-75">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary">Coming Soon</Badge>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2">Pro Plans</h3>
                <div className="text-5xl font-display font-normal text-muted-foreground mb-2">
                  2024
                </div>
                <p className="text-muted-foreground">
                  multiple pricing options
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Monthly subscription plans
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Percentage of ad spend model
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Multiple account management
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Advanced reporting & analytics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Priority support
                  </span>
                </li>
              </ul>

              <Button variant="secondary" className="w-full" size="lg" disabled>
                Notify Me
              </Button>
            </Card>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Google/Meta API Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
