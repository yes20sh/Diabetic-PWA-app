import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-3">
      <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 text-center">
          Forgot Your Password?
        </h2>

        {submitted ? (
          <p className="text-center text-sm text-gray-700">
            If an account with <span className="font-medium">{email}</span> exists, 
            you will receive an email with instructions to reset your password.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Enter your email address
              </label>
              <input
                type="email"
                className="w-full mt-1 p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-sm transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-500 mt-3">
          Remember your password?{' '}
          <a href="/" className="text-purple-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
