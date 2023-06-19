import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard_components/sidebar';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
      <div className="flex flex-col lg:flex-row">
        {sidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
        <div className="flex-1">
          <button
            className="lg:hidden fixed right-4 top-4 z-10 bg-gray-800 rounded-md p-2 text-white"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
