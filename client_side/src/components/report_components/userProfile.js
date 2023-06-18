import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const UserProfile = ({ user }) => {
const location = useLocation();

const handleGoBack = () => {
window.history.back();
};

return (
<div className="bg-gray-100 min-h-screen">
<div className="container mx-auto px-4 py-8">
<div className="mb-8">
<Link to={location.state.from} className="text-blue-500 hover:text-blue-700">
Back
</Link>
</div>
<div className="bg-white shadow-md rounded-lg p-6">
<h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
<form>
<div className="mb-4">
<label className="block font-semibold mb-2">Name</label>
<input
             type="text"
             value={user.name}
             className="w-full border border-gray-300 rounded-md px-4 py-2"
             readOnly
           />
</div>
{/* Add more form fields for other user data */}
<div className="flex justify-center">
<button
             type="button"
             onClick={handleGoBack}
             className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
Back
</button>
</div>
</form>
</div>
</div>
</div>
);
};

export default UserProfile