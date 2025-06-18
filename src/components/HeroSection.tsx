import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ThreeDBackground from "./ThreeDBackground";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // If the day has changed, update state
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 60000); // check every 60 seconds

    return () => clearInterval(interval);
  }, [currentDate]);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="pt-24 md:pt-32 relative overflow-hidden">
      <ThreeDBackground className="z-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 "
              data-aos="fade-up"
            >
              Track, Analyze, and Grow Sales Performance with
              <span className="text-traccbox-500"> TraccBox</span>
            </h1>
            <p
              className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
              data-aos="fade-up"
            >
              An all-in-one solution that combines location tracking, sales
              analytics, and marketing attribution for field reps, team leads,
              and sales managers.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: "0.4s" }}
              data-aos="fade-up"
            >
              <Link to="/signup">
                <Button className="bg-traccbox-500 hover:bg-traccbox-600 text-white px-6 py-6 text-lg rounded-full">
                  Start Free Trial
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-traccbox-500 text-traccbox-500 hover:bg-traccbox-50 px-6 py-6 text-lg rounded-full"
                data-aos="fade-up"
              >
                Request Demo <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 relative animate-fade-in"
            style={{ animationDelay: "0.6s" }}
            data-aos="zoom-in"
          >
            <div className="relative">
              {/* Fancy 3D card effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-traccbox-300/30 to-traccbox-500/30 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-2 md:p-6 rounded-xl shadow-xl border border-white/50 perspective-card">
                <div className="flex flex-col md:flex-row gap-6  px-1">
                  {/* Person using the app */}
                  <div className="md:w-1/2 w-[98%] relative flex md:flex-col items-center md:items-start gap-2 ">
                    <img
                      src="assets/heroImg1.png"
                      alt="Sales professional using TraccBox"
                      className="rounded-lg shadow-lg object-cover h-24 md:h-1/2 w-[50%] md:w-full"
                    />
                    <img
                      src="assets/heroImg2.png"
                      alt="Sales professional using TraccBox"
                      className="rounded-lg shadow-lg object-cover h-24 md:h-1/2 w-[50%] md:w-full md:mt-2"
                    />
                    <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse-soft"></div>
                  </div>

                  {/* App interface */}
                  <div className="w-full md:w-2/2">
                    <div className="bg-gradient-to-br from-slate-50 to-white p-3 rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-semibold text-traccbox-700">
                          Today's Performance
                        </div>
                        <div className="text-xs text-gray-500">
                          {formattedDate}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-traccbox-50 p-2 rounded">
                          <div className="text-xs text-gray-600">
                            Sales Completed
                          </div>
                          <div className="text-lg font-bold text-traccbox-700">
                            24
                          </div>
                        </div>
                        <div className="bg-traccbox-50 p-2 rounded">
                          <div className="text-xs text-gray-600">
                            Conversion Rate
                          </div>
                          <div className="text-lg font-bold text-traccbox-700">
                            68%
                          </div>
                        </div>
                      </div>

                      {/* Chart placeholder */}
                      <div className="h-22  rounded-md mb-2 relative overflow-hidden">
                        <img
                          src="assets/heroChart.png"
                          alt="Sales professional using TraccBox"
                          className="rounded-lg shadow-lg object-cover w-full h-22"
                        />
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                        Weekly Performance Trend
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-9 md:-bottom-4 -right-4 bg-traccbox-500 text-white p-4 rounded-lg shadow-lg animate-pulse-soft">
                <span className="text-sm font-semibold">+28% Sales Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
    </section>
  );
};

export default HeroSection;
