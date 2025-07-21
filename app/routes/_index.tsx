import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Launch Ads in Seconds with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-muted-foreground max-w-2xl"
        >
          OneClickAds helps you create and publish high-performing campaigns for
          Google and Meta in just a few clicks.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex gap-4"
        >
          <Button asChild size="lg">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/signup">Create Account</Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What OneClickAds Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-background rounded-2xl shadow p-6 text-left border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-2">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to launch your first campaign?
          </motion.h2>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login" className="inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "AI Campaign Generator",
    description:
      "Create campaigns with AI-generated copy, creatives, targeting, and budget suggestions based on your goals.",
    icon: <RocketIcon className="w-6 h-6" />,
  },
  {
    title: "One-Click Publishing",
    description:
      "Publish to Google Ads and Meta Ads with a single click — no need to navigate complex ad managers.",
    icon: <ZapIcon className="w-6 h-6" />,
  },
  {
    title: "Performance Tracking",
    description:
      "Get simplified, easy-to-understand reports on how your ads are performing in real time.",
    icon: <LineChartIcon className="w-6 h-6" />,
  },
];

import { RocketIcon, ZapIcon, LineChartIcon } from "lucide-react";
