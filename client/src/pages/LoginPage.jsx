import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://sweet-track-api.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // necessary to send cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-teal-200 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-teal-100 font-medium text-sm">Loading...</span>
        </div>
      ) : (
        <div className="bg-black p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-400 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-sm text-white mb-6">
            Let's login to continue tracking your sugar levels.
          </p>

          {error && (
            <div className="text-center text-sm text-red-500 mb-4 font-medium">{error}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-orange-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                placeholder="you@email.com"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                placeholder="••••••••"
                required
                disabled={submitting}
              />
              <div
                className="text-right text-xs text-zinc-300 mt-1 hover:underline cursor-pointer"
                onClick={() => navigate('/forgot-password')}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/forgot-password'); }}
              >
                Forgot password?
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-700" />
          </div>


       <p className="text-center text-sm text-zinc-300 mt-5">
            Don’t have an account?{' '}
            <span
              className="text-teal-400 font-semibold hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/register'); }}
            >
              Sign Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
