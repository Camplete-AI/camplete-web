import Navigation from "@/components/homepage/navigation-header";
import HeroSection from "@/components/homepage/hero-section";
import ProblemSection from "@/components/homepage/problem-section";
import SolutionSection from "@/components/homepage/solution-section";
import BenefitsSection from "@/components/homepage/benefits-section";
import FeaturesSection from "@/components/homepage/feature-section";
import HowItWorksSection from "@/components/homepage/how-it-works-section";
import PricingSection from "@/components/homepage/pricing-section";
import ComparisonSection from "@/components/homepage/comparison-section";
import FAQSection from "@/components/homepage/faq-section";
import RoadmapSection from "@/components/homepage/roadmap-section";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <ComparisonSection />
      <FAQSection />
      <RoadmapSection />
      <Footer />
    </main>
  );
}
