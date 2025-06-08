import React from "react";
import { Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto bg-blac">
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-traccbox-50 text-traccbox-500"
              data-aos="zoom-in"
            >
              <Users size={28} />
            </div>
          </div>

          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              data-aos="fade-up"
            >
              Why We Built TraccBox
            </h2>
            <p
              className="text-gray-600 text-lg leading-relaxed mb-6"
              data-aos="fade-up"
            >
              TraccBox was born from a simple observation: field sales teams
              have unique challenges that traditional CRMs don't address. We saw
              sales managers struggling with visibility into their field reps'
              activities, and reps spending too much time on paperwork rather
              than selling.
            </p>
            <p
              className="text-gray-600 text-lg leading-relaxed"
              data-aos="fade-up"
            >
              Our mission is to empower businesses with a unified platform that
              connects field and digital sales. Delivering AI-powered insights,
              real-time tracking, and smart attribution to drive performance,
              accountability, and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
              data-aos="zoom-in"
            >
              <h3 className="text-xl font-semibold mb-3 text-traccbox-500">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To harmonise people-driven and data-driven sales into one
                intelligent ecosystem empowering teams, connecting every sales
                journey, and helping businesses grow with clarity,
                accountability, and purpose.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
              data-aos="zoom-in"
            >
              <h3 className="text-xl font-semibold mb-3 text-traccbox-500">
                Our Values
              </h3>
              <p className="text-gray-600">
                We believe that every sale, every action, and every outcome
                should be traceable because true accountability powers smarter
                teams, stronger strategies, and sustainable growth.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
              data-aos="zoom-in"
            >
              <h3 className="text-xl font-semibold mb-3 text-traccbox-500">
                Our Promise
              </h3>
              <p className="text-gray-600">
                To continuously evolve our platform based on customer feedback
                and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
