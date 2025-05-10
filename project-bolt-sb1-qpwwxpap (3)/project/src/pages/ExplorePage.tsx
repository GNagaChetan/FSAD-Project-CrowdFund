import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CampaignGrid } from '../components/campaign/CampaignGrid';
import { Search, Filter } from 'lucide-react';
import type { Campaign } from '../types';

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for campaigns
  const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Sample Campaign 1',
    description: 'This is a sample campaign description',
    story: 'Campaign story here',
    goal: 10000,
    currentAmount: 5000,
    category: 'technology',
    tags: ['tech', 'innovation'],
    creatorId: '1',
    endDate: new Date(),
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    coverImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  },
  {
    id: '2',
    title: 'Sample Campaign 2',
    description: 'Another sample campaign description',
    story: 'Another campaign story',
    goal: 20000,
    currentAmount: 15000,
    category: 'education',
    tags: ['learning', 'community'],
    creatorId: '2',
    endDate: new Date(),
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
];


  const categories = [
    'all',
    'technology',
    'education',
    'environment',
    'health',
    'community',
    'creative',
    'business'
  ];

  // Filter campaigns by category and search query
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesCategory =
      selectedCategory === 'all' || campaign.category === selectedCategory;
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Campaigns</h1>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full md:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredCampaigns.length} campaign
                {filteredCampaigns.length !== 1 && 's'}
              </p>
              <select
                className="border border-gray-300 rounded-lg px-3 py-1"
                defaultValue="newest"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="funded">Most Funded</option>
                <option value="endingSoon">Ending Soon</option>
              </select>
            </div>

            <CampaignGrid campaigns={filteredCampaigns} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
