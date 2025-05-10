import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import ReCAPTCHA from 'react-google-recaptcha';

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = React.useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    if (isAdminMode && !captchaToken) {
      setError('Please complete the CAPTCHA to login as Admin.');
      return;
    }

    try {
      setError(null);
      // Perform login action here
      await login(data.email, data.password);

      // Redirect to the same dashboard for both admin and user
      navigate('/dashboard'); // Same page for both admin and user
    } catch (err) {
      setError('Invalid credentials or an error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isAdminMode ? 'Admin Sign In' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account
              </Link>
            </p>
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdminMode(prev => !prev);
                  setCaptchaToken(null);
                  setError(null);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                {isAdminMode ? 'Switch to User Login' : 'Login as Admin'}
              </button>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  id="email"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  id="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {isAdminMode && (
              <div className="flex justify-center mt-4">
                <ReCAPTCHA
                  sitekey="6LfE4jQrAAAAAORXo457UXz3vIRMXw6EC_YCH6J5"
                  onChange={handleCaptchaChange}
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isAdminMode ? 'Sign in as Admin' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
