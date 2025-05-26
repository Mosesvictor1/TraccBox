
import React from 'react';
import { Building, Users, ListCheck, Rocket } from 'lucide-react';
import ThreeDBackground from './ThreeDBackground';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: 1,
    title: "Company Setup",
    description: "Set up your company profile, branding, and basic configurations.",
    icon: Building,
    image: "assets/CompanySetup.png"
  },
  {
    number: 2,
    title: "Add Reps",
    description: "Invite your sales representatives and assign their roles and territories.",
    icon: Users,
    image: "assets/AddReps.png"
  },
  {
    number: 3,
    title: "Assign Tasks",
    description: "Create tasks and assign them to your team members based on priorities.",
    icon: ListCheck,
    image: "assets/AssignTasks.png"
  },
  {
    number: 4,
    title: "Go Live",
    description: "Start tracking performances, collecting data, and optimizing your sales process.",
    icon: Rocket,
    image: "assets/GoLive.png"
  }
];

const OnboardingSection = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <ThreeDBackground className="opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Guided Onboarding</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get up and running in minutes with our straightforward onboarding process.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line connecting all steps */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-traccbox-300/50 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row md:mb-24 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  <div className="mb-6 md:mb-0 md:w-1/2 p-4">
                    <Card className="overflow-hidden perspective-card border-traccbox-100 hover:border-traccbox-300 transition-colors shadow-lg">
                      <div className="aspect-video relative">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute bottom-4 left-4 text-white p-2">
                          <h4 className="text-lg font-semibold">{step.title}</h4>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="flex md:w-1/2 md:items-center">
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-traccbox-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="ml-6 bg-white p-6 rounded-xl shadow-md flex-grow">
                      <div className="flex items-center mb-4">
                        <div className="mr-3 text-traccbox-500">
                          <step.icon size={24} />
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      <div className="mt-4">
                        {index === 0 && (
                          <div className="bg-traccbox-50 p-3 rounded-lg border border-traccbox-100">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-traccbox-500 rounded-md"></div>
                              <div className="ml-3">
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="flex space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="w-8 h-8 bg-traccbox-500 rounded-full flex items-center justify-center text-white text-xs">+</div>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="space-y-2">
                            <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                          </div>
                        )}
                        
                        {index === 3 && (
                          <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                            <div className="h-full w-full bg-traccbox-500 rounded"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
