import React, { useState, useEffect } from 'react';
import { FiUsers, FiTruck, FiInfo, FiUser, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate, Link, Route,Routes } from 'react-router-dom';
import ProfilePage from '../report_components/userProfile'; // Import the ProfilePage component

const logoImage =
  'https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the API
    const token = localStorage.getItem('userToken');
    axios
      .get('http://localhost:2000/api/users/current', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const { data } = response;
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Remove user from state
    setUser(null);

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="bg-indigo-50 h-screen w-[18%] py-4 px-6 md:flex flex-col justify-between hidden">
      <div>
        <div className="flex items-center justify-start py-4">
          <img src={logoImage} alt="Logo" className="h-8 w-8" />
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
        {!user && (
          <div className="py-2 px-4">
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              <FiUser />
              <span>Profile</span>
            </Link>
          </div>
        )}
        {!user && (
          <div className="py-2 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-indigo-600 hover:text-white"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Add the route for the profile page */}
      <Routes>
        <Route path="/dashboard/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </div>
  );
};

export default Sidebar;
