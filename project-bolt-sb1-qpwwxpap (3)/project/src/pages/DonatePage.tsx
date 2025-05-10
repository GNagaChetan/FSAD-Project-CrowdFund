import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export function DonatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success

  const { data: campaign } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // List of backend servers (simulating load balancing by rotating between them)
  const backendServers = [
    'http://localhost:3001/api/donations', // Backend Server 1
    'http://localhost:3002/api/donations', // Backend Server 2
  ];

  // Simple round-robin counter for load balancing
  let requestIndex = 0;

  // Function to get the next backend server (round-robin)
  const getNextBackend = () => {
    const server = backendServers[requestIndex];
    requestIndex = (requestIndex + 1) % backendServers.length;
    return server;
  };

  const handleDonate = async () => {
    try {
      const backendUrl = getNextBackend(); // Get the next backend server URL

      const { error } = await supabase
        .from('donations')
        .insert({
          amount: parseFloat(amount),
          campaign_id: id,
          user_id: user?.id,
          name: isAnonymous ? 'Anonymous' : user?.user_metadata?.full_name || user?.email,
          message,
          is_anonymous: isAnonymous,
        });

      if (error) throw error;
      
      // Send data to the next backend server for processing
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          campaign_id: id,
          user_id: user?.id,
          message,
          is_anonymous: isAnonymous,
        }),
      });

      if (response.ok) {
        setStep(3); // Move directly to the success page
      } else {
        console.error('Error making donation on backend');
      }
    } catch (error) {
      console.error('Error making donation:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Make a Donation</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Add a message of support"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 text-teal-600"
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                  Make this donation anonymous
                </label>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setStep(2)} // Directly proceed to Payment step
              >
                Donate Now
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="123"
                  />
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setStep(3)} // Proceed to donation success page
              >
                Complete Donation
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your donation of ${amount} has been successfully processed.
            </p>
            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate(`/campaigns/${id}`)}
              >
                Return to Campaign
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/explore')}
              >
                Explore More Campaigns
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
