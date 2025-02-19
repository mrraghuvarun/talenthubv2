import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PowerUserDashboard from './components/PowerUserDashboard';
import OnboardingForm from './components/OnboardingForm';
import ProtectedRoute from './components/ProtectedRoute';
import CandidateDetails from './components/CandidateDetails';
import Profile from './components/Profile';
import SuccessPage from './components/SuccessPage';
import PowerCandidateDetails from './components/PowerCandidateDetails';
import UserDetails from './components/UserDetails';
import OnboardWrapper from './components/OnboardWrapper';

import { useTheme } from './ThemeContext'; // Ensure this is the correct path
import './index.css'; // Keep styles imported last for consistency
import "@radix-ui/themes/styles.css";
import ResetPassword from './components/ResetPassword';


function App() {
  const { isDarkMode } = useTheme(); // Access theme context

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-800 text-black dark:text-white`}>
        {/* Add ThemeToggleButton to the header or a visible position */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/onboard" element={<OnboardWrapper />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/power-user-dashboard"
            element={
              <ProtectedRoute>
                <PowerUserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/candidate-details" element={<CandidateDetails />} />
          <Route path="/power-candidate-details" element={<PowerCandidateDetails />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
