// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const userId = 1; // Replace this with the actual user ID from context or props

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/${userId}');
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="bg-white shadow rounded-lg p-4">
                <p><strong>ID:</strong> {userDetails.idint}</p>
                <p><strong>First Name:</strong> {userDetails.first_name}</p>
                <p><strong>Last Name:</strong> {userDetails.last_name}</p>
                <p><strong>Phone Number:</strong> {userDetails.phone_no}</p>
                <p><strong>LinkedIn URL:</strong> <a href={userDetails.linkedin_url} target="_blank" rel="noopener noreferrer">{userDetails.linkedin_url}</a></p>
                <p><strong>Address Line 1:</strong> {userDetails.address_line1}</p>
                <p><strong>Address Line 2:</strong> {userDetails.address_line2}</p>
                <p><strong>City:</strong> {userDetails.city}</p>
                <p><strong>State:</strong> {userDetails.state}</p>
                <p><strong>Country:</strong> {userDetails.country}</p>
                <p><strong>Postal Code:</strong> {userDetails.postal_code}</p>
                <p><strong>Resume:</strong> <a href={userDetails.resume_path} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            </div>
        </div>
    );
};

export default Profile;
