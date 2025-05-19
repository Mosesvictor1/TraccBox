
import React from 'react';

const steps = [
  {
    number: 1,
    title: "Company Setup",
    description: "Set up your company profile, branding, and basic configurations."
  },
  {
    number: 2,
    title: "Add Reps",
    description: "Invite your sales representatives and assign their roles and territories."
  },
  {
    number: 3,
    title: "Assign Tasks",
    description: "Create tasks and assign them to your team members based on priorities."
  },
  {
    number: 4,
    title: "Go Live",
    description: "Start tracking performances, collecting data, and optimizing your sales process."
  }
];

const OnboardingSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Guided Onboarding</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get up and running in minutes with our straightforward onboarding process.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line connecting all steps */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
            
            <div className="space-y-8 md:space-y-0">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row md:mb-12">
                  <div className="flex md:block mb-4 md:mb-0">
                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-traccbox-500 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-grow h-1 bg-gray-200 md:hidden mx-4 mt-4"></div>
                    )}
                  </div>
                  
                  <div className="ml-0 md:ml-8 bg-white p-6 rounded-xl shadow-md md:w-full">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
