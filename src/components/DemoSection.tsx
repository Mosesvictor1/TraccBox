
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" }
];

const availableDates = [
  { value: "tomorrow", label: "Tomorrow" },
  { value: "next-week", label: "Next Week" },
  { value: "two-weeks", label: "In Two Weeks" }
];

const availableTimes = [
  { value: "9am", label: "9:00 AM" },
  { value: "11am", label: "11:00 AM" },
  { value: "1pm", label: "1:00 PM" },
  { value: "3pm", label: "3:00 PM" },
  { value: "5pm", label: "5:00 PM" }
];

const DemoSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Demo scheduled!",
        description: "We've sent a confirmation to your email with all the details.",
      });
      setFormData({
        name: '',
        email: '',
        companySize: '',
        preferredDate: '',
        preferredTime: ''
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-blue-wave-bottom bg-no-repeat bg-top bg-cover">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-traccbox-500 to-traccbox-700 p-8 text-white">
              <div className="flex items-center mb-6">
                <Calendar className="mr-3" size={24} />
                <h3 className="text-2xl font-bold">Schedule a Demo</h3>
              </div>
              
              <p className="mb-6 opacity-90">
                See how TraccBox can transform your field sales operations with a personalized demo from our product specialists.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p>Learn how TraccBox adapts to your specific sales process</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p>See the analytics dashboard in action</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <p>Get your questions answered by product experts</p>
                </div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm opacity-80">
                  "The demo was tailored to our industry's needs and showed us exactly how TraccBox would solve our specific challenges."
                </p>
                <p className="font-medium mt-2">— Victor Moses, Sales Director</p>
              </div>
            </div>
            
            <div className="p-8">
              <h4 className="text-xl font-semibold mb-6">Book Your Demo Session</h4>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Work Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="companySize" className="block text-gray-700 font-medium mb-2">Company Size</label>
                  <Select 
                    value={formData.companySize} 
                    onValueChange={(value) => handleSelectChange('companySize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Company Size</SelectLabel>
                        {companySizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-gray-700 font-medium mb-2">Preferred Date</label>
                    <Select 
                      value={formData.preferredDate} 
                      onValueChange={(value) => handleSelectChange('preferredDate', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Available Dates</SelectLabel>
                          {availableDates.map((date) => (
                            <SelectItem key={date.value} value={date.value}>
                              {date.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="preferredTime" className="block text-gray-700 font-medium mb-2">Preferred Time</label>
                    <Select 
                      value={formData.preferredTime} 
                      onValueChange={(value) => handleSelectChange('preferredTime', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Available Times</SelectLabel>
                          {availableTimes.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-traccbox-500 hover:bg-traccbox-600 text-white py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Scheduling..." : "Schedule Demo"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
