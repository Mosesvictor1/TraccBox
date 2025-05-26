import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";

const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "$29",
    period: "per user/month",
    description: "Essential tools for small field sales teams",
    features: [
      "GPS Clock-In/Out",
      "Basic Task Assignment",
      "Sales Reporting",
      "5GB Storage",
      "Email Support",
    ],
    badge: null,
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "$69",
    period: "per user/month",
    description: "Advanced features for growing sales teams",
    features: [
      "Everything in Basic",
      "AI Analytics Dashboard",
      "Sales Leaderboards",
      "Unlimited Storage",
      "Priority Support",
      "Team Collaboration",
      "API Access",
    ],
    badge: { text: "Best Value", icon: Calendar },
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "contact for pricing",
    description: "Tailored solutions for large organizations",
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated Account Manager",
      "SLA Guarantees",
      "Custom Reporting",
      "Advanced Security",
      "Training & Onboarding",
    ],
    badge: null,
    buttonText: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your team, with all plans including
            a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-traccbox-500 shadow-lg transform scale-105 relative z-10"
                  : "border border-gray-200 shadow-md"
              }`}
              data-aos="zoom-in"
              data-aos-delay={`${(plan.id % 3) * 100}`}
            >
              {plan.badge && (
                <div className="bg-traccbox-500 text-white py-1 px-3 absolute top-6 right-6 rounded-full flex items-center space-x-1">
                  <plan.badge.icon size={14} />
                  <span className="text-xs font-medium">{plan.badge.text}</span>
                </div>
              )}

              <div className="bg-white p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <Button
                  className={`w-full py-6 ${
                    plan.popular
                      ? "bg-traccbox-500 hover:bg-traccbox-600 text-white"
                      : "bg-white border border-traccbox-500 text-traccbox-500 hover:bg-traccbox-50"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>

              <div
                className={`p-8 ${plan.popular ? "bg-gray-50" : "bg-white"}`}
              >
                <p className="font-medium mb-4">Features include:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        size={18}
                        className="text-traccbox-500 mr-3 mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
