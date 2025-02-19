import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./LoadingSpinner";
import oneVectorImage from './images/onevector.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('A reset link has been sent to your email. Check your inbox for the next steps!');
        setError('');
      } else {
        throw new Error('Failed to send reset link');
      }
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Card className="border border-gray-100 shadow-lg rounded-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#15BACD] to-[#094DA2]" />
          
          {/* Logo and Title Section */}
          <div className="flex flex-col items-center pt-8 md:pt-10 px-6">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={oneVectorImage}
                alt="OneVector Logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <h1 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[#15BACD] to-[#094DA2] bg-clip-text text-transparent">
                TalentHub
              </h1>
            </div>
            
            <div className="mb-8 text-center">
              <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-3">
                Forgot your password?
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-sm">
                No worries! Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>
          </div>

          <CardContent className="px-6 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 text-gray-800 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#15BACD] focus:border-transparent transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#15BACD] to-[#094DA2] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.97] disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>
            </form>

            {/* Success Message */}
            {message && (
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                <p className="text-green-700 text-sm text-center">
                  {message}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-700 text-sm text-center">
                  {error}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-4">
            <a 
              href="/"
              className="text-sm text-gray-600 hover:text-[#15BACD] transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform rotate-180"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Back to Login
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
