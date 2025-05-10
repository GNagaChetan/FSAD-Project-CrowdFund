import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function ShareSuccessStory() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    story: '',
    cover_image: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setMessage('Please login to share a story.');
      return;
    }

    if (!form.title || !form.description || !form.story || !form.cover_image) {
      setMessage('All fields are required.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('campaigns').insert([
      {
        title: form.title,
        description: form.description,
        story: form.story,
        cover_image: form.cover_image,
        creator_id: user.id,
        status: 'completed',
        goal: 1000,
        current_amount: 1000,
        category: 'Other',
        end_date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Submission error:', error.message);
      setMessage('Something went wrong. Please try again.');
    } else {
      setMessage('Success story shared successfully!');
      setForm({ title: '', description: '', story: '', cover_image: '' });
    }

    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Share Your Success Story</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Short description"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Full Story</label>
            <textarea
              name="story"
              value={form.story}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-32"
              placeholder="Tell your success journey..."
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cover Image URL</label>
            <input
              type="text"
              name="cover_image"
              value={form.cover_image}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Image URL"
              required
            />
          </div>
          {message && (
            <div
              className={`text-sm ${
                message.includes('success') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </div>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Sharing...' : 'Share Story'}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
