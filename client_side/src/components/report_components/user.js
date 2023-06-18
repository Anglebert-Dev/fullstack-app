import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import EditUserForm from '../form_components/editUserInfo';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const { data } = response;
        setUsers(data);
        setTotalUsers(data.length);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveUser = (editedUserData) => {
    // Update the user data with the edited user data
    const updatedUsers = users.map((user) => {
      if (user.id === editedUserData.id) {
        return { ...user, ...editedUserData };
      }
      return user;
    });

    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId) => {
    // Handle delete user logic here
    console.log(`Deleting user with ID: ${userId}`);
  };
  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-indigo-600">List of All Users</h1>
        <button
          className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
          onClick={() => console.log('Add user clicked')}
        >
          <FaPlus />
        </button>
      </div>
      <h2 className="text-xl mb-4 text-indigo-600">Total Users: {totalUsers}</h2>
      <div className="overflow-x-auto">
        <div className="sm:overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-indigo-600">ID</th>
                <th className="py-2 px-4 text-indigo-600">Name</th>
                <th className="py-2 px-4 text-indigo-600">Email</th>
                <th className="py-2 px-4 text-indigo-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 flex items-center">
                    <button
                      className="text-indigo-500 hover:text-indigo-600 mr-2 transition-colors duration-300 ease-in-out"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 transition-colors duration-300 ease-in-out"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <nav className="inline-flex rounded-md shadow">
          <div className="container mx-auto px-2">
            <div className="flex justify-center">
              <ul className="flex items-center">
                {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }, (_, i) => (
                  <li key={i}>
                    <button
                      className={`${
                        i + 1 === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
                      } hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-l-md rounded-r-md`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {editingUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg text-indigo-600 mb-4">Edit User</h2>
            <EditUserForm userId={editingUserId} onSubmit={handleSaveUser} onCancel={handleCancelEdit}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
