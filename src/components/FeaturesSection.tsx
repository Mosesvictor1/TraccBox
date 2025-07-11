import React, { useEffect } from "react";
import {
  MapPin,
  Activity,
  ChartBar,
  FileText,
  Users,
  Clock,
} from "lucide-react";
import ThreeDBackground from "./ThreeDBackground";

const features = [
  {
    id: 1,
    title: "GPS Clock-In/Out",
    icon: MapPin,
    description:
      "Track field team locations in real-time with accurate GPS-based check-ins.",
  },
  {
    id: 2,
    title: "Task Assignment",
    icon: Clock,
    description:
      "Easily create and assign tasks to your team members with deadlines and priorities.",
  },
  {
    id: 3,
    title: "MOQ Management",
    icon: Activity,
    description:
      "Ascertain minimum order quantity based on sales trends to avoid overstocking.",
  },
  {
    title: "Sales Leaderboards",
    icon: ChartBar,
    description:
      "Motivate your team with real-time performance dashboards and rankings.",
  },
  {
    title: "Automated Reports",
    icon: FileText,
    description:
      "Generate comprehensive reports automatically and share with stakeholders.",
  },
  {
    title: "Team Management",
    icon: Users,
    description:
      "Manage team members, territories, and performance metrics in one place.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 bg-traccbox-500 relative overflow-hidden"
    >
      <ThreeDBackground className="opacity-100" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            data-aos="fade-up"
          >
            Powerful Features for Field Sales Teams
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto" data-aos="fade-up">
            TraccBox provides all the tools you need to manage, track, and
            optimize your field sales operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white/70 perspective-card"
              data-aos="zoom-in"
              data-aos-delay={`${(feature.id % 3) * 100}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-traccbox-50 text-traccbox-500 mb-5 group-hover:bg-traccbox-500 transition-colors feature-icon">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
