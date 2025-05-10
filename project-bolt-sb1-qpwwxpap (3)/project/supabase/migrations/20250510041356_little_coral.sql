/*
  # Initial Schema Setup for Crowdfunding Platform

  1. Tables
    - users (handled by Supabase Auth)
    - profiles
      - id (uuid, references auth.users)
      - username (text, unique)
      - full_name (text)
      - avatar_url (text)
      - bio (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - campaigns
      - id (uuid)
      - title (text)
      - description (text)
      - story (text)
      - goal (numeric)
      - current_amount (numeric)
      - category (text)
      - tags (text[])
      - cover_image (text)
      - gallery (text[])
      - creator_id (uuid, references auth.users)
      - end_date (timestamptz)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - donations
      - id (uuid)
      - amount (numeric)
      - campaign_id (uuid, references campaigns)
      - user_id (uuid, references auth.users)
      - name (text)
      - message (text)
      - is_anonymous (boolean)
      - created_at (timestamptz)
    
    - comments
      - id (uuid)
      - campaign_id (uuid, references campaigns)
      - user_id (uuid, references auth.users)
      - content (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - updates
      - id (uuid)
      - campaign_id (uuid, references campaigns)
      - title (text)
      - content (text)
      - created_at (timestamptz)
    
    - blog_posts
      - id (uuid)
      - title (text)
      - content (text)
      - excerpt (text)
      - cover_image (text)
      - author_id (uuid, references auth.users)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create campaigns table
CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  story text NOT NULL,
  goal numeric NOT NULL CHECK (goal > 0),
  current_amount numeric NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  cover_image text,
  gallery text[] DEFAULT '{}',
  creator_id uuid REFERENCES auth.users NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create donations table
CREATE TABLE donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL CHECK (amount > 0),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  message text,
  is_anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updates table
CREATE TABLE updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  cover_image text,
  author_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Campaigns are viewable by everyone" ON campaigns
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own campaigns" ON campaigns
  FOR UPDATE USING (auth.uid() = creator_id);

-- Donations policies
CREATE POLICY "Donations are viewable by everyone" ON donations
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create donations" ON donations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Updates policies
CREATE POLICY "Updates are viewable by everyone" ON updates
  FOR SELECT USING (true);

CREATE POLICY "Campaign creators can create updates" ON updates
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT creator_id FROM campaigns WHERE id = campaign_id
    )
  );

-- Blog posts policies
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own blog posts" ON blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Create function to handle campaign updates
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE campaigns
  SET current_amount = (
    SELECT COALESCE(SUM(amount), 0)
    FROM donations
    WHERE campaign_id = NEW.campaign_id
  )
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating campaign amounts
CREATE TRIGGER update_campaign_amount_after_donation
  AFTER INSERT ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_campaign_amount();