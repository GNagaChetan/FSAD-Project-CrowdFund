import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { BarChart4, Menu, X, Heart, Search, LogIn, Home, BookOpen, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CrowdFund</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-teal-500"
              >
                <Home className="mr-1 h-4 w-4" /> Home
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-teal-500 hover:text-gray-700"
              >
                <Search className="mr-1 h-4 w-4" /> Explore
              </button>
              <button 
                onClick={() => navigate('/success-stories')}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-teal-500 hover:text-gray-700"
              >
                <BookOpen className="mr-1 h-4 w-4" /> Success Stories
              </button>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {user ? (
              <>
                <Button 
                  variant="primary" 
                  size="sm"
                  leftIcon={<Plus className="h-4 w-4" />}
                  onClick={() => navigate('/create-campaign')}
                >
                  Start Campaign
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  leftIcon={<BarChart4 className="h-4 w-4" />}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <div onClick={() => navigate('/profile')}>
                  <Avatar 
                    src={user.user_metadata?.avatar_url} 
                    name={user.user_metadata?.full_name || user.email || 'User'} 
                    size="sm" 
                    className="cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<LogIn className="h-4 w-4" />}
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-teal-500 text-base font-medium text-teal-700 bg-teal-50 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/explore');
                setIsMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 w-full text-left"
            >
              Explore
            </button>
            <button
              onClick={() => {
                navigate('/success-stories');
                setIsMenuOpen(false);
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 w-full text-left"
            >
              Success Stories
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar 
                      src={user.user_metadata?.avatar_url}
                      name={user.user_metadata?.full_name || user.email || 'User'}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.user_metadata?.full_name || 'User'}
                    </div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/create-campaign');
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Start Campaign
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }} 
                  fullWidth
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};