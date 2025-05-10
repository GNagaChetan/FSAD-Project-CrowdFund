import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CampaignGrid } from '../components/campaign/CampaignGrid';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['userCampaigns', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('creator_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your campaigns and track their progress</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/create-campaign')}
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Create Campaign
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : campaigns && campaigns.length > 0 ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Campaigns</h2>
              <CampaignGrid 
                campaigns={campaigns}
                onCampaignClick={(campaign) => navigate(`/campaigns/${campaign.id}`)}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-500 mb-6">Start your first campaign and bring your ideas to life</p>
            <Button
              variant="primary"
              onClick={() => navigate('/create-campaign')}
              leftIcon={<Plus className="h-5 w-5" />}
            >
              Create Your First Campaign
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}