import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="destructive" className="mb-6">
            <AlertCircle className="w-3 h-3 mr-1" />
            The Problem
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-8">
            For small businesses, hiring an{" "}
            <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
              agency or team
            </span>{" "}
            is expensive
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            And often, those who speak for your business don't understand your
            reality. You end up paying premium prices for generic solutions that
            miss your unique value proposition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
