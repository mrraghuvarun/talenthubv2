import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Lightbulb className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            TalentHub User Guide
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] pr-4">
          <div className="space-y-6">
            {/* Navigation Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Navigation Bar
              </h2>
              <p className="text-muted-foreground mb-2">
                The navigation bar at the top of your screen contains:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Logout button - Click to safely sign out of your account</li>
                <li>Dark mode toggle - Switch between light and dark themes for comfortable viewing</li>
              </ul>
            </section>

            {/* Profile Sections Overview */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Your Profile Sections
              </h2>
              <p className="text-muted-foreground mb-2">
                Your profile is divided into four main sections, each of which can be edited independently:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    1. Personal Details
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Basic information about you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and Email</li>
                    <li>Location (City, State, Country, Pincode)</li>
                    <li>Professional Links (LinkedIn URL)</li>
                    <li>Resume Upload</li>
                    <li>Complete Address</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    2. Qualifications
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Your professional preferences and status:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recent Job Position</li>
                    <li>Preferred Role</li>
                    <li>Availability Status</li>
                    <li>Compensation Requirements</li>
                    <li>Preferred Role Type</li>
                    <li>Preferred Work Type (e.g., Remote, Hybrid, On-site)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    3. Skills
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    List and manage your professional skills
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    4. Certifications
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Add and manage your professional certifications
                  </p>
                </div>
              </div>
            </section>

            {/* Editing Instructions */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Editing Your Profile
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Each section can be edited independently following these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Locate the section you want to update</li>
                  <li>Click the Edit button within that section</li>
                  <li>Make your desired changes</li>
                  <li>Click Save to confirm your updates</li>
                  <li>Wait for the success confirmation before moving to another section</li>
                </ol>
              </div>
            </section>

            {/* Password Reset Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Password Reset
              </h2>
              <p className="text-muted-foreground mb-2">
                If you need to reset your password:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Click "Forgot Password" on the login page</li>
                <li>Enter your registered email address</li>
                <li>Check your email for reset instructions</li>
                <li>Follow the link to create a new password</li>
                <li>Log in with your new password</li>
              </ol>
            </section>

            {/* Important Notes */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Important Notes
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Always save your changes before navigating away from a section</li>
                <li>Your dark mode preference will be remembered across sessions</li>
                <li>Keep your profile information up to date for better visibility</li>
                <li>Ensure your resume is in PDF format before uploading</li>
                <li>Log out when accessing TalentHub from shared devices</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </>
  );
};

export default UserGuide;