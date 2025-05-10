import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Category } from '../../types';
import { Cpu, Palette, Users, BookOpen, Leaf, HeartPulse } from 'lucide-react';

interface CategoriesProps {
  categories: Category[];
}

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const navigate = useNavigate();

  const categoryIcons: Record<string, React.ReactNode> = {
    'technology': <Cpu className="h-8 w-8 text-gray-700" />,
    'arts': <Palette className="h-8 w-8 text-gray-700" />,
    'community': <Users className="h-8 w-8 text-gray-700" />,
    'education': <BookOpen className="h-8 w-8 text-gray-700" />,
    'environment': <Leaf className="h-8 w-8 text-gray-700" />,
    'health': <HeartPulse className="h-8 w-8 text-gray-700" />,
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explore by Category</h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover campaigns in areas you care about
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              hover
              className="cursor-pointer transition-all duration-200 hover:-translate-y-1"
            >
              <div
                onClick={() => navigate(`/campaigns?category=${category.slug}`)}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="mb-4">
                  {categoryIcons[category.slug] || (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-bold">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
