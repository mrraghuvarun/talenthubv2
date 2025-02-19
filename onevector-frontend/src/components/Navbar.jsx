import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    
                </div>
                <div className="flex items-center">
                    <Link to="/profile" className="text-white px-4 hover:underline transition duration-300 ease-in-out">
                        Profile
                    </Link>
                    <button 
                        onClick={onLogout} 
                        className="text-white px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-300 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;