import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      id: "item-1",
      question: "What is Wellness Made Clear?",
      answer:
        "Wellness Made Clear is a holistic wellness platform offering science-backed insights and natural wisdom. We offer personalized coaching, wellness education, content, products, and tools that support sustainable lifestyle change.",
    },
    {
      id: "item-2",
      question: "What services do you offer?",
      answer:
        "We provide:\n• Personalized wellness coaching\n• A blog with health tips and educational content\n• A library of wellness resources and recommended products\n• Exclusive digital resources and access to our wellness community",
    },
    {
      id: "item-3",
      question: "Is this a medical service?",
      answer:
        "No, Wellness Made Clear does not provide medical advice, diagnosis, or treatment. Our health coaches offer general health guidance, always consult your doctor before making major health or diet changes.\n\nWe do hope supporting guidance.\n\nIf you're dealing with health conditions, please consult your doctor before making any nutritional diet, fitness coaching steps, and complete your payment online.",
    },
    {
      id: "item-4",
      question: "What kind of products are in your store?",
      answer:
        "We offer:\n• Natural supplements and herbal remedies\n• Superfoods, teas, and plant-based wellness drinks\n• Tools for sleep, stress relief, fitness, and mindfulness\n• Books and educational materials on wellness topics",
    },
    {
      id: "item-5",
      question: "Do you offer subscription memberships?",
      answer:
        "Yes. We have multiple tiers with access to exclusive content, coaching, product discounts, and wellness challenges. Visit our Membership Page to learn more.\n\nCan I cancel my subscription at any time?\n\nYes. You can cancel anytime through your account dashboard. There are no long-term commitments.",
    },
    {
      id: "item-6",
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes. You can cancel anytime through your account dashboard. There are no long-term commitments.",
    },
    {
      id: "item-7",
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within the U.S. We're working on international shipping—subscribe to our newsletter for updates.\n\nAre your products science-backed?\n\nYes. Our content is grounded in peer-reviewed research, functional medicine principles, and traditional wellness practices supported by modern science.",
    },
    {
      id: "item-8",
      question: "Are your articles science-backed?",
      answer:
        "Yes. Our content is grounded in peer-reviewed research, functional medicine principles, and traditional wellness practices supported by modern science.",
    },
    {
      id: "item-9",
      question: "How can I contact your team?",
      answer:
        "Email us at: hello@wellnessmadeclear.com or use our Contact Form. We aim to respond within 1-2 business days.",
    },
    {
      id: "item-10",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="bg-[#F8FAF9]">
      <div className="lg:container mx-auto w-[95%] py-[20px] lg:py-[88px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-600">
            Your guide to using Wellness Made Clear
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-gray-200 rounded-lg px-6 py-2"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
