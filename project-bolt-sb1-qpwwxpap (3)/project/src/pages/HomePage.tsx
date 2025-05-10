import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { FeaturedCampaigns } from '../components/home/FeaturedCampaigns';
import { Categories } from '../components/home/Categories';
import { HowItWorks } from '../components/home/HowItWorks';
import { SuccessStories } from '../components/home/SuccessStories';
import { CTA } from '../components/home/CTA';
import { campaigns, categories, blogPosts } from '../lib/data';
import { BlogPost, Campaign, Category } from '../types';

export const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleCampaignClick = (campaign: Campaign) => {
    console.log('Campaign clicked:', campaign);
    // Navigate to campaign details page
  };
  
  const handleCategoryClick = (category: Category) => {
    console.log('Category clicked:', category);
    // Navigate to category page or filter results
  };
  
  const handlePostClick = (post: BlogPost) => {
    console.log('Blog post clicked:', post);
    // Navigate to blog post details page
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedCampaigns 
          campaigns={campaigns}
          onCampaignClick={handleCampaignClick}
        />
        
        <Categories 
          categories={categories} 
          onCategoryClick={handleCategoryClick}
        />
        
        <HowItWorks />
        
        <SuccessStories 
          posts={blogPosts}
          onPostClick={handlePostClick}
        />
        
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};