import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TrialSection from "@/components/TrialSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import DemoSection from "@/components/DemoSection";
import OnboardingSection from "@/components/OnboardingSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        {/* <TrialSection />
        <OnboardingSection /> */}
        {/* <AboutSection />
        <DemoSection />
        <BlogSection />
        <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
