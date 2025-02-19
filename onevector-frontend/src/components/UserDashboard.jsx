import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboard() {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '', address: '', resume_path: '' });
    const [editMode, setEditMode] = useState(false);
    const [newInfo, setNewInfo] = useState({ name: '', phone: '', address: '', resume: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user ? user.email : null;

            if (!email) {
                console.error('User  not logged in');
                navigate('/');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/user/info/email`, { params: { email } });
                setUserInfo(response.data);
                setNewInfo({ name: response.data.name, phone: response.data.phone, address: response.data.address, resume: null });
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleEdit = () => {
        setEditMode(true);
        setNewInfo({ name: userInfo.name, phone: userInfo.phone, address: userInfo.address, resume: null });
    };

    const handleSave = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user ? user.email : null;

        if (!email) {
            console.error('User  not logged in');
            navigate('/');
            return;
        }

        const formData = new FormData();
        formData.append('name', newInfo.name);
        formData.append('phone', newInfo.phone);
        formData.append('address', newInfo.address);
        if (newInfo.resume) {
            formData.append('resume', newInfo.resume);
        }

        try {
            await axios.put(`http://localhost:3000/api/user/info/email`, formData, {
                params: { email },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUserInfo({ ...userInfo, ...newInfo });
            setEditMode(false);
            toast.success('User  information updated successfully!');
        } catch (error) {
            console.error('Error updating user info:', error);
            setError('Failed to update user information. Please try again later.');
            toast.error('Failed to update user information. Please try again later.');
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setNewInfo({ name: userInfo.name, phone: userInfo.phone, address: userInfo.address, resume: null });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div> {/* Add a spinner or loader here */}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar onLogout={handleLogout} />
            <ToastContainer />
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {!editMode ? (
                    <div>
                                                <h2 className="text-2xl font-bold mb-4">User  Information</h2>
                        <p className="text-gray-700 mb-2"><strong>Name:</strong> {userInfo.name}</p>
                        <p className="text-gray-700 mb-2"><strong>Email:</strong> {userInfo.email}</p>
                        <p className="text-gray-700 mb-2"><strong>Phone:</strong> {userInfo.phone}</p>
                        <p className="text-gray-700 mb-2"><strong>Address:</strong> {userInfo.address}</p>
                        {userInfo.resume_path && (
                            <p className="text-gray-700 mb-4">
                                <strong>Resume:</strong> 
                                <a 
                                    href={`http://localhost:3000/${userInfo.resume_path}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 underline ml-1"
                                >
                                    View Resume
                                </a>
                            </p>
                        )}
                        <button 
                            onClick={handleEdit} 
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Edit Info
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Edit Information</h2>
                        <input
                            type="text"
                            value={newInfo.name}
                            onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
                            placeholder="Name"
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="tel"
                            value={newInfo.phone}
                            onChange={(e) => setNewInfo({ ...newInfo, phone: e.target.value })}
                            placeholder="Phone"
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="text"
                            value={newInfo.address}
                            onChange={(e) => setNewInfo({ ...newInfo, address: e.target.value })}
                            placeholder="Address"
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                        />
                        <input
                            type="file"
                            onChange={(e) => setNewInfo({ ...newInfo, resume: e.target.files[0] })}
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                        />
                        <div className="flex justify-between">
                            <button 
                                onClick={handleSave} 
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Save
                            </button>
                            <button 
                                onClick={handleCancel} 
                                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;