import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2 } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to bring your idea to life?
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center text-white mb-4 sm:mb-0 sm:mr-8">
                <CheckCircle2 className="h-5 w-5 text-teal-400 mr-2" />
                <span>No platform fees</span>
              </div>
              <div className="flex items-center text-white mb-4 sm:mb-0 sm:mr-8">
                <CheckCircle2 className="h-5 w-5 text-teal-400 mr-2" />
                <span>Dedicated support</span>
              </div>
              <div className="flex items-center text-white">
                <CheckCircle2 className="h-5 w-5 text-teal-400 mr-2" />
                <span>Instant payouts</span>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <Button
              variant="primary"
              size="lg"
              className="w-full lg:w-auto bg-white hover:bg-gray-50 text-purple-700 border-transparent"
            >
              Start a Campaign
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};