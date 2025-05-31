import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageSquare, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Our free trial gives you full access to TraccBox for 14 days. No credit card is required to start. At the end of your trial, you can choose a subscription plan to continue using TraccBox.",
  },
  {
    question: "Do you offer custom integrations?",
    answer:
      "Yes, our Enterprise plan includes custom integrations with your existing tools and systems. Our team will work with you to ensure a smooth integration process.",
  },
  {
    question: "How many users can I add to my account?",
    answer:
      "There's no limit to the number of users you can add. Our pricing is per user, so you can scale your team as needed.",
  },
  {
    question: "Is my data secure with TraccBox?",
    answer:
      "Absolutely. TraccBox employs industry-standard encryption and security protocols to protect your data. We are GDPR compliant and regularly conduct security audits.",
  },
  {
    question: "Can I export my data from TraccBox?",
    answer:
      "Yes, you can export your data in various formats including CSV, Excel, and PDF. This makes it easy to use your data in other systems or for offline analysis.",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
          >
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up">
            Have questions about TraccBox? Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-md" data-aos="zoom-in">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <MessageSquare className="mr-2 text-traccbox-500" size={20} />
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center mb-4">
                <Phone className="text-traccbox-500 mr-3" size={18} />
                <span className="text-gray-700">Call us: +2348031100015</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="text-traccbox-500 mr-3" size={18} />
                <span className="text-gray-700">
                  Email: support@traccbox.com
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div data-aos="zoom-in">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Info className="mr-2 text-traccbox-500" size={20} />
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-6 bg-traccbox-50 p-4 rounded-lg border border-traccbox-100">
              <p className="text-gray-700">
                Don't see your question here? Contact our support team and we'll
                be happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
