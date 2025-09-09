import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap } from "lucide-react";
import Platform from "../../../public/platform-mockup.png";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 fade-in-up">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Ad Creation
            </div>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-7xl font-display font-normal leading-none mb-6 fade-in-up">
              Advertise on{" "}
              <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
                Google & Meta
              </span>{" "}
              today. No agency,{" "}
              <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
                No hassle
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl fade-in-up">
              Create campaigns in just a few clicks with generative AI to
              supercharge your ads.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up">
              <Button size="lg" className="text-lg px-8 py-6 glow-on-hover">
                <a href="/dashboard"> 👉 Start Free Now</a>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground fade-in-up">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ campaigns created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>$2M+ in ad spend managed</span>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard mockup */}
          <div className="relative fade-in-right">
            <div className="relative">
              <img
                src={Platform}
                alt="Camplete AI Dashboard"
                className="w-full rounded-2xl shadow-elegant float"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-background rounded-lg shadow-lg p-3 scale-in">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Campaign Live</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background rounded-lg shadow-lg p-3 scale-in">
                <div className="text-sm">
                  <div className="font-semibold text-primary">$4.20</div>
                  <div className="text-muted-foreground">Cost per click</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
