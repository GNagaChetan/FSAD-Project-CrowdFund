import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

export function CampaignPage() {
  const { id } = useParams<{ id: string }>();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
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
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

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

  if (!campaign) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Campaign not found</h1>
        </div>
      </Layout>
    );
  }

  const progress = (campaign.current_amount / campaign.goal) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={campaign.cover_image}
              alt={campaign.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            <div className="flex items-center mb-6">
              {/* Updated Avatar component with name prop */}
              <Avatar src={campaign.profiles.avatar_url} name={campaign.profiles.full_name} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{campaign.profiles.full_name}</p>
                <p className="text-sm text-gray-500">@{campaign.profiles.username}</p>
              </div>
            </div>
            <Badge>{campaign.category}</Badge>
            <div className="prose max-w-none mt-8">
              <h2 className="text-xl font-semibold mb-4">Story</h2>
              <p className="whitespace-pre-wrap">{campaign.story}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  ${campaign.current_amount.toLocaleString()}
                </h3>
                <p className="text-gray-500">raised of ${campaign.goal.toLocaleString()} goal</p>
                {/* Updated ProgressBar component */}
                <ProgressBar value={progress} />
              </div>
              <Button className="w-full mb-4">Support this campaign</Button>
              <div className="text-sm text-gray-500">
                <p>Campaign ends on {new Date(campaign.end_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
