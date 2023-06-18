import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./components/report_components/vehicles";
import User from "./components/report_components/user";
import Info from "./components/report_components/info";
import ProfilePage from './components/report_components/userProfile';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="users" element={<User />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="users" element={<User />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="info" element={<Info />} />
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;