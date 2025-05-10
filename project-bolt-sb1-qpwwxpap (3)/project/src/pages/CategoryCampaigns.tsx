import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

interface Campaign {
  id: number;
  title: string;
  cover_image: string;
  current_amount: number;
  goal: number;
  category: string;
  story: string;
  end_date: string;
  profiles: {
    full_name: string;
    username: string;
    avatar_url: string;
  };
}

export function CategoryCampaigns() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categorySlug) {
      // Handle the case where categorySlug is undefined
      return;
    }

    async function fetchCampaigns() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select(`
            *,
            profiles:creator_id (
              username,
              avatar_url,
              full_name
            )
          `)
          .eq('category', categorySlug);

        if (error) throw error;
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampaigns();
  }, [categorySlug]);

  if (!categorySlug) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!campaigns.length) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">No campaigns found in this category</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Campaigns in {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const progress = (campaign.current_amount / campaign.goal) * 100;
            return (
              <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={campaign.cover_image}
                  alt={campaign.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
                  <div className="flex items-center mb-4">
                    {/* Updated Avatar component with name prop */}
                    <Avatar src={campaign.profiles.avatar_url} name={campaign.profiles.full_name} />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{campaign.profiles.full_name}</p>
                      <p className="text-sm text-gray-500">@{campaign.profiles.username}</p>
                    </div>
                  </div>
                  <Badge>{campaign.category}</Badge>
                  <div className="mt-4">
                    {/* Updated ProgressBar component */}
                    <ProgressBar value={progress} />
                    <p className="text-sm text-gray-500 mt-2">
                      ${campaign.current_amount.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
                    </p>
                    <Button className="w-full mt-4">Support this campaign</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
