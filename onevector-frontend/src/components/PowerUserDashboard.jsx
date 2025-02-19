import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {  FaHistory, FaSignOutAlt } from 'react-icons/fa';
import {  buttonVariant, modalVariant } from './animations';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import oneVectorImage from './images/onevector.png'; 
import MagicLinkHistoryPopup from './MagicLinkHistoryPopup';
import * as XLSX from 'xlsx'; 
import {DownloadIcon,SunIcon, MoonIcon } from '@heroicons/react/solid';
import { Button } from "@/components/ui/button"
import { useTheme } from "../ThemeContext"; // Ensure correct import path
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead,TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoadingSpinner from './LoadingSpinner'; // Add this import
import PowerTutorial from './PowerTutorial';
import SendingMagicLink from './SendMagic'; // Add this import
import { 
  HelpCircle, 
  Filter, 
  PlusIcon,
  MoreVertical 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from 'lucide-react';
import PoweruserHelp from './PoweruserHelp';  // Adjust the import path based on your file structure
import TablePagination from './TablePagination';


function PowerUserDashboard() {const [details, setDetails] = useState(null);
  const [email, setEmail] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [sentEmails, setSentEmails] = useState([]);
  const [isRoleChangeModalOpen, setIsRoleChangeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState(''); // Updated state for success message
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [showMagicLinkPopup, setShowMagicLinkPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showTutorial, setShowTutorial] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
const [magicLinks, setMagicLinks] = useState([]);
const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
const { isDarkMode, toggleTheme } = useTheme();
const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
const [candidatesWithDetails, setCandidatesWithDetails] = useState([]);
 const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;


const handleDownloadDetails = async () => {
  try {
    // Use the filtered candidates instead of fetching all candidates
    if (filteredCandidates.length === 0) {
      alert('No candidate details available to download based on current filters.');
      return;
    }

    // Map the filtered candidates to the format needed for Excel
    const candidatesForExcel = filteredCandidates.map(candidate => {
      const personalDetails = candidate.details?.personalDetails || {};
      const qualifications = candidate.details?.qualifications?.[0] || {};
      
      return {
        FirstName: personalDetails.first_name || 'N/A',
        LastName: personalDetails.last_name || 'N/A',
        Email: candidate.email || 'N/A',
        Role: candidate.role || 'N/A',
        Username: candidate.username || 'N/A',
        Phone: personalDetails.phone_no || 'N/A',
        Address: `${personalDetails.address_line1 || ''}, ${personalDetails.address_line2 || ''}`,
        City: personalDetails.city || 'N/A',
        State: personalDetails.state || 'N/A',
        Country: personalDetails.country || 'N/A',
        PostalCode: personalDetails.postal_code || 'N/A',
        LinkedIn: personalDetails.linkedin_url || 'N/A',
        ResumePath: personalDetails.resume_path || 'N/A',
        RecentJob: qualifications.recent_job || 'N/A',
        PreferredRoles: qualifications.preferred_roles || 'N/A',
        Availability: qualifications.availability || 'N/A',
        WorkPermitStatus: qualifications.work_permit_status || 'N/A',
        PreferredRoleType: qualifications.preferred_role_type || 'N/A',
        PreferredWorkArrangement: qualifications.preferred_work_arrangement || 'N/A',
        Compensation: qualifications.compensation || 'N/A',
        Skills: candidate.details?.skills?.join(', ') || 'N/A',
        Certifications: candidate.details?.certifications?.join(', ') || 'N/A',
      };
    });

    // Generate an Excel worksheet
    const worksheet = XLSX.utils.json_to_sheet(candidatesForExcel);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered_Candidates');

    // Trigger download of the Excel file
    XLSX.writeFile(workbook, 'Filtered_Candidate_Details.xlsx');
  } catch (error) {
    console.error('Error downloading candidate details:', error);
    alert(`Failed to download candidate details: ${error.message}`);
  }
};
const sanitizeSelectValue = (value) => {
  return value || 'unspecified'; // Fallback value if empty
};

const [filters, setFilters] = useState({
  availability: '',
  workAuthorization: '',
  employmentType: '',
  workArrangement: '',
  skills: [],
  certifications: []
});

// Function to remove individual filter
const removeFilter = (type, value) => {
  setFilters(prev => {
    const newFilters = { ...prev };
    if (type === 'skills' || type === 'certifications') {
      newFilters[type] = prev[type].filter(item => item !== value);
    } else {
      newFilters[type] = '';
    }
    
    // Update active filter count
    const activeFilters = Object.entries(newFilters).filter(([key, val]) => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return Boolean(val);
    }).length;
    
    setActiveFilterCount(activeFilters);
    return newFilters;
  });
};

const [activeFilterCount, setActiveFilterCount] = useState(0);

const filterOptions = {
  availability: [
    { value: "Immediate", label: "Immediate" },
    { value: "2_weeks", label: "2 Weeks Notice" },
    { value: "1_month", label: "1 Month Notice" },
    { value: "2_months", label: "2 Months Notice" },
    { value: "3_months", label: "3+ Months Notice" },
    { value: "unspecified", label: "Not Specified" }
  ],
  workAuthorization: [
    { value: "us_citizen", label: "US Citizen" },
    { value: "green_card", label: "Green Card" },
    { value: "h1b", label: "H1B Visa" },
    { value: "l1", label: "L1 Visa" },
    { value: "opt", label: "OPT/CPT" },
    { value: "other", label: "Other Work Authorization" },
    { value: "unspecified", label: "Not Specified" }
  ],
  employmentType: [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "contract_to_hire", label: "Contract to Hire" },
    { value: "intern", label: "Internship" },
    { value: "unspecified", label: "Not Specified" }
  ],
  workArrangement: [
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
    { value: "remote", label: "Remote" },
    { value: "flexible", label: "Flexible" },
    { value: "unspecified", label: "Not Specified" }
  ],
};

const handleFilterChange = (type, value) => {
  setFilters(prev => {
    const newFilters = { ...prev };
    
    // Handle arrays for skills and certifications
    if (type === 'skills' || type === 'certifications') {
      if (Array.isArray(value)) {
        newFilters[type] = value;
      } else if (value && value !== 'no_selection') {
        newFilters[type] = [...(prev[type] || []), value];
      }
    } else {
      // Handle single values for other filters
      newFilters[type] = value;
    }

    // Count active filters
    const activeFilters = Object.entries(newFilters).filter(([key, val]) => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return Boolean(val);
    }).length;
    
    setActiveFilterCount(activeFilters);
    return newFilters;
  });
};


const resetFilters = () => {
  setFilters({
    availability: '',
    workAuthorization: '',
    employmentType: '',
    workArrangement: '',
    skills: [],           // Changed to empty array
    certifications: []    // Changed to empty array
  });
  setActiveFilterCount(0);
};

const formatList = (items) => {
  if (!items || !items.length) return 'None';
  return items.join(', ');
};

// Apply filters to candidates
const applyFilters = (candidates) => {
  return candidates.filter(candidate => {
    // Get qualifications safely with optional chaining
    const qualifications = candidate.details?.qualifications?.[0] || {};
    const candidateSkills = candidate.details?.skills || [];
    const candidateCerts = candidate.details?.certifications || [];

    const matchesAvailability = !filters.availability || 
      sanitizeSelectValue(qualifications.availability) === filters.availability;

    const matchesWorkAuth = !filters.workAuthorization || 
      sanitizeSelectValue(qualifications.work_permit_status) === filters.workAuthorization;

    const matchesEmploymentType = !filters.employmentType || 
      sanitizeSelectValue(qualifications.preferred_role_type) === filters.employmentType;

    const matchesWorkArrangement = !filters.workArrangement || 
      sanitizeSelectValue(qualifications.preferred_work_arrangement) === filters.workArrangement;

    // Check if ANY of the selected skills match (if skills filter is active)
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => candidateSkills.includes(skill));

    // Check if ANY of the selected certifications match (if certifications filter is active)
    const matchesCertifications = filters.certifications.length === 0 || 
      filters.certifications.some(cert => candidateCerts.includes(cert));

    // Return true only if ALL conditions are met
    return matchesAvailability && 
           matchesWorkAuth && 
           matchesEmploymentType && 
           matchesWorkArrangement && 
           matchesSkills && 
           matchesCertifications;
  });
};

useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:3000/api/candidates');
        const filteredCandidates = response.data
        .filter(candidate => candidate.role === 'user') // Only show 'user' role candidates
        .sort((a, b) => a.id - b.id); // Sort by ID

        setCandidates(filteredCandidates);
      } catch (error) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const fetchMagicLinks = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/magic-links');
        setMagicLinks(response.data);
        setShowHistoryPopup(true);
    } catch (error) {
        alert('Failed to fetch magic links');
        console.error('Fetch error:', error);
    }
};

useEffect(() => {
  const tutorialCompleted = localStorage.getItem('tutorialCompleted');
  if (!tutorialCompleted) {
    setShowTutorial(true);
  }
}, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate and all their associated data?')) {
      try {
        console.log(`Attempting to delete candidate with ID: ${id}`);
        const response = await axios.delete(`http://localhost:3000/api/candidates/${id}`);
        console.log('Delete response:', response);
        
        // Update candidates list after successful deletion
        setCandidates(candidates.filter((candidate) => candidate.id !== id));
        
        // Show success message
        setSuccessMessageText('Candidate deleted successfully!');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error('Error deleting candidate:', error);
        alert('Failed to delete candidate');
      }
    }
  };
  useEffect(() => {
    const fetchCandidatesWithDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:3000/api/candidates');
        const basicCandidates = response.data.filter(candidate => candidate.role !== 'power_user');
  
        const detailedCandidates = await Promise.all(
          basicCandidates.map(async (candidate) => {
            try {
              const detailsResponse = await axios.get(`http://localhost:3000/api/personalDetails/${candidate.id}`);
              return {
                ...candidate,
                details: detailsResponse.data
              };
            } catch (error) {
              console.error(`Error fetching details for candidate ${candidate.id}:`, error);
              return {
                ...candidate,
                details: { personalDetails: {}, qualifications: [], skills: [], certifications: [] }
              };
            }
          })
        );
  
        // Sort candidates with power users first
        const sortedCandidates = detailedCandidates.sort((a, b) => {
          if (a.role === 'power_user' && b.role !== 'power_user') return -1;
          if (a.role !== 'power_user' && b.role === 'power_user') return 1;
          return 0;
        });
  
        setCandidatesWithDetails(sortedCandidates);
        setCandidates(basicCandidates.sort((a, b) => {
          if (a.role === 'power_user' && b.role !== 'power_user') return -1;
          if (a.role !== 'power_user' && b.role === 'power_user') return 1;
          return 0;
        }));
      } catch (error) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCandidatesWithDetails();
  }, []);
  
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (!tutorialCompleted) {
      setShowTutorial(true);
    }
  }, []);

  const toggleRole = (candidate) => {
    setSelectedCandidate(candidate);
    setIsRoleChangeModalOpen(true);
  };

  const sendMagicLink = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
  
    try {
      setIsSendingMagicLink(true);
      const response = await axios.post('http://localhost:3000/api/send-magic-link', { email });
  
      if (response.status === 200) {
        localStorage.setItem('magicLinkEmail', email);
        setSentEmails((prev) => [...prev, email]);
        setEmail('');
        setSuccessMessageText('Magic Link sent successfully!');
        setShowSuccessMessage(true);
        setShowForm(false);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        throw new Error('Failed to send magic link. Server error.');
      }
    } catch (error) {
      console.error('Error sending magic link:', error);
      alert(error.response?.data?.error || 'Failed to send magic link. Please try again.');
    } finally {
      setIsSendingMagicLink(false);
    }
  };


  const filterCandidates = (candidates, query) => {
    if (!query && !activeFilterCount) return candidates;
    
    let filteredResults = candidates;
  
    // Apply search query if it exists
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredResults = filteredResults.filter(candidate => {
        const personalDetails = candidate.details?.personalDetails || {};
        const qualifications = candidate.details?.qualifications?.[0] || {};
        
        // Check all searchable fields
        return [
          candidate.username,
          candidate.email,
          personalDetails.first_name,
          personalDetails.last_name,
          personalDetails.phone_no,
          ...(candidate.details?.skills || []),
          ...(candidate.details?.certifications || []),
          qualifications.recent_job,
          qualifications.preferred_roles,
          qualifications.work_permit_status,
          qualifications.preferred_role_type
        ].some(field => 
          field?.toLowerCase().includes(searchTerm)
        );
      });
    }
  
    // Apply filters if any are active
    if (activeFilterCount > 0) {
      filteredResults = applyFilters(filteredResults);
    }
  
    return filteredResults;
  };

  const filteredCandidates = applyFilters(filterCandidates(candidatesWithDetails, searchQuery));
  const currentData = filteredCandidates.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchSkillsAndCertifications = async () => {
      try {
        const skillsResponse = await axios.get('http://localhost:3000/api/skills');
        const certificationsResponse = await axios.get('http://localhost:3000/api/certifications');
        
        const skillNames = skillsResponse.data.map(skill => ({
          value: skill.skill_name,
          label: skill.skill_name
        }));
        const certNames = certificationsResponse.data.map(cert => ({
          value: cert.certification_name,
          label: cert.certification_name
        }));
        
        setSkills(skillNames);
        setCertifications(certNames);
        filterOptions.skills = skillNames;
        filterOptions.certifications = certNames;
      } catch (error) {
        console.error('Error fetching skills and certifications:', error);
      }
    };
  
    fetchSkillsAndCertifications();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleShowDetails = (candidate) => {
    navigate('/power-candidate-details', { state: { candidate } });
  };

  const startTutorial = () => {
    setShowTutorial(true);
    localStorage.removeItem('tutorialCompleted');
  };

  const isActive = (path) => location.pathname === path;

  const handleHistoryClick = () => {
    setHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setHistoryModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedCandidate) return;
  
    try {
      // First update the UI
      setCandidatesWithDetails(prev => 
        prev.filter(candidate => candidate.id !== selectedCandidate.id)
      );
      setCandidates(prev => 
        prev.filter(candidate => candidate.id !== selectedCandidate.id)
      );
      setIsDeleteModalOpen(false);
      setSuccessMessageText('Candidate deleted successfully!');
      setShowSuccessMessage(true);
  
      // Then perform the deletion in the background
      await axios.delete(`http://localhost:3000/api/qualifications/${selectedCandidate.id}`);
      await axios.delete(`http://localhost:3000/api/user_skills/${selectedCandidate.id}`);
      await axios.delete(`http://localhost:3000/api/user_certifications/${selectedCandidate.id}`);
      await axios.delete(`http://localhost:3000/api/personaldetails/${selectedCandidate.id}`);
      await axios.delete(`http://localhost:3000/api/candidates/${selectedCandidate.id}`);
  
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      // If deletion fails, revert the UI changes
      console.error('Delete error:', error);
      alert('Failed to delete candidate. Please try again.');
      // Refresh the candidates list to restore the correct state
      fetchCandidatesWithDetails();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} font-sans`}>
     {/* Magic Link Popup */}
  {showMagicLinkPopup && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20">
      <Alert className="w-96 border-none bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl">
        <Check className="h-5 w-5" />
        <AlertDescription className="text-center text-lg font-semibold">
          Magic Link sent successfully!
        </AlertDescription>
      </Alert>
    </div>
  )}

 {/* Success Card */}
 {showSuccessMessage && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20">
      <Card className="w-96 bg-white dark:bg-gray-800 shadow-2xl p-8 transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-75" />
          <div className="relative flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Success!
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          {successMessageText}
        </p>
        
        <Button
          onClick={() => setShowSuccessMessage(false)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold py-6"
        >
          Close
        </Button>
      </Card>
    </div>
  )}
{/* Header Section */}
<header
      className={cn(
        "fixed top-0 left-0 right-0 z-10 shadow-md",
        isDarkMode ? "bg-gray-800" : "bg-white"
      )}
    >
      <div className="flex justify-between items-center p-2 sm:p-4 w-full -ml-2">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img
            src={oneVectorImage}
            alt="OneVector Logo"
            className="w-5 h-6 sm:w-8 sm:h-10"
          />
          <h1
            className={cn(
              "text-lg sm:text-2xl font-semibold tracking-wide",
              "text-transparent bg-clip-text bg-gradient-to-r from-[#15BACD] to-[#094DA2]"
            )}
          >
            TalentHub
          </h1>
        </div>

        {/* Action Section */}
        <div className="flex items-center space-x-3">

        <div className="flex items-center space-x-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full",
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          )}
        >
          <HelpCircle className={cn(
            "w-5 h-5",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={startTutorial}>
          Start Tutorial
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Dialog>
      <PoweruserHelp />
    </Dialog>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </Button>

          {/* Actions Dropdown */}
          <DropdownMenu open={showActionsDropdown} onOpenChange={setShowActionsDropdown}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" data-tutorial="actions-dropdown"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowForm(true)}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={fetchMagicLinks}>
                <FaHistory className="mr-2 h-4 w-4" /> View History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="rounded-full"
          >
            Logout
          </Button>
        </div>
      </div>
      </div>
    </header>

    <main className="pt-16 px-4 sm:px-0 w-full bg-white text-black dark:bg-gray-900 dark:text-white">
    <div className="flex items-center w-full gap-2 mt-6">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full md:w-1/2 border border-gray-300 bg-white text-black rounded-xl p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-200",
              isDarkMode ? "dark:bg-gray-800 dark:text-white dark:border-gray-700" : ""
            )}
            data-tutorial="search"
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" data-tutorial="filter">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Filters</SheetTitle>
          <Button variant="ghost" className="mr-4" size="sm" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-120px)] pr-4">
        <div className="grid gap-4 py-4">
          {/* Single select filters with cancel option */}
          {Object.entries(filterOptions).map(([key, options]) => {
            if (key !== 'skills' && key !== 'certifications') {
              return (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <div className="relative">
                    <Select
                      value={filters[key]}
                      onValueChange={(value) => handleFilterChange(key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {filters[key] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-8 top-1/2 -translate-y-1/2"
                        onClick={() => removeFilter(key, filters[key])}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
                <div className="space-y-2">
        <label className="text-sm font-medium">Skills</label>
        <Select
          value={filters.skills.length > 0 ? filters.skills[filters.skills.length - 1] : 'no_selection'}
          onValueChange={(value) => {
            if (value && value !== 'no_selection' && !filters.skills.includes(value)) {
              handleFilterChange('skills', [...filters.skills, value]);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Selected Skills (${filters.skills.length})`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no_selection">Select a skill</SelectItem>
            {skills.map((skill) => (
              <SelectItem 
                key={skill.value} 
                value={sanitizeSelectValue(skill.value)}
              >
                {skill.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Certifications</label>
        <Select
          value={filters.certifications.length > 0 ? filters.certifications[filters.certifications.length - 1] : 'no_selection'}
          onValueChange={(value) => {
            if (value && value !== 'no_selection' && !filters.certifications.includes(value)) {
              handleFilterChange('certifications', [...filters.certifications, value]);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Selected Certifications (${filters.certifications.length})`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no_selection">Select a certification</SelectItem>
            {certifications.map((cert) => (
              <SelectItem 
                key={cert.value} 
                value={sanitizeSelectValue(cert.value)}
              >
                {cert.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
</div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto mt-4 md:mt-0">
      <Button
        onClick={handleDownloadDetails}
        variant="solid"
        className="px-3 sm:px-4 py-2 h-10 text-white font-medium rounded-xl flex items-center justify-center bg-[#094DA2] border border-[#094DA2] hover:bg-[#093A8E] transition-all duration-200 transform hover:scale-105 focus:outline-none dark:bg-[#094DA2] dark:border-[#094DA2] dark:hover:bg-[#093A8E]"
        data-tutorial="details"
      >
        <DownloadIcon className="h-5 w-5 mr-2 text-white" />
        DETAILS
      </Button>
        </div>
        </div>

  {/* Magic Link History Popup */}
  {showHistoryPopup && (
    <MagicLinkHistoryPopup
      magicLinks={magicLinks}
      onClose={() => setShowHistoryPopup(false)}
    />
  )}

{showForm && (
  <Dialog open={showForm} onOpenChange={(open) => setShowForm(open)}>
    <DialogTrigger asChild>
      <Button className="hidden">Open Modal</Button>
    </DialogTrigger>
    <DialogContent
      className={`
        sm:max-w-md w-[calc(100%-2rem)] mx-auto
        p-4 sm:p-6 md:p-8
        rounded-xl shadow-xl
        transition-all duration-200
        ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
      `}
    >
      <DialogHeader className="space-y-2 sm:space-y-3">
        <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
          Add a New User
        </DialogTitle>
        <DialogDescription 
          className={`text-sm sm:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Enter the email address of the new user.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 flex flex-col space-y-5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`
            h-11 sm:h-12
            px-4 text-base
            rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500/40 placeholder-gray-400' 
              : 'border-gray-200 focus:ring-blue-500/40 placeholder-gray-500 hover:border-gray-300'
            }
          `}
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <Button
            onClick={() => setShowForm(false)}
            className={`
              h-11 sm:h-12 px-6
              text-base font-medium
              rounded-lg
              transition-all duration-200
              ${isDarkMode
                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }
            `}
          >
            Cancel
          </Button>

          <Button
            onClick={sendMagicLink}
            className={`
              h-11 sm:h-12 px-6
              text-base font-medium
              rounded-lg
              transition-all duration-200
              ${isDarkMode
                ? 'bg-gradient-to-r from-[#094DA2] to-[#15abcd] text-gray-100'
                : 'bg-gradient-to-r from-[#15ABCD] to-[#094DA2] text-white'
              }
              hover:opacity-90 disabled:opacity-60
              flex-1 sm:flex-none sm:min-w-[140px]
            `}
            disabled={isSendingMagicLink}
          >
            {isSendingMagicLink ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>Sending...</span>
              </div>
            ) : (
              'Send Magic Link'
            )}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)}
  {/* Table section with proper loading state */}
  {loading ? (
          <div className="flex justify-center items-center p-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg shadow-md">
            <TablePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalItems={filteredCandidates.length}
            />

            {filteredCandidates.length ? (
              <Table className={cn(
                "w-full border-collapse divide-y divide-white-400 dark:divide-white-700",
                isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              )}>
                <TableHeader>
                  <TableRow className="divide-x">
                    <TableHead className="w-[50px] py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">#</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Name</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Email</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Role</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Availability</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Preferred Role</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Skills</TableHead>
                    <TableHead className="py-4 px-4 font-semibold border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Certifications</TableHead>
                    <TableHead className="py-4 px-4 font-semibold text-center border-b bg-[#EAF3FF] text-black border-0 border-r-2 border-white text-center whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                                  {currentData.map((candidate, index) => (  
                                    <TableRow
                                      key={candidate.id}
                                      className={cn(
                                        "divide-x transition-colors",
                                        isDarkMode ? "divide-gray-700 hover:bg-gray-700/50" : "divide-gray-200 hover:bg-gray-100/50"
                                      )}
                                    >
                      <TableCell className="py-4 px-4 font-medium">{startIndex + index + 1}</TableCell>
                      <TableCell className="py-4 px-4">
                        <div
                          className="flex items-center gap-2"
                          onClick={() => handleShowDetails(candidate)}
                        >
                          <span className="bg-gradient-to-r from-[#15ABCD] to-[#094DA2] text-transparent bg-clip-text font-semibold hover:font-bold cursor-pointer">
                            {candidate.details?.personalDetails?.first_name} {candidate.details?.personalDetails?.last_name}
                          </span>
                          {candidate.role === "power_user" && <FaCrown className="text-yellow-500" />}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-4">{candidate.email}</TableCell>
                      <TableCell className="py-4 px-4">
                        <Badge variant={candidate.role === "power_user" ? "default" : "secondary"}>
                          {candidate.role === "power_user" ? "Power User" : "User"}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        {candidate.details?.qualifications?.[0]?.availability || 'Not specified'}
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        {candidate.details?.qualifications?.[0]?.preferred_roles || 'Not specified'}
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {formatList(candidate.details?.skills)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {formatList(candidate.details?.certifications)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4" data-tutorial={"actions"}>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedCandidate(candidate);
                              setIsDeleteModalOpen(true);
                            }}
                            size="sm"
                            className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            ) : (
              <p className="p-4 text-center text-gray-800 dark:text-white">No candidates found.</p>
            )}
          </div>
        )}


</main>
  {/* History Modal */}
      {historyModalOpen && (
        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20"
        >
          <motion.div
            variants={modalVariant}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-lg font-semibold text-black mb-4">History</h3>
            <div className="overflow-y-auto max-h-64 space-y-2">
              {sentEmails.length > 0 ? (
                sentEmails.map((email, index) => (
                  <div
                    key={index}
                    className="border border-black p-2 rounded-lg bg-gray-50"
                  >
                    <p className="text-black">{email}</p>
                    <p className="text-sm text-gray-600">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-black">No history available.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <motion.button
                variants={buttonVariant}
                whileHover="hover"
                whileTap="tap"
                onClick={closeHistoryModal}
                className="px-4 py-2 bg-white border border-black text-black rounded-lg hover:bg-black hover:text-white"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedCandidate && (
        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            variants={modalVariant}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-lg font-semibold text-black">Confirm Deletion</h3>
            <p className="my-4 text-black">
              Are you sure you want to delete {selectedCandidate.username}?
            </p>
           <div className="flex justify-end space-x-4">
  <motion.button
    variants={buttonVariant}
    whileHover="hover"
    whileTap="tap"
    onClick={() => setIsDeleteModalOpen(false)}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
  >
    Cancel
  </motion.button>
  
  <motion.button
    variants={buttonVariant}
    whileHover="hover"
    whileTap="tap"
    onClick={confirmDelete}
    className="px-4 py-2 bg-gradient-to-r from-[#15ABCD] to-[#094DA2] text-white rounded-lg"
  >
    Confirm
  </motion.button>
</div>

          </motion.div>
        </motion.div>
      )}

      {showTutorial && (
  <PowerTutorial onClose={() => setShowTutorial(false)} />
)}
    </div>
  );
}

export default PowerUserDashboard;