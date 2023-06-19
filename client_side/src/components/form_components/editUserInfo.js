import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId, onSubmit, onCancel }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    telephone: '',
    address: '',
    // add other fields here
  });

  useEffect(() => {
    // Fetch user data for the specified userId
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        const { data } = response;
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="name" className="block text-indigo-600 font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-indigo-600 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="telephone" className="block text-indigo-600 font-medium mb-1">
          Telephone
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={userData.telephone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-indigo-600 font-medium mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mb-2"
          required
        />
      </div>

      {/* add other fields here */}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 ease-in-out text-sm mr-2"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300 ease-in-out text-sm"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
