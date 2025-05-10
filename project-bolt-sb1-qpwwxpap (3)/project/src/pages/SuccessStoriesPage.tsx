import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { CampaignGrid } from '../components/campaign/CampaignGrid';
import { Button } from '../components/ui/Button';
import { Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function SuccessStoriesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: successStories, isLoading } = useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          profiles:creator_id(username, avatar_url)
        `)
        .eq('status', 'completed')
        .order('current_amount', { ascending: false })
        .limit(12);

      if (error) throw error;
      return data;
    },
  });

  // Default success stories for demonstration
  const defaultStories = [
    {
      id: '1',
      title: 'EcoCharge: Solar Power Bank Success',
      description: 'How we revolutionized portable charging with solar technology',
      story: 'Our journey began with a simple idea: create a sustainable power bank...',
      goal: 25000,
      current_amount: 30000,
      category: 'Technology',
      creator_id: '1',
      end_date: new Date('2023-12-31').toISOString(),
      status: 'completed',
      created_at: new Date('2023-07-15').toISOString(),
      updated_at: new Date('2023-12-31').toISOString(),
      cover_image: 'https://images.pexels.com/photos/6970075/pexels-photo-6970075.jpeg',
    },
    {
      id: '2',
      title: 'Community Art Gallery Transformation',
      description: 'From empty space to thriving cultural hub',
      story: 'When we started renovating our local art gallery...',
      goal: 50000,
      current_amount: 55000,
      category: 'Arts',
      creator_id: '2',
      end_date: new Date('2023-11-30').toISOString(),
      status: 'completed',
      created_at: new Date('2023-06-10').toISOString(),
      updated_at: new Date('2023-11-30').toISOString(),
      cover_image: 'https://images.pexels.com/photos/20967/pexels-photo.jpg',
    },
  ];

  const stories = successStories || defaultStories;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
            <p className="text-lg text-gray-600">
              Discover inspiring campaigns that reached their goals and made a real difference
            </p>
          </div>
          {user && (
            <Button
              variant="primary"
              onClick={() => navigate('/share-success-story')}
              leftIcon={<Plus className="h-5 w-5" />}
            >
              Share Your Success Story
            </Button>
          )}
        </div>

        {/* Featured Success Story */}
<div className="bg-gradient-to-r from-purple-600 to-teal-600 rounded-xl p-8 mb-12 text-white">
  <div className="max-w-3xl">
    <div className="flex items-center mb-4">
      <TrendingUp className="h-6 w-6 mr-2" />
      <span className="text-sm font-semibold">Featured Story</span>
    </div>

    {/* Story 1 */}
    <div className="bg-purple-700 rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-4">EcoCharge: From Idea to Impact</h2>
      <p className="text-lg mb-6">
        Discover how a sustainable power bank project exceeded its goal by 120% and is now
        helping communities across the globe access clean energy.
      </p>
      <Button
        variant="primary"
        className="bg-lightgreen text-purple-600 hover:bg-gray-100"
        onClick={() => navigate('/campaigns/1')}
      >
        Read the Full Story
      </Button>
    </div>

    {/* Story 2 */}
    <div className="bg-indigo-700 rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Injured once Super Fit now</h2>
      <p className="text-lg mb-6">
        Once I was an amputee. Because of this website, I got a prosthetic arm and leg. Now I’m a Gym Rat with muscles.
      </p>
      <Button
        variant="primary"
        className="bg-lightgreen text-purple-600 hover:bg-gray-100"
        onClick={() => navigate('/campaigns/2')}
      >
        Read the Full Story
      </Button>
    </div>

    {/* Story 3 */}
    <div className="bg-blue-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Journey from a Dropout to Entrepreneur</h2>
      <p className="text-lg mb-6">
        From a person who dropped out from school, I achieved success and became an entrepreneur.
      </p>
      <Button
        variant="primary"
        className="bg-lightgreen text-purple-600 hover:bg-gray-100"
        onClick={() => navigate('/campaigns/3')}
      >
        Read the Full Story
      </Button>
    </div>
  </div>
</div>


        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Success Stories</h2>
            <CampaignGrid
              campaigns={stories}
              onCampaignClick={(campaign) => navigate(`/campaigns/${campaign.id}`)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}