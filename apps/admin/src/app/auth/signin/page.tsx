'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (_error) {
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl font-bold text-apple-gray-900">Sign In</h1>
          <p className="mt-2 text-sm text-apple-gray-600">
            Access your affiliate platform dashboard
          </p>
        </div>

        <div className="admin-action-card animate-fade-in-up animation-delay-200">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-apple-gray-900">Welcome Back</h2>
              <p className="text-sm text-apple-gray-600 mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-apple-red/10 border border-apple-red/20 rounded-2xl text-apple-red">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@affiliateplatform.com"
                  className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-apple-gray-200 rounded-2xl focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full admin-button admin-button-primary ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-apple-gray-600">
                Demo credentials: admin@affiliateplatform.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}