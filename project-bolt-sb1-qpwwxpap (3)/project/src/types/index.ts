export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  story: string;
  goal: number;
  currentAmount: number;
  category: string;
  tags: string[];
  coverImage: string;
  gallery?: string[];
  creatorId: string;
  creator?: User;
  endDate: Date;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  amount: number;
  campaignId: string;
  userId?: string;
  name: string;
  message?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface Reward {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  minAmount: number;
  maxClaims?: number;
  currentClaims: number;
  estimatedDelivery?: Date;
  image?: string;
}

export interface Comment {
  id: string;
  campaignId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Update {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}