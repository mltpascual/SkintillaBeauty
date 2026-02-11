/**
 * FAQSection — Botanical Atelier Design
 * Accordion-based FAQ section addressing common questions about
 * ingredients, shipping, returns, and skincare routines.
 * Uses Radix Accordion for accessible expand/collapse.
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Products & Ingredients",
    items: [
      {
        question: "Are Skintilla products suitable for sensitive skin?",
        answer:
          "Absolutely. All Skintilla products are dermatologist-tested and formulated without parabens, sulfates, or synthetic fragrances. Our Botanical Toner with chamomile and witch hazel is specifically designed for sensitive and reactive skin types. We always recommend doing a patch test when trying any new product.",
      },
      {
        question: "Are your products cruelty-free and vegan?",
        answer:
          "Yes, Skintilla Beauty is 100% cruelty-free — we never test on animals, and none of our suppliers do either. The majority of our products are vegan, with the exception of our Velvet Moisturizer which contains beeswax. We clearly label all ingredients on each product page.",
      },
      {
        question: "What makes your ingredients different from other brands?",
        answer:
          "We source our botanical extracts directly from certified organic farms worldwide. Every ingredient is chosen for its proven efficacy and goes through rigorous third-party testing. We use stabilized forms of active ingredients like Vitamin C and encapsulated retinol to ensure maximum potency and shelf stability.",
      },
      {
        question: "How long do your products last once opened?",
        answer:
          "Most Skintilla products have a shelf life of 12 months once opened. Each product displays a PAO (Period After Opening) symbol on its packaging. We recommend storing products in a cool, dry place away from direct sunlight for optimal freshness.",
      },
    ],
  },
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping within the US takes 3–5 business days. Express shipping (1–2 business days) is available at checkout. International orders typically arrive within 7–14 business days depending on your location. All orders over $75 qualify for free standard shipping.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship to over 40 countries worldwide. International shipping rates and delivery times vary by destination. Customs duties and taxes may apply depending on your country's import regulations and are the responsibility of the recipient.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely. Once your order ships, you'll receive a confirmation email with a tracking number and a link to follow your package in real time. You can also track your order through your Skintilla account dashboard.",
      },
    ],
  },
  {
    title: "Returns & Support",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return any unused or gently used product within 30 days of delivery for a full refund. Simply contact our support team to initiate a return — we'll provide a prepaid shipping label.",
      },
      {
        question: "What if I receive a damaged product?",
        answer:
          "We're sorry if that happens! Please contact us within 48 hours of delivery with a photo of the damaged item, and we'll send a replacement at no cost. Your satisfaction is our top priority.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "Our support team is available Monday through Friday, 9am–6pm EST. You can reach us via email at hello@skintillabeauty.com, through the contact form on our website, or via our Instagram DMs @skintillabeauty. We aim to respond within 24 hours.",
      },
    ],
  },
];

export default function FAQSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.96 0.015 80)" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 stagger-children">
          <div className="fade-up flex items-center justify-center gap-6 mb-6">
            <div className="gold-divider w-[60px]" />
            <span
              className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[oklch(0.72_0.10_80)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Common Questions
            </span>
            <div className="gold-divider w-[60px]" />
          </div>
          <h2
            className="fade-up text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] font-semibold text-[oklch(0.25_0.03_55)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently{" "}
            <em className="font-normal italic text-[oklch(0.50_0.05_145)]">
              Asked
            </em>
          </h2>
          <p
            className="fade-up mt-4 text-[0.95rem] text-[oklch(0.50_0.03_55)] max-w-lg mx-auto font-light leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Everything you need to know about Skintilla Beauty, from ingredients
            to shipping and beyond.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 stagger-children">
          {faqCategories.map((category) => (
            <div key={category.title} className="fade-up">
              {/* Category title */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-px flex-1"
                  style={{ background: "oklch(0.85 0.03 80)" }}
                />
                <h3
                  className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[oklch(0.50_0.05_145)] shrink-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {category.title}
                </h3>
                <div
                  className="h-px flex-1"
                  style={{ background: "oklch(0.85 0.03 80)" }}
                />
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="space-y-2">
                {category.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.title}-${i}`}
                    className="border border-[oklch(0.90_0.02_80)] bg-[oklch(0.98_0.005_80)] px-6 data-[state=open]:bg-[oklch(0.97_0.01_80)] transition-colors duration-300"
                  >
                    <AccordionTrigger
                      className="py-5 text-left hover:no-underline group"
                    >
                      <span
                        className="text-[0.9rem] font-medium text-[oklch(0.30_0.03_55)] group-hover:text-[oklch(0.38_0.04_145)] transition-colors duration-300 pr-4"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <p
                        className="text-[0.85rem] text-[oklch(0.45_0.03_55)] font-light leading-[1.8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-14 fade-up">
          <p
            className="text-[0.85rem] text-[oklch(0.50_0.03_55)] font-light mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Still have questions? We'd love to hear from you.
          </p>
          <a
            href="mailto:hello@skintillabeauty.com"
            className="inline-flex items-center px-8 py-3.5 border border-[oklch(0.38_0.04_145)] text-[oklch(0.38_0.04_145)] hover:bg-[oklch(0.38_0.04_145)] hover:text-[oklch(0.97_0.008_80)] transition-all duration-400 text-[0.7rem] font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
