import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TalentHubImage from './images/talenthub.png';
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { X } from 'lucide-react';
import { Save } from 'lucide-react';


const OnboardingForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [confirmPassword, setConfirmPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');
const [isLoading, setIsLoading] = useState(false);
    // Personal Information States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Qualifications States
    const [recentJob, setRecentJob] = useState('');
    const [preferredRoles, setPreferredRoles] = useState('');
    const [availability, setAvailability] = useState('');
    const [workPermitStatus, setWorkPermitStatus] = useState('');
    const [preferredRoleType, setPreferredRoleType] = useState('');
    const [preferredWorkArrangement, setPreferredWorkArrangement] = useState('');
    const [compensation, setcompensation] = useState('');
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedCertifications, setSelectedCertifications] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [newCertification, setNewCertification] = useState('');
    

    // New state to manage dropdown visibility
    const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
    const [isCertificationsDropdownOpen, setIsCertificationsDropdownOpen] = useState(false);
    const [showCompletionAlert, setShowCompletionAlert] = useState(true);
    const [formSaved, setFormSaved] = useState(false);
const [savedResume, setSavedResume] = useState(null);
const [phoneError, setPhoneError] = useState('');
  const [linkedinError, setLinkedinError] = useState('');
  const [qualificationsError, setQualificationsError] = useState('');
  const DEFAULT_LINKEDIN_URL = 'https://linkedin.com/in/';


    useEffect(() => {
      const fetchSkillsAndCertifications = async () => {
        setIsLoading(true);
        try {
          const skillsResponse = await axios.get('http://localhost:3000/api/skills');
          setSkills(skillsResponse.data.map(skill => skill.skill_name));
    
          const certificationsResponse = await axios.get('http://localhost:3000/api/certifications');
          setCertifications(certificationsResponse.data.map(cert => cert.certification_name));
        } catch (error) {
          console.error('Error fetching skills and certifications:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchSkillsAndCertifications();
    }, []);

    useEffect(() => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        setEmail(userEmail);
      }
    }, []);

    const handleClearResume = () => {
      setResume(null);
      // Reset the file input
      const fileInput = document.getElementById('resume');
      if (fileInput) fileInput.value = '';
    };

    const handleNext = async (event) => {
      event.preventDefault();
      
      if (step === 1) {
        const isPhoneValid = !phoneNo || (phoneNo.length >= 10 && phoneNo.length <= 15);
        const isLinkedInValid = linkedinUrl.length > DEFAULT_LINKEDIN_URL.length + 2;
        
        if (!isPhoneValid) {
          setPhoneError('Phone number must have between 10 and 15 digits');
          return;
        }
        if (!isLinkedInValid) {
          setLinkedinError('Please enter a valid LinkedIn username');
          return;
        }
        setStep(2);
      }
      else if (step === 2) {
        // Check if required fields are filled
        if (!preferredRoles) {
          setQualificationsError('Please enter your preferred job roles');
          return;
        }
        if (!availability || !workPermitStatus || !preferredRoleType || !preferredWorkArrangement) {
          setQualificationsError('Please fill in all required fields');
          return;
        }
        if (!resume) {
          setQualificationsError('Please upload a resume before proceeding.');
          return;
        }
        setStep(3);
      }else if (step === 3) {
        const formData = new FormData();
        
        // Append all form data
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('phone_no', phoneNo);
        formData.append('address_line1', addressLine1);
        formData.append('address_line2', addressLine2);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('postal_code', postalCode);
        formData.append('linkedin_url', linkedinUrl);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('recent_job', recentJob);
        formData.append('preferred_roles', preferredRoles);
        formData.append('availability', availability);
        formData.append('work_permit_status', workPermitStatus);
        formData.append('preferred_role_type', preferredRoleType);
        formData.append('preferred_work_arrangement', preferredWorkArrangement);
        formData.append('compensation', compensation);
        formData.append('resume', resume);
  
        // Append selected skills and certifications
        selectedSkills.forEach(skill => formData.append('skills[]', skill));
        selectedCertifications.forEach(cert => formData.append('certifications[]', cert));
  
        // Add new skills and certifications if provided
        if (newSkill) {
          formData.append('skills[]', newSkill);
          setNewSkill(''); // Clear the input after submission
        }
  
        if (newCertification) {
          formData.append('certifications[]', newCertification);
          setNewCertification(''); // Clear the input after submission
        }
  
        try {
          const response = await axios.post('http://localhost:3000/api/submit-candidate', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          navigate('/success');
        } catch (error) {
          console.error('Error submitting the form:', error);
          alert('An error occurred while submitting the form. Please try again later.');
        } finally {
          setIsLoading(false); // Hide loader
        }
      }
    };
    
    useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem('onboardingFormData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          // Personal Details
          setFirstName(parsedData.firstName || '');
          setLastName(parsedData.lastName || '');
          setPhoneNo(parsedData.phoneNo || '');
          setAddressLine1(parsedData.addressLine1 || '');
          setAddressLine2(parsedData.addressLine2 || '');
          setCity(parsedData.city || '');
          setState(parsedData.state || '');
          setCountry(parsedData.country || '');
          setPostalCode(parsedData.postalCode || '');
          setLinkedinUrl(parsedData.linkedinUrl || '');
          setUsername(parsedData.username || '');
          setEmail(parsedData.email || '');
  
          // Professional Information
          setRecentJob(parsedData.recentJob || '');
          setPreferredRoles(parsedData.preferredRoles || '');
          setAvailability(parsedData.availability || '');
          setWorkPermitStatus(parsedData.workPermitStatus || '');
          setPreferredRoleType(parsedData.preferredRoleType || '');
          setPreferredWorkArrangement(parsedData.preferredWorkArrangement || '');
          
          // Skills and Certifications
          setSelectedSkills(parsedData.selectedSkills || []);
          setSelectedCertifications(parsedData.selectedCertifications || []);
  
          // Handle Resume
          if (parsedData.savedResume) {
            setSavedResume(parsedData.savedResume);
            // Only set the resume if it's a new session
            if (!resume) {
              const { name, type } = parsedData.savedResume;
              // Create a placeholder file object
              const placeholderFile = new Blob([''], { type });
              const file = new File([placeholderFile], name, { type });
              setResume(file);
            }
          }
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    };
  
    loadSavedData();
  }, []);

  // Add this function to handle form saving
const handleSaveProgress = () => {
  const formData = {
    firstName,
    lastName,
    phoneNo,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    linkedinUrl,
    username,
    email,
    recentJob,
    availability,
    workPermitStatus,
    preferredRoles, // Add this field
    preferredRoleType, // Add this field
    preferredWorkArrangement, // Add this field
    selectedSkills,
    selectedCertifications,
    compensation,
    savedResume: resume ? {
      name: resume.name,
      type: resume.type,
      lastModified: resume.lastModified
    } : null
  };

  localStorage.setItem('onboardingFormData', JSON.stringify(formData));
  
  // Add a success message
  const successAlert = document.createElement('div');
  successAlert.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
  successAlert.textContent = 'Progress saved successfully!';
  document.body.appendChild(successAlert);

  // Remove the alert after 3 seconds
  setTimeout(() => {
    document.body.removeChild(successAlert);
  }, 3000);
};

    const handlePrevious = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const handleRemoveSkill = (skillToRemove) => {
      setSelectedSkills((prevSkills) => 
        prevSkills.filter((skill) => skill !== skillToRemove)
      );
    };
    
    const handleRemoveCertification = (certToRemove) => {
      setSelectedCertifications((prevCerts) => 
        prevCerts.filter((cert) => cert !== certToRemove)
      );
    };

  const handleAddSkill = () => {
      if (newSkill && !skills.includes(newSkill)) {
          setSkills([...skills, newSkill]);
          setSelectedSkills([...selectedSkills, newSkill]); // Automatically select the new skill
          setNewSkill(''); // Clear the input
      }
  };

  const handleAddCertification = () => {
      if (newCertification && !certifications.includes(newCertification)) {
          setCertifications([...certifications, newCertification]);
          setSelectedCertifications([...selectedCertifications, newCertification]); // Automatically select the new certification
          setNewCertification(''); // Clear the input
      }
  };

  const toggleSkillsDropdown = () => {
      setIsSkillsDropdownOpen(!isSkillsDropdownOpen);
  };

  const toggleCertificationsDropdown = () => {
      setIsCertificationsDropdownOpen(!isCertificationsDropdownOpen);
  };

  const handleSkillSelect = (skill) => {
      if (!selectedSkills.includes(skill)) {
          setSelectedSkills([...selectedSkills, skill]);
      }
      setIsSkillsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleCertificationSelect = (certification) => {
      if (!selectedCertifications.includes(certification)) {
          setSelectedCertifications([...selectedCertifications, certification]);
      }
      setIsCertificationsDropdownOpen(false); // Close the dropdown after selection
  };

  // Modify the resume upload handler
const handleResumeUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setResume(file);
    setSavedResume({
      name: file.name,
      type: file.type,
      lastModified: file.lastModified
    });
  }
};

const handlePhoneChange = (e) => {
  const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
  if (value.length > 15) return; // Prevent more than 15 digits
  setPhoneNo(value);
  setPhoneError(value.length < 10 ? 'Phone number must have at least 10 digits' : '');
};

// Modify LinkedIn URL handler
const handleLinkedInChange = (e) => {
  let value = e.target.value.trim();

  // Validate that it is still a proper LinkedIn URL or let the user freely edit
  // Allow user to edit anything including the 'https://linkedin.com/in/' part
  if (!value.startsWith(DEFAULT_LINKEDIN_URL)) {
    // If the user removes the base, we'll allow it but still validate
    value = value.replace(DEFAULT_LINKEDIN_URL, '');
  }

  setLinkedinUrl(value); // Set the new URL as the state
  setLinkedinError(value.length < 3 ? 'LinkedIn URL must be at least 3 characters long' : '');
};

const steps = [
    { id: 1, title: 'Personal Details' },
    { id: 2, title: 'Qualifications' },
    { id: 3, title: 'Skills & Certifications' }
  ];


  const [showWelcome, setShowWelcome] = React.useState(true);
  const [formProgress, setFormProgress] = React.useState(0);
  const [lastActive, setLastActive] = React.useState(null);

  React.useEffect(() => {
    const requiredFields = {
      step1: ['username', 'password', 'firstName', 'lastName', 'linkedinUrl', 'phoneNo'],
      step2: ['recentJob', 'preferredRoles', 'availability', 'workPermitStatus', 'preferredRoleType', 'preferredWorkArrangement', 'resume'],
      step3: ['selectedSkills', 'selectedCertifications']
    };
  
    const filledFields = {
      step1: [
        username, password, firstName, lastName, linkedinUrl, 
        phoneNo && phoneNo.length >= 10
      ].filter(Boolean).length,
      step2: [
        recentJob, 
        preferredRoles, 
        availability, 
        workPermitStatus, 
        preferredRoleType, 
        preferredWorkArrangement, 
        resume
      ].filter(Boolean).length,
      step3: [
        selectedSkills.length > 0,
        selectedCertifications.length > 0
      ].filter(Boolean).length
    };

    const totalProgress = (
      (filledFields.step1 / requiredFields.step1.length +
       filledFields.step2 / requiredFields.step2.length +
       filledFields.step3 / requiredFields.step3.length) / 
      3
    ) * 100;
  
    setFormProgress(Math.round(totalProgress));
  }, [
    username, password, firstName, lastName, linkedinUrl, phoneNo,
    recentJob, preferredRoles, availability, workPermitStatus, 
    preferredRoleType, preferredWorkArrangement, resume,
    selectedSkills, selectedCertifications
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      {isLoading && <LoadingSpinner />}
      
      {/* Updated Header Section with mobile responsiveness */}
      <div className="flex items-center mb-6 md:justify-center md:space-x-4 pl-2">
        <img 
          src={TalentHubImage}
          alt="TalentHub" 
          className="h-8 md:h-12"
        />
        <h1 className="text-3xl md:text-3xl ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#15BACD] to-[#094DA2]">
          TalentHub
        </h1>
      </div>

      {/* Progress indicator with mobile responsiveness */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#353939"
              strokeWidth="3"
              strokeDasharray={`${formProgress}, 100`}
              className="transform -rotate-90 origin-center"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs md:text-sm font-semibold text-[#353939]">{formProgress}%</span>
          </div>
        </div>
      </div>


        {showWelcome && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-2xl mx-auto mb-6 mt-18"
  >
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200">
      <CardContent className="p-12">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#353939] mb-8">
            Welcome to TalentHub!
          </h1>
          
          <div className="space-y-8 mb-10">
            <p className="text-lg sm:text-xl text-gray-600">
              Complete your professional profile in three simple steps:
            </p>

            {/* Creative Steps Display */}
            <div className="flex flex-col space-y-6 max-w-lg mx-auto">
              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15BACD] to-[#094DA2] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-[#15BACD]/20">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-[#15BACD] shadow-sm group-hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[#353939] group-hover:text-[#15BACD] transition-colors">Personal Details</h3>
                  <p className="text-sm text-gray-600">Set up your profile and contact information</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15BACD] to-[#094DA2] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-[#15BACD]/20">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-[#15BACD] shadow-sm group-hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[#353939] group-hover:text-[#15BACD] transition-colors">Qualifications</h3>
                  <p className="text-sm text-gray-600">Share your experience and preferences</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#15BACD] to-[#094DA2] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-[#15BACD]/20">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border-l-4 border-[#15BACD] shadow-sm group-hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[#353939] group-hover:text-[#15BACD] transition-colors">Skills & Certifications</h3>
                  <p className="text-sm text-gray-600">Highlight your expertise and credentials</p>
                </div>
              </motion.div>
            </div>
          </div>

          <Button
            onClick={() => setShowWelcome(false)}
            className="px-10 py-4 bg-[#353939] hover:bg-[#454545] text-white text-xl rounded-lg transition-colors shadow-lg"
          >
            Let's Get Started
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
)}

   

    {!showWelcome && (
        <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
          <CardContent className="p-6">
            <form onSubmit={handleNext} className="space-y-8">
              <Tabs value={`step-${step}`} className="space-y-8">
                {/* Step 1: Personal Details */}
                <TabsContent value="step-1">
                  {/* Account Details Section */}
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                      <div className="h-8 w-1 bg-[#353939]"></div>
                      <h3 className="text-lg font-semibold text-[#353939]">Account Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="group">
                      <Label htmlFor="email" className="text-sm font-medium text-[#353939]">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20" 
                        disabled 
                      />
                    </div>
                      <div className="group">
                        <Label htmlFor="username" className="text-sm font-medium text-[#353939]">
                          Username <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="username" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                          className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          required 
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="password" className="text-sm font-medium text-[#353939]">
                          Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            value={password} 
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(value)) {
                                setPasswordError('Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character');
                              } else {
                                setPasswordError('');
                              }
                              setPassword(value);
                            }}
                            required 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {passwordError && (
                          <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                        )}
                      </div>
                      <div className="group">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#353939]">
                          Confirm Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input 
                            id="confirmPassword" 
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              if (e.target.value !== password) {
                                setConfirmPasswordError('Passwords do not match');
                              } else {
                                setConfirmPasswordError('');
                              }
                            }}
                            required
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {confirmPasswordError && (
                          <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Details Section */}
                  <div className="space-y-6 animate-fadeIn mt-8">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                      <div className="h-8 w-1 bg-[#353939]"></div>
                      <h3 className="text-lg font-semibold text-[#353939]">Personal Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      <div className="group">
                        <Label htmlFor="firstName" className="text-sm font-medium text-[#353939]">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          required 
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="lastName" className="text-sm font-medium text-[#353939]">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          required 
                        />
                      </div>
                      <div className="group">
      <Label htmlFor="phoneNo" className="text-sm font-medium text-[#353939]">
        Phone Number <span className="text-red-500">*</span>
      </Label>
      <Input 
        id="phoneNo" 
        type="tel" 
        value={phoneNo} 
        onChange={handlePhoneChange}
        placeholder="Enter numbers only" 
        className={`mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20 ${
          phoneError ? 'border-red-500' : ''
        }`}
        required
      />
      {phoneError && (
        <p className="mt-1 text-sm text-red-500">{phoneError}</p>
      )}
    </div>
    <div className="group">
  <Label htmlFor="linkedinUrl" className="text-sm font-medium text-[#353939]">
    LinkedIn URL <span className="text-red-500">*</span>
  </Label>
  <div className="relative">
    <Input 
      id="linkedinUrl" 
      value={linkedinUrl}
      onChange={handleLinkedInChange}
      className={`mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20 ${
        linkedinError ? 'border-red-500' : ''
      }`}
      required 
    />
  </div>
  {linkedinError && (
    <p className="mt-1 text-sm text-red-500">{linkedinError}</p>
  )}
</div>
                </div>
                  </div>

                  {/* Address Section with Updated Styling */}
                  <div className="space-y-6 animate-fadeIn mt-8">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                      <div className="h-8 w-1 bg-[#353939]"></div>
                      <h3 className="text-lg font-semibold text-[#353939]">Address Information</h3>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                          <Label htmlFor="addressLine1" className="text-sm font-medium text-[#353939]">
                            Address Line 1
                          </Label>
                          <Input 
                            id="addressLine1" 
                            value={addressLine1} 
                            onChange={(e) => setAddressLine1(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="addressLine2" className="text-sm font-medium text-[#353939]">
                            Address Line 2
                          </Label>
                          <Input 
                            id="addressLine2" 
                            value={addressLine2} 
                            onChange={(e) => setAddressLine2(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="group">
                          <Label htmlFor="city" className="text-sm font-medium text-[#353939]">
                            City
                          </Label>
                          <Input 
                            id="city" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="state" className="text-sm font-medium text-[#353939]">
                            State
                          </Label>
                          <Input 
                            id="state" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="country" className="text-sm font-medium text-[#353939]">
                            Country
                          </Label>
                          <Input 
                            id="country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                        <div className="group">
                          <Label htmlFor="postalCode" className="text-sm font-medium text-[#353939]">
                            Postal Code
                          </Label>
                          <Input 
                            id="postalCode" 
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)} 
                            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

             {/* Step 2: Qualifications */}
<TabsContent value="step-2" className="animate-fadeIn">
  <div className="max-w-2xl mx-auto space-y-8">
    <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
      <div className="h-8 w-1 bg-[#353939]"></div>
      <h3 className="text-lg font-semibold text-[#353939]">Professional Information</h3>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {/* Current Role Section */}
      <div className="space-y-6">
        <div className="group">
          <Label htmlFor="recentJob" className="text-sm font-medium text-[#353939]">
            Current/Recent Job Title <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="recentJob" 
            value={recentJob} 
            onChange={(e) => setRecentJob(e.target.value)} 
            placeholder="e.g., Senior Software Engineer"
            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
            required 
          />
        </div>

        <div className="group">
          <Label htmlFor="preferredRoles" className="text-sm font-medium text-[#353939]">
            Preferred Job Roles <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="preferredRoles" 
            value={preferredRoles} 
            onChange={(e) => setPreferredRoles(e.target.value)} 
            placeholder="e.g., Full Stack Developer, DevOps Engineer"
            className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
            required
          />
        </div>
      </div>

      {/* Work Status Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <Label className="text-sm font-medium text-[#353939]">
            Availability <span className="text-red-500">*</span>
          </Label>
          <Select 
        value={availability} 
        onValueChange={(value) => {
          setAvailability(value);
          setQualificationsError('');
        }} 
        required
      >            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Immediate">Immediate</SelectItem>
              <SelectItem value="2_weeks">2 Weeks Notice</SelectItem>
              <SelectItem value="1_month">1 Month Notice</SelectItem>
              <SelectItem value="2_months">2 Months Notice</SelectItem>
              <SelectItem value="3_months">3+ Months Notice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="group">
          <Label className="text-sm font-medium text-[#353939]">
            Work Authorization <span className="text-red-500">*</span>
          </Label>
          <Select 
        value={workPermitStatus} 
        onValueChange={(value) => {
          setWorkPermitStatus(value);
          setQualificationsError('');
        }} 
        required
      >            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us_citizen">US Citizen</SelectItem>
              <SelectItem value="green_card">Green Card</SelectItem>
              <SelectItem value="h1b">H1B Visa</SelectItem>
              <SelectItem value="l1">L1 Visa</SelectItem>
              <SelectItem value="opt">OPT/CPT</SelectItem>
              <SelectItem value="other">Other Work Authorization</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <Label className="text-sm font-medium text-[#353939]">
            Employment Type <span className="text-red-500">*</span>
          </Label>
          <Select 
        value={preferredRoleType} 
        onValueChange={(value) => {
          setPreferredRoleType(value);
          setQualificationsError('');
        }} 
        required
      >            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_time">Full Time</SelectItem>
              <SelectItem value="part_time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="contract_to_hire">Contract to Hire</SelectItem>
              <SelectItem value="intern">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="group">
          <Label className="text-sm font-medium text-[#353939]">
            Work Arrangement <span className="text-red-500">*</span>
          </Label>
 <Select 
        value={preferredWorkArrangement} 
        onValueChange={(value) => {
          setPreferredWorkArrangement(value);
          setQualificationsError('');
        }} 
        required
      >            <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20">
              <SelectValue placeholder="Select arrangement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  <div className="group">
    <Label className="text-sm font-medium text-[#353939]">
      Preferred Compensation Range <span className="text-red-500">*</span>
    </Label>
    <Select 
      value={compensation} 
      onValueChange={(value) => {
        setcompensation(value);
        setQualificationsError('');
      }} 
      required
    >
      <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20">
        <SelectValue placeholder="Select compensation range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0-50k">$0 - $50,000</SelectItem>
        <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
        <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
        <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
        <SelectItem value="150k-200k">$150,000 - $200,000</SelectItem>
        <SelectItem value="200k+">$200,000+</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Resume Upload Section */}
  <div className="space-y-2">
    <Label htmlFor="resume" className="text-sm font-medium text-[#353939]">
      Upload Resume <span className="text-red-500">*</span>
    </Label>
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <Input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            handleResumeUpload(e);
            setQualificationsError('');
           }}
          required={!savedResume}
          className="cursor-pointer bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20
          file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 
          file:text-sm file:font-semibold file:bg-[#353939]/10 file:text-[#353939]
          hover:file:bg-[#353939]/20"
        />
      </div>
      {resume && (
        <Button
          type="button"
          onClick={handleClearResume}
          variant="outline"
          className="mt-1 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          Clear
        </Button>
      )}
    </div>
    <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
    {resume && (
      <p className="text-sm text-[#353939]">
        Selected file: {resume.name}
      </p>
    )}
  </div>
</div>
</div>
</div>
</TabsContent>

      
<TabsContent value="step-3" className="animate-fadeIn">
  <div className="max-w-2xl mx-auto space-y-8">
    {/* Skills Section */}
    <div className="space-y-6">
      <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
        <div className="h-8 w-1 bg-[#353939]"></div>
        <h3 className="text-lg font-semibold text-[#353939]">Skills & Expertise</h3>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#353939]">
          Technical Skills <span className="text-red-500">*</span>
        </Label>
        
        {/* Skills Input and Dropdown */}
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value);
                  setIsSkillsDropdownOpen(true);
                }}
                onFocus={() => setIsSkillsDropdownOpen(true)}
                placeholder="Search or add new skills"
                className="bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
              />
              {isSkillsDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                  {skills
                    .filter(skill => skill.toLowerCase().includes(newSkill.toLowerCase()))
                    .map((skill, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSkillSelect(skill);
                          setNewSkill('');
                          setIsSkillsDropdownOpen(false);
                        }}
                      >
                        {skill}
                      </button>
                    ))}
                    {newSkill && !skills.includes(newSkill) && (
                      <button
                        className="w-full px-4 py-2 text-left text-[#353939] hover:bg-gray-50 focus:bg-gray-50 focus:outline-none font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddSkill();
                          setIsSkillsDropdownOpen(false);
                        }}
                      >
                        Add "{newSkill}" as new skill
                      </button>
                    )}
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={() => {
                handleAddSkill();
                setIsSkillsDropdownOpen(false);
              }}
              className="bg-[#353939] hover:bg-[#454545] text-white"
              disabled={!newSkill.trim()}
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Selected Skills */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
          {selectedSkills.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No skills selected. Add your technical expertise.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-[#353939]/10 text-[#353939] hover:bg-[#353939]/15 transition-colors"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 hover:text-red-500 focus:outline-none"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Certifications Section */}
    <div className="space-y-6">
      <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
        <div className="h-8 w-1 bg-[#353939]"></div>
        <h3 className="text-lg font-semibold text-[#353939]">Certifications</h3>
      </div>

      <div className="space-y-4">
  <Label className="text-sm font-medium text-[#353939]">
    Professional Certifications <span className="text-red-500">*</span>
  </Label>


        {/* Certifications Input and Dropdown */}
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                value={newCertification}
                onChange={(e) => {
                  setNewCertification(e.target.value);
                  setIsCertificationsDropdownOpen(true);
                }}
                onFocus={() => setIsCertificationsDropdownOpen(true)}
                placeholder="Search or add new certifications"
                className="bg-gray-50 border-gray-200 focus:border-[#353939] focus:ring-[#353939]/20"
              />
              {isCertificationsDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                  {certifications
                    .filter(cert => cert.toLowerCase().includes(newCertification.toLowerCase()))
                    .map((cert, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCertificationSelect(cert);
                          setNewCertification('');
                          setIsCertificationsDropdownOpen(false);
                        }}
                      >
                        {cert}
                      </button>
                    ))}
                    {newCertification && !certifications.includes(newCertification) && (
                      <button
                        className="w-full px-4 py-2 text-left text-[#353939] hover:bg-gray-50 focus:bg-gray-50 focus:outline-none font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddCertification();
                          setIsCertificationsDropdownOpen(false);
                        }}
                      >
                        Add "{newCertification}" as new certification
                      </button>
                    )}
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={() => {
                handleAddCertification();
                setIsCertificationsDropdownOpen(false);
              }}
              className="bg-[#353939] hover:bg-[#454545] text-white"
              disabled={!newCertification.trim()}
            >
              Add Certification
            </Button>
          </div>
        </div>

        {/* Selected Certifications */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
    {selectedCertifications.length === 0 ? (
      <p className="text-gray-500 text-sm text-center">Add at least one certification (required). Include any relevant professional certifications.</p>
    ) : (
            <div className="flex flex-wrap gap-2">
              {selectedCertifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  className="bg-[#353939]/10 text-[#353939] hover:bg-[#353939]/15 transition-colors"
                >
                  {cert}
                  <button
                    onClick={() => handleRemoveCertification(cert)}
                    className="ml-2 hover:text-red-500 focus:outline-none"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Helper Text */}
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">Pro tip:</span> Add both your current skills and certifications, 
        as well as those you're currently pursuing. This helps match you with opportunities that align 
        with your career growth.
      </p>
    </div>
    </div>
    </TabsContent>
            </Tabs>

            
            {/* Updated Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
      <Button
        type="button"
        onClick={handleSaveProgress}
        className="bg-gradient-to-r from-[#15abcd] to-[#094da2] hover:opacity-90 text-white rounded-lg flex items-center gap-2 md:px-6 md:py-2 p-2"
      >
        <Save className="w-4 h-4" />
        <span className="hidden md:inline">Save</span>
      </Button>
      
      <div className="flex space-x-4">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="px-6 sm:px-8 py-2 border-[#353939] hover:bg-[#353939]/5 text-[#353939]"
          >
            <span className="hidden md:inline">Previous</span>
            <span className="md:hidden">Back</span>
          </Button>
        )}
        <Button 
          type="submit"
          className="px-6 sm:px-8 py-2 bg-[#353939] hover:bg-[#454545] text-white"
        >
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>

    </form>
        </CardContent>
      </Card>
    )
  }

      {/* Field Helper Messages */}
      <div className="fixed bottom-4 right-4 space-y-4 max-w-[90vw] sm:max-w-sm">
        {lastActive && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="space-y-2"
          >
            {[1, 2, 3].map((messageIndex) => {
              const message = getFieldMessage(lastActive, messageIndex);
              if (!message) return null;
              
              return (
                <Alert key={messageIndex} className="bg-white/95 backdrop-blur-sm border-l-4 border-l-[#15BACD] shadow-lg">
                  <AlertCircle className="h-4 w-4 text-[#15BACD]" />
                  <AlertDescription className="text-sm text-gray-600">
                    {message}
                  </AlertDescription>
                </Alert>
              );
            })}
          </motion.div>
        )}
       {formProgress === 100 && showCompletionAlert && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <Alert className="bg-white/95 backdrop-blur-sm border-l-4 border-l-green-500 shadow-lg relative">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-sm text-gray-600 pr-6">
                Perfect! Your profile is complete. Ready to join TalentHub?
              </AlertDescription>
              <button 
                onClick={() => setShowCompletionAlert(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
           
{formSaved && (
  <Alert className="fixed bottom-4 right-4 bg-white/95 backdrop-blur-sm border-l-4 border-l-green-500 shadow-lg">
    <CheckCircle2 className="h-4 w-4 text-green-500" />
    <AlertDescription className="text-sm text-gray-600">
      Progress saved successfully!
    </AlertDescription>
  </Alert>
)}

 </motion.div>
        )}

      </div>
    </div>
  );
};

export default OnboardingForm;