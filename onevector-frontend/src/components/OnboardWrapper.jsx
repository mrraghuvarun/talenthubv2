
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import OnboardingForm from './OnboardingForm';
import LoadingSpinner from './LoadingSpinner';

const OnboardWrapper = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      console.log("Token from URL:", token); // Add this
      
      if (!token) {
        setError('No token provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/verify-token?token=${token}`);
        console.log("API Response:", response); // Add this
        if (response.data.email) {
          localStorage.setItem('userEmail', response.data.email);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error details:', error.response?.data); // Add this
        console.error('Error verifying token:', error);
        setError('Invalid or expired token');
        setIsLoading(false);
        // Comment out navigation for now to see error
        // navigate('/');
      }
    };

    verifyToken();
  }, [searchParams, navigate]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return <OnboardingForm />;
};

export default OnboardWrapper;
