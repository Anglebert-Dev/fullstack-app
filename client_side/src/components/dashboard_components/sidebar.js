import React from 'react';
import { FiUsers, FiTruck, FiInfo, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="bg-indigo-50 h-screen w-[18%] py-4 px-6 md:flex md:flex-col justify-between">
      <div>
        <div className="flex items-center justify-start py-4">
          <img
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
            alt="Logo"
            className="h-8 w-8"
          />
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              <FiUsers />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/vehicles"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              <FiTruck />
              <span>Vehicles</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/info"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              <FiInfo />
              <span>Info</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="py-2 px-4">
          <Link
            to="/dashboard/profile"
            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
          >
            <FiUser />
            <span>Profile</span>
          </Link>
        </div>
        <div className="py-2 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
