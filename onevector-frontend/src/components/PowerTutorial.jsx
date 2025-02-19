import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const PowerTutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const steps = [
    {
      target: '[data-tutorial="search"]',
      content: 'Use the search bar to find candidates by name, email, skills, or qualifications',
      position: 'bottom'
    },
    {
      target: '[data-tutorial="filter"]', // Added a new data-tutorial attribute for filters
      content: 'Click on Filters to narrow down candidates by availability, skills, and certifications. You can apply multiple filters to refine your search.',
      position: 'bottom'
    },
    {
      target: '[data-tutorial="details"]', // Added a new data-tutorial attribute for filters
      content: 'Downloads an excel file which includes the details of users.',
      position: 'bottom'
    },
    {
      target: 'table tr td:nth-child(2)', // Targets the Name column
      content: 'Click on a candidate\'s name to view their detailed profile.',
      position: 'right'
    },
    {
      target: '[data-tutorial="actions-dropdown"]', // Added for Actions dropdown
      content: 'Actions dropdown provides quick access to: Add new users, and View magic link history',
      position: 'left'
    },
    {
      target: '[data-tutorial="actions"]',
      content: 'In the Actions column, you can delete user account',
      position: 'left'
    }
  ];

  const calculatePosition = (targetRect, dialogWidth, dialogHeight) => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let top = 0;
    let left = 0;

    const step = steps[currentStep];
    const padding = 20; // Increased padding for better spacing
    const safetyMargin = 10; // Extra margin to ensure elements stay within viewport

    // Calculate initial position based on preferred position
    switch (step.position) {
      case 'bottom':
  top = targetRect.bottom + padding + 10; // Added extra 10px
  // Center horizontally relative to target
  left = targetRect.left + (targetRect.width / 2) - (dialogWidth / 2);
  break;
case 'left':
  // Vertically center relative to target
  top = targetRect.top + (targetRect.height / 2) - (dialogHeight / 2);
  // Move a bit further from the button
  left = targetRect.left - dialogWidth - padding - 20; // Added extra 20px
  break;
  default:
        break;
    }

    // Ensure dialog stays within viewport bounds
    // Right edge
    if (left + dialogWidth > viewport.width - safetyMargin) {
      left = viewport.width - dialogWidth - safetyMargin;
    }
    // Left edge
    if (left < safetyMargin) {
      left = safetyMargin;
    }
    // Bottom edge
    if (top + dialogHeight > viewport.height - safetyMargin) {
      top = viewport.height - dialogHeight - safetyMargin;
    }
    // Top edge
    if (top < safetyMargin) {
      top = safetyMargin;
    }

    return { top, left };
  };

  useEffect(() => {
    const updatePosition = () => {
      const targetEl = document.querySelector(steps[currentStep].target);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const dialogWidth = 340; // Width for comfortable reading
        const dialogHeight = 160; // Height including padding and buttons
        const newPosition = calculatePosition(rect, dialogWidth, dialogHeight);
        setPosition(newPosition);
      }
    };

    updatePosition();
    // Update position on resize and scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
    onClose();
  };

  if (!showTutorial) return null;

  const currentTargetEl = document.querySelector(steps[currentStep].target);
  const rect = currentTargetEl?.getBoundingClientRect() || { top: 0, left: 0 };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bg-white/10 border-2 border-blue-500 transition-all duration-300"
          style={{
            top: rect.top - 4,
            left: rect.left - 4,
            width: (rect.width || 0) + 8,
            height: (rect.height || 0) + 8,
            borderRadius: '8px'
          }}
        />
      </div>
      
      <div 
        className="absolute bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80 md:w-96 transition-all duration-300"
        style={{
          top: position.top,
          left: position.left,
          maxWidth: 'calc(100vw - 40px)' // Ensures padding on mobile
        }}
      >
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="mb-6 text-sm">
          {steps[currentStep].content}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${
                  idx === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button onClick={handleNext} className="ml-4">
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PowerTutorial;