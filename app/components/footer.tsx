import { Button } from "@/components/ui/button";
import {
  Shield,
  ExternalLink,
  ArrowRight,
  Zap,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-16">
        {/* Final CTA */}
        <div className="border-b pb-16 mb-16 text-center">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-3xl lg:text-4xl font-display font-normal mb-4">
              No agency, no noise,{" "}
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                artificial intelligence
              </span>{" "}
              by your side
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of businesses already using Camplete AI to grow
              their revenue.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 glow-on-hover">
              <a href="/dashboard"> 👉 Start Free Now</a>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold">Camplete AI</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The fastest way to create and launch Google Ads and Meta
              campaigns. No experience needed, just results.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Powered by Stripe & Google/Meta API</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© {currentYear} Camplete AI. All rights reserved.</span>
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
              <Shield className="w-3 h-3 text-green-500" />
              <span>Powered by Stripe</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
              <ExternalLink className="w-3 h-3 text-blue-500" />
              <span>Google/Meta API</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
