import React from 'react';
import { Campaign } from '../../types';
import { CampaignGrid } from '../campaign/CampaignGrid';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
  onViewAll?: () => void;
  onCampaignClick?: (campaign: Campaign) => void;
}

export const FeaturedCampaigns: React.FC<FeaturedCampaignsProps> = ({
  campaigns,
  onViewAll,
  onCampaignClick,
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Campaigns</h2>
            <p className="mt-2 text-gray-600">Discover projects making an impact right now</p>
          </div>
          <Button 
            variant="link" 
            className="mt-4 sm:mt-0"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={onViewAll}
          >
            View all campaigns
          </Button>
        </div>
        
        <CampaignGrid 
          campaigns={campaigns}
          onCampaignClick={onCampaignClick} 
        />
      </div>
    </section>
  );
};