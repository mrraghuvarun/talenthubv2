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

const HelpGuide = () => {
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
            TalentHub Admin Dashboard Guide
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] pr-4">
          <div className="space-y-6">
            {/* Navigation Bar Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Navigation Bar
              </h2>
              <p className="text-muted-foreground mb-2">
                Located at the top of your screen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Logout button (for signing out)</li>
                <li>Dark mode toggle (to switch between light/dark themes)</li>
                <li>Add User dropdown (for creating new users)</li>
              </ul>
            </section>

            {/* Main Dashboard Interface Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Main Dashboard Interface
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Search and Filter Section
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Search bar for finding specific users</li>
                    <li>Filter options to sort and organize user list</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    User Management Table
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    The main table displays combined list of power users and users with the following columns:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name (clickable to view detailed profile)</li>
                    <li>Email</li>
                    <li>Role</li>
                    <li>Availability</li>
                    <li>Preferred Role</li>
                    <li>Skills</li>
                    <li>Certifications</li>
                    <li>Actions (rightmost column)
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>Delete button</li>
                        <li>Promote/Demote button</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Tasks Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Common Tasks
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Adding a New User
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click the "Add User" dropdown in the navbar</li>
                    <li>Fill in required information</li>
                    <li>Submit the form</li>
                  </ol>
                </div>


                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Promoting/Demoting Users
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Locate user in the table</li>
                    <li>Click Promote/Demote button in Actions column</li>
                    <li>Action occurs immediately</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Viewing/Editing User Details
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click user's name in table</li>
                    <li>System redirects to details page</li>
                    <li>Edit desired fields</li>
                    <li>Save changes</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Using Dark Mode
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click dark mode toggle in navbar</li>
                    <li>Interface colors will switch immediately</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Searching for Users
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Use search bar above table</li>
                    <li>Enter search terms</li>
                    <li>Table updates automatically to show matching results</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Best Practices
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Regularly review user permissions to ensure appropriate access levels</li>
                <li>Validate user information thoroughly before performing promotion/demotion actions</li>
                <li>Maintain accurate and detailed records of all role changes made within the system</li>
              </ul>
            </section>

            {/* Troubleshooting Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Troubleshooting
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Login Problems
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verify your credentials are entered correctly</li>
                    <li>Use the password reset function if you can't remember your password</li>
                    <li>Contact your system administrator if issues persist</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Data Updates
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Always save your changes before navigating away from any page</li>
                    <li>Refresh the page if recent changes aren't reflecting</li>
                    <li>Clear your browser cache if experiencing persistent display issues</li>
                  </ul>
                </div>
              </div>
            </section>


            {/* Password Reset Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Password Reset
              </h2>
              <p className="text-muted-foreground mb-2">
                If you've forgotten your password:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Click the "Reset Password" link located on the login page</li>
                <li>Follow the instructions sent to your registered email address</li>
                <li>Create a new password that meets all system requirements</li>
              </ol>
            </section>

            {/* Important Notes Section */}
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Important Notes
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Actions (promote/demote/delete) happen immediately</li>
                <li>User details page is accessible by clicking names</li>
                <li>All changes in details page must be saved</li>
                <li>Dark mode preference persists across sessions</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </>
  );
};

export default HelpGuide;
