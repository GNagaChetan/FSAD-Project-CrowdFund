import React from 'react';
import { Campaign } from '../../types';
import { CampaignCard } from './CampaignCard';

interface CampaignGridProps {
  campaigns: Campaign[];
  columns?: number;
  onCampaignClick?: (campaign: Campaign) => void;
}

export const CampaignGrid: React.FC<CampaignGridProps> = ({
  campaigns = [],
  columns = 3,
  onCampaignClick,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
      {campaigns?.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onClick={() => onCampaignClick?.(campaign)}
        />
      ))}
    </div>
  );
};