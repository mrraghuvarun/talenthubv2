import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCandidateForm({ candidate, onClose, onUpdate }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [resume, setResume] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (candidate) {
            setName(candidate.name || ''); // Ensure it's a string
            setEmail(candidate.email || ''); // Ensure it's a string
            setPhone(candidate.phone || ''); // Ensure it's a string
            setAddress(candidate.address || ''); // Ensure it's a string
        }
    }, [candidate]);

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        if (resume) {
            formData.append('resume', resume);
        }

        console.log(`Updating candidate with ID: ${candidate.id}`); // Debugging statement

        try {
            await axios.put(`http://localhost:3000/api/candidates/${candidate.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Candidate updated successfully');
            onUpdate(); // Refresh the candidates list
            onClose(); // Close the edit form
        } catch (error) {
            console.error('Error updating candidate:', error);
            setError('Failed to update candidate. Please try again.'); // Set error message
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-8 w-96">
                <h2 className="text-xl font-bold mb-6 text-center">Edit Candidate</h2>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={handleResumeChange}
                            accept=".pdf,.doc,.docx"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        />
                        {resume && <p className="text-gray-600 mt-2">Selected file: {resume.name}</p>} {/* Display selected file name */}
                    </div>
                    <div className="flex justify-between">
                        <button 
                            type="submit" 
                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                        >
                            Save
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCandidateForm;