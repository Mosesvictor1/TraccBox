
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-32 relative overflow-hidden">
      <div className="bg-blue-wave bg-no-repeat bg-bottom bg-cover absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Track, Analyze, and Grow Sales Performance with 
              <span className="text-traccbox-500"> TraccBox</span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              An all-in-one sales and analytics platform for field reps, team leads, and sales managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button className="bg-traccbox-500 hover:bg-traccbox-600 text-white px-6 py-6 text-lg rounded-full">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-traccbox-500 text-traccbox-500 hover:bg-traccbox-50 px-6 py-6 text-lg rounded-full">
                Request Demo <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-traccbox-500/20 to-traccbox-300/20 rounded-xl"></div>
              <div className="bg-white p-4 rounded-xl shadow-xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="TraccBox Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-traccbox-500 text-white p-4 rounded-lg shadow-lg animate-pulse-soft">
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
