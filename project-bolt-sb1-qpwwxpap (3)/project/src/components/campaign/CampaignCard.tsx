import React from 'react';
import { Campaign } from '../../types';
import { Card, CardContent, CardFooter, CardImage } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Heart } from 'lucide-react';
import { formatCurrency, calculateProgress, daysRemaining, truncateText } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface CampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onClick,
}) => {
  const navigate = useNavigate();
  const progress = calculateProgress(campaign.current_amount, campaign.goal);
  const days = daysRemaining(campaign.end_date);
  
  return (
    <Card 
      hover 
      className="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <CardImage 
        src={campaign.cover_image} 
        alt={campaign.title} 
      />
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="primary" size="sm">
            {campaign.category}
          </Badge>
          {campaign.tags && campaign.tags.length > 0 && (
            <Badge variant="default" size="sm">
              {campaign.tags[0]}
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateText(campaign.description, 100)}
        </p>
        <ProgressBar 
          value={campaign.current_amount} 
          max={campaign.goal} 
          className="mb-2"
        />
        <div className="flex justify-between text-sm font-medium">
          <span>{formatCurrency(campaign.current_amount)}</span>
          <span className="text-gray-500">
            {Math.round(progress)}% of {formatCurrency(campaign.goal)}
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full mt-4"
          leftIcon={<Heart className="h-4 w-4" />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/donate/${campaign.id}`);
          }}
        >
          Donate Now
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-gray-100 bg-gray-50">
        <div className="flex items-center">
          <Avatar 
            src={campaign.creator?.avatar_url}
            name={campaign.creator?.full_name || 'Anonymous'} 
            size="xs" 
          />
          <span className="ml-2 text-sm text-gray-600">
            {campaign.creator?.full_name || 'Anonymous'}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {days} days left
        </span>
      </CardFooter>
    </Card>
  );
};