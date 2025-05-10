import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CampaignPage } from './pages/CampaignPage';
import { CreateCampaignPage } from './pages/CreateCampaignPage';
import { CategoryPage } from './pages/CategoryPage';
import { Footer } from './components/layout/Footer';
import AboutPage from './pages/AboutPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { DonatePage } from './pages/DonatePage';
import ShareSuccessStoryPage from './pages/ShareSuccessStoryPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { CategoryCampaigns } from './pages/CategoryCampaigns'; // 👈 FIXED: Use named import

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/campaigns/:id" element={<CampaignPage />} />
            <Route path="/campaigns/category/:categorySlug" element={<CategoryCampaigns />} /> {/* 👈 Updated route for clarity */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/donate/:id" element={<DonatePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-campaign" element={<CreateCampaignPage />} />
              <Route path="/share-success-story" element={<ShareSuccessStoryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
