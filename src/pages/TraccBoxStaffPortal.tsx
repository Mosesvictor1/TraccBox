import React, { useEffect, useRef } from "react";
import AOS from "aos";

import {
  BadgeCheck,
  Clock,
  Clipboard,
  MapPin,
  MessageCircle,
  Play,
  ChevronUp,
  Smartphone,
  HelpCircle,
} from "lucide-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  badge: string;
  bgColor: string;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  badge,
  bgColor,
}) => (
  <div
    className="step-card bg-white rounded-2xl p-8 text-center shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    data-aos="flip-left"
  >
    <div
      className={`w-16 h-16 ${bgColor} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold`}
    >
      {number}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div
      className={`text-sm font-medium ${
        bgColor === "bg-blue-500"
          ? "text-blue-500"
          : bgColor === "bg-green-500"
          ? "text-green-500"
          : "text-purple-500"
      }`}
    >
      {badge}
    </div>
  </div>
);

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  gradient: string;
  iconColor: string;
  delay: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  bgColor,
  gradient,
  iconColor,
  delay,
}) => (
  <div
    className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fadeInUp`}
    style={{ animationDelay: delay }}
  >
    {/* Background Gradient Overlay */}
    <div
      className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
    ></div>

    {/* Floating Decorative Elements */}
    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-110 transform"></div>
    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:rotate-45 transform"></div>

    <div className="relative z-10">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div
            className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}
          >
            {/* Icon Background Glow */}
            <div
              className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
            ></div>
            <div
              className={`relative z-10 ${iconColor} transform group-hover:rotate-12 transition-transform duration-300`}
            >
              {icon}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm">
            {description}
          </p>

          {/* Progress Bar Animation */}
          <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out rounded-full`}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Right Arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <div
          className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center shadow-lg`}
        >
          <ChevronUp className="w-4 h-4 text-white transform rotate-45" />
        </div>
      </div>
    </div>
  </div>
);

const PhoneMockup: React.FC = () => (
  <div className="phone-mockup animate-float ">
    <div className="w-64 h-96 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl relative overflow-hidden shadow-2xl">
      <div className="absolute inset-4 bg-white rounded-xl p-4 flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-400">9:41 AM</div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="text-xs text-gray-400">●●●</div>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="ml-2">
              <div className="text-xs font-medium">Good Morning</div>
              <div className="text-xs text-gray-500">Victor Moses</div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
        </div>

        {/* Check-in button */}
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-green-800">Check In</div>
              <div className="text-xs text-green-600">
                Tap to start your day
              </div>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <ChevronUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Tasks section */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-900 mb-2">
            Today's Tasks
          </div>
          <div className="space-y-2 flex-1">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <div className="text-xs text-blue-800">Visit Client A</div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <div className="text-xs text-yellow-800">Complete Report</div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <div className="text-xs text-purple-800">Team Meeting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QRCodePlaceholder: React.FC = () => (
  <div className="w-32 h-32 mx-auto mb-4 rounded-lg border-2 border-gray-200 bg-white relative overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
      {Array.from({ length: 100 }, (_, i) => (
        <div
          key={i}
          className={`${
            (Math.floor(i / 10) + i) % 2 === 0 ? "bg-black" : "bg-white"
          }`}
        />
      ))}
    </div>
  </div>
);

const TraccBoxStaffPortal: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleDownloadClick = (platform: "ios" | "android") => {
    console.log(`Redirect to ${platform} app store`);
    // Replace with actual app store URLs
  };

  const handleDemoClick = () => {
    console.log("Show demo video");
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .phone-mockup {
          background: linear-gradient(145deg, #f5dcdc, #e5e7eb);
          border-radius: 2rem;
          padding: 0.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="assets/logo.png" alt="" className="w w-32 md:w-40" />
            </div>
            <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors flex items-center">
              <HelpCircle className="w-5 h-5 mr-1" />
              Need Help?
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#EEF5FF] py-16 sm:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp ">
            <div
              className="inline-flex items-center bg-green-200 rounded-full px-4 py-2 mb-6"
              data-aos="fade-up"
            >
              <BadgeCheck className="w-5 h-5 text-green-600 mr-2" />

              <span className="text-green-700 font-medium">
                You're successfully onboarded!
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
              data-aos="fade-up"
            >
              Welcome to Your{" "}
              <span className="text-traccbox-500">Mobile Workspace</span>
            </h1>

            <p
              className="text-lg text-gray-700 mb-8 font-medium max-w-3xl mx-auto leading-relaxed"
              data-aos="fade-up"
            >
              You've been added as a Sales Rep to your company's TraccBox
              system. Download the mobile app to start managing your daily
              tasks, check-ins, and work assignments.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      {/* What You Can Do Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="mb-8 flex flex-col items-center justify-center">
                <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Everything you need
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Your Daily Work
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">
                    Made Simple
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Powerful tools designed to streamline your workflow and boost
                  productivity.
                </p>
              </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid gap-6">
                <FeatureItem
                  icon={<Clock className="w-7 h-7" />}
                  title="Smart Time Tracking"
                  description="Effortlessly clock in and out with GPS verification. Get detailed insights into your work patterns and automatically calculate overtime hours."
                  bgColor="bg-gradient-to-r from-green-500 to-emerald-500"
                  gradient="bg-gradient-to-r from-green-500 to-emerald-500"
                  iconColor="text-white"
                  delay="0.1s"
                />

                <FeatureItem
                  icon={<Clipboard className="w-7 h-7" />}
                  title="Dynamic Task Management"
                  description="View, organize, and complete tasks with real-time updates. Add photos, voice notes, and collaborate seamlessly with your team."
                  bgColor="bg-gradient-to-r from-blue-500 to-cyan-500"
                  gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                  iconColor="text-white"
                  delay="0.2s"
                />

                <FeatureItem
                  icon={<MapPin className="w-7 h-7" />}
                  title="Location Intelligence"
                  description="Access location-based assignments and optimize your routes. Get directions to client sites and track field work efficiently."
                  bgColor="bg-gradient-to-r from-purple-500 to-pink-500"
                  gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                  iconColor="text-white"
                  delay="0.3s"
                />

                <FeatureItem
                  icon={<MessageCircle className="w-7 h-7" />}
                  title="Team Communication"
                  description="Stay connected with instant messaging, file sharing, and video calls. Receive important updates and never miss critical information."
                  bgColor="bg-gradient-to-r from-orange-500 to-red-500"
                  gradient="bg-gradient-to-r from-orange-500 to-red-500"
                  iconColor="text-white"
                  delay="0.4s"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center relative">
              {/* Floating Elements Around Phone */}
              <div
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-80 animate-bounce"
                style={{ animationDelay: "1s", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full opacity-70 animate-bounce"
                style={{ animationDelay: "2s", animationDuration: "4s" }}
              ></div>
              <div className="absolute top-1/2 -right-12 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-60 animate-pulse"></div>

              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-16 bg-traccbox-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Follow these easy steps to set up your mobile workspace and start
              your first day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <StepCard
              number={1}
              title="Download the App"
              description="Get the TraccBox mobile app from your device's app store using the buttons below."
              badge="⬇ Download now"
              bgColor="bg-blue-500"
            />

            <StepCard
              number={2}
              title="Login with Your Email"
              description="Use the same email address that received this invitation to log into the mobile app."
              badge="📧 Same email as invitation"
              bgColor="bg-green-500"
            />

            <StepCard
              number={3}
              title="Start Working"
              description="Check in, view your tasks, and begin your productive workday with your team."
              badge="🚀 You're ready to go!"
              bgColor="bg-purple-500"
            />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Download Buttons */}
            <div
              className="rounded-2xl bg-traccbox-500 p-8 shadow-lg"
              data-aos="zoom-in-down"
            >
              <h3 className="text-xl font-semibold text-gray-50 mb-6 text-center">
                Download TraccBox Mobile
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleDownloadClick("ios")}
                  className="flex items-center justify-center bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors w-full"
                >
                  <Smartphone className="w-8 h-8 mr-4" />
                  <div className="text-left">
                    <div className="text-sm opacity-90">Download on the</div>
                    <div className="font-semibold text-lg">App Store</div>
                  </div>
                </button>

                <button
                  onClick={() => handleDownloadClick("android")}
                  className="flex items-center justify-center bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors w-full"
                >
                  <Smartphone className="w-8 h-8 mr-4" />
                  <div className="text-left">
                    <div className="text-sm opacity-90">Get it on</div>
                    <div className="font-semibold text-lg">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div
              className="bg-traccbox-500 rounded-2xl p-8 shadow-lg text-center"
              data-aos="zoom-in-down"
            >
              <h3 className="text-xl font-semibold text-gray-50 mb-6">
                Quick Download
              </h3>
              <QRCodePlaceholder />
              <p className="text-sm text-gray-50 mb-4">
                Scan this QR code with your phone camera to download the app
                instantly
              </p>
              <div className="text-xs text-black bg-gray-100 rounded-lg py-2 px-3 inline-block">
                📱 Point your camera at the code above
              </div>
            </div>
          </div>

          {/* Demo Video */}
          <div className="text-center mt-12">
            <button
              onClick={handleDemoClick}
              className="inline-flex items-center bg-traccbox-500 text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              <Play className="w-6 h-6 mr-3" />
              Watch App Demo (2 mins)
            </button>
            <p className="text-sm text-black mt-2">
              See how to use the app for check-ins, tasks, and more
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="ml-3 text-xl font-bold">
                  TraccBox Staff Portal
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your mobile workspace for daily tasks, time tracking, and team
                collaboration. Get started today and boost your productivity.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    App Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Data Protection
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TraccBox Staff Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TraccBoxStaffPortal;
