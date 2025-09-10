import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">O</span>
          </div>
          <span className="text-xl font-semibold text-foreground">
            Camplete AI
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#roadmap"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Roadmap
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <a href="/dashboard">Sign In</a>
          </Button>
          <Button size="sm" className="glow-on-hover">
            <a href="/dashboard">Get Started</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
