import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QualificationsSection = ({ 
  formData, 
  setFormData, 
  details, 
  isEditing, 
  handleEditToggle 
}) => {
  const [editedQualification, setEditedQualification] = useState(
    formData.qualifications[0] || {
      recent_job: '',
      preferred_roles: '',
      availability: '',
      compensation: '',
      preferred_role_type: '',
      preferred_work_arrangement: ''
    }
  );

  const handleQualificationChange = (e) => {
    const { name, value } = e.target;
    setEditedQualification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setEditedQualification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(
        `http://localhost:3000/api/candidates/${details.personalDetails.id}/qualifications`,
        editedQualification
      );

      if (response.status === 200) {
        setFormData(prev => ({
          ...prev,
          qualifications: [editedQualification]
        }));
        handleEditToggle('qualifications');
      }
    } catch (error) {
      console.error('Error updating qualifications:', error);
      alert('Failed to update qualifications');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg mb-6">
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Qualifications</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEditToggle('qualifications')}
            className="border-[#15BACD] text-[#15BACD] hover:bg-[#15BACD] hover:text-white transition-colors"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
        </div>
      </div>

      <div className="p-6">
        {isEditing.qualifications ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Recent Job</Label>
                <Input
                  name="recent_job"
                  value={editedQualification.recent_job || ''}
                  onChange={handleQualificationChange}
                  className="border-gray-300 focus:border-[#15BACD] w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Role</Label>
                <Input
                  name="preferred_roles"
                  value={editedQualification.preferred_roles || ''}
                  onChange={handleQualificationChange}
                  className="border-gray-300 focus:border-[#15BACD] w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select 
                  value={editedQualification.availability}
                  onValueChange={(value) => handleSelectChange('availability', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#15BACD]">
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
              
              <div className="space-y-2">
                <Label>Compensation</Label>
                <Select 
                  value={editedQualification.compensation}
                  onValueChange={(value) => handleSelectChange('compensation', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#15BACD]">
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
              
              <div className="space-y-2">
                <Label>Preferred Role Type</Label>
                <Select 
                  value={editedQualification.preferred_role_type}
                  onValueChange={(value) => handleSelectChange('preferred_role_type', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#15BACD]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="contract_to_hire">Contract to Hire</SelectItem>
                    <SelectItem value="Intern">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Work Type</Label>
                <Select 
                  value={editedQualification.preferred_work_arrangement}
                  onValueChange={(value) => handleSelectChange('preferred_work_arrangement', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#15BACD]">
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
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleEditToggle('qualifications')}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-[#15BACD] to-[#094DA2] text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Recent Job</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.recent_job || 'N/A'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Preferred Role</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.preferred_roles || 'N/A'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Availability</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.availability || 'N/A'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Compensation</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.compensation || 'N/A'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Preferred Role Type</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.preferred_role_type || 'N/A'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Preferred Work Type</Label>
              <p className="text-gray-900 dark:text-white font-medium">
                {formData.qualifications[0]?.preferred_work_arrangement || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualificationsSection;