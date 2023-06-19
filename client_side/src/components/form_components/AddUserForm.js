import React, { useState } from 'react';

const AddUserForm = ({ onAddUser, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new user object
    const newUser = {
      name,
      email,
    };

    // Call the onAddUser function with the new user data
    onAddUser(newUser);
    onCancel();

    // Clear the form inputs
    setName('');
    setEmail('');
  };

  const handleCancel = () => {
    onCancel();

    // Clear the form inputs
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end">
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;