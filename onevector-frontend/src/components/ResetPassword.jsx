import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from "lucide-react";
import oneVectorImage from './images/onevector.png';
import LoadingSpinner from './LoadingSpinner'; // Import the spinner

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const validatePassword = (password) => ({
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  });

  useEffect(() => {
    setValidations(validatePassword(newPassword));
  }, [newPassword]);

  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError('Please ensure your password meets all requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        setError('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setMessage('');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );

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
                Reset your password
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-sm">
                Please enter your new password below
              </p>
            </div>
          </div>

          <CardContent className="px-6 md:px-8">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full h-12 px-4 text-gray-800 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#15BACD] focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? 
                        <EyeOffIcon className="h-5 w-5" /> : 
                        <EyeIcon className="h-5 w-5" />
                      }
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <ValidationItem 
                      isValid={validations.minLength} 
                      text="Minimum 8 characters" 
                    />
                    <ValidationItem 
                      isValid={validations.hasUpperCase} 
                      text="At least one uppercase letter" 
                    />
                    <ValidationItem 
                      isValid={validations.hasNumber} 
                      text="At least one number" 
                    />
                    <ValidationItem 
                      isValid={validations.hasSpecial} 
                      text="At least one special character" 
                    />
                  </div>

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full h-12 px-4 text-gray-800 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#15BACD] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isPasswordValid}
                  className="w-full h-12 bg-gradient-to-r from-[#15BACD] to-[#094DA2] text-white font-medium rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.97] disabled:opacity-70"
                >
                  Reset Password
                </Button>
              </form>
            )}

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
            <button 
              onClick={() => navigate('/')}
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
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default ResetPassword;
