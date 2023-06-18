import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard_components/sidebar';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;