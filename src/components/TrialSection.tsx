
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TrialSection = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your free trial has been activated. Check your email for next steps.",
      });
      setEmail('');
      setCompany('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 relative bg-gradient-to-br from-traccbox-500 to-traccbox-700">
      <div className="absolute inset-0 bg-blue-wave opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your 14-Day Free Trial</h2>
          <p className="text-lg opacity-90 mb-8">
            No credit card required. Get full access to all features during your trial.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto bg-white rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Company Name</label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-traccbox-500 hover:bg-traccbox-600 py-6 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Get Started"}
            </Button>
            
            <p className="text-gray-500 text-sm text-center">
              By clicking "Get Started", you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrialSection;
