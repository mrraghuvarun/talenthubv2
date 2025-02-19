import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Modified Skills Section Form with Fixed Handlers
const SkillsEditForm = ({ 
  handleSubmit, 
  newSkill, 
  setNewSkill, 
  formData,
  setFormData, 
  handleRemoveSkill, 
  handleEditToggle, 
  details,
  skills,
  isSkillsDropdownOpen,
  setIsSkillsDropdownOpen
}) => {
  // Local handlers
  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
      setNewSkill('');
    }
    setIsSkillsDropdownOpen(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleCancel = () => {
    setFormData(prevState => ({
      ...prevState,
      skills: details.skills || []
    }));
    handleEditToggle('skills');
    setIsSkillsDropdownOpen(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 'skills')}>
      <div className="space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onClick={() => setIsSkillsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsSkillsDropdownOpen(false), 200)}
                placeholder="Select or type a skill"
                className="border-gray-300 dark:border-gray-600 w-full"
              />
              {isSkillsDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  {skills
                    .filter(skill => 
                      skill.toLowerCase().includes(newSkill.toLowerCase()) &&
                      !formData.skills.includes(skill)
                    )
                    .map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSkillSelect(skill);
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <Button 
              type="button" 
              onClick={handleAddSkill}
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[100px] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          {formData.skills.map((skill, index) => (
            <div 
              key={index} 
              className="inline-flex items-center h-8 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full text-sm border border-gray-300 dark:border-gray-600"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

// Modified Certifications Section Form with Fixed Handlers
const CertificationsEditForm = ({ 
  handleSubmit, 
  newCertification, 
  setNewCertification, 
  formData,
  setFormData, 
  handleRemoveCertification, 
  handleEditToggle, 
  details,
  certifications,
  isCertificationsDropdownOpen,
  setIsCertificationsDropdownOpen
}) => {
  // Local handlers
  const handleCertificationSelect = (cert) => {
    if (!formData.certifications.includes(cert)) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, cert]
      });
      setNewCertification('');
    }
    setIsCertificationsDropdownOpen(false);
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()]
      });
      setNewCertification('');
    }
  };

  const handleCancel = () => {
    setFormData(prevState => ({
      ...prevState,
      certifications: details.certifications || []
    }));
    handleEditToggle('certifications');
    setIsCertificationsDropdownOpen(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, 'certifications')}>
      <div className="space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onClick={() => setIsCertificationsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsCertificationsDropdownOpen(false), 200)}
                placeholder="Select or type a certification"
                className="border-gray-300 dark:border-gray-600 w-full"
              />
              {isCertificationsDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  {certifications
                    .filter(cert => 
                      cert.toLowerCase().includes(newCertification.toLowerCase()) &&
                      !formData.certifications.includes(cert)
                    )
                    .map((cert, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleCertificationSelect(cert);
                        }}
                      >
                        {cert}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <Button 
              type="button" 
              onClick={handleAddCertification}
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[100px] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          {formData.certifications.map((cert, index) => (
            <div 
              key={index} 
              className="inline-flex items-center h-8 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full text-sm border border-gray-300 dark:border-gray-600"
            >
              {cert}
              <button
                type="button"
                onClick={() => handleRemoveCertification(index)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export { SkillsEditForm, CertificationsEditForm };