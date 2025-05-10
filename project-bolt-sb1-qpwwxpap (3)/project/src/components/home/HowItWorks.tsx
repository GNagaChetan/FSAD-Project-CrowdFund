import React from 'react';
import { FileText, DollarSign, UserCheck, TrendingUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FileText className="h-12 w-12 text-teal-600" />,
      title: 'Create Your Campaign',
      description: 'Share your story, set a funding goal, and add a compelling cover image.'
    },
    {
      icon: <UserCheck className="h-12 w-12 text-teal-600" />,
      title: 'Get Approved',
      description: 'Our team reviews your campaign to ensure it meets our community guidelines.'
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-teal-600" />,
      title: 'Share & Promote',
      description: 'Spread the word to friends, family, and social networks to gain support.'
    },
    {
      icon: <DollarSign className="h-12 w-12 text-teal-600" />,
      title: 'Receive Funds',
      description: 'Once your campaign reaches its goal, access funds to bring your idea to life.'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Turn your ideas into reality with our simple four-step process
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-base text-gray-500">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-5/6 h-0.5 bg-gray-200 transform -translate-x-1/6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};