import React from 'react';
import { Button } from '../ui/Button';
import { Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Fund ideas that</span>{' '}
                <span className="block text-teal-600 xl:inline">matter to you</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join thousands of people bringing creative projects to life and making a difference in communities worldwide. Find a cause you believe in and help fund the future.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    leftIcon={<Search className="h-5 w-5" />}
                    onClick={() => navigate('/explore')}
                  >
                    Discover Projects
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    leftIcon={<TrendingUp className="h-5 w-5" />}
                    onClick={() => navigate('/create-campaign')}
                  >
                    Start a Campaign
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="People working together"
        />
      </div>
    </div>
  );
};