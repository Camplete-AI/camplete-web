import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need an agency?",
      answer:
        "No, you create and publish campaigns yourself with the system's guidance. Our AI handles the complex parts while you maintain full control.",
    },
    {
      question: "What if I already have campaigns running?",
      answer:
        "Just connect your existing Google Ads or Meta account and manage everything from our unified dashboard. Your existing campaigns will continue running normally.",
    },
    {
      question: "Is there an initial cost?",
      answer:
        "Start for free and only pay when you want to launch campaigns. No hidden fees, no setup costs, no long-term commitments.",
    },
    {
      question: "Do I need training?",
      answer:
        "No, the system is guided and simple - you learn by using it. Our AI walks you through each step, making it accessible for anyone.",
    },
    {
      question: "How does payment work?",
      answer:
        "You can pay per campaign launched or opt for a monthly subscription. Choose the model that works best for your business needs.",
    },
    {
      question: "What if I want to cancel?",
      answer:
        "You can cancel anytime without penalties or cancellation fees. We believe in earning your business every day, not locking you in.",
    },
    {
      question: "Can I scale campaigns?",
      answer:
        "Yes, create as many campaigns as you want with just a few clicks, without additional team costs. Our platform grows with your business.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>

          <h2 className="text-4xl lg:text-5xl font-display font-normal mb-6">
            Frequently Asked{" "}
            <span className="text-gradient bg-gradient-sunset bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about getting started with Camplete AI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
