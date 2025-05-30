import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#000000] p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-400 mb-2">
          Forgot Your Password?
        </h2>

        {submitted ? (
          <p className="text-center text-sm text-zinc-300 mt-4">
            If an account with <span className="text-white font-medium">{email}</span> exists, 
            you'll receive an email with reset instructions.
          </p>
        ) : (
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-orange-400">
                Enter your email address
              </label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 rounded-lg font-medium transition duration-200 text-sm sm:text-base"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-sm text-zinc-300 mt-5">
          Remember your password?{' '}
          <Link to="/" className="text-teal-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
