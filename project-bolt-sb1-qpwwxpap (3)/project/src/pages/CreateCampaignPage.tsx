import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface CampaignFormData {
  title: string;
  description: string;
  story: string;
  goal: number;
  category: string;
  tags: string;
  endDate: string;
  coverImage: string;
}

export function CreateCampaignPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CampaignFormData>();

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .insert({
          title: data.title,
          description: data.description,
          story: data.story,
          goal: parseFloat(data.goal.toString()),
          category: data.category,
          tags: data.tags.split(',').map(tag => tag.trim()),
          end_date: new Date(data.endDate).toISOString(),
          cover_image: data.coverImage,
          creator_id: user?.id,
          status: 'pending'
        });

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a Campaign</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">
              Campaign Story
            </label>
            <textarea
              id="story"
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('story', { required: 'Story is required' })}
            />
            {errors.story && (
              <p className="mt-1 text-sm text-red-600">{errors.story.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                Funding Goal ($)
              </label>
              <input
                type="number"
                id="goal"
                min="1"
                step="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                {...register('goal', { 
                  required: 'Goal is required',
                  min: { value: 1, message: 'Goal must be at least $1' }
                })}
              />
              {errors.goal && (
                <p className="mt-1 text-sm text-red-600">{errors.goal.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                {...register('endDate', { required: 'End date is required' })}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Arts">Arts</option>
              <option value="Community">Community</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Health">Health</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              placeholder="e.g., education, technology, innovation"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('tags')}
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              {...register('coverImage', { required: 'Cover image is required' })}
            />
            {errors.coverImage && (
              <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}